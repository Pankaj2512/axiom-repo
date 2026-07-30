## 2024-07-30 - Prevent Error Details Leakage
**Vulnerability:** API endpoints and Auth utilities were returning raw `error.message` to the client, which could expose sensitive internal details or stack traces to unauthenticated users.
**Learning:** Always fail securely by catching exceptions, securely logging the actual error on the server side for debugging, and returning generic error messages to the client.
**Prevention:** Use `console.error` (or a dedicated logger) for server logs and generic strings like 'An unexpected error occurred' in HTTP responses or client-facing return values.
