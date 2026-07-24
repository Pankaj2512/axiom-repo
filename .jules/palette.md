## 2026-07-02 - Modal Accessibility Improvement
**Learning:** Custom Modals implemented using raw `div` elements miss out on critical native dialog capabilities out of the box, leading to a degraded experience for screen reader and keyboard users.
**Action:** Always ensure that custom Modal implementations explicitly include `role="dialog"`, `aria-modal="true"`, an explicitly linked title (`aria-labelledby`), and visible focus states + `aria-label`s for the close control to ensure functional parity with native `<dialog>` elements.
