## 2024-07-12 - Pre-compute Static Application Data Constants
**Learning:** Static nested application data (like syllabus tracks in `src/data`) was being deep-traversed with `.reduce()` on every initialization or render cycle of components like `StatsGrid` and `StudyForecaster`. This blocks the main thread unnecessarily.
**Action:** Always pre-compute static data derivatives (like total counts) exactly once at module initialization time (e.g., exporting `TOTAL_TRACK_ITEMS` alongside `tracks`) and reference the constant in components.
