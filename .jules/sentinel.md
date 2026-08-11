## 2024-05-24 - API Error Leakage Fix
**Vulnerability:** Error messages were being exposed to the client in the AI API routes (forecast, mentor, summarize). The catch blocks were directly returning `error.message` to the client.
**Learning:** Returning unhandled exception messages directly from API route catch blocks can leak sensitive backend implementation details, file paths, or third-party API keys/responses (like Gemini API errors) to the client.
**Prevention:** In API catch blocks, log the actual error securely on the server using `console.error` and return a generic, static error string (e.g., "An internal server error occurred") to the client.
