## 2025-03-01 - Accessible and Focusable floating action button
**Learning:** `focus-visible` needs to be used in conjunction with `ring-offset` and `aria-label` to be accessible and distinct, especially on floating action buttons where background may blend.
**Action:** Adding `aria-label` and `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black` to `<button>` elements.
