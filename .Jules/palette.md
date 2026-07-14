## 2024-07-14 - Modal Component Accessibility
**Learning:** The generic `Modal` UI component lacked essential screen reader context (`role="dialog"`, `aria-modal="true"`, and `aria-labelledby`) and keyboard focus indicators for the close button, which meant all modals in the application were less accessible. Adding these attributes to the core component cascades the improvement throughout the app.
**Action:** Always ensure that custom dialog components implement the WAI-ARIA dialog pattern natively so that any usage of the component is accessible by default.
