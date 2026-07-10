## 2024-07-10 - O(1) Map Lookups for React Context

**Learning:** When passing large arrays via React Context to be queried by many child components (e.g., `progress.find(p => p.itemId === id)` in a list of items), it results in an O(N*M) performance bottleneck where N is the number of rendered items and M is the length of the array.
**Action:** Always pre-compute an O(1) hash map (`Map<string, ItemType>`) using `useMemo` in the context provider, and update getter functions to use `map.get(id)` instead.
