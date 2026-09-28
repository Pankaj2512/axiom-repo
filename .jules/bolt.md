## 2024-09-28 - Memoizing global context arrays into Maps

**Learning:** When exposing item-specific getters (like `getProgressForItem`) from a global context array, iterating over the array using `Array.find()` causes O(N) lookup time on every call. In lists or frequently updated components, this creates an O(N*M) performance bottleneck, triggering expensive and unnecessary recalculations.
**Action:** Memoize the context array into a `Map` keyed by the item ID inside the context provider using `React.useMemo`. Update the getter to retrieve items from this `Map`, reducing the lookup complexity to O(1).
