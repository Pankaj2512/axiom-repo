## 2026-08-20 - Precomputing Static Derivations
**Learning:** Static application data (like syllabus tracks) is often imported directly into React components and aggregated during the render cycle. This creates unnecessary O(N) recalculations on every render, especially on dashboards where many such metrics are displayed.
**Action:** Always inspect the source of arrays being reduced or mapped. If they are imported from static files rather than dynamic state, pre-compute their derivations outside the component scope to avoid render overhead.
