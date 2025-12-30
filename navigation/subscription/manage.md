---
layout: base
title: Manage Subscription
permalink: /subscription/manage
search_exclude: true
menu: nav/home.html
---

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-2xl mx-auto">
    
    <!-- Loading State -->
    <div id="loading-state" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
      <p class="text-gray-400">Loading subscription...</p>
    </div>
    
    <!-- Main Content -->
    <div id="main-content" class="hidden">
      <!-- Header -->
      <div class="mb-8">
        <a href="{{site.baseurl}}/" class="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </a>
        <h1 class="text-3xl font-bold text-white">Manage Subscription</h1>
        <p class="text-gray-400 mt-2">View and manage your subscription status</p>
      </div>
      
      <!-- Current Plan Card -->
      <div id="plan-card" class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-white">Current Plan</h2>
          <span id="status-badge" class="px-3 py-1 rounded-full text-sm font-medium">Active</span>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p id="plan-name" class="text-2xl font-bold text-white">Free</p>
            <p id="plan-description" class="text-gray-400">Basic features</p>
          </div>
          <div class="text-right">
            <p id="plan-price" class="text-3xl font-bold text-white">$0</p>
            <p id="billing-cycle" class="text-gray-400">/month</p>
          </div>
        </div>
      </div>
      
      <!-- Pending Payment Notice -->
      <div id="pending-notice" class="hidden bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6">
        <div class="flex items-start">
          <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-yellow-400">Payment Pending Verification</h3>
            <p class="text-yellow-200/70 mt-1">Your payment is being reviewed. You'll receive full access within 24 hours.</p>
            <div class="mt-3 text-sm text-yellow-200/50">
              <p>Plan requested: <span id="pending-plan" class="font-semibold text-yellow-300">Plus</span></p>
              <p>Amount: <span id="pending-amount" class="font-semibold text-yellow-300">$4.99</span></p>
              <p>Submitted: <span id="pending-date" class="font-semibold text-yellow-300">Today</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Admin Notice -->
      <div id="admin-notice" class="hidden bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 mb-6">
        <div class="flex items-start">
          <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-purple-400">Admin Access</h3>
            <p class="text-purple-200/70 mt-1">You have full admin access to all features.</p>
            <a href="{{site.baseurl}}/subscription/admin" class="inline-block mt-3 text-purple-400 hover:text-purple-300 font-semibold">
              → Manage User Subscriptions
            </a>
          </div>
        </div>
      </div>
      
      <!-- Features List -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <h3 class="text-lg font-bold text-white mb-4">Your Features</h3>
        <ul id="features-list" class="space-y-3">
          <!-- Populated by JS -->
        </ul>
      </div>
      
      <!-- Payment History -->
      <div id="history-section" class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <h3 class="text-lg font-bold text-white mb-4">Payment History</h3>
        <div id="payment-history" class="space-y-3">
          <p class="text-gray-500 text-center py-4">No payment history</p>
        </div>
      </div>
      
      <!-- Actions -->
      <div id="actions-section" class="space-y-3">
        <!-- Upgrade Button (for free users) -->
        <a id="upgrade-btn" href="{{site.baseurl}}/pricing" class="hidden w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-center transition-all duration-300 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 block">
          Upgrade Your Plan
        </a>
        
        <!-- Cancel Button (for paid users) -->
        <button id="cancel-btn" class="hidden w-full py-4 px-6 rounded-xl bg-gray-700 text-gray-300 font-semibold transition-all duration-300 hover:bg-gray-600">
          Cancel Subscription
        </button>
      </div>
    </div>
    
    <!-- Not Logged In -->
    <div id="login-required" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Login Required</h2>
      <p class="text-gray-400 mb-8">Please login to manage your subscription.</p>
      <a href="{{site.baseurl}}/login" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold">
        Login
      </a>
    </div>
  </div>
</div>

