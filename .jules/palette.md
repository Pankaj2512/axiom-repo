## 2023-10-26 - Add ARIA labels to AI Chat Widgets
**Learning:** Floating action buttons and chat close buttons often lack screen-reader context and keyboard focus indicators, breaking accessibility for core engagement features.
**Action:** Always add dynamic `aria-label` (and `aria-expanded` when acting as a toggle) and explicit `focus-visible` ring styles to icon-only buttons.
