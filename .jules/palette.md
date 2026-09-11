## 2024-05-24 - Interactive Elements inside Clickable Cards
**Learning:** When complex UI components like cards act as navigation targets (e.g. wrapped in `<Link>`), any nested interactive buttons or links must explicitly declare `focus-visible` styles and receive accessible names. Screen readers and keyboard users struggle to distinguish inner interactions when relying on parent-level card focus states.
**Action:** Always add explicit ARIA labels and `focus-visible:ring-2` to icon-only buttons nested within navigable cards to ensure independent focus targeting and clear narration.
