## 2024-08-12 - Prevent Error Message Leakage in API and Auth Routes
**Vulnerability:** API routes and authentication methods were catching errors as `any` and returning the raw `error.message` strings directly to the client.
**Learning:** This exposes internal server logic, external API failures (like Gemini AI), and underlying Firebase Auth details to users, which is an information disclosure vulnerability.
**Prevention:** Always log detailed errors securely on the server using `console.error` and return generic, user-friendly error messages (e.g., "An error occurred", "Authentication failed") in API responses.
