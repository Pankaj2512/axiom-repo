## 2024-03-05 - Fix Information Leakage via Error Messages

**Vulnerability:** API routes (`src/app/api/ai/*`) and Auth logic (`src/lib/auth.ts`) were returning `error.message` directly to the client in response payloads.
**Learning:** Returning unhandled exception details or raw error messages exposes internal backend logic and potentially credentials or infrastructure details, creating a security risk (Information Exposure/Leakage).
**Prevention:** Always log the actual error securely on the server side using `console.error()`, and return a generic, safe string to the client (e.g., "An internal server error occurred" or "Authentication failed"). Also, drop the explicit `: any` annotation in TypeScript `catch` blocks to prevent linting errors.
