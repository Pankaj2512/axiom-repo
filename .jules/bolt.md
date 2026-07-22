## 2024-07-22 - Pre-computing Static Application Data

**Learning:** This codebase relies on large, static data sets (like Syllabus tracks, modules, and topics). Iterating over these deep nested structures (using nested `reduce` or `forEach`) inside React render cycles or `useEffect` blocks causes unnecessary CPU overhead. Because the syllabus structure is static during runtime, these counts don't change.

**Action:** Pre-compute static aggregations (like total item counts per track, and globally) exactly once at initialization time inside the data definition file, and export the constants. Use `React.useMemo` to wrap any remaining runtime O(n) array filtering based on mutable state (`progress`) to only run when that state actually changes, rather than every render.
