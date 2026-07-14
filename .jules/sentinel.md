## 2026-07-14 - Fix error exposure in API routes and Auth hooks
**Vulnerability:** Internal stack traces and backend error messages (e.g., from Gemini API or Firebase Auth) were being directly returned to the client in Next.js API routes and auth functions.
**Learning:** Returning `error.message` indiscriminately can leak sensitive information about the backend infrastructure, database, or API keys to the user or an attacker.
**Prevention:** Always log the full error securely on the server using `console.error` and return a generic, safe error message string to the client.
