## 2024-07-24 - API Error Leakage
**Vulnerability:** Raw backend error messages (`error.message`) were directly passed from the catch block to client responses in API routes (`/api/ai/*`) and Auth helpers (`src/lib/auth.ts`).
**Learning:** This exposes underlying internal paths, missing keys, or database/auth details to the user and potential attackers.
**Prevention:** Securely log the actual error on the server using `console.error` and return a safe, generic error string to the client.
