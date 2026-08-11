## 2025-02-18 - Improve Modal Accessibility
**Learning:** Custom Modal components (React portals/overlays) must explicitly declare `role="dialog"`, `aria-modal="true"`, and bind `aria-labelledby` to a unique ID generated via `React.useId()` for the title. Close buttons require explicitly declared focus-visible styles (e.g. `focus-visible:ring-2`) and `aria-label` to ensure proper accessibility.
**Action:** When creating or modifying Modal components, always ensure these ARIA attributes and focus styles are present.
