/**
 * 🎯 LeetCode #55 - Jump Game
 *
 * Given an array of non-negative integers nums, you are initially positioned at the first index.
 * Each element in the array represents your maximum jump length at that position.
 *
 * Determine if you are able to reach the last index.
 *
 * @example
 * Input: nums = [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 * @example
 * Input: nums = [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum
 * jump length is 0, which makes it impossible to reach the last index.
 *
 * @constraints
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 10^5
 */

/**
 * 🌟 Approach 1: Greedy Algorithm (Optimal Solution)
 *
 * Key Insight: Track the farthest position we can reach as we iterate.
 * If at any point our current position exceeds the farthest reachable position,
 * we know we can't continue.
 *
 * Algorithm:
 * 1. Initialize farthest = 0 (farthest position we can reach)
 * 2. For each position i:
 *    - If i > farthest, return false (can't reach this position)
 *    - Update farthest = max(farthest, i + nums[i])
 *    - If farthest >= lastIndex, return true (can reach end)
 *
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(1) - Only using constant extra space
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJump(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let farthest = 0; // Farthest position we can reach
  const lastIndex = nums.length - 1;

  for (let i = 0; i < nums.length; i++) {
    // If current position is beyond what we can reach, impossible
    if (i > farthest) return false;

    // Update farthest position we can reach from current position
    farthest = Math.max(farthest, i + nums[i]!);

    // Early termination: if we can already reach the end
    if (farthest >= lastIndex) return true;
  }

  return farthest >= lastIndex;
}

/**
 * 🎯 Approach 2: Greedy with Detailed Tracking
 *
 * Similar to approach 1 but tracks more information for analysis.
 * Useful for understanding the jumping process and debugging.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpDetailed(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let farthest = 0;
  let currentReach = 0;
  const lastIndex = nums.length - 1;

  for (let i = 0; i < nums.length - 1; i++) {
    // No need to check last element
    // Update farthest position reachable
    farthest = Math.max(farthest, i + nums[i]!);

    // If we've used up current reach
    if (i === currentReach) {
      currentReach = farthest;

      // If current reach can't progress, we're stuck
      if (currentReach <= i) return false;
    }

    // Early success
    if (farthest >= lastIndex) return true;
  }

  return farthest >= lastIndex;
}

/**
 * 🔄 Approach 3: Dynamic Programming (Bottom-up)
 *
 * Uses DP to track reachability of each position.
 * More intuitive but less efficient than greedy approach.
 *
 * Algorithm:
 * 1. Create dp array where dp[i] = true if position i is reachable
 * 2. dp[0] = true (starting position)
 * 3. For each position i, if dp[i] is true:
 *    - Mark all positions i can jump to as reachable
 *
 * Time Complexity: O(n²) - Nested loops in worst case
 * Space Complexity: O(n) - DP array
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpDP(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  const n = nums.length;
  const dp = new Array(n).fill(false);
  dp[0] = true; // Starting position is always reachable

  for (let i = 0; i < n; i++) {
    if (!dp[i]) continue; // Skip unreachable positions

    // From position i, we can jump up to nums[i] steps
    const maxJump = Math.min(i + nums[i]!, n - 1);
    for (let j = i + 1; j <= maxJump; j++) {
      dp[j] = true;

      // Early termination if we reach the end
      if (j === n - 1) return true;
    }
  }

  return dp[n - 1];
}

/**
 * 🔄 Approach 4: Dynamic Programming (Optimized)
 *
 * Optimized version of DP that avoids nested loops by using
 * the farthest reachable position concept.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - DP array
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpDPOptimized(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  const n = nums.length;
  const dp = new Array(n).fill(false);
  dp[0] = true;
  let farthest = 0;

  for (let i = 0; i <= farthest && i < n; i++) {
    if (dp[i]) {
      const reach = i + nums[i]!;
      farthest = Math.max(farthest, reach);

      // Mark all reachable positions up to current farthest
      for (let j = i + 1; j <= Math.min(reach, n - 1); j++) {
        dp[j] = true;
      }

      if (farthest >= n - 1) return true;
    }
  }

  return dp[n - 1];
}

/**
 * ⏪ Approach 5: Backward Greedy
 *
 * Start from the end and work backwards to see if we can reach
 * the beginning. At each step, find if there's a position that
 * can jump to our current target.
 *
 * Time Complexity: O(n²) - Nested loops in worst case
 * Space Complexity: O(1) - Only using constant space
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpBackward(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let target = nums.length - 1; // Start from the last index

  // Work backwards through the array
  for (let i = nums.length - 2; i >= 0; i--) {
    // If from position i we can reach the current target
    if (i + nums[i]! >= target) {
      target = i; // Update target to current position
    }
  }

  // If we can reach the starting position, return true
  return target === 0;
}

/**
 * 🔍 Approach 6: BFS (Breadth-First Search)
 *
 * Treats the problem as a graph traversal where each position
 * is a node and jumps are edges. Uses BFS to find if end is reachable.
 *
 * Time Complexity: O(n²) - In worst case, visit all positions multiple times
 * Space Complexity: O(n) - Queue and visited set
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpBFS(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  const n = nums.length;
  const visited = new Set<number>();
  const queue: number[] = [0]; // Start from index 0

  while (queue.length > 0) {
    const current = queue.shift()!;

    // If we've reached the last index
    if (current === n - 1) return true;

    // If already visited this position, skip
    if (visited.has(current)) continue;
    visited.add(current);

    // Add all reachable positions to queue
    const maxJump = Math.min(current + nums[current]!, n - 1);
    for (let next = current + 1; next <= maxJump; next++) {
      if (!visited.has(next)) {
        queue.push(next);
      }
    }
  }

  return false;
}

/**
 * 🔍 Approach 7: DFS (Depth-First Search) with Memoization
 *
 * Recursive approach using DFS with memoization to avoid
 * recomputing the same subproblems.
 *
 * Time Complexity: O(n²) - Each position computed once, with n jumps max
 * Space Complexity: O(n) - Recursion stack and memoization
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpDFS(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  const memo = new Map<number, boolean>();

  function dfs(position: number): boolean {
    // Base cases
    if (position >= nums.length - 1) return true;
    if (nums[position]! === 0) return false;

    // Check memoization
    if (memo.has(position)) return memo.get(position)!;

    // Try all possible jumps from current position
    for (let jump = 1; jump <= nums[position]!; jump++) {
      if (dfs(position + jump)) {
        memo.set(position, true);
        return true;
      }
    }

    memo.set(position, false);
    return false;
  }

  return dfs(0);
}

/**
 * 📊 Approach 8: Interval Coverage
 *
 * Treats the problem as an interval coverage problem.
 * Each position creates an interval [i, i + nums[i]] that it can cover.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param nums Array of jump lengths
 * @returns Whether we can reach the last index
 */
