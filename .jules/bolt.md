## 2024-08-27 - [Derived State Recalculation Overhead]
**Learning:** O(N) derived calculations directly in the body of a functional component cause cascading performance impacts as context state changes trigger re-evaluations. Static data like the `tracks` config should be evaluated outside of component bodies.
**Action:** Lift derived metrics for static objects outside the React component completely. Apply `React.useMemo` to group complex array filtering logic instead of multiple O(N) chained array methods for user progress data. Avoid git staging `.lock` files or build output logs.
