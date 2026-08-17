## 2024-05-18 - Modal Accessibility Pattern
**Learning:** Custom Modals must explicitly declare `role="dialog"`, `aria-modal="true"`, and use `React.useId()` to bind `aria-labelledby` to the title. Close buttons need `aria-label` and explicit `focus-visible` styles. Always call `React.useId()` before any early returns.
**Action:** Apply this pattern whenever creating or modifying overlay/modal components.