export function canJumpInterval(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let coverage = 0; // Rightmost position we can cover
  const target = nums.length - 1;

  for (let i = 0; i <= coverage && i < nums.length; i++) {
    // Extend coverage from position i
    coverage = Math.max(coverage, i + nums[i]!);

    // Early termination if we can cover the target
    if (coverage >= target) return true;
  }

  return coverage >= target;
}

// 🎯 Performance Testing Functions

/**
 * Performance test runner for different algorithms
 * @param nums Input array for testing
 * @param iterations Number of iterations for timing
 */
export function performanceTest(
  nums: number[],
  iterations: number = 10000
): void {
  const algorithms = [
    { name: "Greedy (Optimal)", fn: canJump },
    { name: "Greedy Detailed", fn: canJumpDetailed },
    { name: "Dynamic Programming", fn: canJumpDP },
    { name: "DP Optimized", fn: canJumpDPOptimized },
    { name: "Backward Greedy", fn: canJumpBackward },
    { name: "BFS", fn: canJumpBFS },
    { name: "DFS + Memo", fn: canJumpDFS },
    { name: "Interval Coverage", fn: canJumpInterval },
  ];

  console.log(
    `\n🚀 Performance Test - ${nums.length} elements, ${iterations} iterations`
  );
  console.log("Input:", nums.slice(0, 10), nums.length > 10 ? "..." : "");

  algorithms.forEach(({ name, fn }) => {
    const start = performance.now();
    let result: boolean;

    for (let i = 0; i < iterations; i++) {
      result = fn([...nums]); // Copy array to ensure fair comparison
    }

    const end = performance.now();
    const avgTime = (end - start) / iterations;

    console.log(
      `${name.padEnd(20)}: ${avgTime.toFixed(4)}ms avg | Result: ${result!}`
    );
  });
}

