
## 2024-08-04 - Modal Dialog Accessibility
**Learning:** React portals and custom modals often miss crucial semantic meaning for screen readers. Using `role="dialog"` along with `aria-modal="true"` ensures assistive technologies treat it as a proper modal window. Furthermore, focus rings on close buttons must not be overlooked to aid keyboard navigators.
**Action:** When implementing or modifying custom modal overlays, always enforce `role="dialog"`, `aria-modal="true"`, an associated `aria-labelledby` pointing to the title, and ensure the close button receives focus-visible styles.
