## 2024-09-22 - Missing ARIA Labels & Focus Indicators in Cards
**Learning:** Icon-only interactive elements in complex card components (`ItemCard`) often lack ARIA labels and focus indicators, preventing keyboard navigation and screen readers from properly understanding and interacting with them.
**Action:** Add `aria-label`, `aria-expanded` (where applicable), and explicit keyboard focus styles (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded`) to all icon-only buttons and interactive elements within cards.
