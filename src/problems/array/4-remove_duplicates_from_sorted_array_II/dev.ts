/**
 * Problem: Remove Duplicates from Sorted Array II
 * Difficulty: Medium
 * LeetCode #80
 *
 * Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place
 * such that each unique element appears at most twice. The relative order of the elements should be kept the same.
 *
 * Since it is impossible to change the length of the array in some languages, you must instead
 * have the result be placed in the first part of the array nums. More formally, if there are k elements
 * after removing the duplicates, then the first k elements of nums should hold the final result.
 * It does not matter what you leave beyond the first k elements.
 *
 * Return k after placing the final result in the first k slots of nums.
 *
 * Do not allocate extra space for another array. You must do this by modifying the input array in-place
 * with O(1) extra memory.
 *
 * Example 1:
 * Input: nums = [1,1,1,2,2,3]
 * Output: 5, nums = [1,1,2,2,3,_]
 * Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Example 2:
 * Input: nums = [0,0,1,1,1,1,2,3,3]
 * Output: 7, nums = [0,0,1,1,2,3,3,_,_]
 * Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 *
 * Constraints:
 * - 1 <= nums.length <= 3 * 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums is sorted in non-decreasing order.
 */

export function removeDuplicates(nums: number[]): number {
  // Edge case: arrays with length <= 2 already satisfy the condition
  if (nums.length <= 2) return nums.length;

  // Two pointers approach
  // k: position for next valid element (elements that appear at most twice)
  // Start from index 2 since first two elements are always valid
  let k = 2;

  // Iterate from third element onwards
  for (let i = 2; i < nums.length; i++) {
    // Compare current element with element at position k-2
    // If different, current element can be placed (at most 2nd occurrence)
    // If same, current element would be 3rd+ occurrence, skip it
    if (nums[i] !== nums[k - 2]) {
      nums[k] = nums[i]!;
      k++;
    }
  }

  return k;
}

// Alternative approach: Count-based solution
export function removeDuplicatesCount(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let k = 1; // Position for next valid element
  let count = 1; // Count of current element

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      count++;
    } else {
      count = 1;
    }

    // Place element if count <= 2
    if (count <= 2) {
      nums[k] = nums[i]!;
      k++;
    }
  }

  return k;
}

// Generalized approach: Allow at most k duplicates
export function removeDuplicatesGeneral(
  nums: number[],
  maxAllowed: number
): number {
  if (nums.length <= maxAllowed) return nums.length;

  let writeIndex = maxAllowed;

  for (let i = maxAllowed; i < nums.length; i++) {
    // Compare with element maxAllowed positions back
    if (nums[i] !== nums[writeIndex - maxAllowed]) {
      nums[writeIndex] = nums[i]!;
      writeIndex++;
    }
  }

  return writeIndex;
}

