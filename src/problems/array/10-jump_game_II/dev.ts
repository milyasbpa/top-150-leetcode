/**
 * 🎮 Jump Game II - LeetCode #45
 *
 * Problem: Given an array of non-negative integers nums, you are initially positioned
 * at the first index of the array. Each element in the array represents your maximum
 * jump length at that position. Your goal is to reach the last index in the minimum
 * number of jumps.
 *
 * You can assume that you can always reach the last index.
 *
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 1000
 * - It's guaranteed that you can reach nums[n-1]
 *
 * Examples:
 * Input: nums = [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2.
 * Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 * Input: nums = [2,3,0,1,4]
 * Output: 2
 */

// ================================================================================================
// APPROACH 1: Greedy Algorithm with BFS-like Level Traversal (Optimal)
// ================================================================================================

/**
 * Greedy Algorithm - BFS-style level by level traversal
 *
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(1) - Only using a few variables
 *
 * Key Insight: Think of it as BFS levels. Each jump represents a level.
 * At each level, we track the farthest position reachable from current level.
 * When we must make a jump (reach end of current level), we increment jumps.
 *
 * Algorithm:
 * 1. Track current level's range [start, end]
 * 2. For all positions in current level, find farthest reachable position
 * 3. When we must leave current level, increment jumps and update level range
 * 4. Continue until we can reach the last index
 */
export function jump(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0; // Number of jumps made
  let currentEnd = 0; // End of current level/range
  let farthest = 0; // Farthest position reachable from current level

  // We don't need to process the last element since we're trying to reach it
  for (let i = 0; i < nums.length - 1; i++) {
    // Update farthest position reachable from current level
    farthest = Math.max(farthest, i + (nums[i] ?? 0));

    // If we've reached the end of current level, we must make a jump
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest; // Next level ends at farthest reachable position

      // Early termination: if we can already reach the end
      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
}

// ================================================================================================
// APPROACH 2: Greedy Algorithm - Alternative Implementation
// ================================================================================================

/**
 * Alternative Greedy Implementation
 *
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(1) - Constant space
 *
 * Same logic but slightly different implementation style.
 * More explicit about tracking jump boundaries.
 */
export function jumpAlternative(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let maxReach = 0; // Maximum position reachable so far
  let lastJumpEnd = 0; // Position where last jump ended

  for (let i = 0; i < nums.length - 1; i++) {
    maxReach = Math.max(maxReach, i + (nums[i] ?? 0));

    // If we've processed all positions reachable from previous jumps
    if (i === lastJumpEnd) {
      jumps++;
      lastJumpEnd = maxReach; // Update the boundary for next jump
    }
  }

  return jumps;
}

// ================================================================================================
// APPROACH 3: Dynamic Programming (Bottom-up)
// ================================================================================================

/**
 * Dynamic Programming Approach
 *
 * Time Complexity: O(n²) - Nested loops in worst case
 * Space Complexity: O(n) - DP array
 *
 * dp[i] = minimum jumps to reach position i
 * For each position, try all possible jumps and update reachable positions
 *
 * Good for understanding but not optimal for this problem.
 */
export function jumpDP(nums: number[]): number {
  if (nums.length <= 1) return 0;

  const n = nums.length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0; // Starting position requires 0 jumps

  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue; // Position not reachable

    // Try all possible jumps from position i
    const maxJump = Math.min(i + (nums[i] ?? 0), n - 1);
    for (let j = i + 1; j <= maxJump; j++) {
      dp[j] = Math.min(dp[j], dp[i] + 1);
    }
  }

  return dp[n - 1];
}

// ================================================================================================
// APPROACH 4: BFS (Breadth-First Search)
// ================================================================================================

/**
 * BFS Approach - Explicit level-by-level exploration
 *
 * Time Complexity: O(n) - Each position visited once
 * Space Complexity: O(n) - Queue for BFS
 *
 * Treats the problem as a graph where each position is a node
 * and edges represent valid jumps. BFS naturally finds minimum jumps.
 */
