## 2024-07-21 - [O(1) Progress Lookup]
**Learning:** React contexts providing arrays that are linearly searched (`Array.find`) by many child components (like `ItemCard`) cause significant rendering bottlenecks (O(N*M)) as user progress grows.
**Action:** When a context provides an array meant to be queried by ID across many descendants, use `useMemo` to construct a `Map` and return lookups via `Map.get()` to achieve O(1) performance per component.
