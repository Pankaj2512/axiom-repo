## 2024-10-21 - O(N) Array Lookups in Contexts
**Learning:** Found that the code performed O(N) lookups in the progress array using `Array.find` within `getProgressForItem` which was getting called frequently when rendering lists of items.
**Action:** Memoized the array into a Map keyed by `itemId` using `useMemo` to convert these O(N) list-render lookups into O(1) map gets.
