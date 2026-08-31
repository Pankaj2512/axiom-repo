
## 2024-05-18 - Modal Accessibility and Icon-only buttons
**Learning:** Custom modal components built as overlays lack implicit dialog semantics and focus trapping by default. Furthermore, icon-only buttons (like modal close buttons) are completely inaccessible to screen readers without ARIA labels, and keyboard users struggle to navigate them without explicit focus-visible states.
**Action:** When implementing custom portals or modals, always explicitly define `role="dialog"`, `aria-modal="true"`, and use `React.useId()` to bind an `aria-labelledby` property to the title. For all icon-only buttons, add an explicit `aria-label` and `focus-visible:ring-2` utility for keyboard focus indicators.
