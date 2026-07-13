## 2026-07-13 - Focus Styles on Icon Buttons
**Learning:** Icon-only buttons without inner text need standard focus-visible styles paired with aria-labels to be fully accessible for keyboard and screen reader users. The `MentorChat` component's buttons (close, send) and `ModuleMentorWidget` toggle button lacked both.
**Action:** Always ensure any icon-only `<button>` or `<Button>` component includes an descriptive `aria-label` and `focus-visible:ring-*` classes in its `className`.
