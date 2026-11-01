## 2026-11-01 - Interactive Elements in Link Wrappers
**Learning:** Next.js <Link> wrappers rendering as <a> tags cause hydration errors if nested interactive elements use <a> tags. Furthermore, nested buttons require explicit aria-labels and focus-visible rings since the wrapper's focus styling is insufficient for screen readers and keyboard users.
**Action:** Always replace nested external links within <Link> wrappers with <button> tags using window.open, and apply focus-visible rings to all inner interactive elements.
