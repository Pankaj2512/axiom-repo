## 2024-11-20 - ItemCard accessibility updates
**Learning:** Complex interactive cards wrapped in Next.js `<Link>` tags (e.g., `ItemCard`) present accessibility challenges. The parent wrapper's generic focus ring is insufficient for screen readers and keyboard users who need to interact with inner buttons.
**Action:** Explicit focus states (`focus-visible:ring-2`) and ARIA bindings (`aria-label`, `aria-expanded`) must be placed directly on the inner interactive elements (buttons, secondary links) to ensure full accessibility.
