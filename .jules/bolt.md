## 2024-10-07 - Optimize context lookups
**Learning:** React context functions that perform array lookups (e.g. `progress.find(p => p.itemId === itemId)`) create O(N*M) performance bottlenecks when called inside lists of M items, as `find` takes O(N) where N is array length.
**Action:** Memoize global context arrays into a `Map` keyed by item ID using `React.useMemo` to ensure downstream lookups happen in O(1) time.