export function jumpBFS(nums: number[]): number {
  if (nums.length <= 1) return 0;

  const n = nums.length;
  let currentLevel = [0]; // Positions reachable in current number of jumps
  let jumps = 0;
  const visited = new Set<number>([0]);

  while (currentLevel.length > 0) {
    const nextLevel: number[] = [];

    // Explore all positions reachable from current level
    for (const pos of currentLevel) {
      // If we can reach the last index from this position
      if (pos + (nums[pos] ?? 0) >= n - 1) {
        return jumps + 1;
      }

      // Add all reachable positions to next level
      for (
        let next = pos + 1;
        next <= Math.min(pos + (nums[pos] ?? 0), n - 1);
        next++
      ) {
        if (!visited.has(next)) {
          visited.add(next);
          nextLevel.push(next);
        }
      }
    }

    currentLevel = nextLevel;
    jumps++;
  }

  return jumps;
}

// ================================================================================================
// APPROACH 5: Optimized BFS (Range-based)
// ================================================================================================

/**
 * Optimized BFS - Process ranges instead of individual positions
 *
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(1) - No additional data structures
 *
 * Instead of storing individual positions, we track ranges of positions
 * reachable at each level. This is essentially the same as greedy approach.
 */
export function jumpOptimizedBFS(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let currentStart = 0;
  let currentEnd = 0;

  while (currentEnd < nums.length - 1) {
    let nextEnd = currentEnd;

    // Find the farthest position reachable from current range
    for (let i = currentStart; i <= currentEnd; i++) {
      nextEnd = Math.max(nextEnd, i + (nums[i] ?? 0));
    }

    // If we can't extend our reach, we're stuck (shouldn't happen given constraints)
    if (nextEnd === currentEnd) break;

    jumps++;
    currentStart = currentEnd + 1;
    currentEnd = nextEnd;
  }

  return jumps;
}

// ================================================================================================
// APPROACH 6: Recursive with Memoization (Top-down DP)
// ================================================================================================

/**
 * Recursive approach with memoization
 *
 * Time Complexity: O(n²) - Each subproblem solved once
 * Space Complexity: O(n) - Recursion stack + memoization
 *
 * Top-down approach that breaks problem into subproblems.
 * memo[i] = minimum jumps to reach end from position i
 */
export function jumpRecursive(nums: number[]): number {
  if (nums.length <= 1) return 0;

  const memo = new Map<number, number>();

  function minJumpsFrom(position: number): number {
    // Base case: already at or past the last index
    if (position >= nums.length - 1) return 0;

    // Check memoization
    if (memo.has(position)) return memo.get(position)!;

    let minJumps = Infinity;

    // Try all possible jumps from current position
    for (let jump = 1; jump <= (nums[position] ?? 0); jump++) {
      const nextPos = position + jump;
      if (nextPos < nums.length) {
        const jumpsFromNext = minJumpsFrom(nextPos);
        if (jumpsFromNext !== Infinity) {
          minJumps = Math.min(minJumps, 1 + jumpsFromNext);
        }
      }
    }

    memo.set(position, minJumps);
    return minJumps;
  }

  return minJumpsFrom(0);
}

// ================================================================================================
// APPROACH 7: Backward Greedy (From End to Start)
// ================================================================================================

/**
 * Backward Greedy - Start from end and work backwards
 *
 * Time Complexity: O(n²) - For each position, scan backwards
 * Space Complexity: O(1) - Only using variables
 *
 * Start from the end and find positions that can reach current target.
 * Update target to the leftmost position that can reach it.
 * Continue until we reach the start.
 */
