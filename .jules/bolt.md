## 2025-01-24 - Pre-computing Static Data Totals
**Learning:** Nested array reduction (like `reduce` over tracks -> modules -> topics -> items) to calculate static counts inside React components causes unnecessary recalculation on every render.
**Action:** Always pre-compute and export static data totals (like `TOTAL_ITEMS` and `TRACK_TOTALS`) directly where the static data is defined, so they are evaluated once at module initialization instead of during the component render cycle.
