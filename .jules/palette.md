## 2024-05-24 - Accessibility improvements to interactive card actions
**Learning:** Found that custom item cards in lists lacked basic accessibility on icon-only action buttons (missing aria-labels, aria-hidden for icons, and focus styles). Menus lack ARIA roles.
**Action:** Added aria labels, hidden aria attributes to icons, role menu/menuitem for dropdowns, and standardized keyboard focus visible states using tailwind.
