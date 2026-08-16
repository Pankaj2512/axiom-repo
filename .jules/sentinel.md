## 2024-08-16 - Error Exposure in API and Auth Modules
**Vulnerability:** API routes (`src/app/api/ai/*`) and Auth helpers (`src/lib/auth.ts`) were exposing `error.message` directly to the client responses and UI in their catch blocks.
**Learning:** Exposing internal error messages or stack traces (even basic error.message) can leak implementation details, backend state, or sensitive credentials to end users, especially in serverless API routes communicating with external services like Firebase and Gemini.
**Prevention:** Always use `console.error` to securely log the full exception on the backend for debugging purposes, and return a sanitized, generic error string to the client.
