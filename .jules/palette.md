## 2026-10-28 - Missing ARIA labels and focus states on chat components
**Learning:** Custom UI components like floating action buttons (FAB) or chat widgets sometimes lack adequate accessibility attributes (`aria-label`, `aria-expanded`) and explicit focus states for keyboard navigation. This affects screen reader users and keyboard users.
**Action:** Ensure all interactive elements, particularly icon-only buttons and inputs, have appropriate ARIA attributes and focus styles (`focus-visible:ring-2`) to ensure full accessibility.
