## 2024-05-24 - Prevent Error Information Leakage
**Vulnerability:** API routes and authentication functions were catching errors using `: any` and returning `error.message` directly to the client in HTTP responses.
**Learning:** Exposing internal error messages to the client can leak sensitive information about the backend infrastructure, database, or third-party APIs (like Firebase or Gemini). Additionally, using `error: any` disables TypeScript's type checking for the error object, potentially hiding other bugs.
**Prevention:** Always omit explicit `: any` types in catch blocks (use `catch (error)`). Securely log the full error object on the server using `console.error` for debugging, and return a generic, safe error message (e.g., 'An internal error occurred') to the client.
