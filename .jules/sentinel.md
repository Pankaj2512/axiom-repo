## 2024-07-12 - Prevented Error Leakage in API Routes
**Vulnerability:** API routes returned raw `error.message` strings directly to clients upon exceptions.
**Learning:** This exposes internal server details and backend secrets (e.g., from the Gemini API) to malicious clients.
**Prevention:** Instead of exposing details, exceptions should be logged strictly to the console via `console.error` and handled gracefully by returning generic strings like "An internal server error occurred."
