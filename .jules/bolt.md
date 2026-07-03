## 2026-07-03 - Static Calculations in React Component Bodies
**Learning:** Found static data aggregation (`tracks.reduce`) being recalculated on every render in components like `StatsGrid` and `CategoryProgress`. This scales poorly with large static data arrays like the DSA syllabus list (4500+ lines).
**Action:** Move static data reductions outside component bodies to run exactly once at module load, rather than O(renders). Use `useMemo` for any calculations depending on dynamic props/context.
