/**
 * 🎯 LeetCode #189 - Rotate Array
 * 
 * Problem Statement:
 * Given an integer array nums, rotate the array to the right by k steps, 
 * where k is non-negative.
 * 
 * Example 1:
 * Input: nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 * Explanation:
 * rotate 1 steps to the right: [7,1,2,3,4,5,6]
 * rotate 2 steps to the right: [6,7,1,2,3,4,5]
 * rotate 3 steps to the right: [5,6,7,1,2,3,4]
 * 
 * Example 2:
 * Input: nums = [-    start = 0, end = n - 1;
    while (start < end) {
      [nums[start], nums[end]] = [nums[end]!, nums[start]!];
      start++;
      end--;
    },3,99], k = 2
 * Output: [3,99,-1,-100]
 * Explanation: 
 * rotate 1 steps to the right: [99,-1,-100,3]
 * rotate 2 steps to the right: [3,99,-1,-100]
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - 0 <= k <= 10^5
 * - Try to come up with as many solutions as you can. There are at least 3 different ways to solve this problem.
 * - Could you do it in-place with O(1) extra memory?
 */

// 🌟 Solution 1: Three Reverses Approach - O(n) time, O(1) space (OPTIMAL!)
function rotate(nums: number[], k: number): void {
  const n = nums.length;

  // Handle edge cases
  if (n <= 1 || k === 0) return;

  // Normalize k to avoid unnecessary full rotations
  k = k % n;
  if (k === 0) return;

  // Helper function to reverse array segment
  function reverse(start: number, end: number): void {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end]!, nums[start]!];
      start++;
      end--;
    }
  }

  // Three reverses algorithm:
  // 1. Reverse entire array
  // 2. Reverse first k elements
  // 3. Reverse remaining n-k elements
  reverse(0, n - 1); // Reverse all
  reverse(0, k - 1); // Reverse first k
  reverse(k, n - 1); // Reverse rest
}

// 🔄 Solution 2: Cyclic Replacements - O(n) time, O(1) space
function rotateCyclic(nums: number[], k: number): void {
  const n = nums.length;
  if (n <= 1 || k === 0) return;

  k = k % n;
  if (k === 0) return;

  let count = 0; // Track how many elements we've moved

  for (let start = 0; count < n; start++) {
    let current = start;
    let prev = nums[start];

    do {
      // Calculate next position
      const next = (current + k) % n;

      // Swap elements
      const temp = nums[next]!;
      nums[next] = prev!;
      prev = temp;

      current = next;
      count++;
    } while (start !== current);
  }
}

// 📋 Solution 3: Extra Array - O(n) time, O(n) space
function rotateExtraArray(nums: number[], k: number): void {
  const n = nums.length;
  if (n <= 1 || k === 0) return;

  k = k % n;
  if (k === 0) return;

  // Create result array
  const result = new Array(n);

  // Place each element at its new position
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }

  // Copy back to original array
  for (let i = 0; i < n; i++) {
    nums[i] = result[i]!;
  }
}

// 🔀 Solution 4: Brute Force Rotation - O(n*k) time, O(1) space
function rotateBruteForce(nums: number[], k: number): void {
  const n = nums.length;
  if (n <= 1 || k === 0) return;

  k = k % n;

  // Rotate k times, each time rotate by 1
  for (let step = 0; step < k; step++) {
    // Store last element
    const last = nums[n - 1]!;

    // Shift all elements to the right by 1
    for (let i = n - 1; i > 0; i--) {
      nums[i] = nums[i - 1]!;
    }

    // Place last element at first position
    nums[0] = last;
  }
}

// 🌀 Solution 5: Recursive Rotation - O(n) time, O(k) space (recursion stack)
function rotateRecursive(nums: number[], k: number): void {
  const n = nums.length;
  if (n <= 1 || k === 0) return;

  k = k % n;
  if (k === 0) return;

  function rotateHelper(
    arr: number[],
    steps: number,
    start: number,
    moved: number
  ): void {
    if (moved === arr.length) return;

    const current = start;
    const next = (current + steps) % arr.length;
    const temp = arr[current]!;

    if (next === start) {
      // Cycle completed, move to next starting position
      rotateHelper(arr, steps, start + 1, moved + 1);
    } else {
      // Continue current cycle
      arr[current] = arr[next]!;
      rotateHelper(arr, steps, next, moved + 1);
    }

    arr[next] = temp;
  }

  rotateHelper(nums, k, 0, 0);
}

