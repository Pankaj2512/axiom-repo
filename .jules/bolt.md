## 2024-07-28 - Optimizing static data processing loops in dashboard metrics

**Learning:** Calculating metrics over deeply nested structured data (e.g., track -> module -> topic -> items arrays) within component renders can create significant CPU overhead, especially when iterating static data (like the total possible items). Redundant map/filter combinations on every render for progress arrays creates GC churn and layout recalculations.
**Action:** Always extract invariant complex data calculations to module-level constants or pre-computed structures outside of React components. Only compute runtime state (like progress filtering) inside `useMemo` hooks dependent on the exact state items that change.
