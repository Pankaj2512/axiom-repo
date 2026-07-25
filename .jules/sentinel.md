## 2024-07-25 - Avoid Exposing Internal Errors to the Client
**Vulnerability:** API routes and authentication functions were returning raw `error.message` strings directly to the client when exceptions occurred (e.g., `return { error: error.message }`).
**Learning:** Returning raw exception messages exposes internal application details, potentially leaking sensitive configuration, framework internals, or API keys when an unexpected failure happens.
**Prevention:** Always log the full error securely on the server using `console.error(error)` and return a sanitized, generic error string to the client (e.g., `"An internal server error occurred"` or `"Authentication failed"`).
