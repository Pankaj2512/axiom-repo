## 2023-10-24 - O(1) Map Lookups for Progress Context
**Learning:** Rendering large lists (like syllabus items) that look up their individual progress from a global array in a context using `array.find()` causes an O(N*M) performance bottleneck, as each item re-iterates over the progress array on every render.
**Action:** When exposing item-specific getters from a global context array, memoize the array into a `Map` keyed by item ID inside the context provider. This reduces lookup time to O(1), significantly improving rendering performance of lists.
