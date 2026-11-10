## 2024-11-10 - O(1) Map Lookup for Context Data
**Learning:** When context exposes an array and components look up items by ID (e.g. `progress.find(p => p.itemId === id)`), rendering large lists results in O(N*M) time complexity.
**Action:** Use useMemo to build a Map from the array when the array changes, enabling O(1) lookups for components.
