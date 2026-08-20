## 2024-08-20 - Prevent Error Message Leakage in API and Auth Handlers
**Vulnerability:** API routes and authentication handlers were catching raw errors and returning `error.message` directly in the HTTP response or client return objects.
**Learning:** This exposes internal error details, stack information, or underlying system details directly to users and potential attackers, violating the "fail securely" principle and leaking sensitive system information.
**Prevention:** Catch errors without explicitly typing them as `any`, log the full error server-side using `console.error` for debugging, and return a sanitized, generic error string (e.g., "An unexpected error occurred" or "Failed to sign in") to the client.
