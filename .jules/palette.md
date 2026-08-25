## 2023-10-25 - Accessible Modal Pattern
**Learning:** Custom portal Modals require explicit `role="dialog"`, `aria-modal="true"`, and dynamic `aria-labelledby` with a unique ID using `React.useId()` for standard screen reader support. The close button needs `aria-label="Close modal"` and `focus-visible` styling since it has no visible text.
**Action:** When building or enhancing any overlay/modal component, always ensure these 5 attributes (role, aria-modal, aria-labelledby, aria-label, focus-visible) are implemented for baseline accessibility and keyboard navigability.
