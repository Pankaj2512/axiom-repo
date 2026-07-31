## 2024-08-01 - Modal Component Accessibility Requirements
**Learning:** Custom Modal components (React portals/overlays) must include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-label` on close buttons to ensure proper accessibility for screen readers and keyboard users.
**Action:** Always verify these ARIA attributes are present when creating or modifying custom modal or dialog overlay components to provide an inclusive UX experience.
