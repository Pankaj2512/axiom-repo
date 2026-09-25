## 2024-05-15 - [Global Context Array Lookups Performance]
**Learning:** In React components that consume an item-specific derived state from a global context array, like calling `getProgressForItem(itemId)` which iterated using `Array.find()`, it causes a massive O(N*M) performance bottleneck when rendered in lists.
**Action:** When exposing item-specific getters from a global context array, always memoize the array into a `Map` keyed by the item ID inside the context provider. This reduces the lookup time to O(1) and eliminates the list rendering bottleneck.
