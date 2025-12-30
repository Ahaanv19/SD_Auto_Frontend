import { pythonURI, fetchOptions } from '../../assets/js/api/config.js';
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const apiUrl = `${pythonURI}/api/get_routes`;
const routeUsageUrl = `${pythonURI}/api/subscription/route-usage`;

// Get the base URL from the page (set by Jekyll)
function getBaseUrl() {
  const trigger = document.querySelector('.trigger');
  if (trigger && trigger.getAttribute('data-baseurl')) {
    return trigger.getAttribute('data-baseurl');
  }
  // Fallback: try to extract from current URL or use known baseurl
  const pathMatch = window.location.pathname.match(/^(\/[^\/]+)/);
  if (pathMatch && pathMatch[1] !== '/route') {
    return pathMatch[1];
  }
  return '/SD_Auto_Frontend'; // Hardcoded fallback
}

const map = L.map('map').setView([32.7157, -117.1611], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

let polylines = [];

// =====================================================
// REAL-TIME VEHICLE TRACKING SYSTEM
// =====================================================
let vehicleMarker = null;
let watchId = null;
let isNavigating = false;
let currentRouteData = null;
let currentRoutePolyline = null;
let currentStepIndex = 0;
let stepElements = [];

// Custom vehicle icon
const vehicleIcon = L.divIcon({
  className: 'vehicle-marker',
  html: `
    <div style="
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #0066cc 0%, #06b6d4 100%);
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 15px rgba(0, 102, 204, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    ">
      🚗
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Destination marker icon
const destinationIcon = L.divIcon({
  className: 'destination-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    ">
      🎯
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Calculate distance between two points (Haversine formula)
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of Earth in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find closest point on route to current position
function findClosestPointOnRoute(lat, lon, routePoints) {
  let minDist = Infinity;
  let closestIdx = 0;
  
  for (let i = 0; i < routePoints.length; i++) {
    const dist = getDistanceFromLatLon(lat, lon, routePoints[i][0], routePoints[i][1]);
    if (dist < minDist) {
      minDist = dist;
      closestIdx = i;
    }
  }
  
  return { index: closestIdx, distance: minDist };
}

// Determine current step based on position
function determineCurrentStep(lat, lon, steps, routePoints) {
  // Find the closest point on the route
  const closest = findClosestPointOnRoute(lat, lon, routePoints);
  
  // If user is far from route (> 100m), don't change step
  if (closest.distance > 100) {
    return currentStepIndex;
  }
  
  // Calculate what percentage along the route we are
  const progressPercent = closest.index / routePoints.length;
  
  // Map that to a step index
  const estimatedStep = Math.floor(progressPercent * steps.length);
  
  // Clamp to valid range (0 to steps.length - 1)
  // Also ensure we start at 0, not at the end
  const clampedStep = Math.max(0, Math.min(estimatedStep, steps.length - 1));
  
  // Only allow moving forward (prevent jumping backwards accidentally)
  // Unless we're at the start (currentStepIndex is 0)
  if (currentStepIndex === 0) {
    return clampedStep;
  }
  
  // Don't allow going more than 1 step forward at a time to prevent jumps
  if (clampedStep > currentStepIndex + 1) {
    return currentStepIndex + 1;
  }
  
  // Don't allow going backwards
  if (clampedStep < currentStepIndex) {
    return currentStepIndex;
  }
  
  return clampedStep;
}

// Update step highlighting
function highlightStep(stepIndex) {
  stepElements.forEach((el, idx) => {
    el.classList.remove('step-active', 'step-completed', 'step-upcoming');
    
    if (idx < stepIndex) {
      el.classList.add('step-completed');
    } else if (idx === stepIndex) {
      el.classList.add('step-active');
      // Auto-scroll to active step
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      el.classList.add('step-upcoming');
    }
  });
  
  currentStepIndex = stepIndex;
  updateNavigationStatus();
}

// Update navigation status display
function updateNavigationStatus() {
  const statusEl = document.getElementById('nav-status');
  if (!statusEl || !currentRouteData) return;
  
  const currentStep = currentRouteData.details[currentStepIndex];
  const totalSteps = currentRouteData.details.length;
  
  statusEl.innerHTML = `
    <div class="nav-status-content">
      <div class="nav-current-step">
        <span class="step-number">Step ${currentStepIndex + 1} of ${totalSteps}</span>
        <span class="step-instruction">${currentStep?.instruction || 'Navigating...'}</span>
      </div>
      <div class="nav-distance">${currentStep?.distance || ''}</div>
    </div>
  `;
}

// Start real-time navigation
function startNavigation() {
  if (!currentRouteData || !currentRoutePolyline) {
    alert('Please search for a route first.');
    return;
  }
  
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  
  isNavigating = true;
  
  // IMPORTANT: Reset step index to 0 when starting navigation
  currentStepIndex = 0;
  
  // Show navigation UI
  document.getElementById('nav-controls')?.classList.add('active');
  document.getElementById('start-nav-btn')?.classList.add('hidden');
  document.getElementById('stop-nav-btn')?.classList.remove('hidden');
  
  // Get route points
  const routePoints = currentRoutePolyline.getLatLngs().map(ll => [ll.lat, ll.lng]);
  
  // Create vehicle marker if not exists
  if (!vehicleMarker) {
    vehicleMarker = L.marker([32.7157, -117.1611], { icon: vehicleIcon }).addTo(map);
  }
  
  // Highlight first step immediately before GPS kicks in
  highlightStep(0);
  
  // Start watching position
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      // Update vehicle marker position
      vehicleMarker.setLatLng([lat, lon]);
      
      // Center map on vehicle (with slight offset for UI)
      map.setView([lat, lon], 16, { animate: true });
      
      // Find current step and highlight
      const stepIdx = determineCurrentStep(lat, lon, currentRouteData.details, routePoints);
      if (stepIdx !== currentStepIndex) {
        highlightStep(stepIdx);
        
        // Announce step change (optional voice)
        announceStep(currentRouteData.details[stepIdx]);
      }
      
      // Check if arrived at destination
      const lastPoint = routePoints[routePoints.length - 1];
      const distToEnd = getDistanceFromLatLon(lat, lon, lastPoint[0], lastPoint[1]);
      if (distToEnd < 50) { // Within 50 meters
        arriveAtDestination();
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      if (error.code === error.PERMISSION_DENIED) {
        alert('Please enable location access to use navigation.');
        stopNavigation();
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    }
  );
}

// Stop navigation
function stopNavigation() {
  isNavigating = false;
  
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  // Hide navigation UI
  document.getElementById('nav-controls')?.classList.remove('active');
  document.getElementById('start-nav-btn')?.classList.remove('hidden');
  document.getElementById('stop-nav-btn')?.classList.add('hidden');
  
  // Reset step highlighting
  stepElements.forEach(el => {
    el.classList.remove('step-active', 'step-completed', 'step-upcoming');
  });
  
  currentStepIndex = 0;
}

// Announce step (optional voice navigation)
function announceStep(step) {
  if (!step || !('speechSynthesis' in window)) return;
  
  // Only announce if user enabled voice (check localStorage)
  if (localStorage.getItem('voiceNavigation') !== 'true') return;
  
  const utterance = new SpeechSynthesisUtterance(step.instruction);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// Handle arrival at destination
function arriveAtDestination() {
  stopNavigation();
  
  // Show arrival modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl text-center">
      <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <span style="font-size: 40px;">🎉</span>
      </div>
      <h3 class="text-2xl font-bold text-white mb-2">You've Arrived!</h3>
      <p class="text-gray-400 mb-6">You have reached your destination.</p>
      <button onclick="this.closest('.fixed').remove()" 
        class="py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all">
        Close
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Make functions globally accessible
window.startNavigation = startNavigation;
window.stopNavigation = stopNavigation;

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
          <a href="${getBaseUrl()}/pricing" 
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

    // Clear old polylines and reset navigation
    polylines.forEach(p => map.removeLayer(p));
    polylines = [];
    stepElements = [];
    currentRouteData = null;
    currentRoutePolyline = null;
    if (isNavigating) stopNavigation();
    
    // Remove old destination marker
    map.eachLayer(layer => {
      if (layer.options?.icon?.options?.className === 'destination-marker') {
        map.removeLayer(layer);
      }
    });

    routes.forEach((route, idx) => {
      // Route header with enhanced styling
      const header = document.createElement('div');
      header.className = 'route-header';
      header.innerHTML = `
        <h4 class="route-title">
          <span class="route-badge">${idx === 0 ? '⭐ Recommended' : `Route ${idx + 1}`}</span>
          <span class="route-distance">${route.total_distance}</span>
          <span class="route-duration">Est. ${route.traffic_adjusted_duration || route.total_duration}</span>
        </h4>
      `;
      resultDiv.appendChild(header);

      // Directions list with step highlighting support
      const ul = document.createElement('ul');
      ul.className = 'directions-list';
      ul.id = `directions-list-${idx}`;
      
      route.details.forEach((step, stepIdx) => {
        const li = document.createElement('li');
        li.className = 'direction-step';
        li.dataset.stepIndex = stepIdx;
        li.innerHTML = `
          <div class="step-indicator">
            <span class="step-number-badge">${stepIdx + 1}</span>
          </div>
          <div class="step-content">
            <span class="step-instruction">${step.instruction}</span>
            <span class="step-meta">${step.distance} • ${step.duration}</span>
          </div>
        `;
        ul.appendChild(li);
        
        // Store step elements for first route (the one we navigate)
        if (idx === 0) {
          stepElements.push(li);
        }
      });
      resultDiv.appendChild(ul);

      if (route.geometry) {
        const decoded = polyline.decode(route.geometry);
        const polylineLayer = L.polyline(decoded, {
          color: idx === 0 ? '#0066cc' : '#94a3b8',
          weight: idx === 0 ? 6 : 4,
          opacity: idx === 0 ? 1 : 0.6,
        }).addTo(map);
        polylines.push(polylineLayer);
        
        // Store first route data for navigation
        if (idx === 0) {
          currentRouteData = route;
          currentRoutePolyline = polylineLayer;
          map.fitBounds(polylineLayer.getBounds(), { padding: [50, 50] });
          
          // Add destination marker
          const lastPoint = decoded[decoded.length - 1];
          L.marker(lastPoint, { icon: destinationIcon }).addTo(map);
        }
      }
    });
    
    // Add navigation controls after results
    const navControls = document.createElement('div');
    navControls.id = 'nav-controls-container';
    navControls.innerHTML = `
      <div class="nav-controls-wrapper">
        <button id="start-nav-btn" type="button" onclick="startNavigation()" class="nav-btn start-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Start Navigation
        </button>
        <button id="stop-nav-btn" type="button" onclick="stopNavigation()" class="nav-btn stop-btn hidden">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          Stop Navigation
        </button>
        <label class="voice-toggle">
          <input type="checkbox" id="voice-nav-toggle" onchange="localStorage.setItem('voiceNavigation', this.checked)">
          <span>🔊 Voice</span>
        </label>
      </div>
      <div id="nav-controls" class="nav-status-bar">
        <div id="nav-status"></div>
      </div>
    `;
    resultDiv.appendChild(navControls);
    
    // Restore voice preference
    const voiceToggle = document.getElementById('voice-nav-toggle');
    if (voiceToggle && localStorage.getItem('voiceNavigation') === 'true') {
      voiceToggle.checked = true;
    }
  } catch (error) {
    console.error('Route fetch error:', error);
    alert('An error occurred while fetching routes.');
  }
});














