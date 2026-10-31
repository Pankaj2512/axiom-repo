## 2024-05-24 - Accessibility improvements for FAB
**Learning:** Found an icon-only floating action button (`ModuleMentorWidget`) missing an `aria-label` and `aria-expanded` attribute, as well as missing explicit focus-visible styles which are required for custom blended backgrounds.
**Action:** Always add explicit ARIA labels and `focus-visible:ring-2` (paired with `focus-visible:ring-offset-*`) for icon-only components, especially FABs to guarantee accessibility for screen readers and keyboard users.
