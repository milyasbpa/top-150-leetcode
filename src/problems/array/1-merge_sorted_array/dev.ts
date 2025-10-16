/**
 * Problem: Merge Sorted Array
 * Difficulty: Easy
 * LeetCode #88
 *
 *export function quickTest(): void {
  console.log("🚀 Quick Test - Merge Sorted Array (Updated)");ou are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 *
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 *
 * The final sorted array should not be returned by the function, but instead be stored
 * inside the array nums1. To accommodate this, nums1 has a length of m + n, where the
 * first m elements denote the elements that should be merged, and the last n elements
 * are set to 0 and should be ignored. nums2 has a length of n.
 *
 * Example 1:
 * Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * Output: [1,2,2,3,5,6]
 * Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
 * The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
 *
 * Example 2:
 * Input: nums1 = [1], m = 1, nums2 = [], n = 0
 * Output: [1]
 * Explanation: The arrays we are merging are [1] and [].
 * The result of the merge is [1].
 *
 * Example 3:
 * Input: nums1 = [0], m = 0, nums2 = [1], n = 1
 * Output: [1]
 * Explanation: The arrays we are merging are [] and [1].
 * The result of the merge is [1].
 * Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the array has a length of 1.
 *
 * Constraints:
 * - nums1.length == m + n
 * - nums2.length == n
 * - 0 <= m, n <= 200
 * - 1 <= m + n <= 200
 * - -10^9 <= nums1[i], nums2[j] <= 10^9
 */

export function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  // Three pointers approach - merge from the end to avoid overwriting
  let i = m - 1; // Last element in nums1's valid portion
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Last position in nums1

  // Merge from the back
  while (i >= 0 && j >= 0) {
    if (nums1[i]! > nums2[j]!) {
      nums1[k] = nums1[i]!;
      i--;
    } else {
      nums1[k] = nums2[j]!;
      j--;
    }
    k--;
  }

  // Copy remaining elements from nums2 (if any)
  while (j >= 0) {
    nums1[k] = nums2[j]!;
    j--;
    k--;
  }

  // No need to copy remaining from nums1 as they're already in place
}

// Main function for development testing
export function main(): void {
  console.log("🚀 Running Merge Sorted Array - Development Mode (Updated!)");

  const nums1 = [1, 2, 3, 0, 0, 0];
  const nums2 = [2, 5, 6];

  console.log("Before merge:", { nums1: nums1.slice(0, 3), nums2 });
  merge(nums1, 3, nums2, 3);
  console.log("After merge:", nums1);
}

/*
Time Complexity: O(m + n) - we iterate through both arrays once
Space Complexity: O(1) - we modify nums1 in-place

Approach:
1. Use three pointers: i (end of nums1's valid portion), j (end of nums2), k (end of final array)
2. Start from the end and compare elements
3. Place the larger element at position k and move corresponding pointer
4. Copy any remaining elements from nums2 to nums1
5. Elements remaining in nums1 are already in correct position

Key Insights:
- Merging from the end prevents overwriting unprocessed elements
- No additional space needed as we use nums1's extra space
- Standard two-pointer merge technique adapted for in-place operation
*/
