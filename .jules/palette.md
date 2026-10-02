## 2023-11-20 - Missing ARIA Labels on Icon Buttons in Interactive Components
**Learning:** Icon-only buttons (like copy, reset, and tabs) inside complex interactive components (like the code editor) often lack `aria-label` attributes and explicit `focus-visible` states, making them inaccessible to screen readers and keyboard users.
**Action:** When working on complex interactive UI components, always ensure that all icon-only buttons have descriptive `aria-label` attributes and explicit `focus-visible` styling (e.g. `focus-visible:ring-2`) so they are fully accessible.
