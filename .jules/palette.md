## 2024-08-22 - Custom Modal Accessibility with Early Returns
**Learning:** When implementing accessibility (`role="dialog"`, `aria-labelledby`) in custom Modal components using `React.useId()` for the title binding, Next.js / React hooks linting strictly requires `useId()` to be declared before any conditional early returns (e.g. `if (!isOpen) return null`).
**Action:** Always place `React.useId()` and other hook calls at the very top of the Modal component, before the early return statements, to satisfy hook rules while maintaining A11y linkage.
