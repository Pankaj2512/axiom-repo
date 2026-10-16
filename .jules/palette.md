## 2024-10-16 - Add ARIA label and focus styles to AI Mentor Widget button
**Learning:** Icon-only floating action buttons in the application may lack accessibility attributes like `aria-label` and `aria-expanded`, and missing explicit `focus-visible` styles makes keyboard navigation difficult.
**Action:** Add `aria-label`, `aria-expanded`, and `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]` to icon-only interactive buttons like floating chat toggles.
