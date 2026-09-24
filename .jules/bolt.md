## 2024-05-14 - Map for O(1) Context Lookups
**Learning:** React contexts exposing item-specific getters (like `getProgressForItem`) that iterate through global arrays (like `progress.find(p => p.itemId === itemId)`) create O(N*M) performance bottlenecks when used within list components. N items rendering each call the O(M) `find` operation.
**Action:** When a global array context is frequently queried per item, memoize the array into a `Map` or a dictionary object keyed by the lookup ID within the context provider to reduce lookup time to O(1).
