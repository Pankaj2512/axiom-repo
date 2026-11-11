## 2024-10-25 - Accessible Floating Action Buttons
**Learning:** Floating action buttons for toggling widgets (like mentor chat) often miss dynamic `aria-label`s and `aria-expanded` attributes. Also, custom elements need explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` to support keyboard navigation effectively, especially on non-standard backgrounds.
**Action:** Always add dynamic `aria-label`s reflecting the state (e.g., "Open chat" vs "Close chat"), `aria-expanded={isOpen}`, and explicit focus styles to floating toggle buttons.
