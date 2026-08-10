## 2024-08-10 - O(N) Reductions in React Render Cycle
**Learning:** Found O(N) array calculations (like calculating `totalItems` across multiple nested tracks/modules/topics) placed directly inside the main render cycle of React components (`StatsGrid`, `StudyForecaster`). These were recalculated on every render, and they were static calculations based on constant initial data (`tracks`).
**Action:** When working with static or initial constant data, extract and precompute these values completely outside of the component context (e.g., precompute `TOTAL_TRACK_ITEMS` alongside the data definition) and import the result instead.

## 2024-08-10 - Memoizing derived values from progress context
**Learning:** O(N) filtering of context values (like `progress`) was placed directly in the main render cycle of `StatsGrid`. Any un-memoized component using this hook would recalculate these arrays on unrelated renders.
**Action:** Wrap derived progress array values in `React.useMemo` to ensure they are only recalculated when `progress` or `totalItems` change, optimizing performance.
