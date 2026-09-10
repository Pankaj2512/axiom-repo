## 2024-05-14 - Modal and Close Button Accessibility
**Learning:** Found custom modal-like components (MentorChat) and general `Sidebar` / `Modal` components that have unlabelled or improperly styled close buttons.
**Action:** Always verify `aria-label` and `focus-visible` states on icon-only close buttons.

## 2024-05-14 - Mentor Widget and Mentor Chat Accessibility
**Learning:** Found custom floating button (`ModuleMentorWidget`) and close button (`MentorChat`) missing `aria-label` and `focus-visible` styling. These are icon-only interactive elements crucial for accessibility.
**Action:** Add `aria-label` and focus styling.
