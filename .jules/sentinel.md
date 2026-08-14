## 2024-08-14 - Prevent Backend Error Leakage
**Vulnerability:** Backend API routes (`src/app/api/ai/*`) and authentication utilities (`src/lib/auth.ts`) were exposing internal error messages (`error.message`) directly to the client responses.
**Learning:** Returning unhandled raw error strings (e.g. Firebase internal errors or generic SDK errors) to clients reveals backend structure, infrastructure details, and could potentially expose sensitive credentials or keys.
**Prevention:** Catch blocks must securely log actual errors on the server (`console.error`) and strictly return non-descriptive, generic error strings (e.g., `'An unexpected error occurred.'`) to clients.
