## 2024-07-25 - [Frontend Performance: useMemo on Context updates]
**Learning:** Contexts like useProgress can cause O(N) recalculations on component renders. Since useProgress context values often change across the app, any derived states doing complex mapping or filtering without memoization will block the main thread unnecessarily.
**Action:** Always wrap heavy data transformations (especially loops and filtering) derived from Context data within React.useMemo, providing the context dependency as a trigger.
