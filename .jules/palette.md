## 2024-05-18 - Modal Accessibility
**Learning:** Custom Modal components in this application lack critical accessibility attributes (like `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`) and proper keyboard focus states on their close buttons.
**Action:** When working with overlays and modals, always bind a generated ID (via `React.useId()`) to the title, explicitly declare dialog roles, and ensure the close button has a descriptive `aria-label` and visible focus state using `focus-visible` utilities.
