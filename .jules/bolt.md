## 2024-05-18 - Prevent O(N*M) list lookups with Map memoization
**Learning:** In React Contexts managing global lists (like user progress), exposing a getter function that uses `Array.find` creates an O(N*M) performance bottleneck when rendering lists of M items (each lookup taking O(N)).
**Action:** Memoize the array into a `Map` keyed by ID inside the context provider. This transforms the lookup from O(N) to O(1), significantly improving rendering performance for large lists of components (e.g., list of ItemCards querying progress).
