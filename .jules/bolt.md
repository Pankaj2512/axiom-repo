## 2024-05-24 - O(N*M) bottlenecks in React Context getters
**Learning:** When exposing item-specific getters from a global context array (like `getProgressForItem`), executing `Array.find` inside the getter causes an O(N) lookup. When this context is consumed by lists rendering M items (e.g., `ItemCard`s), the overall complexity becomes O(N*M), creating a significant performance bottleneck.
**Action:** Memoize the array into a `Map` keyed by the item ID inside the context provider. This avoids the O(N*M) bottleneck, reducing lookup time in the getter to O(1).
