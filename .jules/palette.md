## 2025-07-18 - Modal Accessibility
**Learning:** React portals or fixed overlays (like Modals) need explicit `role="dialog"` and `aria-modal="true"`. Also, icon-only close buttons need `aria-label` and `focus-visible` outlines since standard modal implementations heavily rely on keyboard navigation (Escape key, Tab cycling) and screen readers.
**Action:** Always add `aria-modal="true"`, `role="dialog"`, `aria-labelledby`, and `aria-label` for close buttons in custom Modal components.
