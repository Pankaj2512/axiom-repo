## 2024-08-06 - Fixing Error Exposure in AI API Routes
**Vulnerability:** The AI API routes (forecast, mentor, summarize) were returning `error.message` directly to the client when a 500 error occurred.
**Learning:** Returning detailed error messages (especially from third-party SDKs like Gemini) can expose sensitive backend details or internal architecture to unauthenticated users.
**Prevention:** Always log detailed errors server-side (e.g., `console.error`) and return a generic error string (e.g., "An unexpected error occurred") to the client.
