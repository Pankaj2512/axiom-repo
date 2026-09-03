## 2024-05-18 - Improve Modal Accessibility
**Learning:** Custom Modal components (React portals/overlays) must explicitly declare `role="dialog"`, `aria-modal="true"`, and bind `aria-labelledby` to a unique ID generated via `React.useId()` for the title. Close buttons require explicitly declared focus-visible styles (e.g. `focus-visible:ring-2`) and `aria-label` to ensure proper accessibility.
**Action:** When creating new modals, always include these basic ARIA roles and labels, and remember to style the close button with focus-visible for keyboard users.
