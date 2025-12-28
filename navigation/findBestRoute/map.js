import { pythonURI, fetchOptions } from '../../assets/js/api/config.js';
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const apiUrl = `${pythonURI}/api/get_routes`;
const routeUsageUrl = `${pythonURI}/api/subscription/route-usage`;

const map = L.map('map').setView([32.7157, -117.1611], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

let polylines = [];

// Route usage tracking
async function updateRouteUsageDisplay() {
  try {
    const response = await fetch(routeUsageUrl, fetchOptions);
    if (response.ok) {
      const usage = await response.json();
      const usageDisplay = document.getElementById('route-usage-display');
      if (usageDisplay) {
        if (usage.unlimited) {
          usageDisplay.innerHTML = `<span class="text-green-400">✓ Unlimited routes</span>`;
        } else {
          const remaining = usage.remaining;
          const colorClass = remaining <= 1 ? 'text-red-400' : remaining <= 2 ? 'text-yellow-400' : 'text-green-400';
          usageDisplay.innerHTML = `<span class="${colorClass}">${remaining}/${usage.limit} routes remaining today</span>`;
        }
        usageDisplay.classList.remove('hidden');
      }
    }
  } catch (e) {
    console.log('Could not fetch route usage:', e);
  }
}

// Show limit reached modal
function showLimitReachedModal(data) {
  // Remove any existing modal
  const existingModal = document.getElementById('limit-reached-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'limit-reached-modal';
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
      <div class="text-center">
        <div class="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Daily Limit Reached</h3>
        <p class="text-gray-400 mb-4">${data.message || 'You have used all your routes for today.'}</p>
        <div class="bg-gray-700/50 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-300">
            <span class="font-semibold text-white">${data.used || 0}/${data.limit || 0}</span> routes used today
          </p>
          <p class="text-xs text-gray-500 mt-1">Current plan: <span class="text-yellow-400 capitalize">${data.tier || 'free'}</span></p>
        </div>
        <p class="text-sm text-green-400 mb-6">${data.upgrade_message || 'Upgrade for more routes!'}</p>
        <div class="flex gap-3">
          <button onclick="document.getElementById('limit-reached-modal').remove()" 
            class="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
            Close
          </button>
          <a href="${data.upgrade_url || '/pricing'}" 
            class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold text-center hover:from-yellow-600 hover:to-yellow-700 transition-all">
            Upgrade Now
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Initialize route usage display on load
updateRouteUsageDisplay();

// Center map on user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    map.setView([lat, lon], 13);
  });
}

// Pre-fill logic: read from URL if present
const urlParams = new URLSearchParams(window.location.search);
const originParam = urlParams.get('origin');
const destinationParam = urlParams.get('destination');
const modeParam = urlParams.get('mode');

// Pre-fill form if values exist in URL
if (originParam) document.getElementById('origin').value = originParam;
if (destinationParam) document.getElementById('destination').value = destinationParam;
if (modeParam) document.getElementById('mode').value = modeParam;

// Auto-fetch routes if origin + destination present
if (originParam && destinationParam) {
  document.getElementById('fetch_routes_btn').click();
}

document.getElementById('fetch_routes_btn').addEventListener('click', async () => {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const mode = document.getElementById('mode').value || 'driving';

  if (!origin || !destination) {
    alert('Please enter both origin and destination.');
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // Required for authentication
      body: JSON.stringify({ origin, destination, mode }),
    });

    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      alert('Please log in to use the route finder.');
      window.location.href = '/login';
      return;
    }

    // Handle 429 Rate Limit - show upgrade modal
    if (response.status === 429) {
      const limitData = await response.json();
      showLimitReachedModal(limitData);
      updateRouteUsageDisplay();  // Refresh the usage display
      return;
    }

    const routes = await response.json();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!Array.isArray(routes)) {
      resultDiv.innerHTML = `<p>Error: ${routes.error || 'No routes found'}</p>`;
      return;
    }

    // Update route usage display after successful request
    updateRouteUsageDisplay();

    // Clear old polylines
    polylines.forEach(p => map.removeLayer(p));
    polylines = [];

    routes.forEach((route, idx) => {
      const header = document.createElement('h4');
      header.textContent = `Route ${idx + 1} - ${route.total_distance} - Est. Time: ${route.traffic_adjusted_duration || route.total_duration}`;
      resultDiv.appendChild(header);

      const ul = document.createElement('ul');
      route.details.forEach(step => {
        const li = document.createElement('li');
        li.innerHTML = `${step.instruction} - ${step.distance} (${step.duration})`;
        ul.appendChild(li);
      });
      resultDiv.appendChild(ul);

      if (route.geometry) {
        const decoded = polyline.decode(route.geometry);
        const polylineLayer = L.polyline(decoded, {
          color: idx === 0 ? 'blue' : 'gray',
          weight: 4,
          opacity: 0.8,
        }).addTo(map);
        polylines.push(polylineLayer);
        if (idx === 0) map.fitBounds(polylineLayer.getBounds());
      }
    });
  } catch (error) {
    console.error('Route fetch error:', error);
    alert('An error occurred while fetching routes.');
  }
});














