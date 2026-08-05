## 2024-05-24 - Custom Dialog Accessibility

**Learning:** When creating custom Modal or Dialog components (using React Portals or overlays), they lack the native accessibility features of the HTML `<dialog>` element. Without proper ARIA roles, screen readers won't announce them as dialogs, and keyboard users might lose context if focus isn't managed or close buttons lack accessible labels.

**Action:** Always ensure custom dialog overlays include `role="dialog"`, `aria-modal="true"`, an `aria-labelledby` attribute linking to the modal's title ID, and an `aria-label` on icon-only close buttons. This ensures the component is properly announced and navigable by assistive technologies.
