/**
 * 🎯 LeetCode #169 - Majority Element
 *
 * Problem Statement:
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n/2⌋ times.
 * You may assume that the majority element always exists in the array.
 *
 * Example 1:
 * Input: nums = [3,2,3]
 * Output: 3
 *
 * Example 2:
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2
 *
 * Constraints:
 * - n == nums.length
 * - 1 <= n <= 5 * 10^4
 * - -10^9 <= nums[i] <= 10^9
 * - The majority element always exists
 */

// 🌟 Solution 1: Boyer-Moore Voting Algorithm - O(n) time, O(1) space (Optimal!)
function majorityElement(nums: number[]): number {
  // Edge case: empty array (should not happen per constraints)
  if (nums.length === 0) throw new Error("Array cannot be empty");

  // Edge case: single element
  if (nums.length === 1) return nums[0]!;

  // Boyer-Moore Algorithm: Find candidate
  let candidate = nums[0]!;
  let count = 1;

  // Phase 1: Find potential majority candidate
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;

      // When count becomes 0, switch candidate
      if (count === 0) {
        candidate = nums[i]!;
        count = 1;
      }
    }
  }

  // Since problem guarantees majority exists, return candidate
  // (Otherwise, we'd need Phase 2 to verify)
  return candidate;
}

// 🔄 Solution 2: Hash Map Counter - O(n) time, O(n) space
function majorityElementHashMap(nums: number[]): number {
  const countMap = new Map<number, number>();
  const majority = Math.floor(nums.length / 2);

  for (const num of nums) {
    const count = (countMap.get(num) || 0) + 1;
    countMap.set(num, count);

    // Early return when majority found
    if (count > majority) {
      return num;
    }
  }

  // This should never be reached given constraints
  return nums[0]!;
}

// 📊 Solution 3: Sorting Approach - O(n log n) time, O(1) space
function majorityElementSort(nums: number[]): number {
  // Sort the array
  nums.sort((a, b) => a - b);

  // The majority element must be at the middle position
  // Since it appears > n/2 times, it will occupy the middle
  return nums[Math.floor(nums.length / 2)]!;
}

// 🎯 Solution 4: Divide and Conquer - O(n log n) time, O(log n) space
function majorityElementDivideConquer(nums: number[]): number {
  // Helper function to count occurrences in range
  function countInRange(
    nums: number[],
    target: number,
    left: number,
    right: number
  ): number {
    let count = 0;
    for (let i = left; i <= right; i++) {
      if (nums[i] === target) count++;
    }
    return count;
  }

  // Recursive divide and conquer
  function majorityHelper(left: number, right: number): number {
    // Base case: single element
    if (left === right) return nums[left]!;

    // Divide
    const mid = Math.floor((left + right) / 2);
    const leftMajority = majorityHelper(left, mid);
    const rightMajority = majorityHelper(mid + 1, right);

    // If both halves have same majority, return it
    if (leftMajority === rightMajority) {
      return leftMajority;
    }

    // Conquer: count occurrences of both candidates
    const leftCount = countInRange(nums, leftMajority, left, right);
    const rightCount = countInRange(nums, rightMajority, left, right);

    // Return the one that appears more
    return leftCount > rightCount ? leftMajority : rightMajority;
  }

  return majorityHelper(0, nums.length - 1);
}

// 🧮 Solution 5: Bit Manipulation - O(n) time, O(1) space
function majorityElementBitwise(nums: number[]): number {
  let result = 0;
  const n = nums.length;

  // Check each bit position (32 bits for integer)
  for (let bit = 0; bit < 32; bit++) {
    let count = 0;

    // Count how many numbers have this bit set
    for (const num of nums) {
      if ((num >> bit) & 1) {
        count++;
      }
    }

    // If majority of numbers have this bit set, set it in result
    if (count > n / 2) {
      result |= 1 << bit;
    }
  }

  return result;
}

// 🎲 Solution 6: Randomized Algorithm - O(n) expected time, O(1) space
function majorityElementRandom(nums: number[]): number {
  const majority = Math.floor(nums.length / 2);

  while (true) {
    // Pick random element
    const randomIndex = Math.floor(Math.random() * nums.length);
    const candidate = nums[randomIndex]!;

    // Count its occurrences
    let count = 0;
    for (const num of nums) {
      if (num === candidate) count++;
    }

    // If it's majority, return it
    if (count > majority) {
      return candidate;
    }

    // Otherwise, try again (expected iterations: 2)
  }
}

// 🔍 Solution 7: Two-Pass Boyer-Moore (Complete verification)
function majorityElementTwoPass(nums: number[]): number {
  if (nums.length === 0) throw new Error("Array cannot be empty");

  // Phase 1: Find candidate using Boyer-Moore
  let candidate = nums[0]!;
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i]!;
        count = 1;
      }
    }
  }

  // Phase 2: Verify candidate is actually majority
  let actualCount = 0;
  for (const num of nums) {
    if (num === candidate) actualCount++;
  }

  return actualCount > Math.floor(nums.length / 2) ? candidate : -1;
}

