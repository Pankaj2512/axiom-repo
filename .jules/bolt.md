## 2026-07-17 - Precompute Static Reductions
**Learning:** The project relies heavily on calculating static syllabus metrics inside React render loops via nested `reduce` functions.
**Action:** Precompute static data reductions at the module scope when initializing constant data structures to prevent unnecessary O(N) operations during every component render.
