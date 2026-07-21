## 2023-10-25 - Prevent Leaking Internal Errors to Client
**Vulnerability:** API routes and auth functions were exposing internal stack traces/error messages (`error.message`) to the frontend when an operation failed.
**Learning:** Returning `error.message` on a `500` server error response or from auth wrappers can expose sensitive internal logic, backend details, or credentials to malicious users.
**Prevention:** Always log the full error on the server side (e.g. `console.error`) for debugging, but return a generic, sanitized error string (e.g. "An internal error occurred" or "Authentication failed") to the client.
