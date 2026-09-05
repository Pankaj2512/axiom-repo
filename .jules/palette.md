## 2026-09-05 - Modal Accessibility (Aria, Focus, Id)
**Learning:** Custom Modal components using React portals/overlays must explicitly declare `role="dialog"`, `aria-modal="true"`, and bind `aria-labelledby` to a unique ID. Using `React.useId()` at the top of the component (before early returns) is crucial to avoid Hook rule violations. Furthermore, close buttons need explicit `aria-label` and visible focus states (e.g., `focus-visible:ring-2`) to ensure keyboard navigability.
**Action:** Always verify focus rings, aria-modal, role, and ID bindings on custom overlay components.
