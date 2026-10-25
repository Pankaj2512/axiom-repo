## 2023-10-25 - Accessibility in Next.js Links
**Learning:** Interactive elements nested inside <Link> tags need explicit focus-visible states and ARIA bindings since the parent <Link>'s generic focus ring is insufficient for screen readers and keyboard users.
**Action:** Always add explicit focus styles and ARIA labels to inner interactive elements.