<!-- Cancel Modal -->
<div id="cancel-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
  <div class="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
    <h3 class="text-xl font-bold text-white mb-4">Cancel Subscription?</h3>
    <p class="text-gray-400 mb-6">Your subscription will remain active until the end of the current billing period. You can resubscribe anytime.</p>
    <div class="flex space-x-3">
      <button onclick="closeModal()" class="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
        Keep Subscription
      </button>
      <button onclick="confirmCancel()" class="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
        Yes, Cancel
      </button>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  const FEATURES = {
    free: [
      { name: 'Basic traffic information', included: true },
      { name: 'Standard route planning', included: true },
      { name: 'Daily routines', included: false },
      { name: 'Saved locations', included: false },
      { name: 'AI predictions', included: false }
    ],
    plus: [
      { name: 'Basic traffic information', included: true },
      { name: 'Standard route planning', included: true },
      { name: 'Daily routines', included: true },
      { name: 'Up to 10 saved locations', included: true },
      { name: 'AI predictions', included: false }
    ],
    pro: [
      { name: 'Basic traffic information', included: true },
      { name: 'Standard route planning', included: true },
      { name: 'Daily routines', included: true },
      { name: 'Unlimited saved locations', included: true },
      { name: 'AI predictions', included: true },
      { name: 'Priority support', included: true }
    ],
    admin: [
      { name: 'All features unlocked', included: true },
      { name: 'Admin dashboard access', included: true },
      { name: 'User management', included: true },
      { name: 'Payment verification', included: true }
    ]
  };
  
  let currentUser = null;
  let subscription = null;
  
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Check login
      const userResponse = await fetch(`${pythonURI}/api/user`, fetchOptions);
      if (!userResponse.ok) {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('login-required').classList.remove('hidden');
        return;
      }
      
      currentUser = await userResponse.json();
      
      // Check if admin
      if (currentUser.role === 'Admin') {
        showAdminView();
        return;
      }
      
      // Fetch subscription
      try {
        const subResponse = await fetch(`${pythonURI}/api/subscription`, fetchOptions);
        if (subResponse.ok) {
          subscription = await subResponse.json();
        }
      } catch (e) {
        console.log('No subscription');
      }
      
      renderSubscription();
      
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  function showAdminView() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('admin-notice').classList.remove('hidden');
    
    document.getElementById('plan-name').textContent = 'Admin';
    document.getElementById('plan-description').textContent = 'Full access to all features';
    document.getElementById('plan-price').textContent = '∞';
    document.getElementById('billing-cycle').textContent = '';
    document.getElementById('status-badge').textContent = 'Admin';
    document.getElementById('status-badge').className = 'px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400';
    
    renderFeatures('admin');
    document.getElementById('history-section').classList.add('hidden');
  }
  
  function renderSubscription() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    const tier = subscription?.tier || 'free';
    const status = subscription?.status || 'active';
    
    // Plan info
    const planNames = { free: 'Free', plus: 'Plus', pro: 'Pro' };
    const planPrices = { free: '$0', plus: '$4.99', pro: '$9.99' };
    const planDescs = { 
      free: 'Basic features', 
      plus: 'Enhanced features', 
      pro: 'All features unlocked' 
    };
    
    document.getElementById('plan-name').textContent = planNames[tier] || 'Free';
    document.getElementById('plan-description').textContent = planDescs[tier] || 'Basic features';
    document.getElementById('plan-price').textContent = planPrices[tier] || '$0';
    document.getElementById('billing-cycle').textContent = subscription?.billing_interval === 'yearly' ? '/year' : '/month';
    
    // Status badge
    const badge = document.getElementById('status-badge');
    if (status === 'pending') {
      badge.textContent = 'Pending';
      badge.className = 'px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400';
      document.getElementById('pending-notice').classList.remove('hidden');
      document.getElementById('pending-plan').textContent = planNames[subscription?.requested_tier || tier];
      document.getElementById('pending-amount').textContent = `$${subscription?.pending_amount || '0'}`;
      document.getElementById('pending-date').textContent = subscription?.request_date || 'Recently';
    } else if (status === 'active' && tier !== 'free') {
      badge.textContent = 'Active';
      badge.className = 'px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400';
    } else {
      badge.textContent = 'Free';
      badge.className = 'px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-400';
    }
    
    // Features
    renderFeatures(tier);
    
    // Actions
    if (tier === 'free' && status !== 'pending') {
      document.getElementById('upgrade-btn').classList.remove('hidden');
    } else if (tier !== 'free' && status === 'active') {
      document.getElementById('cancel-btn').classList.remove('hidden');
    }
    
    // Payment history
    renderHistory();
  }
  
  function renderFeatures(tier) {
    const list = document.getElementById('features-list');
    const features = FEATURES[tier] || FEATURES.free;
    
    list.innerHTML = features.map(f => `
      <li class="flex items-center">
        ${f.included 
          ? '<svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
          : '<svg class="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
        }
        <span class="${f.included ? 'text-gray-300' : 'text-gray-600'}">${f.name}</span>
      </li>
    `).join('');
  }
  
  async function renderHistory() {
    try {
      const response = await fetch(`${pythonURI}/api/subscription/history`, fetchOptions);
      if (response.ok) {
        const history = await response.json();
        if (history.length > 0) {
          document.getElementById('payment-history').innerHTML = history.map(p => `
            <div class="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div>
                <p class="text-white font-medium">${p.description}</p>
                <p class="text-gray-500 text-sm">${p.date}</p>
              </div>
              <div class="text-right">
                <p class="text-white font-semibold">$${(p.amount / 100).toFixed(2)}</p>
                <span class="text-xs px-2 py-1 rounded-full ${p.status === 'paid' ? 'bg-green-500/20 text-green-400' : p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}">${p.status}</span>
              </div>
            </div>
          `).join('');
        }
      }
    } catch (e) {
      console.log('No history');
    }
  }
  
  // Cancel functionality
  document.getElementById('cancel-btn')?.addEventListener('click', () => {
    document.getElementById('cancel-modal').classList.remove('hidden');
  });
  
  window.closeModal = function() {
    document.getElementById('cancel-modal').classList.add('hidden');
  };
  
  window.confirmCancel = async function() {
    try {
      const response = await fetch(`${pythonURI}/api/stripe/cancel`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ immediate: false })  // Cancel at end of billing period
      });
      
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to cancel. Please try again.');
      }
    } catch (e) {
      alert('Error cancelling subscription.');
    }
    closeModal();
  };
</script>
