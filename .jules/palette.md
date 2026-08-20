## 2024-08-20 - Modal Component Accessibility
**Learning:** Adding `role="dialog"`, `aria-modal="true"`, and linking a generated ID with `aria-labelledby` is essential for making custom Modals screen reader compatible, while close buttons specifically need focus-visible utility classes for keyboard navigation.
**Action:** Always ensure Modals contain these ARIA attributes and focus-visible states on all interactive elements during creation.
