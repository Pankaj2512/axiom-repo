## 2025-02-12 - StatsGrid Optimization

**Learning:** Static data derived from imported constants (like `totalItems` aggregated from `tracks`) should be precomputed outside of React components. Additionally, multiple passes (`.filter()`) on arrays based on complex conditions in Next.js/React can be merged into a single loop wrapped in `React.useMemo` to minimize iteration overhead.

**Action:** Look for static data being calculated inside components and lift them out. Also, when filtering for derived metrics, combine the checks into a single O(N) loop to minimize overhead.
