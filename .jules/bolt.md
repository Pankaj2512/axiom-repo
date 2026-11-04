## 2026-11-04 - Optimize ProgressContext Lookups
**Learning:** In contexts providing lists of items that are frequently read by individual components (like `getProgressForItem`), returning an array forces O(N) lookup complexity per component render, which compounds to O(N*M) where M is the number of rendered items. Memoizing into a Map resolves this.
**Action:** Use `useMemo` to create a Map for O(1) lookups whenever a context exposes a method to find an item by ID from a list.
