## 2024-05-24 - Do Not Leak Backend API Errors to Client
**Vulnerability:** Backend API routes (like `/api/ai/*`) were passing full `error.message` strings directly to the client in the 500 error response.
**Learning:** Returning `error.message` directly can leak sensitive information such as stack traces, database structure details, or file paths if the error originated from an internal library or the database. This pattern was repeated across several routes.
**Prevention:** Catch blocks in Next.js API route handlers should log the error locally (e.g. `console.error`) and return a generic string like `An internal server error occurred` to the client. Avoid the `catch (error: any)` type as well.
