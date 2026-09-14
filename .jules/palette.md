## 2024-05-24 - Missing ARIA Labels on Floating Action Buttons
**Learning:** Floating action buttons (FABs) using icon-only representations frequently miss descriptive text for screen readers. In Axiom, `ModuleMentorWidget.tsx` contained an icon-only chat trigger without context.
**Action:** Always add dynamic `aria-label` attributes to FABs (e.g., toggling between "Open" and "Close" based on state) to ensure full accessibility for interactive overlay triggers.
