## 2024-07-21 - [Pre-computing deeply nested static data]
**Learning:** Found multiple instances where static data (the syllabus track list) was being deeply reduced `reduce().reduce().reduce()` on every render in several components just to find the total item count.
**Action:** Instead of inline `.reduce()`, pre-compute static data aggregations at initialization time in the file that defines the data, and export them as constants. This turns O(n) rendering bottlenecks into O(1) lookups.
