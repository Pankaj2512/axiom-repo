## 2024-07-23 - Memoizing Expensive Derived State
**Learning:** React components consuming multiple contexts (like StatsGrid consuming progress, streaks, and dueCards) recalculate ALL derived state even when unrelated contexts update. Complex array filtering (O(N) operations) should be memoized to prevent CPU spikes.
**Action:** Always wrap heavy O(N) array aggregations derived from one context in `useMemo` when a component consumes multiple independent contexts that can trigger re-renders.