// 📈 Performance Comparison Function
function performanceComparison(nums: number[]): void {
  console.log(
    `🎯 Testing Majority Element algorithms with array length: ${nums.length}`
  );
  console.log(
    `Array preview: [${nums.slice(0, 10).join(", ")}${
      nums.length > 10 ? "..." : ""
    }]`
  );

  const algorithms = [
    {
      name: "Boyer-Moore Voting",
      fn: majorityElement,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Hash Map Counter",
      fn: majorityElementHashMap,
      complexity: "O(n) time, O(n) space",
    },
    {
      name: "Sorting Approach",
      fn: majorityElementSort,
      complexity: "O(n log n) time, O(1) space",
    },
    {
      name: "Divide & Conquer",
      fn: majorityElementDivideConquer,
      complexity: "O(n log n) time, O(log n) space",
    },
    {
      name: "Bit Manipulation",
      fn: majorityElementBitwise,
      complexity: "O(32n) time, O(1) space",
    },
    {
      name: "Randomized",
      fn: majorityElementRandom,
      complexity: "O(n) expected time, O(1) space",
    },
    {
      name: "Two-Pass Boyer-Moore",
      fn: majorityElementTwoPass,
      complexity: "O(n) time, O(1) space",
    },
  ];

  algorithms.forEach(({ name, fn, complexity }) => {
    const copyArray = [...nums]; // Create copy for sorting algorithm
    const start = performance.now();
    const result = fn(copyArray);
    const end = performance.now();

    console.log(
      `✅ ${name}: ${result} (${(end - start).toFixed(4)}ms) - ${complexity}`
    );
  });

  console.log("\n" + "=".repeat(80));
}

// 🧪 Test Cases
function runTests(): void {
  console.log("🧪 Running Majority Element Tests...\n");

  const testCases = [
    {
      name: "Basic Case 1",
      input: [3, 2, 3],
      expected: 3,
      description: "Simple majority with 3 appearing 2/3 times",
    },
    {
      name: "Basic Case 2",
      input: [2, 2, 1, 1, 1, 2, 2],
      expected: 2,
      description: "2 appears 4/7 times (> 3.5)",
    },
    {
      name: "Single Element",
      input: [1],
      expected: 1,
      description: "Array with only one element",
    },
    {
      name: "All Same",
      input: [5, 5, 5, 5, 5],
      expected: 5,
      description: "All elements are identical",
    },
    {
      name: "Minimal Majority",
      input: [1, 2, 1],
      expected: 1,
      description: "1 appears 2/3 times (just over 50%)",
    },
    {
      name: "Large Numbers",
      input: [1000000000, -1000000000, 1000000000, -1000000000, 1000000000],
      expected: 1000000000,
      description: "Test with constraint boundary values",
    },
    {
      name: "Even Length",
      input: [1, 1, 2, 2, 1, 1],
      expected: 1,
      description: "Even length array, 1 appears 4/6 times",
    },
    {
      name: "Odd Length",
      input: [3, 3, 4, 4, 4],
      expected: 4,
      description: "Odd length array, 4 appears 3/5 times",
    },
    {
      name: "Sequential Pattern",
      input: [1, 2, 3, 1, 2, 3, 1, 1, 1],
      expected: 1,
      description: "1 appears 5/9 times in mixed pattern",
    },
    {
      name: "Negative Numbers",
      input: [-1, -1, -2, -2, -1],
      expected: -1,
      description: "Majority with negative numbers",
    },
  ];

  // Test all algorithms with each test case
  const algorithms = [
    { name: "Boyer-Moore", fn: majorityElement },
    { name: "HashMap", fn: majorityElementHashMap },
    { name: "Sorting", fn: majorityElementSort },
    { name: "Divide&Conquer", fn: majorityElementDivideConquer },
    { name: "Bitwise", fn: majorityElementBitwise },
    { name: "TwoPass", fn: majorityElementTwoPass },
    // Note: Excluding randomized due to potential infinite loop in test
  ];

  testCases.forEach(({ name, input, expected, description }, index) => {
    console.log(`\n📝 Test ${index + 1}: ${name}`);
    console.log(`📋 Description: ${description}`);
    console.log(`📥 Input: [${input.join(", ")}]`);
    console.log(`🎯 Expected: ${expected}`);

    let allPassed = true;
    algorithms.forEach(({ name: algName, fn }) => {
      const inputCopy = [...input]; // Create copy for sorting algorithm
      const result = fn(inputCopy);
      const passed = result === expected;
      allPassed = allPassed && passed;

      console.log(`${passed ? "✅" : "❌"} ${algName}: ${result}`);
    });

    console.log(`📊 Result: ${allPassed ? "🎉 ALL PASSED" : "💥 SOME FAILED"}`);
  });
}

