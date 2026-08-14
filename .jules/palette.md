
## 2025-02-14 - Modal Accessibility Standards
**Learning:** React Portals and Modals need specific ARIA roles to behave correctly for screen readers. Simply hiding the background isn't enough; the container needs `role="dialog"`, `aria-modal="true"`, and an `aria-labelledby` linking to a dynamically generated `React.useId()`.
**Action:** Always apply `role="dialog"` and `aria-modal="true"` to custom modal wrappers and ensure the close button has both an `aria-label` and `focus-visible` styles so keyboard navigation works properly.