// 🎯 Solution 6: Block Swap Algorithm - O(n) time, O(1) space
function rotateBlockSwap(nums: number[], k: number): void {
  const n = nums.length;
  if (n <= 1 || k === 0) return;

  k = k % n;
  if (k === 0) return;

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function swap(arr: number[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }

  function blockSwap(
    arr: number[],
    firstStart: number,
    secondStart: number,
    size: number
  ): void {
    for (let i = 0; i < size; i++) {
      swap(arr, firstStart + i, secondStart + i);
    }
  }

  function rotateHelper(arr: number[], d: number, n: number): void {
    if (d === 0 || d === n) return;

    if (d === n - d) {
      // Both blocks have same size
      blockSwap(arr, 0, d, d);
    } else if (d < n - d) {
      // First block is smaller
      blockSwap(arr, 0, n - d, d);
      rotateHelper(arr, d, n - d);
    } else {
      // Second block is smaller
      blockSwap(arr, 0, d, n - d);
      rotateHelper(arr, 2 * d - n, d);
    }
  }

  // Convert right rotation to left rotation
  const leftRotation = n - k;
  rotateHelper(nums, leftRotation, n);
}

// 📊 Performance Comparison Function
function performanceComparison(nums: number[], k: number): void {
  console.log(`🎯 Testing Rotate Array algorithms`);
  console.log(
    `Array length: ${nums.length}, k: ${k} (effective: ${k % nums.length})`
  );
  console.log(
    `Array preview: [${nums.slice(0, 10).join(", ")}${
      nums.length > 10 ? "..." : ""
    }]`
  );

  const algorithms = [
    { name: "Three Reverses", fn: rotate, complexity: "O(n) time, O(1) space" },
    {
      name: "Cyclic Replacements",
      fn: rotateCyclic,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Extra Array",
      fn: rotateExtraArray,
      complexity: "O(n) time, O(n) space",
    },
    {
      name: "Brute Force",
      fn: rotateBruteForce,
      complexity: "O(n*k) time, O(1) space",
    },
    {
      name: "Block Swap",
      fn: rotateBlockSwap,
      complexity: "O(n) time, O(1) space",
    },
  ];

  algorithms.forEach(({ name, fn, complexity }) => {
    const testArray = [...nums]; // Create copy
    const start = performance.now();
    fn(testArray, k);
    const end = performance.now();

    console.log(
      `✅ ${name}: [${testArray.slice(0, 5).join(",")}...] (${(
        end - start
      ).toFixed(4)}ms) - ${complexity}`
    );
  });

  console.log("\n" + "=".repeat(80));
}

// 🧪 Test Cases
function runTests(): void {
  console.log("🧪 Running Rotate Array Tests...\n");

  const testCases = [
    {
      name: "Basic Case 1",
      input: [1, 2, 3, 4, 5, 6, 7],
      k: 3,
      expected: [5, 6, 7, 1, 2, 3, 4],
      description: "Standard rotation by 3 positions",
    },
    {
      name: "Basic Case 2",
      input: [-1, -100, 3, 99],
      k: 2,
      expected: [3, 99, -1, -100],
      description: "Rotation with negative numbers",
    },
    {
      name: "Single Element",
      input: [1],
      k: 1,
      expected: [1],
      description: "Single element array",
    },
    {
      name: "No Rotation",
      input: [1, 2, 3, 4],
      k: 0,
      expected: [1, 2, 3, 4],
      description: "k = 0, no rotation needed",
    },
    {
      name: "Full Rotation",
      input: [1, 2, 3, 4],
      k: 4,
      expected: [1, 2, 3, 4],
      description: "k equals array length (full rotation)",
    },
    {
      name: "Multiple Full Rotations",
      input: [1, 2, 3],
      k: 7,
      expected: [3, 1, 2],
      description: "k > n, effective k = 7 % 3 = 1",
    },
    {
      name: "Two Elements",
      input: [1, 2],
      k: 1,
      expected: [2, 1],
      description: "Minimal meaningful rotation",
    },
    {
      name: "Large k Value",
      input: [1, 2, 3, 4, 5],
      k: 12,
      expected: [4, 5, 1, 2, 3],
      description: "k much larger than n, effective k = 12 % 5 = 2",
    },
    {
      name: "Palindromic Array",
      input: [1, 2, 3, 2, 1],
      k: 2,
      expected: [2, 1, 1, 2, 3],
      description: "Symmetric array rotation",
    },
    {
      name: "All Same Elements",
      input: [1, 1, 1, 1],
      k: 2,
      expected: [1, 1, 1, 1],
      description: "All elements identical",
    },
  ];

  // Test main algorithm with each test case
  testCases.forEach(({ name, input, k, expected, description }, index) => {
    console.log(`\n📝 Test ${index + 1}: ${name}`);
    console.log(`📋 Description: ${description}`);
    console.log(`📥 Input: [${input.join(", ")}], k = ${k}`);
    console.log(`🎯 Expected: [${expected.join(", ")}]`);

    const testArray = [...input];
    rotate(testArray, k);

    const passed = JSON.stringify(testArray) === JSON.stringify(expected);
    console.log(`${passed ? "✅" : "❌"} Result: [${testArray.join(", ")}]`);
    console.log(`📊 Status: ${passed ? "🎉 PASSED" : "💥 FAILED"}`);
  });
}

// 🚀 Performance Tests
function runPerformanceTests(): void {
  console.log("\n🚀 Performance Testing...\n");

  // Test with different array sizes and k values
  const testConfigs = [
    { size: 100, k: 30 },
    { size: 1000, k: 300 },
    { size: 5000, k: 1500 },
    { size: 10000, k: 3000 },
  ];

  testConfigs.forEach(({ size, k }) => {
    console.log(`\n📏 Array Size: ${size}, k: ${k}`);

    // Create test array
    const testArray = Array.from({ length: size }, (_, i) => i + 1);

    performanceComparison(testArray, k);
  });
}

// 🎯 Edge Case Testing
function runEdgeCaseTests(): void {
  console.log("\n🎯 Edge Case Testing...\n");

  const edgeCases = [
    {
      name: "Minimum Size",
      input: [42],
      k: 100,
      description: "Single element with large k",
    },
    {
      name: "Two Elements Swap",
      input: [1, 2],
      k: 1,
      description: "Minimum meaningful rotation",
    },
    {
      name: "Zero Rotation",
      input: [1, 2, 3, 4, 5],
      k: 0,
      description: "No rotation needed",
    },
    {
      name: "Exact Full Rotation",
      input: [1, 2, 3],
      k: 6,
      description: "k is multiple of n (k = 2n)",
    },
    {
      name: "Large Array with Small k",
      input: Array.from({ length: 1000 }, (_, i) => i),
      k: 3,
      description: "Large array with minimal rotation",
    },
    {
      name: "Large Array with Large k",
      input: Array.from({ length: 100 }, (_, i) => i),
      k: 9999,
      description: "k much larger than array size",
    },
  ];

  edgeCases.forEach(({ name, input, k, description }) => {
    console.log(`\n🔍 Edge Case: ${name}`);
    console.log(`📋 ${description}`);
    console.log(`📥 Array length: ${input.length}, k: ${k}`);
    console.log(`📊 Effective k: ${k % input.length}`);

    try {
      const testArray = [...input];
      const originalArray = [...input];

      const start = performance.now();
      rotate(testArray, k);
      const end = performance.now();

      console.log(`✅ Execution time: ${(end - start).toFixed(4)}ms`);

      // Verify rotation correctness for small arrays
      if (input.length <= 10) {
        console.log(`📤 Original: [${originalArray.join(", ")}]`);
        console.log(`📤 Result: [${testArray.join(", ")}]`);
      }

      // Verify array length unchanged
      console.log(
        `📏 Length check: ${
          testArray.length === input.length ? "✅ Preserved" : "❌ Changed"
        }`
      );
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
  });
}

// 🎮 Interactive Demo
function interactiveDemo(): void {
  console.log("\n🎮 Interactive Three-Reverses Algorithm Demo\n");

  const demo = (nums: number[], k: number): void => {
    console.log(
      `🎯 Demonstrating Three Reverses with: [${nums.join(", ")}], k=${k}`
    );

    const n = nums.length;
    const originalArray = [...nums];
    const effectiveK = k % n;

    console.log(`📊 Array length: ${n}, effective k: ${effectiveK}`);

    if (effectiveK === 0) {
      console.log(`🔄 No rotation needed (k is multiple of array length)`);
      return;
    }

    console.log(`\n🎭 Step-by-step execution:`);

    // Helper function to show array state
    const showState = (arr: number[], step: string) => {
      console.log(`   ${step}: [${arr.join(", ")}]`);
    };

    // Step 1: Reverse entire array
    console.log(`\n🔄 Step 1: Reverse entire array [0...${n - 1}]`);
    showState(nums, "Before");

    let start = 0,
      end = n - 1;
    while (start < end) {
      [nums[start], nums[end]] = [nums[end]!, nums[start]!];
      start++;
      end--;
    }
    showState(nums, "After ");

    // Step 2: Reverse first k elements
    console.log(
      `\n🔄 Step 2: Reverse first ${effectiveK} elements [0...${
        effectiveK - 1
      }]`
    );
    showState(nums, "Before");

    (start = 0), (end = effectiveK - 1);
    while (start < end) {
      [nums[start], nums[end]] = [nums[end]!, nums[start]!];
      start++;
      end--;
    }
    showState(nums, "After ");

    // Step 3: Reverse remaining elements
    console.log(
      `\n🔄 Step 3: Reverse remaining elements [${effectiveK}...${n - 1}]`
    );
    showState(nums, "Before");

    (start = effectiveK), (end = n - 1);
    while (start < end) {
      [nums[start], nums[end]] = [nums[end]!, nums[start]!];
      start++;
      end--;
    }
    showState(nums, "After ");

    console.log(`\n🎉 Final result: [${nums.join(", ")}]`);
    console.log(`📋 Original:     [${originalArray.join(", ")}]`);
  };

  // Demo with different examples
  const examples = [
    { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
    { nums: [-1, -100, 3, 99], k: 2 },
    { nums: [1, 2], k: 1 },
    { nums: [1, 2, 3, 4, 5], k: 7 },
  ];

  examples.forEach((example, index) => {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`📚 Example ${index + 1}:`);
    demo([...example.nums], example.k);
  });
}

// 🔍 Algorithm Comparison Demo
function algorithmComparison(): void {
  console.log("\n🔍 Algorithm Comparison Demo\n");

  const testArray = [1, 2, 3, 4, 5, 6, 7];
  const k = 3;

  console.log(`📋 Test: Rotate [${testArray.join(", ")}] by ${k} positions\n`);

  const algorithms = [
    { name: "Three Reverses", fn: rotate },
    { name: "Cyclic Replacements", fn: rotateCyclic },
    { name: "Extra Array", fn: rotateExtraArray },
    { name: "Brute Force", fn: rotateBruteForce },
    { name: "Block Swap", fn: rotateBlockSwap },
  ];

  algorithms.forEach(({ name, fn }) => {
    const copy = [...testArray];
    console.log(`🔧 ${name}:`);
    console.log(`   Input:  [${copy.join(", ")}]`);

    const start = performance.now();
    fn(copy, k);
    const end = performance.now();

    console.log(`   Output: [${copy.join(", ")}]`);
    console.log(`   Time:   ${(end - start).toFixed(4)}ms\n`);
  });
}

// 🎯 Main execution
if (require.main === module) {
  console.log("🎯 LeetCode #189 - Rotate Array\n");

  // Run all tests
  runTests();
  runEdgeCaseTests();
  runPerformanceTests();
  interactiveDemo();
  algorithmComparison();

  console.log("\n🎉 All tests completed!");
  console.log("\n💡 Key Insights:");
  console.log("   🥇 Three Reverses is optimal: O(n) time, O(1) space");
  console.log("   🔄 Cyclic Replacements: Elegant mathematical approach");
  console.log("   📋 Extra Array: Simple but uses O(n) space");
  console.log("   🐌 Brute Force: Easy to understand but O(n*k) time");
  console.log("   🧮 Block Swap: Advanced technique for very large arrays");
}

// Export all functions for testing
export {
  algorithmComparison,
  interactiveDemo,
  performanceComparison,
  rotate,
  rotateBlockSwap,
  rotateBruteForce,
  rotateCyclic,
  rotateExtraArray,
  rotateRecursive,
  runEdgeCaseTests,
  runPerformanceTests,
  runTests,
};
