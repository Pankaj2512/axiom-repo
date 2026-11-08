## 2024-05-18 - Improve ModuleMentorWidget Accessibility
**Learning:** Icon-only buttons lacking `aria-label` and `aria-expanded` attributes are inaccessible to screen reader users, especially when they act as toggles. Proper focus indicators are also crucial for keyboard navigation.
**Action:** Add dynamic `aria-label` based on state, `aria-expanded` for toggles, and use `focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-black` for proper keyboard focus indication, particularly on circular, accent-colored buttons.
