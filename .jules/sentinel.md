## 2024-07-20 - API Error Leakage
**Vulnerability:** API routes and authentication methods were directly exposing raw `error.message` strings to clients in catch blocks.
**Learning:** The codebase has a pattern of returning `NextResponse.json({ error: error.message }, { status: 500 })`, which can inadvertently leak sensitive server-side details (e.g., failed internal API calls, stack traces, database schema info).
**Prevention:** Always log the actual error securely on the server using `console.error` and return a generic, user-friendly error string to the client.
