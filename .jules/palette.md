## 2024-05-24 - Interactive Elements inside Next.js Link
**Learning:** Next.js <Link> tags (which render as <a>) wrap entire complex cards. Placing native <a> tags or buttons without focus states inside these breaks hydration (nested links) and hides focus for keyboard users.
**Action:** Use <button onClick={() => window.open()}> for external links inside card wrappers and explicitly add focus-visible rings to inner interactive elements.
