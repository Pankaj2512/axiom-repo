## 2026-07-28 - Modal Component Accessibility
**Learning:** Custom Modal components (React portals/overlays) must include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-label` on close buttons to ensure proper accessibility for screen readers and keyboard users.
**Action:** When reviewing or creating modal components, ensure these ARIA attributes are present and standard focus-visible styles are applied to interactive elements like close buttons.
