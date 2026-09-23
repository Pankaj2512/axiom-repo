## 2024-05-24 - Accessibility and Focus States for Interactive Widgets
**Learning:** Floating action buttons and chat widgets (like Mentor Chat) often lack crucial accessibility attributes such as `aria-label` (when icon-only), `aria-expanded` (for toggleable sections), and distinct `focus-visible` states, making them difficult to use for keyboard-only or screen reader users.
**Action:** When working on interactive floating elements or portals, always ensure `aria-label`, `aria-expanded`, and high-contrast `focus-visible` styles are explicitly defined.
