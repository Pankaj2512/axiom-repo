## 2024-10-11 - O(N) Lookup in ProgressContext
**Learning:** Found a performance bottleneck specific to this codebase's architecture where `getProgressForItem` uses `Array.find` on the global context `progress` array. Since this function is used inside list item components (like `ItemCard`), rendering a list of M items creates an O(N*M) lookup penalty, blocking the main thread during navigation.
**Action:** Always memoize global arrays into a `Map` keyed by item ID inside context providers when exposing item-specific getters to ensure O(1) lookups during list rendering.
