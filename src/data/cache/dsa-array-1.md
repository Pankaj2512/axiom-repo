## Reverse the Array

### Problem Statement

Given an array `A` of `N` elements, reverse the order of its elements. The modification should be performed directly on the input array (in-place), meaning you should not create a new array to store the reversed elements.

**Input:**
An array `A` of integers.

**Output:**
The modified array `A` with its elements in reverse order.

### Examples

**Example 1:**

*   **Input:** `A = [1, 2, 3, 4, 5, 6]`
*   **Output:** `A = [6, 5, 4, 3, 2, 1]`
*   **Explanation:** The element `1` at index `0` is swapped with `6` at index `5`. `2` at index `1` is swapped with `5` at index `4`, and `3` at index `2` is swapped with `4` at index `3`. The array is completely reversed.

**Example 2:**

*   **Input:** `A = [10, 20, 30, 40, 50]`
*   **Output:** `A = [50, 40, 30, 20, 10]`
*   **Explanation:** `10` is swapped with `50`, and `20` is swapped with `40`. The middle element `30` remains in its original position as it has no corresponding element to swap with.

**Example 3:**

*   **Input:** `A = []`
*   **Output:** `A = []`
*   **Explanation:** An empty array contains no elements, so reversing it results in an identical empty array.

**Example 4:**

*   **Input:** `A = [42]`
*   **Output:** `A = [42]`
*   **Explanation:** An array with a single element remains unchanged after reversal, as there are no other elements to swap with.

### Constraints

*   `0 <= N <= 10^5` (where `N` is the number of elements in the array `A`)
*   `-10^9 <= A[i] <= 10^9` for all `i` (elements can be positive, negative, or zero)
*   **Time Complexity:** Your solution should aim for `O(N)` time complexity.
*   **Space Complexity:** Your solution must achieve `O(1)` auxiliary space complexity (in-place modification).