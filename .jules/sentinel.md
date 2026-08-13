## 2024-05-24 - API Error Leakage
**Vulnerability:** API and Auth endpoints were returning `error.message` directly to the client when a generic error string should have been used.
**Learning:** Returning actual backend error messages can expose internal architecture, configuration errors, or sensitive authentication details to the end-user.
**Prevention:** Always use a generic, client-facing string like "An internal error occurred" or "Authentication failed", and securely log the actual error (`console.error(error)`) on the server. Ensure catch blocks do not use the explicit `any` type (to abide by typescript-eslint rules).
