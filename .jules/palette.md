## 2024-10-04 - ItemCard Accessibility within Links
**Learning:** Complex interactive cards wrapped in Next.js `<Link>` tags (like `ItemCard`) intercept generic keyboard focus on the outer element, which is insufficient for screen readers and keyboard users accessing nested interactive elements like nested buttons or anchor links.
**Action:** Always apply explicit focus states (`focus-visible:ring-2`) and ARIA bindings (`aria-label`, `aria-expanded`) directly on all inner interactive elements to ensure accessibility inside a wrapped link component.