// Main function for development testing
export function main(): void {
  console.log(
    "🚀 Running Remove Duplicates from Sorted Array II - Development Mode"
  );

  // Test case 1: Basic case with multiple duplicates
  console.log("\n📋 Test Case 1:");
  const nums1 = [1, 1, 1, 2, 2, 3];
  console.log("Before:", nums1.slice());
  const k1 = removeDuplicates(nums1);
  console.log("After:", {
    k: k1,
    result: nums1.slice(0, k1),
    fullArray: nums1,
  });

  // Test case 2: Complex case with many duplicates
  console.log("\n📋 Test Case 2:");
  const nums2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
  console.log("Before:", nums2.slice());
  const k2 = removeDuplicates(nums2);
  console.log("After:", {
    k: k2,
    result: nums2.slice(0, k2),
    fullArray: nums2,
  });

  // Test case 3: Array with length 2
  console.log("\n📋 Test Case 3 (Length 2):");
  const nums3 = [1, 1];
  console.log("Before:", nums3.slice());
  const k3 = removeDuplicates(nums3);
  console.log("After:", {
    k: k3,
    result: nums3.slice(0, k3),
    fullArray: nums3,
  });

  // Test case 4: Array with length 1
  console.log("\n📋 Test Case 4 (Length 1):");
  const nums4 = [1];
  console.log("Before:", nums4.slice());
  const k4 = removeDuplicates(nums4);
  console.log("After:", {
    k: k4,
    result: nums4.slice(0, k4),
    fullArray: nums4,
  });

  // Test case 5: No duplicates
  console.log("\n📋 Test Case 5 (No duplicates):");
  const nums5 = [1, 2, 3, 4, 5];
  console.log("Before:", nums5.slice());
  const k5 = removeDuplicates(nums5);
  console.log("After:", {
    k: k5,
    result: nums5.slice(0, k5),
    fullArray: nums5,
  });

  // Test case 6: All elements same
  console.log("\n📋 Test Case 6 (All same):");
  const nums6 = [1, 1, 1, 1, 1];
  console.log("Before:", nums6.slice());
  const k6 = removeDuplicates(nums6);
  console.log("After:", {
    k: k6,
    result: nums6.slice(0, k6),
    fullArray: nums6,
  });

  // Test case 7: Exactly 2 of each element
  console.log("\n📋 Test Case 7 (Exactly 2 of each):");
  const nums7 = [1, 1, 2, 2, 3, 3];
  console.log("Before:", nums7.slice());
  const k7 = removeDuplicates(nums7);
  console.log("After:", {
    k: k7,
    result: nums7.slice(0, k7),
    fullArray: nums7,
  });

  // Test case 8: Mixed pattern
  console.log("\n📋 Test Case 8 (Mixed pattern):");
  const nums8 = [1, 1, 1, 1, 2, 2, 3];
  console.log("Before:", nums8.slice());
  const k8 = removeDuplicates(nums8);
  console.log("After:", {
    k: k8,
    result: nums8.slice(0, k8),
    fullArray: nums8,
  });

  // Test case 9: Negative numbers
  console.log("\n📋 Test Case 9 (Negative numbers):");
  const nums9 = [-3, -3, -1, -1, -1, 0, 0, 1, 1, 1];
  console.log("Before:", nums9.slice());
  const k9 = removeDuplicates(nums9);
  console.log("After:", {
    k: k9,
    result: nums9.slice(0, k9),
    fullArray: nums9,
  });

  console.log("\n🔄 Testing Count-based Approach:");
  // Test count-based approach with same input
  const numsCount = [1, 1, 1, 2, 2, 3];
  console.log("Count Before:", numsCount.slice());
  const kCount = removeDuplicatesCount(numsCount);
  console.log("Count After:", {
    k: kCount,
    result: numsCount.slice(0, kCount),
    fullArray: numsCount,
  });

  console.log("\n🎯 Testing Generalized Approach (allow at most 2):");
  // Test generalized approach
  const numsGeneral = [1, 1, 1, 2, 2, 3];
  console.log("General Before:", numsGeneral.slice());
  const kGeneral = removeDuplicatesGeneral(numsGeneral, 2);
  console.log("General After:", {
    k: kGeneral,
    result: numsGeneral.slice(0, kGeneral),
    fullArray: numsGeneral,
  });

  console.log("\n🎯 Testing Generalized Approach (allow at most 3):");
  // Test with different max allowed
  const numsGeneral3 = [1, 1, 1, 1, 2, 2, 2, 3];
  console.log("General3 Before:", numsGeneral3.slice());
  const kGeneral3 = removeDuplicatesGeneral(numsGeneral3, 3);
  console.log("General3 After:", {
    k: kGeneral3,
    result: numsGeneral3.slice(0, kGeneral3),
    fullArray: numsGeneral3,
  });
}

/*
Time Complexity: O(n) - we iterate through the array once
Space Complexity: O(1) - we modify the array in-place using only constant extra space

Approach:
1. Main Algorithm (Compare with k-2):
   - Use two pointers: i (current element) and k (position for next valid element)
   - Start k from 2 since first two elements are always valid (at most 2 occurrences)
   - For each element at i, compare with element at k-2
   - If different, element at i can be placed (at most 2nd occurrence of this value)
   - If same, element at i would be 3rd+ occurrence, skip it

2. Count-based Algorithm:
   - Track count of consecutive identical elements
   - Place element only if count <= 2
   - Reset count when new element is encountered

3. Generalized Algorithm:
   - Allow at most k duplicates instead of hardcoded 2
   - Compare with element k positions back
   - Easily extensible for different constraints

Key Insights:
- Extension of Remove Duplicates I: allow 2 occurrences instead of 1
- Compare with k-2 instead of k-1 (for at most 2 occurrences)
- For general case: compare with k-maxAllowed
- Sorted array property: duplicates are adjacent
- Two-pointer technique for in-place modification
- Elements after index k don't matter

Edge Cases:
- Arrays with length <= 2: already satisfy condition
- All same elements: keep first 2 occurrences
- No duplicates: keep all elements
- Exactly 2 of each element: keep all
*/

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}
