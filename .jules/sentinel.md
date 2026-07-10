## 2024-07-10 - Do not leak raw error messages to the client
**Vulnerability:** Raw error messages (`error.message`) from backend operations (Firebase auth, AI generation) were being exposed directly to the client UI/API responses.
**Learning:** Returning raw system/library error messages to the frontend can expose sensitive internal details, paths, or service behaviors to malicious actors.
**Prevention:** Catch all exceptions, securely log the raw details on the server (`console.error`), and return generic, safe error strings to the client (e.g. `An internal server error occurred`, `Authentication failed`).
