## 2026-08-16 - Optimization of Derived Static Calculations
**Learning:** Pre-calculating static values strictly outside of React components and aggregating array filtering processes in a single memoized loop is an effective pattern to reduce render overhead for Dashboard widgets that map over large static data configurations.
**Action:** Identify large immutable structures imported directly into components, and pull their aggregation loops entirely out of the component scope to ensure O(1) read operations inside the component instead of O(N) calculations per render.
