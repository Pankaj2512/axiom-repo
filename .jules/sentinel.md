## 2026-07-17 - Prevent API Error Leakage
**Vulnerability:** Internal error messages and potential stack traces from API routes and authentication flows were being returned directly to the client.
**Learning:** Returning raw `error.message` from try/catch blocks in Next.js API routes or client authentication wrappers exposes internal application state and potential stack traces to malicious users.
**Prevention:** Always log the actual error securely on the server using `console.error` for debugging, but return a generic, non-descriptive error string (like 'An internal error occurred' or 'Authentication failed') to the client.
