## 2024-08-29 - Modal Accessibility Hooks
**Learning:** When using hooks like `React.useId()` to generate accessible IDs for modals or conditional components, they must be called at the very top of the function *before* any conditional early returns (e.g., `if (!isOpen) return null;`) to comply with React's Rules of Hooks.
**Action:** Always verify hook placement before conditional renders in UI components.
