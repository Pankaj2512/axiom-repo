## 2025-07-11 - Missing Accessibility on Icon Buttons
**Learning:** Found an accessibility issue pattern where icon-only buttons and interactive elements in this app (like those in ItemCard) were missing ARIA labels and keyboard focus indicators.
**Action:** Applied the app's standard `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]` and appropriate `aria-label`s to ensure keyboard and screen reader accessibility.
