## 2025-02-09 - Accessible Floating Action Buttons
**Learning:** Icon-only floating action buttons (like chat widgets) require explicit `aria-label` for screen readers, and explicit `focus-visible` styling (e.g., `focus-visible:ring-2`) to ensure keyboard navigability, as default user-agent focus rings are often insufficient or absent on custom rounded components.
**Action:** When implementing floating action buttons or any icon-only interactable elements, always ensure `aria-label` and `focus-visible:ring-2` (or similar explicit focus indicators) are present.
