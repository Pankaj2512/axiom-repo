## 2024-10-09 - O(1) Lookups in Global Context Arrays
**Learning:** Exposing item-specific getters (like `getProgressForItem`) from a global context array creates an O(N*M) performance bottleneck when rendering lists of items, as `Array.find` is called N times for M items on every render.
**Action:** Always memoize global context arrays into a `Map` keyed by item ID inside the context provider. This reduces the lookup time for item-specific getters to O(1), preventing redundant N iterations.
