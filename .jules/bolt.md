## 2024-05-16 - O(N) Context Lookup
**Learning:** Frequent context lookups like `getProgressForItem` within lists that use array `.find()` cause performance degradation as list sizes grow, especially when called repeatedly in map functions (e.g. rendering ItemCards).
**Action:** Always memoize arrays into Maps for O(1) lookups in Context providers when providing targeted lookup functions.
