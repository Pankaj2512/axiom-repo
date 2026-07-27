## 2024-05-24 - Precompute static counts in React components
**Learning:** Nested array iterations inside component render functions (especially over static data like tracks) can be expensive and cause unnecessary re-renders when unrelated contexts change.
**Action:** Extract static calculations outside of the component body, and wrap progress-based filtering/counting in `React.useMemo` to perform a single pass instead of N passes on every render.
