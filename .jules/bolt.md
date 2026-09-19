## 2024-10-24 - Single Pass Loop over Multiple Array Filters
**Learning:** Combining multiple derived metric calculations (like counting total completions and recent completions) into a single O(N) loop instead of using consecutive `.filter()` passes avoids redundant iterations over identical datasets.
**Action:** Always scan for consecutive array methods (like `.filter().length`) in React components and refactor them into a single pass when working with state that updates frequently.
