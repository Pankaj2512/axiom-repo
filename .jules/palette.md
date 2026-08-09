
## 2024-08-09 - Accessible Modal Title Binding
**Learning:** Custom Modal components in React using conditional rendering (`if (!isOpen) return null;`) require generating unique IDs with `React.useId()` strictly before the early return to comply with the rules of hooks. This ID must then be explicitly bound between the modal's title (`id={titleId}`) and the main dialog container (`aria-labelledby={titleId}`) alongside `role="dialog"` and `aria-modal="true"`.
**Action:** When implementing custom modal overlays, always ensure `React.useId()` is called at the top of the component body, and systematically bind `aria-labelledby` to the title's generated ID for screen reader context.
