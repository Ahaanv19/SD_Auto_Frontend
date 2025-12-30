---
layout: base
title: Login
permalink: /login
search_exclude: true
---

<main class="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">

  <!-- Background Glow Blob -->
  <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-300 dark:bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>

  <!-- Login & Signup Forms -->
  <div class="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center items-stretch">
    
    <!-- Login Form -->
    <div class="flex-1 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">User Login</h2>
      <form id="pythonForm" onsubmit="pythonLogin(); return false;" class="space-y-6">
        <div>
          <label for="uid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input type="text" id="uid" name="uid" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" id="password" name="password" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <p id="message" class="text-sm text-red-500 font-medium"></p>
        <button type="submit"
          class="w-full py-2 px-4 bg-primary hover:bg-secondary text-black font-semibold rounded-lg shadow-md transition transform hover:scale-105 duration-300">
          Login 🚀
        </button>
      </form>
    </div>

    <!-- Signup Form -->
    <div class="flex-1 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">Sign Up: Create an Account for Free!</h2>
      <form id="signupForm" onsubmit="signup(); return false;" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input type="text" id="name" name="name" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <div>
          <label for="signupUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input type="text" id="signupUid" name="signupUid" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <div>
          <label for="signupPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" id="signupPassword" name="signupPassword" required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition" />
        </div>
        <p id="signupMessage" class="text-sm text-green-500 font-medium"></p>
        <button type="submit"
          class="w-full py-2 px-4 bg-primary hover:bg-secondary text-black font-semibold rounded-lg shadow-md transition transform hover:scale-105 duration-300">
          Sign Up 📝
        </button>
      </form>
    </div>
  </div>
</main>

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

  window.onload = function() {
    const isAuthenticated = document.cookie.includes('auth_token');
    if (isAuthenticated) {
      pythonDatabase();
    }
  };
</script>
