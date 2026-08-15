## 2024-10-15 - Explicit ID binding for Modal portal accessibility
**Learning:** React portals used for modals require unique IDs generated via `React.useId()` for robust `aria-labelledby` binding, avoiding global ID collisions. Conditional early returns in the component require the hook to be called at the very top level.
**Action:** Always place `React.useId()` above any `if (!isOpen) return null` checks in modal components and bind them directly to the `aria-labelledby` property.
