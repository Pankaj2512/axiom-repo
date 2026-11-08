## 2026-11-08 - Optimize ProgressContext Lookups
**Learning:** The ProgressContext was doing O(N) array lookups for every item card when rendering syllabus lists, which can cause significant performance issues as the syllabus grows.
**Action:** Always pre-compute O(1) Maps in a useMemo hook when exposing lookup functions from React contexts that provide large lists of data to many child components.
