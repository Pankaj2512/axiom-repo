## 2024-05-20 - Memoization without Progress
**Learning:** The `CategoryProgress` component loops through all tracks and items on every render because it doesn't memoize the `TRACK_TOTALS` adequately, or rather, it was already doing that statically. But `StatsGrid` recalculates total items dynamically instead of using the precomputed values across the app.
**Action:** Optimize StatsGrid to avoid duplicate static calculations.
