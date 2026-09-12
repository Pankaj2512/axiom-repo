## 2024-09-12 - Combine array filtering loops
**Learning:** Multiple array filter passes (e.g. `arr.filter(a).filter(b)` or extracting metrics sequentially) over derived state arrays like user progress can introduce expensive O(N) operations in React rendering.
**Action:** Combine logic into a single `for...of` iteration pass and use `new Date().getTime()` instead of recreating `Date` instances inside loops to significantly optimize performance.
