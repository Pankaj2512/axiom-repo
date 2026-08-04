## 2024-08-04 - Memoizing complex nested loops in Dashboard
**Learning:** Progress stats arrays in React contexts can trigger expensive O(N) filtering across multiple sibling dashboard components on every render if not memoized, particularly when unrelated contexts (e.g., `useRevisionQueue`) trigger global updates.
**Action:** Extract strictly static configurations like `TOTAL_ITEMS` outside of React components entirely, and wrap state-dependent derived calculations (e.g. `thisWeekCompleted`) with `React.useMemo` targeting the specific parent dependency state.
