## 2024-08-01 - [API Error Information Leakage]
**Vulnerability:** API routes (e.g., `ai/forecast`, `ai/mentor`, `ai/summarize`) were returning `error.message` directly in HTTP 500 responses.
**Learning:** This exposes internal backend details, stack traces, or potentially sensitive information to the client, leading to information leakage.
**Prevention:** Catch blocks should securely log the actual error on the server (using `console.error`) and return a generic error message (e.g., `"An internal error occurred"`) to the client to obscure backend details.
