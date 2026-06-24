---
layout: base
title: Settings
permalink: /settings
search_exclude: true
---

<style>
  /* ---- Settings page local styles ---- */
  .tab-btn {
    display: flex; align-items: center; gap: 0.625rem;
    width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem;
    font-size: 0.9rem; font-weight: 600; text-align: left;
    transition: all 0.2s ease; cursor: pointer; border: none;
    background: transparent; color: inherit;
  }
  .tab-btn:hover { background: rgba(99,102,241,0.08); }
  .tab-btn.active {
    background: linear-gradient(135deg, #0f5c99, #118a88);
    color: #fff;
    box-shadow: 0 4px 14px -4px rgba(15,92,153,0.45);
  }
  .dark .tab-btn.active { box-shadow: 0 4px 14px -4px rgba(15,92,153,0.7); }
  .section-card {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 1.25rem;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }
  .dark .section-card {
    background: rgba(17,28,47,0.7);
    border-color: rgba(255,255,255,0.08);
  }
  .section-title {
    font-size: 1.05rem; font-weight: 700;
    margin-bottom: 0.25rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .section-subtitle {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 1rem;
  }
  .dark .section-subtitle { color: #94a3b8; }

  /* Theme cards */
  .theme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.75rem; }
  .theme-card {
    border-radius: 0.875rem; overflow: hidden; cursor: pointer;
    border: 2px solid transparent;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    position: relative;
  }
  .theme-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px rgba(0,0,0,0.18); }
  .theme-card.active {
    border-color: #0f5c99;
    box-shadow: 0 0 0 3px rgba(15,92,153,0.2);
  }
  .dark .theme-card.active {
    border-color: #4f8fc4;
    box-shadow: 0 0 0 3px rgba(79,143,196,0.3);
  }
  .theme-card:not(.active) { border-color: #e2e8f0; }
  .dark .theme-card:not(.active) { border-color: rgba(255,255,255,0.12); }
  .theme-swatch { height: 56px; position: relative; }
  .theme-accent-dot {
    position: absolute; bottom: 6px; right: 6px;
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.6);
  }
  .theme-check {
    position: absolute; top: 5px; right: 5px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #0f5c99; display: flex; align-items: center; justify-content: center;
  }
  .theme-info { padding: 0.5rem 0.625rem 0.625rem; background: rgba(248,250,252,0.95); }
  .dark .theme-info { background: rgba(15,23,42,0.95); }
  .theme-name { font-size: 0.78rem; font-weight: 700; line-height: 1.3; }
  .theme-tag { font-size: 0.68rem; color: #94a3b8; margin-top: 1px; }
  .theme-note { font-size: 0.67rem; color: #94a3b8; margin-top: 3px; line-height: 1.4; }

  /* Font pills */
  .pill-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .pill {
    padding: 0.375rem 0.875rem; border-radius: 9999px;
    font-size: 0.8rem; font-weight: 600; cursor: pointer;
    border: 2px solid #e2e8f0; background: transparent;
    transition: all 0.18s ease; color: inherit;
  }
  .dark .pill { border-color: rgba(255,255,255,0.12); }
  .pill:hover { border-color: #0f5c99; color: #0f5c99; }
  .dark .pill:hover { border-color: #4f8fc4; color: #4f8fc4; }
  .pill.active {
    background: linear-gradient(135deg, #0f5c99, #118a88);
    border-color: transparent; color: #fff;
    box-shadow: 0 2px 8px -2px rgba(15,92,153,0.4);
  }

  /* Color picker row */
  .color-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
  .color-row label { font-size: 0.82rem; font-weight: 600; flex: 1; }
  .color-row input[type="color"] {
    width: 36px; height: 36px; border: none; border-radius: 8px; cursor: pointer;
    padding: 2px; background: transparent; outline: 2px solid #e2e8f0;
    transition: outline-color 0.18s;
  }
  .dark .color-row input[type="color"] { outline-color: rgba(255,255,255,0.15); }
  .color-row input[type="color"]:focus { outline-color: #0f5c99; }
  .color-hex { font-size: 0.72rem; font-family: monospace; color: #94a3b8; width: 58px; }

  /* Custom theme name input */
  .name-input {
    width: 100%; padding: 0.5rem 0.875rem;
    border-radius: 0.625rem; border: 2px solid #e2e8f0;
    background: transparent; font-size: 0.875rem; font-weight: 600;
    transition: border-color 0.18s; color: inherit;
    margin-bottom: 1rem;
  }
  .dark .name-input { border-color: rgba(255,255,255,0.12); }
  .name-input:focus { outline: none; border-color: #0f5c99; }

  /* Dark mode toggle in builder */
  .toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .toggle-row label { font-size: 0.82rem; font-weight: 600; }
  .toggle-switch {
    width: 42px; height: 24px; border-radius: 12px;
    background: #e2e8f0; border: none; cursor: pointer; position: relative;
    transition: background 0.2s;
  }
  .dark .toggle-switch { background: rgba(255,255,255,0.15); }
  .toggle-switch.on { background: #0f5c99; }
  .toggle-switch::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #fff; transition: transform 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .toggle-switch.on::after { transform: translateX(18px); }

  /* Live preview */
  .preview-shell {
    border-radius: 1rem; overflow: hidden;
    border: 2px solid #e2e8f0; font-size: 11px;
    box-shadow: 0 8px 24px -8px rgba(0,0,0,0.12);
  }
  .dark .preview-shell { border-color: rgba(255,255,255,0.1); }
  .preview-nav {
    padding: 6px 10px; display: flex; align-items: center;
    justify-content: space-between; font-size: 10px; font-weight: 700;
  }
  .preview-nav-btn {
    padding: 2px 8px; border-radius: 6px; font-size: 9px; font-weight: 700; color: #fff;
  }
  .preview-body { padding: 10px; }
  .preview-heading { font-size: 12px; font-weight: 800; margin-bottom: 4px; }
  .preview-text { font-size: 10px; margin-bottom: 8px; opacity: 0.75; }
  .preview-card { padding: 8px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.08); }
  .preview-card-text { font-size: 9px; margin-bottom: 6px; opacity: 0.8; }
  .preview-btn { padding: 3px 8px; border-radius: 5px; font-size: 9px; font-weight: 700; color: #fff; display: inline-block; }

  /* Save button */
  .save-btn {
    width: 100%; margin-top: 1rem; padding: 0.65rem 1.25rem;
    background: linear-gradient(135deg, #0f5c99, #118a88);
    color: #fff; border: none; border-radius: 0.75rem;
    font-size: 0.875rem; font-weight: 700; cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }
  .save-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .save-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* Custom theme cards */
  .custom-card {
    border-radius: 0.875rem; overflow: hidden; cursor: pointer;
    border: 2px solid #e2e8f0; transition: all 0.2s; position: relative;
  }
  .dark .custom-card { border-color: rgba(255,255,255,0.12); }
  .custom-card:hover { transform: translateY(-2px); }
  .custom-card.active { border-color: #0f5c99; box-shadow: 0 0 0 3px rgba(15,92,153,0.2); }
  .custom-card-actions {
    position: absolute; top: 5px; left: 5px; display: flex; gap: 4px;
  }
  .icon-btn {
    width: 22px; height: 22px; border-radius: 6px; border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 11px; transition: all 0.15s;
    background: rgba(0,0,0,0.45); color: #fff;
  }
  .icon-btn:hover { background: rgba(0,0,0,0.7); }
  .icon-btn.danger:hover { background: #ef4444; }

  /* Settings placeholder */
  .coming-soon {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 3rem 1rem; text-align: center;
    gap: 1rem;
  }
  .coming-soon-icon {
    width: 64px; height: 64px; border-radius: 1.25rem;
    background: linear-gradient(135deg, #0f5c99, #118a88);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 0.5rem;
  }

  /* Toast */
  #settings-toast {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(120%);
    background: #1e293b; color: #fff; padding: 0.75rem 1.5rem;
    border-radius: 1rem; font-size: 0.85rem; font-weight: 600;
    box-shadow: 0 10px 30px -8px rgba(0,0,0,0.3);
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
    z-index: 9999; white-space: nowrap;
  }
  #settings-toast.show { transform: translateX(-50%) translateY(0); }
</style>

<!-- ================================================================
     SETTINGS PAGE
     ================================================================ -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen animate-fade-in">

  <!-- Page Header -->
  <div class="mb-8">
    <div class="flex items-center gap-3 mb-1">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg">
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold gradient-text">Settings</h1>
    </div>
    <p class="text-slate-500 dark:text-slate-400 text-sm ml-13">Personalize your SD Auto experience</p>
  </div>

  <!-- Two-column layout -->
  <div class="flex flex-col lg:flex-row gap-6">

    <!-- ---- Sidebar Tabs ---- -->
    <aside class="lg:w-52 shrink-0">
      <div class="section-card !p-2 sticky top-24 space-y-1">
        <button class="tab-btn active" id="tab-btn-themes" onclick="switchTab('themes')">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Themes
        </button>
        <button class="tab-btn" id="tab-btn-settings" onclick="switchTab('settings')">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Account
        </button>
      </div>
    </aside>

    <!-- ---- Main Content ---- -->
    <main class="flex-1 min-w-0">

      <!-- ======================================================
           THEMES PANEL
           ====================================================== -->
      <div id="panel-themes">

        <!-- 1. Preset Themes -->
        <div class="section-card">
          <div class="section-title">
            <svg class="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Presets
          </div>
          <p class="section-subtitle">Ready-made color schemes for the entire site</p>
          <div class="theme-grid" id="preset-grid"></div>
        </div>

        <!-- 2. Accessibility Themes -->
        <div class="section-card">
          <div class="section-title">
            <svg class="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Accessibility
          </div>
          <p class="section-subtitle">Optimised for readability and assistive needs</p>
          <div class="theme-grid" id="accessibility-grid"></div>
        </div>

        <!-- 3. Font & Display -->
        <div class="section-card">
          <div class="section-title">
            <svg class="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Font &amp; Display
          </div>
          <p class="section-subtitle">Adjust text size and typeface sitewide</p>

          <div class="mb-4">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Font Size</p>
            <div class="pill-group" id="font-size-group">
              <button class="pill" data-size="sm" onclick="setFontSize('sm')">Small</button>
              <button class="pill active" data-size="md" onclick="setFontSize('md')">Default</button>
              <button class="pill" data-size="lg" onclick="setFontSize('lg')">Large</button>
              <button class="pill" data-size="xl" onclick="setFontSize('xl')">X-Large</button>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Font Family</p>
            <div class="pill-group" id="font-family-group">
              <button class="pill active" data-font="sans" onclick="setFontFamily('sans')" style="font-family: 'Plus Jakarta Sans', sans-serif;">System Sans</button>
              <button class="pill" data-font="serif" onclick="setFontFamily('serif')" style="font-family: 'Fraunces', serif;">Serif</button>
              <button class="pill" data-font="mono" onclick="setFontFamily('mono')" style="font-family: ui-monospace, monospace;">Monospace</button>
              <button class="pill" data-font="dyslexic" onclick="setFontFamily('dyslexic')" style="font-family: Arial, sans-serif; letter-spacing: 0.04em;">Dyslexia</button>
            </div>
          </div>
        </div>

        <!-- 4. Custom Theme Builder -->
        <div class="section-card">
          <div class="section-title">
            <svg class="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Custom Theme Builder
          </div>
          <p class="section-subtitle">Create and save your own colour scheme</p>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Controls column -->
            <div>
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-1">Theme Name</label>
              <input class="name-input" id="custom-name" type="text" placeholder="My Theme" maxlength="32" />

              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">Colors</label>

              <div class="color-row">
                <label>Background Start</label>
                <input type="color" id="cp-bgFrom" value="#f4f7fb" oninput="updatePreview();updateHex(this,'hex-bgFrom')">
                <span class="color-hex" id="hex-bgFrom">#f4f7fb</span>
              </div>
              <div class="color-row">
                <label>Background End</label>
                <input type="color" id="cp-bgTo" value="#e0f2fe" oninput="updatePreview();updateHex(this,'hex-bgTo')">
                <span class="color-hex" id="hex-bgTo">#e0f2fe</span>
              </div>
              <div class="color-row">
                <label>Body Text</label>
                <input type="color" id="cp-text" value="#1e293b" oninput="updatePreview();updateHex(this,'hex-text')">
                <span class="color-hex" id="hex-text">#1e293b</span>
              </div>
              <div class="color-row">
                <label>Primary / Accent</label>
                <input type="color" id="cp-primary" value="#0f5c99" oninput="updatePreview();updateHex(this,'hex-primary')">
                <span class="color-hex" id="hex-primary">#0f5c99</span>
              </div>
              <div class="color-row">
                <label>Card / Surface</label>
                <input type="color" id="cp-surface" value="#ffffff" oninput="updatePreview();updateHex(this,'hex-surface')">
                <span class="color-hex" id="hex-surface">#ffffff</span>
              </div>
              <div class="color-row">
                <label>Nav Background</label>
                <input type="color" id="cp-navBg" value="#0b1320" oninput="updatePreview();updateHex(this,'hex-navBg')">
                <span class="color-hex" id="hex-navBg">#0b1320</span>
              </div>

              <div class="toggle-row">
                <label>Dark mode theme</label>
                <button class="toggle-switch" id="custom-dark-toggle" onclick="toggleCustomDark()" aria-pressed="false" aria-label="Dark mode toggle"></button>
              </div>

              <button class="save-btn" onclick="saveCustomTheme()">
                <svg class="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Theme
              </button>
            </div>

            <!-- Live Preview column -->
            <div>
              <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Live Preview</p>
              <div class="preview-shell" id="preview-shell">
                <div class="preview-nav" id="preview-nav">
                  <span id="preview-brand" style="font-weight:800;">SD Auto</span>
                  <span class="preview-nav-btn" id="preview-nav-btn">Sign In</span>
                </div>
                <div class="preview-body" id="preview-body">
                  <p class="preview-heading" id="preview-heading">San Diego Routes</p>
                  <p class="preview-text" id="preview-text">Find the best route through the city with real-time data.</p>
                  <div class="preview-card" id="preview-card">
                    <p class="preview-card-text" id="preview-card-text">Route suggestions load here once you sign in.</p>
                    <span class="preview-btn" id="preview-btn">Explore</span>
                  </div>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-2 text-center">Preview updates as you change colors</p>
            </div>
          </div>
        </div>

        <!-- 5. My Custom Themes (shown when saved themes exist) -->
        <div class="section-card" id="my-themes-section" style="display:none;">
          <div class="section-title">
            <svg class="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            My Themes
          </div>
          <p class="section-subtitle">Your saved custom themes — click to apply</p>
          <div class="theme-grid" id="custom-themes-grid"></div>
        </div>

      </div>
      <!-- end #panel-themes -->

      <!-- ======================================================
           SETTINGS / ACCOUNT PANEL
           ====================================================== -->
      <div id="panel-settings" style="display:none;">
        <div class="section-card">
          <div class="coming-soon">
            <div class="coming-soon-icon">
              <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold mb-2">Account Settings</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                Account preferences, privacy controls, and security settings will appear here once integrated with the authentication system.
              </p>
            </div>
            <a href="{{site.baseurl}}/profile" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-xl font-semibold text-sm shadow-medium hover:-translate-y-0.5 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Profile
            </a>
          </div>
        </div>
      </div>

    </main>
  </div>
</div>

<!-- Toast notification -->
<div id="settings-toast"></div>

<!-- ================================================================
     SETTINGS PAGE SCRIPT
     ================================================================ -->
<script>
(function () {
  'use strict';

  // ---- Constants ----------------------------------------------------------------

  var THEME_KEY = 'userTheme';
  var CUSTOM_THEMES_KEY = 'customThemes';
  var ACTIVE_CUSTOM_KEY = 'activeCustomThemeId';
  var FONT_SIZE_KEY = 'themeFontSize';
  var FONT_FAMILY_KEY = 'themeFontFamily';
  var DARK_THEMES = ['dark', 'purple-night', 'ocean-blue', 'high-contrast-dark'];

  // ---- Preset theme definitions -------------------------------------------------

  var PRESET_THEMES = [
    {
      id: 'default', name: 'SD Blue', tag: '☀️ Light',
      note: 'Default San Diego theme',
      swatch: 'linear-gradient(135deg,#f4f7fb,#dbeafe,#cffafe)',
      accent: '#0f5c99', text: '#1e293b'
    },
    {
      id: 'dark', name: 'SD Dark', tag: '🌙 Dark',
      note: 'Official dark mode',
      swatch: 'linear-gradient(135deg,#0b1320,#111c2f,#0b1320)',
      accent: '#4f8fc4', text: '#e2e8f0'
    },
    {
      id: 'purple-night', name: 'Purple Night', tag: '🌌 Dark',
      note: 'Deep violet dark theme',
      swatch: 'linear-gradient(135deg,#0d0a1e,#1a0a2e,#0f1120)',
      accent: '#a855f7', text: '#ede9fe'
    },
    {
      id: 'velvet-purple', name: 'Velvet Purple', tag: '💜 Light',
      note: 'Soft lavender light theme',
      swatch: 'linear-gradient(135deg,#faf5ff,#ede9fe,#ddd6fe)',
      accent: '#7c3aed', text: '#3b0764'
    },
    {
      id: 'ocean-blue', name: 'Ocean Blue', tag: '🌊 Dark',
      note: 'Deep ocean dark theme',
      swatch: 'linear-gradient(135deg,#0c1445,#1e3a5f,#0a2540)',
      accent: '#0ea5e9', text: '#e0f2fe'
    },
    {
      id: 'sunset', name: 'Sunset', tag: '🌅 Light',
      note: 'Warm orange gradient',
      swatch: 'linear-gradient(135deg,#fff7ed,#fef3c7,#ffe4e6)',
      accent: '#ea580c', text: '#431407'
    },
    {
      id: 'forest', name: 'Forest', tag: '🌿 Light',
      note: 'Calm green tones',
      swatch: 'linear-gradient(135deg,#f0fdf4,#dcfce7,#d1fae5)',
      accent: '#16a34a', text: '#14532d'
    }
  ];

  var ACCESSIBILITY_THEMES = [
    {
      id: 'high-contrast-dark', name: 'High Contrast Dark', tag: '♿ WCAG AAA',
      note: 'White on black, yellow accents',
      swatch: '#000000', accent: '#ffff00', text: '#ffffff'
    },
    {
      id: 'high-contrast-light', name: 'High Contrast Light', tag: '♿ WCAG AAA',
      note: 'Black on white, blue accents',
      swatch: '#ffffff', accent: '#000099', text: '#000000'
    },
    {
      id: 'colorblind', name: 'Colorblind', tag: '👁️ Accessible',
      note: 'Deuteranopia-safe palette',
      swatch: 'linear-gradient(135deg,#f8fafc,#eff6ff)',
      accent: '#0066cc', text: '#1a1a2e'
    },
    {
      id: 'dyslexia', name: 'Dyslexia', tag: '📖 Accessible',
      note: 'Cream bg, wider spacing',
      swatch: '#fef9e7', accent: '#1a5276', text: '#1a1a1a'
    }
  ];

  // ---- State -------------------------------------------------------------------

  var activeThemeId = localStorage.getItem(THEME_KEY) || 'default';
  var activeCustomId = localStorage.getItem(ACTIVE_CUSTOM_KEY) || null;
  var customDarkMode = false;

  // ---- Tab switching ----------------------------------------------------------

  window.switchTab = function (tab) {
    document.getElementById('panel-themes').style.display = tab === 'themes' ? '' : 'none';
    document.getElementById('panel-settings').style.display = tab === 'settings' ? '' : 'none';
    document.getElementById('tab-btn-themes').classList.toggle('active', tab === 'themes');
    document.getElementById('tab-btn-settings').classList.toggle('active', tab === 'settings');
  };

  // ---- Theme application ------------------------------------------------------

  function applyTheme(id, customTheme) {
    var html = document.documentElement;
    if (id === 'default') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', id);
    }
    if (DARK_THEMES.indexOf(id) !== -1) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    // Remove old custom CSS
    var old = document.getElementById('sd-custom-theme');
    if (old) old.remove();

    if (id === 'custom' && customTheme) {
      injectCustomThemeCSS(customTheme);
      if (customTheme.dark) { html.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
      else { html.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
    }

    localStorage.setItem(THEME_KEY, id);
    activeThemeId = id;
    activeCustomId = (id === 'custom' && customTheme) ? customTheme.id : null;
    renderAllCards();
    showToast('Theme applied');
  }

  // ---- Custom theme CSS injection ---------------------------------------------

  function injectCustomThemeCSS(t) {
    var css =
      '[data-theme="custom"] body.site-body{background:linear-gradient(135deg,' + t.bgFrom + ',' + t.bgTo + ')!important;color:' + t.text + '!important;}' +
      '[data-theme="custom"] .glass{background:' + hexToRgba(t.surface, 0.88) + '!important;border-color:' + hexToRgba(t.primary, 0.3) + '!important;}' +
      '[data-theme="custom"] .site-utilitybar{background:' + t.navBg + '!important;}' +
      '[data-theme="custom"] .btn-primary,[data-theme="custom"] .shell-primary-action{background:' + t.primary + '!important;}' +
      '[data-theme="custom"] .gradient-text{background:' + t.primary + '!important;-webkit-background-clip:text!important;background-clip:text!important;animation:none!important;}' +
      '[data-theme="custom"] .site-brand-mark{background:' + t.primary + '!important;}' +
      '[data-theme="custom"] .shell-nav-link::after{background:' + t.primary + '!important;}' +
      '[data-theme="custom"] ::selection{background-color:' + t.primary + '!important;color:#fff!important;}' +
      '[data-theme="custom"] ::-webkit-scrollbar-thumb{background:' + t.primary + '!important;}' +
      '[data-theme="custom"] .floating-shape:nth-child(1){background-color:' + t.primary + '!important;}' +
      '[data-theme="custom"] .floating-shape:nth-child(2){background-color:' + t.bgFrom + '!important;}' +
      '[data-theme="custom"] .floating-shape:nth-child(3){background-color:' + t.bgTo + '!important;}' +
      /* Login page overrides */
      '[data-theme="custom"] #account-access aside{background:linear-gradient(135deg,' + t.navBg + ',' + t.bgFrom + ')!important;}' +
      '[data-theme="custom"] #account-access button[type="submit"]{background:' + t.primary + '!important;}';
    var style = document.createElement('style');
    style.id = 'sd-custom-theme';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---- Custom theme save / load -----------------------------------------------

  function getCustomThemes() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_THEMES_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function saveCustomThemes(arr) {
    localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(arr));
  }

  window.saveCustomTheme = function () {
    var name = (document.getElementById('custom-name').value || '').trim();
    if (!name) { showToast('Please enter a theme name'); return; }
    var theme = {
      id: 'ct_' + Date.now(),
      name: name,
      bgFrom: document.getElementById('cp-bgFrom').value,
      bgTo: document.getElementById('cp-bgTo').value,
      text: document.getElementById('cp-text').value,
      primary: document.getElementById('cp-primary').value,
      surface: document.getElementById('cp-surface').value,
      navBg: document.getElementById('cp-navBg').value,
      dark: customDarkMode
    };
    var all = getCustomThemes();
    all.push(theme);
    saveCustomThemes(all);
    document.getElementById('custom-name').value = '';
    renderCustomCards();
    applyTheme('custom', theme);
    showToast('Theme "' + name + '" saved & applied');
  };

  window.deleteCustomTheme = function (id) {
    var all = getCustomThemes().filter(function (t) { return t.id !== id; });
    saveCustomThemes(all);
    if (activeCustomId === id) { applyTheme('default', null); }
    renderCustomCards();
    showToast('Theme deleted');
  };

  window.renameCustomTheme = function (id, el) {
    var all = getCustomThemes();
    var t = all.find(function (x) { return x.id === id; });
    if (!t) return;
    var newName = prompt('Rename theme:', t.name);
    if (!newName || !newName.trim()) return;
    t.name = newName.trim();
    saveCustomThemes(all);
    renderCustomCards();
    if (el) el.closest('.custom-card').querySelector('.theme-name').textContent = t.name;
    showToast('Renamed to "' + t.name + '"');
  };

  // ---- Font controls ----------------------------------------------------------

  window.setFontSize = function (size) {
    var sizeMap = { sm: '13px', md: '16px', lg: '18px', xl: '20px' };
    document.documentElement.style.fontSize = sizeMap[size] || '16px';
    localStorage.setItem(FONT_SIZE_KEY, size);
    document.querySelectorAll('#font-size-group .pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-size') === size);
    });
    showToast('Font size updated');
  };

  window.setFontFamily = function (family) {
    if (family === 'sans') {
      document.documentElement.removeAttribute('data-font');
    } else {
      document.documentElement.setAttribute('data-font', family);
    }
    localStorage.setItem(FONT_FAMILY_KEY, family);
    document.querySelectorAll('#font-family-group .pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-font') === family);
    });
    showToast('Font updated');
  };

  // ---- Dark mode toggle in builder --------------------------------------------

  window.toggleCustomDark = function () {
    customDarkMode = !customDarkMode;
    var btn = document.getElementById('custom-dark-toggle');
    btn.classList.toggle('on', customDarkMode);
    btn.setAttribute('aria-pressed', customDarkMode.toString());
  };

  // ---- Live preview -----------------------------------------------------------

  window.updatePreview = function () {
    var bgFrom = document.getElementById('cp-bgFrom').value;
    var bgTo = document.getElementById('cp-bgTo').value;
    var text = document.getElementById('cp-text').value;
    var primary = document.getElementById('cp-primary').value;
    var surface = document.getElementById('cp-surface').value;
    var navBg = document.getElementById('cp-navBg').value;

    document.getElementById('preview-body').style.background = 'linear-gradient(135deg,' + bgFrom + ',' + bgTo + ')';
    document.getElementById('preview-body').style.color = text;
    document.getElementById('preview-nav').style.background = navBg;
    document.getElementById('preview-nav').style.color = '#fff';
    document.getElementById('preview-nav-btn').style.background = primary;
    document.getElementById('preview-heading').style.color = text;
    document.getElementById('preview-text').style.color = text;
    document.getElementById('preview-card').style.background = surface;
    document.getElementById('preview-card').style.borderColor = hexToRgba(primary, 0.2);
    document.getElementById('preview-card-text').style.color = text;
    document.getElementById('preview-btn').style.background = primary;
  };

  window.updateHex = function (input, spanId) {
    document.getElementById(spanId).textContent = input.value;
  };

  // ---- Rendering helpers ------------------------------------------------------

  var CHECK_SVG = '<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';

  function buildThemeCard(theme, isActive) {
    var div = document.createElement('div');
    div.className = 'theme-card' + (isActive ? ' active' : '');
    div.setAttribute('data-theme-id', theme.id);
    div.onclick = function () { applyTheme(theme.id, null); };

    var swatchBg = typeof theme.swatch === 'string' ? theme.swatch : '#f4f7fb';
    var accentColor = theme.accent || '#0f5c99';

    div.innerHTML =
      '<div class="theme-swatch" style="background:' + swatchBg + '">' +
        '<div class="theme-accent-dot" style="background:' + accentColor + '"></div>' +
        (isActive ? '<div class="theme-check">' + CHECK_SVG + '</div>' : '') +
      '</div>' +
      '<div class="theme-info">' +
        '<div class="theme-name">' + theme.name + '</div>' +
        '<div class="theme-tag">' + theme.tag + '</div>' +
        (theme.note ? '<div class="theme-note">' + theme.note + '</div>' : '') +
      '</div>';

    return div;
  }

  function buildCustomCard(theme, isActive) {
    var div = document.createElement('div');
    div.className = 'custom-card' + (isActive ? ' active' : '');
    div.onclick = function () { applyTheme('custom', theme); };

    var swatchBg = 'linear-gradient(135deg,' + theme.bgFrom + ',' + theme.bgTo + ')';

    div.innerHTML =
      '<div class="theme-swatch" style="background:' + swatchBg + '">' +
        '<div class="theme-accent-dot" style="background:' + theme.primary + '"></div>' +
        (isActive ? '<div class="theme-check">' + CHECK_SVG + '</div>' : '') +
        '<div class="custom-card-actions">' +
          '<button class="icon-btn" title="Rename" onclick="event.stopPropagation();renameCustomTheme(\'' + theme.id + '\',this)">' +
            '<svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>' +
          '</button>' +
          '<button class="icon-btn danger" title="Delete" onclick="event.stopPropagation();deleteCustomTheme(\'' + theme.id + '\')">' +
            '<svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="theme-info">' +
        '<div class="theme-name">' + theme.name + '</div>' +
        '<div class="theme-tag">🎨 Custom' + (theme.dark ? ' · Dark' : '') + '</div>' +
      '</div>';

    return div;
  }

  function renderAllCards() {
    renderPresetCards();
    renderAccessibilityCards();
    renderCustomCards();
  }

  function renderPresetCards() {
    var grid = document.getElementById('preset-grid');
    grid.innerHTML = '';
    PRESET_THEMES.forEach(function (theme) {
      var isActive = activeThemeId === theme.id;
      grid.appendChild(buildThemeCard(theme, isActive));
    });
  }

  function renderAccessibilityCards() {
    var grid = document.getElementById('accessibility-grid');
    grid.innerHTML = '';
    ACCESSIBILITY_THEMES.forEach(function (theme) {
      var isActive = activeThemeId === theme.id;
      grid.appendChild(buildThemeCard(theme, isActive));
    });
  }

  function renderCustomCards() {
    var all = getCustomThemes();
    var section = document.getElementById('my-themes-section');
    var grid = document.getElementById('custom-themes-grid');
    if (all.length === 0) { section.style.display = 'none'; return; }
    section.style.display = '';
    grid.innerHTML = '';
    all.forEach(function (theme) {
      var isActive = activeThemeId === 'custom' && activeCustomId === theme.id;
      grid.appendChild(buildCustomCard(theme, isActive));
    });
  }

  // ---- Font pill init ---------------------------------------------------------

  function initFontPills() {
    var savedSize = localStorage.getItem(FONT_SIZE_KEY) || 'md';
    var savedFamily = localStorage.getItem(FONT_FAMILY_KEY) || 'sans';
    document.querySelectorAll('#font-size-group .pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-size') === savedSize);
    });
    document.querySelectorAll('#font-family-group .pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-font') === savedFamily);
    });
  }

  // ---- Toast ------------------------------------------------------------------

  var toastTimer = null;
  function showToast(msg) {
    var el = document.getElementById('settings-toast');
    el.textContent = msg;
    el.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2500);
  }

  // ---- Utilities --------------------------------------------------------------

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  // ---- Init -------------------------------------------------------------------

  document.addEventListener('DOMContentLoaded', function () {
    renderAllCards();
    initFontPills();
    updatePreview();  // Seed the live preview with default colors
  });

})();
</script>
