/**
 * Subscription Utility Module
 * Handles subscription status checking for Zelle-based payment system
 */

import { pythonURI, fetchOptions } from './config.js';

// Tier hierarchy for access checks
const TIER_LEVELS = {
  'free': 0,
  'plus': 1,
  'pro': 2,
  'admin': 3
};

// Feature access by tier
export const TIER_FEATURES = {
  free: {
    findBestRoute: true,  // Limited to 4/day
    basicTraffic: false,
    routePlanning: false,
    dailyRoutines: false,
    savedLocations: false,
    favoriteLocations: false,
    aiPredictions: false,
    prioritySupport: false
  },
  plus: {
    findBestRoute: true,  // 50/day
    basicTraffic: true,
    routePlanning: true,
    dailyRoutines: true,
    savedLocations: true,  // Limited to 10
    favoriteLocations: true,
    aiPredictions: false,
    prioritySupport: false
  },
  pro: {
    findBestRoute: true,  // Unlimited
    basicTraffic: true,
    routePlanning: true,
    dailyRoutines: true,
    savedLocations: true,  // Unlimited
    favoriteLocations: true,
    aiPredictions: true,
    prioritySupport: true
  },
  admin: {
    findBestRoute: true,
    basicTraffic: true,
    routePlanning: true,
    dailyRoutines: true,
    savedLocations: true,
    favoriteLocations: true,
    aiPredictions: true,
    prioritySupport: true,
    adminPanel: true
  }
};

// Limits by tier
export const TIER_LIMITS = {
  free: {
    savedLocations: 0,
    routesPerDay: 4
  },
  plus: {
    savedLocations: 10,
    routesPerDay: 50
  },
  pro: {
    savedLocations: Infinity,
    routesPerDay: Infinity
  },
  admin: {
    savedLocations: Infinity,
    routesPerDay: Infinity
  }
};

// Cache for subscription data
let subscriptionCache = null;
let cacheExpiry = null;
const CACHE_DURATION = 60000; // 1 minute

/**
 * Clear the subscription cache
 */
export function clearSubscriptionCache() {
  subscriptionCache = null;
  cacheExpiry = null;
}

/**
 * Get the current user's subscription data
 * @returns {Promise<Object|null>} Subscription object or null if not logged in
 */
