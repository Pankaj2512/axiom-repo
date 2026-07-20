## 2024-07-20 - Custom Modal Accessibility
**Learning:** Custom Modal/Dialog components (React portals/overlays) must include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-label` on close buttons to ensure proper accessibility for screen readers and keyboard users.
**Action:** When implementing or modifying overlays or dialogs, always ensure these ARIA attributes are present and that close actions have visible keyboard focus states.
