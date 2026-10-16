## 2024-06-25 - Prevent O(N*M) list rendering with Map lookups
**Learning:** React contexts providing getters over arrays (like `getProgressForItem` scanning the `progress` array) can cause hidden O(N*M) rendering bottlenecks when consumed by large lists (e.g., rendering a syllabus of M items, where each item scans the N-length progress array).
**Action:** When exposing getters from global contexts over static or state-managed arrays, always memoize the array into a `Map` keyed by the lookup id. This brings the lookup time from O(N) to O(1), preventing scaling issues.
