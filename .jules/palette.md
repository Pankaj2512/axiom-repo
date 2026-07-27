## 2024-07-27 - Added ARIA and focus styles to UI Modal
**Learning:** React portals/overlays like custom Modal components require explicit ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and proper focus management on interactive elements (like close buttons) for screen reader accessibility, as the parent generic wrapper doesn't inherently manage these semantics.
**Action:** Always add ARIA roles, labels, and Tailwind `focus-visible` states to portal overlays and their inner interactive elements when creating or updating custom UI components.
