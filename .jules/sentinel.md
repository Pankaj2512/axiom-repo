## 2024-08-26 - Information Leakage via Error Messages
**Vulnerability:** API endpoints and authentication handlers were returning raw `error.message` strings directly to the client upon failures.
**Learning:** Returning raw error details to the client can inadvertently expose sensitive internal infrastructure details, stack traces, or configuration patterns (like "GEMINI_API_KEY is missing").
**Prevention:** Always log the actual error on the server side using `console.error` for debugging, but return a generic, safe error message string to the client (e.g., "An unexpected error occurred"). Additionally, rely on TypeScript's inference for catch blocks (e.g., `catch (error)`) instead of using explicit `any` types.
