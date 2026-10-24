## 2025-02-13 - O(1) ProgressMap lookup
**Learning:** Array.find within map lists is an O(N*M) performance bottleneck when rendering lists of items.
**Action:** Use a memoized Map keyed by item ID to achieve O(1) lookups.
