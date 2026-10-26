## 2024-03-24 - Accessibility standards
**Learning:** Found multiple instances where icon-only buttons lack `aria-label` or `title` attributes making them inaccessible to screen readers. For example, `MentorChat` close button, `ItemCard` toggle complete button, `Sidebar` sign out button.
**Action:** Always add descriptive `aria-label` attributes to icon-only buttons to ensure they are accessible. Ensure `focus-visible:ring-2` is applied for keyboard navigation.
