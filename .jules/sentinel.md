## 2024-05-28 - Missing Authentication on AI Endpoints
**Vulnerability:** The AI API endpoints (/api/ai/*) lacked authentication and were fully public, exposing the application to abuse and cost overruns from unauthenticated AI API calls.
**Learning:** In a Next.js serverless environment utilizing Firebase client SDKs, server-side authentication must manually verify client-provided ID tokens using the Google Identity Toolkit REST API.
**Prevention:** All server-side route handlers that perform sensitive operations or incur costs must include a token verification guard (`verifyToken`) at the beginning of the handler.
