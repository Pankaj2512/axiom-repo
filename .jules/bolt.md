## 2024-07-08 - [Static Code Pre-Computation]
**Learning:** Syllabus tracks data (`src/data/tracks.ts`) contains hundreds of items in nested arrays. Re-calculating `totalItems` using deep `.reduce()` inside components like `StatsGrid` and `StudyForecaster` blocks the main thread on every render for no reason.
**Action:** When static data sizes are large, export pre-computed aggregates directly from the data file rather than calculating them dynamically on render.