export function jumpBackward(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let target = nums.length - 1; // Current target position

  while (target > 0) {
    let leftmost = target;

    // Find the leftmost position that can reach current target
    for (let i = 0; i < target; i++) {
      if (i + (nums[i] ?? 0) >= target) {
        leftmost = i;
        break; // Found leftmost, no need to continue
      }
    }

    // If no position can reach target, impossible (shouldn't happen)
    if (leftmost === target) break;

    jumps++;
    target = leftmost; // New target is the leftmost position
  }

  return jumps;
}

// ================================================================================================
// APPROACH 8: Jump Game with Path Tracking
// ================================================================================================

/**
 * Enhanced version that also tracks the actual path taken
 *
 * Time Complexity: O(n) - Single pass with path reconstruction
 * Space Complexity: O(n) - Path storage in worst case
 *
 * Not only finds minimum jumps but also provides the actual sequence of jumps.
 * Useful for visualization and debugging.
 */
export interface JumpResult {
  minJumps: number;
  path: number[]; // Sequence of positions visited
  jumpSizes: number[]; // Size of each jump taken
}

export function jumpWithPath(nums: number[]): JumpResult {
  if (nums.length <= 1) {
    return { minJumps: 0, path: [0], jumpSizes: [] };
  }

  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;
  const path: number[] = [0];
  const jumpSizes: number[] = [];

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + (nums[i] ?? 0));

    if (i === currentEnd) {
      jumps++;

      // Find the position that allows us to reach farthest
      let bestJumpPos = currentEnd;
      let maxReach = currentEnd;

      const startPos = path[path.length - 1] ?? 0;
      for (let j = startPos; j <= currentEnd; j++) {
        if (j + (nums[j] ?? 0) > maxReach) {
          maxReach = j + (nums[j] ?? 0);
          bestJumpPos = j;
        }
      }

      // Record the jump
      if (bestJumpPos !== path[path.length - 1]) {
        path.push(bestJumpPos);
      }

      currentEnd = farthest;

      if (currentEnd >= nums.length - 1) {
        path.push(nums.length - 1);
        jumpSizes.push(nums.length - 1 - bestJumpPos);
        break;
      }
    }
  }

  // Calculate jump sizes
  for (let i = 1; i < path.length - 1; i++) {
    const current = path[i] ?? 0;
    const next = path[i + 1] ?? 0;
    jumpSizes.push(next - current);
  }

  return { minJumps: jumps, path, jumpSizes };
}

// ================================================================================================
// UTILITY FUNCTIONS
// ================================================================================================

/**
 * Validates if the given array allows reaching the end
 * (This should always be true given problem constraints)
 */
export function canReachEnd(nums: number[]): boolean {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + (nums[i] ?? 0));
    if (farthest >= nums.length - 1) return true;
  }

  return farthest >= nums.length - 1;
}

/**
 * Analyzes the jump game array and provides insights
 */
export interface JumpAnalysis {
  canReach: boolean;
  minJumps: number;
  criticalPositions: number[]; // Positions where jump is mandatory
  optimalPath: number[];
  alternativePaths: number[][];
}

export function analyzeJumpGame(nums: number[]): JumpAnalysis {
  const canReach = canReachEnd(nums);
  const minJumps = canReach ? jump(nums) : -1;
  const pathResult = canReach ? jumpWithPath(nums) : null;

  // Find critical positions (where jump is mandatory)
  const criticalPositions: number[] = [];
  let currentEnd = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    if (i === currentEnd) {
      criticalPositions.push(i);
      let farthest = 0;
      for (let j = 0; j <= i; j++) {
        farthest = Math.max(farthest, j + (nums[j] ?? 0));
      }
      currentEnd = farthest;
    }
  }

  return {
    canReach,
    minJumps,
    criticalPositions,
    optimalPath: pathResult?.path || [],
    alternativePaths: [], // Could be implemented to find multiple optimal paths
  };
}

/**
 * Performance comparison between different algorithms
 */
