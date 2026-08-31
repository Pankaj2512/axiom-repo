## 2025-02-14 - Unauthenticated AI Endpoints
**Vulnerability:** The Next.js API routes for AI (e.g., forecast, mentor, summarize) lack server-side authentication checks.
**Learning:** Because `firebase-admin` is not installed, it is not possible to easily verify client-side Firebase ID tokens on the server, leaving these API endpoints (and the underlying Gemini API) exposed to unauthenticated abuse.
**Prevention:** Always ensure server-side APIs that interact with external paid services (like Gemini) have proper authentication/authorization checks. This project needs `firebase-admin` installed to perform token verification.
