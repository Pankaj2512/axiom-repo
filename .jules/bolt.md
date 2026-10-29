## 2024-05-24 - ProgressContext Array Lookup Bottleneck
**Learning:** The `getProgressForItem` function in `src/contexts/ProgressContext.tsx` uses an O(N) array lookup (`progress.find`) which can cause severe performance issues (O(N*M)) when rendering long lists of items.
**Action:** Always memoize global arrays into HashMaps (O(1)) when they are frequently queried by components in large lists.
