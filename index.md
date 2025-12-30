---
layout: base
title: Home Page
search_exclude: true
nav: true
hide: true
menu: nav/home.html
---


<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SD Auto - Smart City Navigation | City of San Diego</title>

  <!-- External Stylesheets -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />

  <!-- Page Styles -->
  <style>
    /* Hero gradient overlay */
    .hero-gradient {
      background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(0, 102, 204, 0.05) 100%);
    }

    #map {
      height: 450px;
      margin-top: 20px;
      border-radius: 24px;
      border: none;
      box-shadow: 0 25px 50px -12px rgba(0, 102, 204, 0.15);
      overflow: hidden;
    }

    .feature-card {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    lottie-player {
      width: 100%;
      height: 400px;
      filter: drop-shadow(0 25px 50px rgba(0, 102, 204, 0.2));
    }

    /* Stats counter animation */
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .stat-item {
      animation: countUp 0.6s ease-out forwards;
    }

    .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stat-item:nth-child(3) { animation-delay: 0.3s; }
    .stat-item:nth-child(4) { animation-delay: 0.4s; }

    /* Feature icon hover */
    .feature-icon {
      transition: all 0.3s ease;
    }

    .feature-card:hover .feature-icon {
      transform: scale(1.1) rotate(5deg);
    }

    /* Smooth scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  </style>

  <!-- External Scripts -->
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</head>

<body>

  <main class="relative overflow-hidden">

    <!-- Hero Section -->
    <section class="relative hero-gradient py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left space-y-8 animate-fade-in">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Official City of San Diego Initiative
            </div>

            <!-- Main Heading -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span class="text-slate-900 dark:text-white">Navigate Smarter with</span>
              <br>
              <span class="gradient-text">SD Auto</span>
            </h1>

            <!-- Description -->
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real-time traffic intelligence, optimized routing, and smart navigation designed for San Diego's streets. Built for efficiency, driven by data.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="{{site.baseurl}}/route/" class="group inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-base shadow-large">
                <span>Find Best Route</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="{{site.baseurl}}/Readme4yml/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-2xl font-semibold text-base transition-all hover:shadow-medium">
                <span>Learn More</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>

            <!-- Trust Indicators -->
            <div class="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Real-time Data</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
            </div>
          </div>

          <!-- Lottie Animation -->
          <div class="flex-1 w-full max-w-lg lg:max-w-xl animate-slide-up">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_kyu7xb1v.json"
              background="transparent"
              speed="1"
              loop
              autoplay>
            </lottie-player>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions Menu -->
    <section class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="{{site.baseurl}}/route/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Find Best Route</span>
          </a>
          <a href="{{site.baseurl}}/routine/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-accent-500 dark:hover:border-accent-500 transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Daily Routine</span>
          </a>
          <a href="{{site.baseurl}}/hazard/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-warning dark:hover:border-warning transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Report Hazard</span>
          </a>
          <a href="{{site.baseurl}}/localbusinesses/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-success dark:hover:border-success transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Local Businesses</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Built for San Diego
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Powered by real traffic data from the City of San Diego's open data portal
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">Real-Time</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Traffic Updates</p>
          </div>

          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/50 dark:to-accent-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">Secure</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Data Protected</p>
          </div>

          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">Citywide</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Coverage</p>
          </div>

          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">24/7</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Availability</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 lg:py-24 bg-gradient-to-b from-transparent via-primary-50/50 to-transparent dark:via-primary-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Core Features
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need for<br>Smarter Navigation
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Comprehensive tools designed to make your daily commute and travel around San Diego more efficient
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Traffic-Aware Routing</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Routes dynamically adjusted using real traffic data from San Diego's open data portal for accurate ETAs.</p>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Favorite Locations</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Save and quickly access your frequently visited places for faster route planning and navigation.</p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Daily Routine Planner</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Plan your entire day with optimized routes between multiple destinations.</p>
          </div>

          <!-- Feature 4 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Hazard Reporting</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Report road hazards and help keep San Diego's streets safe for everyone.</p>
          </div>

          <!-- Feature 5 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Local Business Discovery</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Discover and support local San Diego businesses along your routes.</p>
          </div>

          <!-- Feature 6 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Modal Transport</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Support for driving, walking, bicycling, and public transit options.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Map Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your Location in San Diego
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Interactive map showing your current location. Enable location services to see real-time positioning.
          </p>
        </div>
        <div class="relative">
          <div id="map" class="w-full"></div>
          <!-- Map overlay badge -->
          <div class="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Live Location</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 rounded-4xl p-8 sm:p-12 lg:p-16 text-center shadow-large">
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <div class="relative z-10">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Navigate Smarter?
            </h2>
            <p class="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of San Diegans using SD Auto for their daily commute. Start optimizing your routes today.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="{{site.baseurl}}/login/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <span>Get Started Free</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- JavaScript -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const map = L.map('map');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([latitude, longitude]).addTo(map)
              .bindPopup('You are here!')
              .openPopup();
          },
          () => {
            alert('Location access denied. Defaulting to Paris.');
            // Optionally set a fallback location here
          },
          { enableHighAccuracy: true }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    });
  </script>

</body>
</html>
