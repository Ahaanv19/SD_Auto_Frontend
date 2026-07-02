export var pythonURI;
if (location.hostname === "localhost") {
        pythonURI = "http://localhost:8888";
} else if (location.hostname === "127.0.0.1") {
        pythonURI = "http://127.0.0.1:8888";
} else {
        pythonURI = "https://autonomous.opencodingsociety.com/";
}
export var javaURI;
if (location.hostname === "localhost") {
        javaURI = "http://localhost:8888";
} else if (location.hostname === "127.0.0.1") {
        javaURI = "http://127.0.0.1:8888"; //rey
} else {
        javaURI = "https://autonomous.opencodingsociety.com/";
}

export const fetchOptions = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client' // New custom header to identify source
    },
};

/**
 * Escape untrusted text before inserting it into HTML via innerHTML.
 * Use this for ANY value that originates from the API or user input.
 * For attribute contexts, this also neutralizes quotes.
 */
export function escapeHTML(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Return a safe URL or '#': only allows http(s)/mailto/tel, blocking
 * javascript: and data: URLs that could execute script.
 */
export function safeUrl(value) {
    if (!value) return '#';
    const url = String(value).trim();
    if (/^(https?:|mailto:|tel:)/i.test(url)) return escapeHTML(url);
    if (/^\//.test(url)) return escapeHTML(url); // site-relative
    return '#';
}

/**
 * Map a non-OK HTTP response to a friendly user-facing message.
 * Centralizes 401 (auth), 403 (forbidden), 429 (rate limited) handling.
 * Returns the message string, or null if the response was OK.
 */
export function describeHttpError(response) {
    if (response.ok) return null;
    switch (response.status) {
        case 401:
            return 'Your session has expired. Please log in again.';
        case 403:
            return 'You do not have permission to perform this action.';
        case 429:
            return 'Too many requests — please slow down and try again in a moment.';
        case 503:
            return 'This service is temporarily unavailable. Please try again later.';
        default:
            return `Request failed (error ${response.status}). Please try again.`;
    }
}
// User Login Function 
export function login(options) {
        const msgEl = document.getElementById(options.message);
        if (msgEl) msgEl.textContent = "";

        const doFetch = (body) => fetch(options.URL, {
                ...fetchOptions,
                method: options.method,
                cache: options.cache,
                body: JSON.stringify(body),
        });

        const handle = (response) => {
                if (response.ok) { options.callback(); return; }
                return response.json().catch(() => ({})).then((data) => {
                        // 2FA required and a passkey exists -> automatically start
                        // the passkey (biometric) flow instead of making the user
                        // click a separate button.
                        if (response.status === 401 && data && data.use_passkey) {
                                if (typeof window.passkeyLogin === 'function') {
                                        if (msgEl) msgEl.textContent = 'Two-factor required — continue with your passkey…';
                                        window.passkeyLogin();
                                } else if (msgEl) {
                                        msgEl.textContent = "This account requires two-factor sign-in — use “Sign in with a passkey” below.";
                                }
                                return;
                        }
                        // Two-factor enabled on this account: prompt for the TOTP code
                        // and retry once. Accounts without MFA never reach this branch.
                        if (response.status === 401 && data && data.mfa_required) {
                                const code = window.prompt('Enter your 6-digit authentication code:');
                                if (code && code.trim()) {
                                        return doFetch({ ...options.body, otp: code.trim() }).then(handle);
                                }
                                if (msgEl) msgEl.textContent = 'Two-factor code required.';
                                return;
                        }
                        let errorMsg;
                        if (response.status === 401) errorMsg = 'Invalid username or password.';
                        else errorMsg = describeHttpError(response) || ('Login error: ' + response.status);
                        console.log('Login error: ' + response.status);
                        if (msgEl) msgEl.textContent = errorMsg;
                });
        };

        doFetch(options.body).then(handle).catch((error) => {
                console.log('Possible CORS or Service Down error: ' + error);
                if (msgEl) msgEl.textContent = 'Possible CORS or service down error: ' + error;
        });
}
