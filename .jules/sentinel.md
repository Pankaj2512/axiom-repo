## 2024-03-06 - Prevent Error Details Exposure
**Vulnerability:** API endpoints (`/api/ai/*`) and Auth helpers (`src/lib/auth.ts`) were returning detailed `error.message` strings directly to the client when exceptions occurred.
**Learning:** This exposes internal system details, third-party API specifics, or credentials to potentially malicious clients.
**Prevention:** Always log the actual detailed error on the server using `console.error` for debugging, but only return generic error strings (like 'An internal error occurred' or 'Authentication failed') to the client.