export function compareAlgorithms(nums: number[]): void {
  console.log("🎮 Jump Game II - Algorithm Performance Comparison");
  console.log("=".repeat(60));
  console.log(`Input: [${nums.join(", ")}]`);
  console.log(`Array Length: ${nums.length}`);
  console.log();

  const algorithms = [
    { name: "Greedy (Optimal)", fn: jump, complexity: "O(n)" },
    { name: "Greedy Alternative", fn: jumpAlternative, complexity: "O(n)" },
    { name: "Dynamic Programming", fn: jumpDP, complexity: "O(n²)" },
    { name: "BFS Explicit", fn: jumpBFS, complexity: "O(n)" },
    { name: "BFS Optimized", fn: jumpOptimizedBFS, complexity: "O(n)" },
    { name: "Recursive + Memo", fn: jumpRecursive, complexity: "O(n²)" },
    { name: "Backward Greedy", fn: jumpBackward, complexity: "O(n²)" },
  ];

  algorithms.forEach(({ name, fn, complexity }) => {
    const start = performance.now();
    const result = fn(nums);
    const end = performance.now();
    const time = (end - start).toFixed(4);

    console.log(
      `${name.padEnd(
        20
      )} | Result: ${result} | Time: ${time}ms | Complexity: ${complexity}`
    );
  });

  console.log();
  console.log("📊 Analysis:");
  const analysis = analyzeJumpGame(nums);
  console.log(`Can Reach End: ${analysis.canReach}`);
  console.log(`Minimum Jumps: ${analysis.minJumps}`);
  console.log(`Critical Positions: [${analysis.criticalPositions.join(", ")}]`);
  console.log(`Optimal Path: [${analysis.optimalPath.join(" → ")}]`);

  if (analysis.optimalPath.length > 0) {
    const pathResult = jumpWithPath(nums);
    console.log(`Jump Sizes: [${pathResult.jumpSizes.join(", ")}]`);
  }
}

// ================================================================================================
// DEMONSTRATION & TESTING
// ================================================================================================

if (require.main === module) {
  // Test cases from the problem
  const testCases = [
    [2, 3, 1, 1, 4], // Expected: 2
    [2, 3, 0, 1, 4], // Expected: 2
    [1, 2, 1, 1, 1], // Expected: 3
    [1, 2, 3], // Expected: 2
    [1, 1, 1, 1], // Expected: 3
    [2, 1], // Expected: 1
    [1], // Expected: 0
    [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3], // Expected: 2
  ];

  console.log("🚀 Jump Game II - Comprehensive Testing\n");

  testCases.forEach((nums, index) => {
    console.log(`\n🎯 Test Case ${index + 1}:`);
    compareAlgorithms(nums);
    console.log("-".repeat(80));
  });

  // Performance test with larger array
  console.log("\n⚡ Performance Test - Large Array:");
  const largeArray = Array.from(
    { length: 1000 },
    (_, i) => Math.floor(Math.random() * 10) + 1
  );

  console.log("Testing with 1000 element array...");
  const start = performance.now();
  const result = jump(largeArray);
  const end = performance.now();

  console.log(`Result: ${result} jumps`);
  console.log(`Time: ${(end - start).toFixed(4)}ms`);
  console.log(
    `Average time per element: ${((end - start) / largeArray.length).toFixed(
      6
    )}ms`
  );
}

/**
 * Example usage and explanations:
 *
 * const nums1 = [2, 3, 1, 1, 4];
 * console.log(jump(nums1)); // Output: 2
 *
 * Step-by-step for [2, 3, 1, 1, 4]:
 * - Start at index 0 (value 2): can reach indices 1, 2
 * - Jump 1: From index 0 to anywhere in range [1, 2]
 * - From range [1, 2]: index 1 (value 3) can reach up to index 4
 * - Jump 2: From index 1 to index 4 (end)
 * - Total: 2 jumps
 *
 * The key insight is that we don't need to decide exactly where to jump
 * at each step. Instead, we track ranges of positions reachable at each
 * jump level, similar to BFS levels in a graph.
 */
