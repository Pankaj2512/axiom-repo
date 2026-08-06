## 2025-03-08 - Modal Accessibility Enhancements
**Learning:** Custom React portal modals (like `Modal.tsx`) inherently lack structural accessibility semantics, making them invisible or confusing to screen readers unless explicitly marked up with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
**Action:** When implementing or reviewing any overlay/modal component, ensure it has these core ARIA attributes applied to the container wrapper and that inner interactive elements (especially icon-only close buttons) have accessible labels and keyboard focus-visible styling.