/**
 * Generate test cases for performance analysis
 */
export function generateTestCases() {
  return {
    // Best case: all elements are large
    bestCase: Array.from({ length: 1000 }, () => 100),

    // Worst case: decreasing values that still allow reaching end
    worstCase: Array.from({ length: 1000 }, (_, i) => 1000 - i),

    // Average case: random values
    averageCase: Array.from(
      { length: 1000 },
      () => Math.floor(Math.random() * 50) + 1
    ),

    // Impossible case: contains zero that blocks progress
    impossibleCase: [2, 3, 1, 0, 4, 1, 1, 1],

    // Edge cases
    singleElement: [0],
    twoElements: [1, 1],
    largeJumps: [10000, 1, 1, 1, 1],
  };
}

// 🧪 Validation and Testing

/**
 * Validate that all algorithms produce the same result
 * @param nums Input array
 * @returns Whether all algorithms agree on the result
 */
export function validateAlgorithms(nums: number[]): boolean {
  const algorithms = [
    canJump,
    canJumpDetailed,
    canJumpDP,
    canJumpDPOptimized,
    canJumpBackward,
    canJumpBFS,
    canJumpDFS,
    canJumpInterval,
  ];

  const results = algorithms.map((fn) => fn([...nums]));
  const firstResult = results[0];

  // Check if all results are the same
  const allSame = results.every((result) => result === firstResult);

  if (!allSame) {
    console.error("❌ Algorithm mismatch detected!");
    console.error("Input:", nums);
    console.error("Results:", results);
  }

  return allSame;
}

/**
 * Comprehensive test suite runner
 */
export function runTests(): void {
  console.log("🧪 Running Jump Game Test Suite...\n");

  const testCases = [
    { name: "Basic True Case", input: [2, 3, 1, 1, 4], expected: true },
    { name: "Basic False Case", input: [3, 2, 1, 0, 4], expected: false },
    { name: "Single Element", input: [0], expected: true },
    { name: "Two Elements True", input: [1, 1], expected: true },
    { name: "Two Elements False", input: [0, 1], expected: false },
    {
      name: "Large Jumps",
      input: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expected: true,
    },
    { name: "Minimum Jumps", input: [1, 1, 1, 1, 1], expected: true },
    { name: "Blocked Path", input: [1, 0, 2, 3], expected: false },
    { name: "Just Enough", input: [2, 0, 0], expected: true },
    { name: "Zero Array", input: [0, 0, 0], expected: false },
  ];

  let passedTests = 0;

  testCases.forEach(({ name, input, expected }) => {
    console.log(`Testing: ${name}`);
    console.log(`Input: [${input.join(", ")}]`);

    const result = canJump(input);
    const isValid = validateAlgorithms(input);

    if (result === expected && isValid) {
      console.log(`✅ PASS - Result: ${result}`);
      passedTests++;
    } else {
      console.log(
        `❌ FAIL - Expected: ${expected}, Got: ${result}, Valid: ${isValid}`
      );
    }
    console.log("");
  });

  console.log(`\n📊 Test Results: ${passedTests}/${testCases.length} passed`);

  if (passedTests === testCases.length) {
    console.log("🎉 All tests passed! Running performance analysis...\n");

    const { bestCase, worstCase, averageCase } = generateTestCases();
    performanceTest(bestCase.slice(0, 100), 1000);
    performanceTest(worstCase.slice(0, 100), 1000);
    performanceTest(averageCase.slice(0, 100), 1000);
  }
}

// Export the main function as default
export default canJump;
