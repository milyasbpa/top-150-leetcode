/**
 * Problem: Remove Duplicates from Sorted Array
 * Difficulty: Easy
 * LeetCode #26
 *
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place
 * such that each unique element appears only once. The relative order of the elements should be kept the same.
 * Then return the number of unique elements in nums.
 *
 * Consider the number of unique elements of nums be k, to get accepted, you need to do the following things:
 * - Change the array nums such that the first k elements of nums contain the unique elements
 *   in the order they were present in nums initially.
 * - The remaining elements of nums are not important as well as the size of nums.
 * - Return k.
 *
 * Example 1:
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Example 2:
 * Input: nums = [0,0,1,1,1,2,2,3,3,4]
 * Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
 * Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Constraints:
 * - 1 <= nums.length <= 3 * 10^4
 * - -100 <= nums[i] <= 100
 * - nums is sorted in non-decreasing order.
 */

export function removeDuplicates(nums: number[]): number {
  // Edge case: empty array (though constraint says nums.length >= 1)
  if (nums.length === 0) return 0;

  // Two pointers approach - k tracks position for next unique element
  let k = 1; // Start from 1 since first element is always unique

  // Iterate from second element onwards
  for (let i = 1; i < nums.length; i++) {
    // If current element is different from previous, it's unique
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i]!;
      k++;
    }
    // If nums[i] === nums[i-1], it's duplicate, skip it (don't increment k)
  }

  return k; // Return the number of unique elements
}

// Alternative approach: compare with last unique element
export function removeDuplicatesAlt(nums: number[]): number {
  if (nums.length === 0) return 0;

  let k = 1; // Position for next unique element

  for (let i = 1; i < nums.length; i++) {
    // Compare with last unique element (at position k-1)
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i]!;
      k++;
    }
  }

  return k;
}

// Main function for development testing
export function main(): void {
  console.log(
    "🚀 Running Remove Duplicates from Sorted Array - Development Mode"
  );

  // Test case 1: Basic case with duplicates
  console.log("\n📋 Test Case 1:");
  const nums1 = [1, 1, 2];
  console.log("Before:", nums1.slice());
  const k1 = removeDuplicates(nums1);
  console.log("After:", {
    k: k1,
    unique: nums1.slice(0, k1),
    fullArray: nums1,
  });

  // Test case 2: Multiple duplicates
  console.log("\n📋 Test Case 2:");
  const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  console.log("Before:", nums2.slice());
  const k2 = removeDuplicates(nums2);
  console.log("After:", {
    k: k2,
    unique: nums2.slice(0, k2),
    fullArray: nums2,
  });

  // Test case 3: Single element
  console.log("\n📋 Test Case 3 (Single element):");
  const nums3 = [1];
  console.log("Before:", nums3.slice());
  const k3 = removeDuplicates(nums3);
  console.log("After:", {
    k: k3,
    unique: nums3.slice(0, k3),
    fullArray: nums3,
  });

  // Test case 4: All elements same
  console.log("\n📋 Test Case 4 (All same elements):");
  const nums4 = [1, 1, 1, 1];
  console.log("Before:", nums4.slice());
  const k4 = removeDuplicates(nums4);
  console.log("After:", {
    k: k4,
    unique: nums4.slice(0, k4),
    fullArray: nums4,
  });

  // Test case 5: No duplicates (already unique)
  console.log("\n📋 Test Case 5 (No duplicates):");
  const nums5 = [1, 2, 3, 4, 5];
  console.log("Before:", nums5.slice());
  const k5 = removeDuplicates(nums5);
  console.log("After:", {
    k: k5,
    unique: nums5.slice(0, k5),
    fullArray: nums5,
  });

  // Test case 6: Two elements - same
  console.log("\n📋 Test Case 6 (Two same elements):");
  const nums6 = [1, 1];
  console.log("Before:", nums6.slice());
  const k6 = removeDuplicates(nums6);
  console.log("After:", {
    k: k6,
    unique: nums6.slice(0, k6),
    fullArray: nums6,
  });

  // Test case 7: Two elements - different
  console.log("\n📋 Test Case 7 (Two different elements):");
  const nums7 = [1, 2];
  console.log("Before:", nums7.slice());
  const k7 = removeDuplicates(nums7);
  console.log("After:", {
    k: k7,
    unique: nums7.slice(0, k7),
    fullArray: nums7,
  });

  // Test case 8: Negative numbers
  console.log("\n📋 Test Case 8 (Negative numbers):");
  const nums8 = [-3, -1, -1, 0, 0, 0, 1, 1];
  console.log("Before:", nums8.slice());
  const k8 = removeDuplicates(nums8);
  console.log("After:", {
    k: k8,
    unique: nums8.slice(0, k8),
    fullArray: nums8,
  });

  console.log("\n🔄 Testing Alternative Approach:");
  // Test alternative approach with same inputs
  const numsAlt = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  console.log("Alt Before:", numsAlt.slice());
  const kAlt = removeDuplicatesAlt(numsAlt);
  console.log("Alt After:", {
    k: kAlt,
    unique: numsAlt.slice(0, kAlt),
    fullArray: numsAlt,
  });
}

/*
Time Complexity: O(n) - we iterate through the array once
Space Complexity: O(1) - we modify the array in-place using only constant extra space

Approach:
1. Use two pointers: i (current element) and k (position for next unique element)
2. Start k from 1 since first element is always unique
3. Compare each element with previous element (nums[i] vs nums[i-1])
4. If different, it's unique - copy to position k and increment k
5. If same, it's duplicate - skip it (don't increment k)
6. Return k as count of unique elements

Key Insights:
- Array is sorted, so duplicates are adjacent
- First element is always unique (no previous element to compare)
- Two-pointer technique for in-place modification
- Compare with previous element vs compare with last unique element (both work)
- Elements after index k don't matter

Edge Cases:
- Single element: always unique, return 1
- All same elements: only first is unique, return 1  
- No duplicates: all elements unique, return original length
- Negative numbers: same logic applies
*/

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}
