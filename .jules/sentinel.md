## 2026-08-17 - Error Detail Leakage in AI API Routes
**Vulnerability:** AI API endpoints (forecast, mentor, summarize) were catching errors and returning `error.message` directly to the client.
**Learning:** This exposes internal server state and potentially sensitive information from the Gemini API or Next.js to the frontend, leading to information leakage.
**Prevention:** Always log the actual error on the server using `console.error` for debugging, and return a generic, static error string (e.g. 'An internal server error occurred') to the client.
