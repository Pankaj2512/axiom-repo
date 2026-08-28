## 2024-11-20 - Error Detail Leakage in Try/Catch Blocks
**Vulnerability:** Explicit `catch (error: any)` blocks were returning internal `error.message` directly to the client via `NextResponse.json()` in several API routes and auth functions.
**Learning:** Returning `error.message` can leak sensitive backend details, stack traces, or credentials to unauthenticated users on the client side.
**Prevention:** Avoid explicit `any` types in catch blocks. Securely log errors on the server using `console.error` and return generic, sanitized error strings to the client instead of the raw error message.
