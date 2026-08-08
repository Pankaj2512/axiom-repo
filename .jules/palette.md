
## 2024-05-24 - Custom Modal Accessibility
**Learning:** Custom React portals/overlays for modals must explicitly declare `role="dialog"`, `aria-modal="true"`, and bind `aria-labelledby` to a unique ID generated via `React.useId()` for the title to be properly announced by screen readers. Additionally, icon-only close buttons require explicitly declared focus-visible styles (e.g. `focus-visible:ring-2`) because default browser outlines might be suppressed or visually clash with dark/glass UI backgrounds.
**Action:** When implementing or modifying custom modal overlays, always verify these three ARIA attributes are present on the container, and manually verify keyboard tab order and focus ring visibility on the close button.
