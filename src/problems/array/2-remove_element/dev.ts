/**
 * Problem: Remove Element
 * Difficulty: Easy
 * LeetCode #27
 *
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
 * The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
 *
 * Consider the number of elements in nums which are not equal to val be k, to get accepted,
 * you need to do the following things:
 * - Change the array nums such that the first k elements of nums contain the elements which are not equal to val.
 * - The remaining elements of nums are not important as well as the size of nums.
 * - Return k.
 *
 * Example 1:
 * Input: nums = [3,2,2,3], val = 3
 * Output: 2, nums = [2,2,_,_]
 * Explanation: Your function should return k = 2, with the first two elements of nums being 2.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Example 2:
 * Input: nums = [0,1,2,2,3,0,4,2], val = 2
 * Output: 5, nums = [0,1,4,0,3,_,_,_]
 * Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
 * Note that the five elements can be returned in any order.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Constraints:
 * - 0 <= nums.length <= 100
 * - 0 <= nums[i] <= 50
 * - 0 <= val <= 100
 */

export function removeElement(nums: number[], val: number): number {
  // Two pointers approach - overwrite elements equal to val
  let k = 0; // Pointer for the next position to place a valid element

  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // If current element is not equal to val, keep it
    if (nums[i] !== val) {
      nums[k] = nums[i]!;
      k++;
    }
    // If nums[i] === val, we skip it (don't increment k)
  }

  return k; // Return the number of elements not equal to val
}

// Main function for development testing
export function main(): void {
  console.log("🚀 Running Remove Element - Development Mode");

  // Test case 1
  console.log("\n📋 Test Case 1:");
  const nums1 = [3, 2, 2, 3];
  const val1 = 3;
  console.log("Before:", { nums: nums1.slice(), val: val1 });
  const k1 = removeElement(nums1, val1);
  console.log("After:", { k: k1, nums: nums1.slice(0, k1), fullArray: nums1 });

  // Test case 2
  console.log("\n📋 Test Case 2:");
  const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
  const val2 = 2;
  console.log("Before:", { nums: nums2.slice(), val: val2 });
  const k2 = removeElement(nums2, val2);
  console.log("After:", { k: k2, nums: nums2.slice(0, k2), fullArray: nums2 });

  // Test case 3 - Edge case: empty array
  console.log("\n📋 Test Case 3 (Edge case - empty array):");
  const nums3: number[] = [];
  const val3 = 1;
  console.log("Before:", { nums: nums3.slice(), val: val3 });
  const k3 = removeElement(nums3, val3);
  console.log("After:", { k: k3, nums: nums3.slice(0, k3), fullArray: nums3 });

  // Test case 4 - Edge case: all elements equal to val
  console.log("\n📋 Test Case 4 (Edge case - all elements equal to val):");
  const nums4 = [2, 2, 2];
  const val4 = 2;
  console.log("Before:", { nums: nums4.slice(), val: val4 });
  const k4 = removeElement(nums4, val4);
  console.log("After:", { k: k4, nums: nums4.slice(0, k4), fullArray: nums4 });

  // Test case 5 - Edge case: no elements equal to val
  console.log("\n📋 Test Case 5 (Edge case - no elements equal to val):");
  const nums5 = [1, 2, 3, 4];
  const val5 = 5;
  console.log("Before:", { nums: nums5.slice(), val: val5 });
  const k5 = removeElement(nums5, val5);
  console.log("After:", { k: k5, nums: nums5.slice(0, k5), fullArray: nums5 });
}

/*
Time Complexity: O(n) - we iterate through the array once
Space Complexity: O(1) - we modify the array in-place using only constant extra space

Approach:
1. Use two pointers: i (current element to check) and k (next position to place valid element)
2. Iterate through the array with pointer i
3. If nums[i] != val, copy it to position k and increment k
4. If nums[i] == val, skip it (don't increment k)
5. Return k as the count of elements not equal to val

Key Insights:
- Two-pointer technique for in-place array modification
- Elements after index k don't matter (can be anything)
- Order of remaining elements doesn't need to be preserved exactly
- Very efficient as each element is visited exactly once
*/

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}