export async function getSubscription() {
  // Return cached data if still valid
  if (subscriptionCache && cacheExpiry && Date.now() < cacheExpiry) {
    return subscriptionCache;
  }
  
  try {
    // First check if user is logged in
    const userResponse = await fetch(`${pythonURI}/api/user`, fetchOptions);
    if (!userResponse.ok) {
      return null;
    }
    
    const userData = await userResponse.json();
    
    // Check if user is admin
    if (userData.role === 'Admin') {
      subscriptionCache = {
        tier: 'admin',
        status: 'active',
        user: userData
      };
      cacheExpiry = Date.now() + CACHE_DURATION;
      return subscriptionCache;
    }
    
    // Fetch subscription data
    const subResponse = await fetch(`${pythonURI}/api/subscription`, fetchOptions);
    
    if (subResponse.ok) {
      subscriptionCache = await subResponse.json();
      subscriptionCache.user = userData;
    } else {
      // Default to free tier if no subscription
      subscriptionCache = {
        tier: 'free',
        status: 'active',
        user: userData
      };
    }
    
    cacheExpiry = Date.now() + CACHE_DURATION;
    return subscriptionCache;
    
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

/**
 * Get the current user's tier
 * @returns {Promise<string>} The user's tier ('free', 'plus', 'pro', or 'admin')
 */
export async function getUserTier() {
  const subscription = await getSubscription();
  
  if (!subscription) {
    return 'free'; // Not logged in = free tier
  }
  
  // If pending, treat as free until approved
  if (subscription.status === 'pending') {
    return 'free';
  }
  
  return subscription.tier || 'free';
}

/**
 * Check if user is logged in
 * @returns {Promise<boolean>}
 */
export async function isLoggedIn() {
  const subscription = await getSubscription();
  return subscription !== null;
}

/**
 * Check if user is an admin
 * @returns {Promise<boolean>}
 */
export async function isAdmin() {
  const subscription = await getSubscription();
  return subscription?.tier === 'admin' || subscription?.user?.role === 'Admin';
}

/**
 * Check if subscription is pending approval
 * @returns {Promise<boolean>}
 */
export async function isPending() {
  const subscription = await getSubscription();
  return subscription?.status === 'pending';
}

/**
 * Check if user has access to a specific tier level
 * @param {string} requiredTier - The minimum tier required ('free', 'plus', 'pro')
 * @returns {Promise<boolean>}
 */
export async function hasAccess(requiredTier) {
  const userTier = await getUserTier();
  const userLevel = TIER_LEVELS[userTier] || 0;
  const requiredLevel = TIER_LEVELS[requiredTier] || 0;
  
  return userLevel >= requiredLevel;
}

/**
 * Check if user has access to a specific feature
 * @param {string} feature - The feature to check
 * @returns {Promise<boolean>}
 */
export async function hasFeature(feature) {
  const userTier = await getUserTier();
  return TIER_FEATURES[userTier]?.[feature] || false;
}

/**
 * Get the limit for a specific resource
 * @param {string} resource - The resource to check (e.g., 'savedLocations')
 * @returns {Promise<number>}
 */
export async function getLimit(resource) {
  const userTier = await getUserTier();
  return TIER_LIMITS[userTier]?.[resource] || 0;
}

/**
 * Require a minimum tier to access content, redirect to upgrade page if not met
 * @param {string} requiredTier - The minimum tier required
 * @param {string} redirectUrl - URL to redirect to if requirement not met
 * @returns {Promise<boolean>}
 */
export async function requireTier(requiredTier, redirectUrl = '/subscription/pricing') {
  const hasRequiredAccess = await hasAccess(requiredTier);
  
  if (!hasRequiredAccess) {
    const baseUrl = document.querySelector('meta[name="baseurl"]')?.content || '';
    window.location.href = baseUrl + redirectUrl;
    return false;
  }
  
  return true;
}

/**
 * Show upgrade prompt if user doesn't have required tier
 * @param {string} requiredTier - The minimum tier required
 * @param {string} featureName - Name of the feature for the prompt
 * @returns {Promise<boolean>} - True if user has access, false otherwise
 */
export async function checkAccessWithPrompt(requiredTier, featureName) {
  const hasRequiredAccess = await hasAccess(requiredTier);
  
  if (!hasRequiredAccess) {
    const tierNames = { plus: 'Plus', pro: 'Pro' };
    const tierName = tierNames[requiredTier] || requiredTier;
    
    if (confirm(`${featureName} requires a ${tierName} subscription. Would you like to upgrade?`)) {
      const baseUrl = document.querySelector('meta[name="baseurl"]')?.content || '';
      window.location.href = `${baseUrl}/subscription/pricing`;
    }
    return false;
  }
  
  return true;
}

/**
 * Submit a subscription request (for Zelle payment)
 * @param {Object} data - Request data { plan, billing_interval, zelle_name, email, amount }
 * @returns {Promise<Object>}
 */
export async function submitSubscriptionRequest(data) {
  const response = await fetch(`${pythonURI}/api/subscription/request`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit request');
  }
  
  // Clear cache so next check gets fresh data
  clearSubscriptionCache();
  
  return await response.json();
}

/**
 * Cancel subscription
 * @returns {Promise<Object>}
 */
export async function cancelSubscription() {
  const response = await fetch(`${pythonURI}/api/subscription/cancel`, {
    ...fetchOptions,
    method: 'POST'
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to cancel subscription');
  }
  
  clearSubscriptionCache();
  return await response.json();
}

// Export default object for convenience
export default {
  getSubscription,
  getUserTier,
  isLoggedIn,
  isAdmin,
  isPending,
  hasAccess,
  hasFeature,
  getLimit,
  requireTier,
  checkAccessWithPrompt,
  submitSubscriptionRequest,
  cancelSubscription,
  clearSubscriptionCache,
  TIER_FEATURES,
  TIER_LIMITS,
  TIER_LEVELS
};
