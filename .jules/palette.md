## 2024-10-24 - Inner elements in Link cards need explicit focus rings
**Learning:** When complex interactive cards are wrapped in Next.js <Link> tags, the parent wrapper's generic focus ring is insufficient for screen readers and keyboard users navigating to inner interactive elements.
**Action:** Place explicit focus states (focus-visible:ring-2) and ARIA bindings directly on inner interactive elements (buttons, secondary links) within <Link> wrappers to ensure complete accessibility.
