---
layout: base
title: Checkout
permalink: /subscription/checkout
search_exclude: true
menu: nav/home.html
---

<div id="checkout-container" class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto">
    
    <!-- Loading State -->
    <div id="loading-state" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
      <p class="text-gray-400">Loading...</p>
    </div>
    
    <!-- Checkout Content -->
    <div id="checkout-content" class="hidden">
      <!-- Back Button -->
      <a href="{{site.baseurl}}/subscription/pricing" class="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Plans
      </a>
      
      <!-- Order Summary -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <h2 class="text-xl font-bold text-white mb-4">Order Summary</h2>
        <div class="flex items-center justify-between py-4 border-b border-gray-700">
          <div>
            <p id="plan-name" class="text-white font-semibold">Plus Plan</p>
            <p id="billing-type" class="text-gray-400 text-sm">Monthly billing</p>
          </div>
          <p id="plan-price" class="text-2xl font-bold text-white">$4.99</p>
        </div>
        <div class="flex items-center justify-between pt-4">
          <p class="text-gray-400">Total Due Now</p>
          <p id="total-price" class="text-2xl font-bold text-green-400">$4.99</p>
        </div>
      </div>
      
      <!-- Zelle Payment Instructions -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Pay with Zelle</h2>
            <p class="text-gray-400 text-sm">Fast & secure bank transfer</p>
          </div>
        </div>
        
        <div class="bg-gray-700/50 rounded-xl p-4 mb-4">
          <p class="text-gray-300 text-sm mb-3">Send payment to:</p>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div>
                <p class="text-gray-400 text-xs">Phone Number</p>
                <p class="text-white font-mono font-semibold">858-205-9428</p>
              </div>
              <button onclick="copyToClipboard('858-205-9428', this)" class="text-green-400 hover:text-green-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div>
                <p class="text-gray-400 text-xs">Email</p>
                <p class="text-white font-mono font-semibold">ahaanvk@gmail.com</p>
              </div>
              <button onclick="copyToClipboard('ahaanvk@gmail.com', this)" class="text-green-400 hover:text-green-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="text-yellow-400 font-semibold text-sm">Important: Include Your Username</p>
              <p class="text-yellow-200/70 text-sm mt-1">In the Zelle memo/note, include your username: <span id="user-username" class="font-mono font-bold text-yellow-300">[loading...]</span></p>
            </div>
          </div>
        </div>
        
        <div class="text-gray-400 text-sm space-y-2">
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Open your bank app and select Zelle
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Send <span id="amount-instruction" class="font-semibold text-white mx-1">$4.99</span> to the number or email above
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Include your username in the memo
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Click "I've Sent Payment" below
          </p>
        </div>
      </div>
      
      <!-- Confirmation Form -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
        <h3 class="text-lg font-bold text-white mb-4">Confirm Your Payment</h3>
        
        <form id="payment-form">
          <div class="mb-4">
            <label for="zelle-name" class="block text-gray-300 text-sm font-medium mb-2">Name Used on Zelle</label>
            <input type="text" id="zelle-name" placeholder="John Doe" required
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors">
          </div>
          
          <div class="mb-4">
            <label for="zelle-email" class="block text-gray-300 text-sm font-medium mb-2">Your Email (for confirmation)</label>
            <input type="email" id="zelle-email" placeholder="john@example.com" required
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors">
          </div>
          
          <div class="mb-6">
            <label class="flex items-start cursor-pointer">
              <input type="checkbox" id="payment-sent" required class="mt-1 mr-3 h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500">
              <span class="text-gray-400 text-sm">
                I confirm I have sent <span id="confirm-amount" class="font-semibold text-white">$4.99</span> via Zelle with my username in the memo
              </span>
            </label>
          </div>
          
          <button type="submit" id="submit-btn"
            class="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
            <span id="btn-text">I've Sent Payment</span>
            <span id="btn-loading" class="hidden">
              <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </button>
        </form>
        
        <p class="text-gray-500 text-xs text-center mt-4">
          Your subscription will be activated within 24 hours after payment verification
        </p>
      </div>
    </div>
    
    <!-- Pending State -->
    <div id="pending-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Payment Submitted!</h2>
      <p class="text-gray-400 mb-2">Your payment is being verified.</p>
      <p class="text-gray-500 text-sm mb-8">You'll receive access within 24 hours once confirmed.</p>
      <a href="{{site.baseurl}}/subscription/manage" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold transition-all duration-300 hover:from-gray-700 hover:to-gray-800 mr-3">
        Check Status
      </a>
      <a href="{{site.baseurl}}/" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Go Home
      </a>
    </div>
    
    <!-- Error State -->
    <div id="error-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Something Went Wrong</h2>
      <p id="error-message" class="text-gray-400 mb-8">Please try again or contact support.</p>
      <a href="{{site.baseurl}}/subscription/pricing" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Try Again
      </a>
    </div>
    
    <!-- Not Logged In State -->
    <div id="login-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Login Required</h2>
      <p class="text-gray-400 mb-8">Please login to upgrade your subscription.</p>
      <a href="{{site.baseurl}}/login" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Login
      </a>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  // Pricing
  const PRICES = {
    monthly: { plus: 4.99, pro: 9.99 },
    yearly: { plus: 47.88, pro: 95.88 }
  };
  
  // Get URL params
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'plus';
  const billing = urlParams.get('billing') || 'monthly';
  
  // Elements
  const loadingState = document.getElementById('loading-state');
  const checkoutContent = document.getElementById('checkout-content');
  const pendingState = document.getElementById('pending-state');
  const errorState = document.getElementById('error-state');
  const loginState = document.getElementById('login-state');
  
  let currentUser = null;
  
  // Copy to clipboard
  window.copyToClipboard = function(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
      setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
    });
  };
  
  // Initialize
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Check login
      const userResponse = await fetch(`${pythonURI}/api/user`, fetchOptions);
      if (!userResponse.ok) {
        loadingState.classList.add('hidden');
        loginState.classList.remove('hidden');
        return;
      }
      
      currentUser = await userResponse.json();
      
      // Setup UI
      setupOrderSummary();
      setupForm();
      
      loadingState.classList.add('hidden');
      checkoutContent.classList.remove('hidden');
      
    } catch (error) {
      console.error('Init error:', error);
      showError('Failed to load. Please refresh.');
    }
  });
  
  function setupOrderSummary() {
    const price = PRICES[billing][plan];
    const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1);
    
    document.getElementById('plan-name').textContent = `${planDisplay} Plan`;
    document.getElementById('billing-type').textContent = billing === 'yearly' ? 'Yearly billing (20% off)' : 'Monthly billing';
    document.getElementById('plan-price').textContent = `$${price.toFixed(2)}`;
    document.getElementById('total-price').textContent = `$${price.toFixed(2)}`;
    document.getElementById('amount-instruction').textContent = `$${price.toFixed(2)}`;
    document.getElementById('confirm-amount').textContent = `$${price.toFixed(2)}`;
    document.getElementById('user-username').textContent = currentUser.uid || currentUser.name || '[your username]';
  }
  
  function setupForm() {
    const form = document.getElementById('payment-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    
    // Pre-fill email if available
    if (currentUser.email) {
      document.getElementById('zelle-email').value = currentUser.email;
    }
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      
      try {
        const response = await fetch(`${pythonURI}/api/subscription/request`, {
          ...fetchOptions,
          method: 'POST',
          body: JSON.stringify({
            plan: plan,
            billing_interval: billing,
            zelle_name: document.getElementById('zelle-name').value,
            email: document.getElementById('zelle-email').value,
            amount: PRICES[billing][plan]
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit request');
        }
        
        // Show pending state
        checkoutContent.classList.add('hidden');
        pendingState.classList.remove('hidden');
        
      } catch (error) {
        console.error('Submit error:', error);
        showError(error.message);
      }
    });
  }
  
  function showError(message) {
    loadingState.classList.add('hidden');
    checkoutContent.classList.add('hidden');
    pendingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
  }
</script>
