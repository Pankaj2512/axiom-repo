## 2024-05-15 - [O(1) lookups for list rendering]
**Learning:** O(N*M) list rendering bottleneck discovered when computing completion status. `Array.find` was heavily used inside list iterations over contexts.
**Action:** Always memoize global arrays into `Map` structures when they are meant to be repeatedly queried by child components in large lists.
