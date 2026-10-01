## 2024-10-01 - Optimizing O(N) Array Find to O(1) Map Lookup in React Context
**Learning:** React contexts providing getter functions that search over a list of items using `Array.find` can become severe performance bottlenecks (O(N*M)) when those getters are consumed inside mapped list renders.
**Action:** Memoize the array into a `Map` keyed by the lookup ID inside the context provider. Return items from the Map to ensure O(1) access times for consuming components.
