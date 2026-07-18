## 2026-07-18 - Prevent API Error Leakage
**Vulnerability:** Raw error strings from internal APIs and Firebase were being passed directly to the client via HTTP 500 responses and auth methods.
**Learning:** Returning unhandled exception messages (e.g., `error.message`) in production can leak sensitive internal details, API key validation failures, or database schema information to potential attackers.
**Prevention:** Always log the actual raw error on the server side using `console.error` for debugging, and return a sanitized, generic error string (e.g., 'An unexpected error occurred') to the client.
