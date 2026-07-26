## 2024-07-26 - Information Exposure through Error Messages
**Vulnerability:** API routes (`src/app/api/...`) and authentication utilities (`src/lib/auth.ts`) were returning raw error messages (`error.message`) directly to the client when an exception was thrown.
**Learning:** Next.js Route Handlers and utility functions that catch errors must not leak raw exception messages directly in API responses. This pattern can expose internal backend structure, sensitive infrastructure details, or context about downstream APIs.
**Prevention:** Catch blocks should securely log the error server-side (e.g., using `console.error`) and return a generic, sanitized error string (like "An internal server error occurred") in the `NextResponse` to the client.
