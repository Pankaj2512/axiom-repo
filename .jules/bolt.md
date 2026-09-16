## 2024-05-24 - Double Filter Iteration Overhead
**Learning:** In React components rendering large arrays (like `progress`), chained `.filter()` methods can lead to unnecessary O(N) recalculations on every render cycle.
**Action:** Combine multiple derived metrics checks into a single O(N) loop when possible to minimize iteration overhead.
