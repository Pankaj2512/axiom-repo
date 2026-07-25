## 2024-05-24 - Custom Modal Components A11y Pattern
**Learning:** Custom Modal components (React portals/overlays) must include `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title id, and an `aria-label` on close buttons along with focus styles to ensure proper accessibility for screen readers and keyboard users.
**Action:** When implementing or modifying custom modal/overlay components, always enforce these aria attributes and focus-visible utilities (`focus-visible:outline-none focus-visible:ring-2 ...`) by default.
