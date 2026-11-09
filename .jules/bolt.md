## 2026-11-09 - O(N) Array Search to O(1) Map Lookup in ProgressContext
**Learning:** The ProgressContext was repeatedly calling an O(N) array search on every render when rendering lists of syllabus items, leading to an O(N²) overall rendering complexity.
**Action:** Optimize context hooks in React where array searches are done frequently by converting the array into a Map using useMemo, improving repeated lookups to O(1).
