## 2024-05-19 - Interactive Elements Inside Link Components

**Learning:** When complex interactive cards are wrapped in `<Link>` components, focus management and ARIA bindings must be explicitly placed on the interactive inner elements (e.g., buttons, external links, dropdown items) rather than relying on the parent wrapper's generic focus. This ensures screen readers and keyboard navigation can correctly access and interact with the nested actions.

**Action:** Always add explicit `focus-visible` styles and `aria-label`/`role` attributes to nested interactive elements within clickable cards to maintain full accessibility.
