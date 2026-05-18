---
layout: base
title: Login
permalink: /login
search_exclude: true
---

<style>
  #account-access .account-lead-title {
    color: #f8fafc;
  }
</style>

<section id="account-access" class="mx-auto max-w-6xl">
  <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
    <aside class="rounded-[2.25rem] border border-primary-900/20 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 p-8 text-white shadow-large lg:p-10">
      <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
        SD Auto Access
      </span>
      <h1 class="account-lead-title mt-6 max-w-md text-4xl sm:text-5xl">Access Your Routing Workspace</h1>
      <p class="mt-6 max-w-lg text-base leading-8 text-slate-200">
        Sign in to manage saved routes, account preferences, and premium access. New users can create an account in less than a minute.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p class="text-sm font-semibold text-white">Saved Preferences</p>
          <p class="mt-2 text-sm leading-7 text-slate-200">Keep your account profile, saved destinations, and commute settings in one place.</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p class="text-sm font-semibold text-white">Premium Features</p>
          <p class="mt-2 text-sm leading-7 text-slate-200">Unlock multi-stop planning, favorites, and subscriber-only workflow tools after sign in.</p>
        </div>
      </div>

      <div class="mt-10 rounded-[1.75rem] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Account Security</p>
        <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-200">
          <li>Use the same credentials across profile, subscriptions, and saved route history.</li>
          <li>Account creation is free, and you can upgrade later if you need premium routing features.</li>
        </ul>
      </div>
    </aside>

    <div class="grid gap-6 md:grid-cols-2">
      <section class="rounded-[2rem] border border-slate-200/70 bg-white/85 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/75">
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Returning User</p>
          <h2 class="text-3xl">Sign In</h2>
          <p class="text-sm leading-7 text-slate-600 dark:text-slate-300">Access your personalized routing workspace and account settings.</p>
        </div>

        <form id="pythonForm" onsubmit="pythonLogin(); return false;" class="mt-8 space-y-5">
          <div>
            <label for="uid" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
            <input type="text" id="uid" name="uid" required autocomplete="username"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" id="password" name="password" required autocomplete="current-password"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <p id="message" class="min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
          <button type="submit"
            class="w-full rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-large">
            Sign In
          </button>
        </form>
      </section>

      <section class="rounded-[2rem] border border-slate-200/70 bg-white/85 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/75">
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">New Account</p>
          <h2 class="text-3xl">Create Your Profile</h2>
          <p class="text-sm leading-7 text-slate-600 dark:text-slate-300">Start with a free account, then upgrade only if you need premium features.</p>
        </div>

        <form id="signupForm" onsubmit="signup(); return false;" class="mt-8 space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input type="text" id="name" name="name" required autocomplete="name"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <div>
            <label for="signupUid" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
            <input type="text" id="signupUid" name="signupUid" required autocomplete="username"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <div>
            <label for="signupPassword" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" id="signupPassword" name="signupPassword" required autocomplete="new-password"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <p id="signupMessage" class="min-h-5 text-sm font-medium text-emerald-600 dark:text-emerald-400"></p>
          <button type="submit"
            class="w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-medium transition duration-300 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-large dark:border-slate-700 dark:bg-primary-600 dark:hover:bg-primary-500">
            Create Account
          </button>
        </form>
      </section>
    </div>
  </div>
</section>

<script type="module">
  import { login, pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  window.pythonLogin = function() {
    const options = {
      URL: `${pythonURI}/api/authenticate`,
      callback: pythonDatabase,
      message: "message",
      method: "POST",
      cache: "no-cache",
      body: {
        uid: document.getElementById("uid").value,
        password: document.getElementById("password").value,
      }
    };
    login(options);
  }

  window.signup = function() {
    const signupButton = document.querySelector("#signupForm button");
    signupButton.disabled = true;
    signupButton.style.backgroundColor = '#d3d3d3';

    const signupOptions = {
      URL: `${pythonURI}/api/user`,
      method: "POST",
      cache: "no-cache",
      body: {
        name: document.getElementById("name").value,
        uid: document.getElementById("signupUid").value,
        password: document.getElementById("signupPassword").value,
      }
    };

    fetch(signupOptions.URL, {
      method: signupOptions.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupOptions.body)
    })
    .then(response => {
      if (!response.ok) throw new Error(`Signup failed: ${response.status}`);
      return response.json();
    })
    .then(() => {
      document.getElementById("signupMessage").textContent = "Signup successful!";
    })
    .catch(error => {
      document.getElementById("signupMessage").textContent = `Signup Error: ${error.message}`;
      signupButton.disabled = false;
      signupButton.style.backgroundColor = '';
    });
  }

  function pythonDatabase() {
    fetch(`${pythonURI}/api/user`, fetchOptions)
      .then(response => {
        if (!response.ok) throw new Error(`Flask server response: ${response.status}`);
        return response.json();
      })
      .then(() => {
        window.location.href = '{{site.baseurl}}/profile';
      })
      .catch(error => {
        document.getElementById("message").textContent = `Login Error: ${error.message}`;
      });
  }

  document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = document.cookie.includes('auth_token');
    if (isAuthenticated) {
      pythonDatabase();
    }
  });
</script>
