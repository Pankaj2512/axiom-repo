## 2024-05-17 - Stop Leaking Error Messages
**Vulnerability:** API routes leak internal error details directly to the client via `error.message`.
**Learning:** Returning `error.message` directly in Next.js API routes or client functions without sanitization can inadvertently expose sensitive internal server details, file paths, or credentials.
**Prevention:** Always log the actual error securely on the server using `console.error` and return a generic, safe error string (e.g. "An unexpected error occurred") to the client.
