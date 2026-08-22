## 2024-05-18 - Prevent Error Detail Leakage
**Vulnerability:** Error responses exposed internal system details by directly returning `error.message` in API routes and auth functions to clients.
**Learning:** Returning unhandled exception messages to clients can leak backend architecture details or credentials.
**Prevention:** Log errors securely server-side using `console.error` and return generic, sanitized error strings to the client.