// 🚀 Performance Tests
function runPerformanceTests(): void {
  console.log("\n🚀 Performance Testing...\n");

  // Test with different array sizes
  const sizes = [100, 1000, 5000, 10000];

  sizes.forEach((size) => {
    console.log(`\n📏 Array Size: ${size}`);

    // Create test array where first element appears > n/2 times
    const majorityCount = Math.floor(size / 2) + 1;
    const minorityCount = size - majorityCount;

    const testArray = [
      ...Array(majorityCount).fill(42), // Majority element
      ...Array(minorityCount)
        .fill(0)
        .map((_, i) => i + 1), // Different minority elements
    ];

    // Shuffle the array to make it more realistic
    for (let i = testArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [testArray[i], testArray[j]] = [testArray[j], testArray[i]];
    }

    performanceComparison(testArray);
  });
}

// 🎯 Edge Case Testing
function runEdgeCaseTests(): void {
  console.log("\n🎯 Edge Case Testing...\n");

  const edgeCases = [
    {
      name: "Minimum Size",
      input: [42],
      description: "Single element array (n=1)",
    },
    {
      name: "Two Elements Same",
      input: [1, 1],
      description: "Two identical elements (n=2, majority=1)",
    },
    {
      name: "Maximum Constraint Value",
      input: Array(100).fill(1000000000).concat(Array(50).fill(-1000000000)),
      description: "Large array with boundary values",
    },
    {
      name: "All Zeros",
      input: [0, 0, 0, 0, 0],
      description: "All elements are zero",
    },
    {
      name: "Alternating Pattern",
      input: [1, 2, 1, 2, 1],
      description: "Pattern where majority wins by 1",
    },
  ];

  edgeCases.forEach(({ name, input, description }) => {
    console.log(`\n🔍 Edge Case: ${name}`);
    console.log(`📋 ${description}`);
    console.log(
      `📥 Input: [${input.slice(0, 10).join(", ")}${
        input.length > 10 ? "..." : ""
      }] (length: ${input.length})`
    );

    try {
      const result = majorityElement([...input]);
      console.log(`✅ Boyer-Moore Result: ${result}`);

      // Verify result
      const count = input.filter((x) => x === result).length;
      const isValid = count > Math.floor(input.length / 2);
      console.log(
        `📊 Verification: ${result} appears ${count}/${input.length} times - ${
          isValid ? "✅ Valid" : "❌ Invalid"
        }`
      );
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
  });
}

// 🎮 Interactive Demo
function interactiveDemo(): void {
  console.log("\n🎮 Interactive Boyer-Moore Algorithm Demo\n");

  const demo = (nums: number[]): void => {
    console.log(`🎯 Demonstrating Boyer-Moore with: [${nums.join(", ")}]`);
    console.log(
      `📊 Array length: ${nums.length}, Majority threshold: > ${Math.floor(
        nums.length / 2
      )}`
    );

    let candidate = nums[0];
    let count = 1;

    console.log(`\n🏁 Initial: candidate=${candidate}, count=${count}`);

    for (let i = 1; i < nums.length; i++) {
      const current = nums[i];

      if (current === candidate) {
        count++;
        console.log(
          `📈 Step ${i}: nums[${i}]=${current} equals candidate, count++ = ${count}`
        );
      } else {
        count--;
        console.log(
          `📉 Step ${i}: nums[${i}]=${current} differs, count-- = ${count}`
        );

        if (count === 0) {
          candidate = current;
          count = 1;
          console.log(`🔄 Count=0! New candidate=${candidate}, count=1`);
        }
      }

      console.log(`   State: candidate=${candidate}, count=${count}`);
    }

    console.log(`\n🎉 Final candidate: ${candidate}`);

    // Verification
    const actualCount = nums.filter((x) => x === candidate).length;
    console.log(
      `✅ Verification: ${candidate} appears ${actualCount}/${nums.length} times`
    );
    console.log(
      `📊 Is majority? ${
        actualCount > Math.floor(nums.length / 2) ? "YES ✅" : "NO ❌"
      }`
    );
  };

  // Demo with different examples
  const examples = [
    [3, 2, 3],
    [2, 2, 1, 1, 1, 2, 2],
    [1, 1, 1, 2, 2],
    [1, 2, 1, 3, 1, 4, 1],
  ];

  examples.forEach((example, index) => {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`📚 Example ${index + 1}:`);
    demo(example);
  });
}

// 🎯 Main execution
if (require.main === module) {
  console.log("🎯 LeetCode #169 - Majority Element\n");

  // Run all tests
  runTests();
  runEdgeCaseTests();
  runPerformanceTests();
  interactiveDemo();

  console.log("\n🎉 All tests completed!");
  console.log("\n💡 Key Insights:");
  console.log("   🥇 Boyer-Moore is optimal: O(n) time, O(1) space");
  console.log("   📊 HashMap is intuitive but uses O(n) space");
  console.log("   🔀 Sorting is simple but O(n log n) time");
  console.log("   🎲 Randomized has good expected performance");
  console.log("   🔢 Bitwise is clever but complex");
}

// Export all functions for testing
export {
  interactiveDemo,
  majorityElement,
  majorityElementBitwise,
  majorityElementDivideConquer,
  majorityElementHashMap,
  majorityElementRandom,
  majorityElementSort,
  majorityElementTwoPass,
  performanceComparison,
  runEdgeCaseTests,
  runPerformanceTests,
  runTests,
};
