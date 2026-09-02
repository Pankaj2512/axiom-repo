## 2024-09-02 - React O(N) Array Operations in Component Scope
**Learning:** Computing derived static metrics (e.g. aggregating track totals) inside a React functional component causes unnecessary recalculation on every render.
**Action:** Extract fully static calculations outside of the React component entirely, and combine multiple O(N) iterations on dynamic state into a single loop wrapped in `React.useMemo`.
