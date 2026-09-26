## 2024-10-27 - Added Keyboard Accessibility to Modals
**Learning:** For a fully accessible modal dialog, closing the modal via the Escape key is a critical UX and accessibility requirement. Standard components should capture `keydown` events natively or at the document level when active.
**Action:** Always ensure that custom portal-based modals explicitly listen for the Escape key and call their `onClose` handler.
