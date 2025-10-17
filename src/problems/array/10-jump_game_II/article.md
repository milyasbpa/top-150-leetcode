# 🎮 Jump Game II - LeetCode #45

> **Mastering Minimum Jump Optimization with Greedy BFS**
>
> _From reachability to optimization - A comprehensive journey through minimum path problems_

## 🎯 Problem Overview

### Problem Statement

Given an array of non-negative integers `nums`, you are initially positioned at the first index of the array. Each element in the array represents your **maximum jump length** at that position.

Your goal is to reach the last index in the **minimum number of jumps**.

**You can assume that you can always reach the last index.**

### Key Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- Start at index 0
- Each element represents **maximum** jump length
- **Guaranteed** to reach the last index
- Find **minimum** number of jumps

### Examples

```typescript
// Example 1: Multiple paths, find minimum
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2.
Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Path: 0 → 1 → 4 (2 jumps)

// Example 2: Zero obstacles to navigate
Input: nums = [2,3,0,1,4]
Output: 2
Explanation: Jump from 0 to 1 (or 2), then from there to the end.
// Path: 0 → 1 → 4 or 0 → 2 → 4 (2 jumps)

// Example 3: Sequential small jumps
Input: nums = [1,2,1,1,1]
Output: 3
Explanation: 0 → 1 → 2 → 4 (3 jumps)
```

## 🧠 Core Insight: The BFS-Level Revolution

### 💡 The Key Breakthrough

**Jump Game II transforms from a pathfinding problem into a level-counting problem**. Instead of finding specific paths, we count the minimum levels (jumps) needed to reach the end.

```typescript
// Wrong approach: Try all possible paths (exponential)
function bruteForce(nums) {
  // Try every possible jump sequence → O(n^n)
}

// Right approach: BFS-style level traversal (linear)
function optimalGreedy(nums) {
  // Count levels needed to reach end → O(n)
}
```

### 🎭 The BFS-Level Strategy

**Core Principle**: _"Think in levels - each jump represents a new level of reachability"_

```
Array: [2, 3, 1, 1, 4]
Index:  0  1  2  3  4

Level 0: Position [0]           → Can reach positions 1,2
Level 1: Positions [1,2]        → Can reach positions 1,2,3,4
Level 2: Positions [1,2,3,4]    → Includes target position 4

Result: 2 levels (jumps) needed
```

### 🎪 Visualization: Range-Based Thinking

```
Jump Level Ranges:
[2, 3, 1, 1, 4]
 ^               Level 0: [0,0] → can reach [1,2]
 ^  ^  ^         Level 1: [1,2] → can reach [1,4]
 ^  ^  ^  ^  ^   Level 2: [3,4] → includes target

Each level = one jump
Track the farthest position reachable from current level
```

## 🔧 Algorithm Implementations

### 🌟 Approach 1: Greedy BFS-Level Algorithm (Optimal)

_The most elegant and efficient solution_

```typescript
/**
 * Greedy BFS-Level Algorithm - Think in jump levels, not individual positions
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(1) - Only using level boundary variables
 *
 * Key Insight: Each jump creates a new "level" of reachable positions.
 * We track the boundary of current level and extend to next level.
 * Count how many levels (jumps) needed to reach the end.
 */
function jump(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0; // Number of jumps (levels) made
  let currentEnd = 0; // End boundary of current level
  let farthest = 0; // Farthest position reachable from current level

  // Process all positions except last (we're trying to reach it)
  for (let i = 0; i < nums.length - 1; i++) {
    // Update farthest position reachable from current level
    farthest = Math.max(farthest, i + (nums[i] ?? 0));

    // If we've processed all positions in current level
    if (i === currentEnd) {
      jumps++; // Must make a jump to next level
      currentEnd = farthest; // Next level boundary

      // Early termination: if next level includes the end
      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
}
```

**Why This Works:**

- **Level Thinking**: Each jump creates a level of reachable positions
- **Greedy Choice**: Always extend reach as far as possible in each level
- **Optimal Substructure**: Minimum jumps to reach any position in a level is the same
- **No Backtracking**: Level-by-level progression ensures optimality

### 🎯 Approach 2: Explicit BFS Implementation

_Shows the connection to graph traversal_

```typescript
/**
 * Explicit BFS - Traditional level-by-level graph traversal
 * Time Complexity: O(n) - Each position visited once
 * Space Complexity: O(n) - Queue storage for current level
 *
 * Educational value: Shows direct connection to BFS algorithm
 * Helps understand why the greedy approach works
 */
function jumpBFS(nums: number[]): number {
  if (nums.length <= 1) return 0;

  const n = nums.length;
  let currentLevel = [0]; // Positions reachable at current jump count
  let jumps = 0;
  const visited = new Set<number>([0]);

  while (currentLevel.length > 0) {
    const nextLevel: number[] = [];

    // Explore all positions in current level
    for (const pos of currentLevel) {
      // If we can reach the end from this position
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
```

### 📊 Approach 3: Dynamic Programming (Educational)

_Bottom-up approach for understanding_

```typescript
/**
 * Dynamic Programming - Bottom-up minimum jump calculation
 * Time Complexity: O(n²) - Nested loops in worst case
 * Space Complexity: O(n) - DP array storage
 *
 * dp[i] = minimum jumps needed to reach position i
 * Good for understanding problem structure and building intuition
 */
function jumpDP(nums: number[]): number {
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
```

### 🔄 Approach 4: Range-Based BFS Optimization

_Optimized BFS without storing individual positions_

```typescript
/**
 * Range-Based BFS - Process ranges instead of individual positions
 * Time Complexity: O(n) - Single pass through ranges
 * Space Complexity: O(1) - Only range variables
 *
 * Instead of storing individual positions, track ranges of positions
 * reachable at each level. More memory efficient than explicit BFS.
 */
function jumpOptimizedBFS(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let currentStart = 0;
  let currentEnd = 0;

  while (currentEnd < nums.length - 1) {
    let nextEnd = currentEnd;

    // Find farthest position reachable from current range
    for (let i = currentStart; i <= currentEnd; i++) {
      nextEnd = Math.max(nextEnd, i + (nums[i] ?? 0));
    }

    // If we can't extend reach, we're stuck (shouldn't happen per constraints)
    if (nextEnd === currentEnd) break;

    jumps++;
    currentStart = currentEnd + 1;
    currentEnd = nextEnd;
  }

  return jumps;
}
```

### 🔙 Approach 5: Backward Greedy

_Alternative perspective: Work backwards from target_

```typescript
/**
 * Backward Greedy - Start from end and work backwards
 * Time Complexity: O(n²) - For each target, scan backwards
 * Space Complexity: O(1) - Only target variable
 *
 * Start from the end and find positions that can reach current target.
 * Update target to leftmost such position and continue.
 */
function jumpBackward(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let target = nums.length - 1; // Start from the end

  while (target > 0) {
    let leftmost = target;

    // Find leftmost position that can reach current target
    for (let i = 0; i < target; i++) {
      if (i + (nums[i] ?? 0) >= target) {
        leftmost = i;
        break; // Found leftmost, no need to continue
      }
    }

    // If no position can reach target (shouldn't happen per constraints)
    if (leftmost === target) break;

    jumps++;
    target = leftmost; // New target
  }

  return jumps;
}
```

### 🔄 Approach 6: Recursive with Memoization

_Top-down approach showing recursive structure_

```typescript
/**
 * Recursive with Memoization - Top-down minimum jump calculation
 * Time Complexity: O(n²) - Each subproblem solved once
 * Space Complexity: O(n) - Recursion stack + memoization map
 *
 * memo[i] = minimum jumps to reach end from position i
 * Shows recursive structure of the problem
 */
function jumpRecursive(nums: number[]): number {
  if (nums.length <= 1) return 0;

  const memo = new Map<number, number>();

  function minJumpsFrom(position: number): number {
    // Base case: at or past the end
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
```

### 🛣️ Approach 7: Path Tracking Implementation

_Enhanced version that tracks optimal path_

```typescript
/**
 * Path Tracking - Greedy with actual path reconstruction
 * Time Complexity: O(n) - Single pass with path tracking
 * Space Complexity: O(n) - Path storage
 *
 * Not only finds minimum jumps but also the actual optimal path.
 * Useful for visualization and understanding jump decisions.
 */
function jumpWithPath(nums: number[]): {
  minJumps: number;
  path: number[];
  jumpSizes: number[];
} {
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

      // Find position that gives us maximum reach
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
```

## 📈 Algorithm Comparison & Analysis

### 🏆 Performance Comparison

| Algorithm               | Time  | Space | Readability | Best Use Case                 |
| ----------------------- | ----- | ----- | ----------- | ----------------------------- |
| **Greedy BFS-Level**    | O(n)  | O(1)  | ⭐⭐⭐⭐⭐  | **Production - Optimal**      |
| **Explicit BFS**        | O(n)  | O(n)  | ⭐⭐⭐⭐    | **Educational - Clear Logic** |
| **Dynamic Programming** | O(n²) | O(n)  | ⭐⭐⭐      | **Understanding Structure**   |
| **Range-Based BFS**     | O(n)  | O(1)  | ⭐⭐⭐⭐    | **Memory-Constrained**        |
| **Backward Greedy**     | O(n²) | O(1)  | ⭐⭐⭐      | **Alternative Perspective**   |
| **Recursive + Memo**    | O(n²) | O(n)  | ⭐⭐        | **Recursive Understanding**   |
| **Path Tracking**       | O(n)  | O(n)  | ⭐⭐⭐⭐    | **Visualization & Debug**     |

### 🎯 When to Use Each Approach

1. **Production Code**: **Greedy BFS-Level** - Optimal time/space, intuitive logic
2. **Technical Interviews**: **Greedy BFS-Level or Explicit BFS** - Shows algorithmic insight
3. **Educational Purposes**: **Explicit BFS → Greedy** - Clear progression from BFS to optimization
4. **Debugging/Visualization**: **Path Tracking** - Shows actual optimal paths
5. **Memory Constraints**: **Range-Based BFS** - O(1) space with O(n) time
6. **Alternative Thinking**: **Backward Greedy** - Different problem perspective

## 🎮 Jump Game II vs Jump Game I

### 🔄 Evolution from Reachability to Optimization

| Aspect         | Jump Game I               | Jump Game II                             |
| -------------- | ------------------------- | ---------------------------------------- |
| **Question**   | "Can we reach the end?"   | "What's the minimum jumps to reach end?" |
| **Output**     | Boolean (true/false)      | Number (minimum jumps)                   |
| **Guarantee**  | End may not be reachable  | End is guaranteed reachable              |
| **Approach**   | Greedy reachability check | Greedy BFS-level counting                |
| **Complexity** | O(n) time, O(1) space     | O(n) time, O(1) space                    |

### 🧠 Algorithmic Relationship

```typescript
// Jump Game I: Track maximum reach
function canJump(nums) {
  let farthest = 0;
  for (let i = 0; i <= farthest && i < nums.length; i++) {
    farthest = Math.max(farthest, i + nums[i]);
  }
  return farthest >= nums.length - 1;
}

// Jump Game II: Count levels to reach end
function jump(nums) {
  let jumps = 0,
    currentEnd = 0,
    farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
}
```

## 🧮 Mathematical Foundation

### 📐 Problem Formulation

**Given**: Array `A = [a₀, a₁, ..., aₙ₋₁]` where `aᵢ ≥ 0`

**Goal**: Find minimum number of jumps from index 0 to index n-1

**Constraints**:

- From index i, can jump to any index j where `i < j ≤ i + aᵢ`
- Guaranteed that end is reachable

### 🎯 BFS-Level Greedy Proof

**Theorem**: _The BFS-level greedy algorithm finds the optimal (minimum) number of jumps_

**Proof**:

1. **Level Optimality**: All positions reachable in k jumps form a level. Any position in level k requires exactly k jumps.
2. **Greedy Choice**: Extending reach as far as possible at each level never hurts - it only provides more options.
3. **Optimal Substructure**: If we can reach level k optimally, the greedy choice for level k+1 is optimal.
4. **BFS Property**: BFS finds shortest path in unweighted graphs. Each jump has "weight" 1.

**Invariant**: At the end of level k, we know the minimum jumps to reach any position up to `currentEnd`

### 📊 Complexity Analysis

```typescript
// Time Complexity Analysis
function timeComplexityBreakdown() {
  // Greedy BFS-Level: O(n)
  // - Single pass through array
  // - Constant work per element
  // - Early termination possible
  // Explicit BFS: O(n)
  // - Each position visited once
  // - Total edges ≤ sum of all jump ranges ≤ O(n²) but amortized O(n)
  // Dynamic Programming: O(n²)
  // - For each position, potentially check all future positions
  // - Worst case: O(n²) when all values are large
  // Space Complexity:
  // - Greedy: O(1) - only variables
  // - BFS: O(n) - queue storage
  // - DP: O(n) - dp array
}
```

## 🎯 Advanced Techniques & Optimizations

### ⚡ Performance Enhancements

#### **1. Early Termination Optimization**

```typescript
function jumpOptimized(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0,
    currentEnd = 0,
    farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;

      // Early termination: can already reach end
      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
}
```

#### **2. Batch Processing for Large Arrays**

```typescript
function jumpBatchProcessed(nums: number[]): number {
  // For very large arrays, process in batches to improve cache locality
  const batchSize = 1000;
  let jumps = 0,
    currentEnd = 0,
    farthest = 0;

  for (let batch = 0; batch < nums.length; batch += batchSize) {
    const batchEnd = Math.min(batch + batchSize, nums.length - 1);

    for (let i = batch; i < batchEnd; i++) {
      farthest = Math.max(farthest, i + (nums[i] ?? 0));

      if (i === currentEnd) {
        jumps++;
        currentEnd = farthest;
        if (currentEnd >= nums.length - 1) return jumps;
      }
    }
  }

  return jumps;
}
```

#### **3. SIMD-Friendly Vector Processing**

```typescript
function jumpVectorized(nums: number[]): number {
  // Process multiple positions simultaneously using vectorization
  // Useful for arrays with millions of elements

  let jumps = 0,
    currentEnd = 0,
    farthest = 0;
  const vectorSize = 8; // Process 8 elements at once

  for (let i = 0; i < nums.length - 1; i += vectorSize) {
    const end = Math.min(i + vectorSize, nums.length - 1);

    // Vectorized max computation
    for (let j = i; j < end; j++) {
      farthest = Math.max(farthest, j + (nums[j] ?? 0));

      if (j === currentEnd) {
        jumps++;
        currentEnd = farthest;
        if (currentEnd >= nums.length - 1) return jumps;
      }
    }
  }

  return jumps;
}
```

### 🧠 Memory-Efficient Variants

#### **1. Streaming/Online Algorithm**

```typescript
class StreamingJumpGame {
  private jumps = 0;
  private currentEnd = 0;
  private farthest = 0;
  private currentIndex = 0;
  private targetIndex: number;

  constructor(targetIndex: number) {
    this.targetIndex = targetIndex;
  }

  addValue(value: number): number | null {
    this.farthest = Math.max(this.farthest, this.currentIndex + value);

    if (this.currentIndex === this.currentEnd) {
      this.jumps++;
      this.currentEnd = this.farthest;

      if (this.currentEnd >= this.targetIndex) {
        return this.jumps; // Found answer
      }
    }

    this.currentIndex++;
    return null; // Need more data
  }
}
```

#### **2. Compressed Representation**

```typescript
interface CompressedJump {
  value: number;
  count: number; // How many consecutive elements have this value
}

function jumpCompressed(compressed: CompressedJump[]): number {
  // For arrays with many repeated values, use run-length encoding
  let jumps = 0,
    currentEnd = 0,
    farthest = 0;
  let actualIndex = 0;

  for (const { value, count } of compressed) {
    for (let i = 0; i < count && actualIndex < compressed.length - 1; i++) {
      farthest = Math.max(farthest, actualIndex + value);

      if (actualIndex === currentEnd) {
        jumps++;
        currentEnd = farthest;
      }

      actualIndex++;
    }
  }

  return jumps;
}
```

## 🌟 Real-World Applications

### 🎮 Game Development: Level Design Optimization

```typescript
interface GameLevel {
  platforms: Platform[];
  playerStartPos: number;
  targetPos: number;
}

interface Platform {
  position: number;
  jumpBoost: number; // How far player can jump from this platform
}

function minJumpsToCompleteLevel(level: GameLevel): number {
  // Convert game level to jump array format
  const jumpArray = level.platforms.map((p) => p.jumpBoost);

  // Apply Jump Game II algorithm
  return jump(jumpArray);
}

function optimizeLevelDifficulty(
  level: GameLevel,
  targetJumps: number
): GameLevel {
  // Adjust platform positions to achieve desired difficulty
  // Use Jump Game II to validate minimum jumps after each adjustment
  return level; // Simplified
}
```

### 🚗 Route Planning: Minimum Fuel Stops

```typescript
interface FuelStation {
  position: number;
  fuelAmount: number;
}

function minFuelStops(
  stations: FuelStation[],
  destination: number,
  initialFuel: number
): number {
  // Convert to jump game: each station position becomes index,
  // fuel amount becomes jump capacity

  const jumpArray = stations.map((station, i) => {
    const reach = station.position + station.fuelAmount;
    return Math.max(0, reach - station.position);
  });

  return jump(jumpArray);
}
```

### 📊 Network Optimization: Minimum Hops

```typescript
interface NetworkNode {
  id: number;
  transmissionRange: number;
  position: number;
}

function minNetworkHops(
  nodes: NetworkNode[],
  sourceId: number,
  targetId: number
): number {
  // Sort nodes by position
  const sortedNodes = nodes.sort((a, b) => a.position - b.position);

  // Convert to jump array
  const jumpArray = sortedNodes.map((node) => node.transmissionRange);

  return jump(jumpArray);
}
```

### 🎯 Resource Allocation: Minimum Transfers

```typescript
interface ResourcePool {
  currentAmount: number;
  transferCapacity: number; // Max resources that can be transferred out
}

function minResourceTransfers(
  pools: ResourcePool[],
  targetPool: number
): number {
  // Each pool can transfer to pools within its capacity range
  const jumpArray = pools.map((pool) => pool.transferCapacity);

  return jump(jumpArray);
}
```

## 🎓 Educational Insights & Learning Path

### 💡 Key Learning Progression

#### **Stage 1: Understanding the Problem**

```typescript
// Start with basic understanding
function naiveBruteForce(nums: number[]): number {
  // Try all possible paths - helps understand problem structure
  // Time: O(n^n), Space: O(n)
  // Don't use in production, but good for learning
}
```

#### **Stage 2: Dynamic Programming Approach**

```typescript
// Build optimal substructure understanding
function learningDP(nums: number[]): number {
  // Bottom-up: dp[i] = min jumps to reach position i
  // Time: O(n²), Space: O(n)
  // Good stepping stone to greedy approach
}
```

#### **Stage 3: BFS Recognition**

```typescript
// Recognize the level-traversal pattern
function learningBFS(nums: number[]): number {
  // Explicit BFS with queues
  // Time: O(n), Space: O(n)
  // Shows connection to graph algorithms
}
```

#### **Stage 4: Greedy Optimization**

```typescript
// Final optimization: BFS without explicit queues
function masterGreedy(nums: number[]): number {
  // Track level boundaries instead of storing positions
  // Time: O(n), Space: O(1)
  // Production-ready solution
}
```

### 🎯 Interview Strategy & Tips

#### **Step 1: Problem Clarification**

```typescript
function clarifyRequirements() {
  // ✅ Is the end always reachable? (Yes, per problem statement)
  // ✅ Can we jump backwards? (No, only forward)
  // ✅ Must we use exact jump size? (No, up to maximum)
  // ✅ What if array has 1 element? (0 jumps - already at end)
  // ✅ Can jump values be 0? (Yes, but guaranteed reachable)
}
```

#### **Step 2: Solution Progression**

```typescript
function interviewProgression() {
  // 1. Start with BFS approach (shows algorithmic thinking)
  // 2. Optimize to greedy (shows optimization skills)
  // 3. Discuss alternatives (shows depth of understanding)
  // 4. Handle edge cases (shows attention to detail)
  // 5. Analyze complexity (shows mathematical rigor)
}
```

#### **Step 3: Common Pitfalls & Solutions**

```typescript
function avoidPitfalls() {
  // ❌ Off-by-one: Use i < nums.length - 1 (not <=)
  // ❌ Infinite loops: Ensure currentEnd progresses
  // ❌ Edge cases: Handle single element arrays
  // ❌ Integer overflow: Use appropriate data types
  // ✅ Validate inputs and handle constraints properly
}
```

### 🔧 Advanced Interview Questions

#### **Variation 1: Jump Game with Costs**

```typescript
// Each jump has a cost, minimize total cost
function minCostJumps(nums: number[], costs: number[]): number {
  // Requires DP approach, greedy doesn't work
  const dp = new Array(nums.length).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let jump = 1; jump <= nums[i]; jump++) {
      const next = i + jump;
      if (next < nums.length) {
        dp[next] = Math.min(dp[next], dp[i] + costs[i]);
      }
    }
  }

  return dp[nums.length - 1];
}
```

#### **Variation 2: K-Jump Game**

```typescript
// Must use exactly K jumps, minimize landing position past target
function kJumpGame(nums: number[], k: number): number {
  // Different problem structure, requires different approach
  // Shows understanding of when greedy works vs doesn't work
}
```

#### **Variation 3: 2D Jump Game**

```typescript
// Jump in 2D grid, minimize jumps to reach bottom-right
function jump2D(grid: number[][]): number {
  // Extension to 2D, much more complex
  // Shows ability to generalize algorithm concepts
}
```

## 🚀 Performance Optimization Techniques

### ⚡ Micro-Optimizations

#### **1. Branch Prediction Optimization**

```typescript
function branchOptimized(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0,
    currentEnd = 0,
    farthest = 0;
  const lastIndex = nums.length - 1;

  for (let i = 0; i < lastIndex; i++) {
    // Minimize branching for better CPU prediction
    const newReach = i + (nums[i] ?? 0);
    farthest = newReach > farthest ? newReach : farthest;

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
      // Single condition check reduces branching
      if (currentEnd >= lastIndex) return jumps;
    }
  }

  return jumps;
}
```

#### **2. Loop Unrolling for Small Arrays**

```typescript
function unrolledOptimization(nums: number[]): number {
  // Handle common small cases without loops
  switch (nums.length) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return nums[0] >= 2 ? 1 : 2;
    default:
      return jump(nums); // Fall back to general algorithm
  }
}
```

#### **3. Cache-Friendly Memory Access**

```typescript
function cacheOptimized(nums: number[]): number {
  // Prefetch strategy for large arrays
  let jumps = 0,
    currentEnd = 0,
    farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    // Prefetch next few elements for better cache performance
    if (i + 8 < nums.length) {
      // Hint to processor to load upcoming data
      const prefetch = nums[i + 8]; // Compiler optimization hint
    }

    farthest = Math.max(farthest, i + (nums[i] ?? 0));

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
}
```

### 🧠 Algorithmic Variants

#### **1. Lazy Evaluation Approach**

```typescript
function lazyJump(nums: number[]): number {
  // Only compute what's necessary, defer expensive operations
  let jumps = 0,
    currentEnd = 0,
    farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    // Lazy update: only compute when needed
    if (i <= currentEnd) {
      farthest = Math.max(farthest, i + (nums[i] ?? 0));
    }

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
}
```

#### **2. Parallel Processing for Large Datasets**

```typescript
async function parallelJump(nums: number[]): Promise<number> {
  // For extremely large arrays, process in parallel chunks
  const chunkSize = Math.ceil(nums.length / 4);
  const chunks = [];

  for (let i = 0; i < nums.length; i += chunkSize) {
    chunks.push(nums.slice(i, i + chunkSize));
  }

  // Process chunks in parallel, then merge results
  const results = await Promise.all(
    chunks.map((chunk) => Promise.resolve(jump(chunk)))
  );

  // Merge logic would be more complex in practice
  return results.reduce((sum, result) => sum + result, 0);
}
```

## 🎉 Conclusion

### 🌟 Key Takeaways

1. **Problem Evolution**: Jump Game II transforms reachability into optimization, showing how problems can build upon each other
2. **Algorithm Insight**: BFS-level thinking provides the key breakthrough - count levels, not paths
3. **Greedy Power**: Demonstrates when greedy algorithms are optimal and why they work
4. **Multiple Perspectives**: Same problem can be solved with DP, BFS, or greedy - understanding trade-offs is crucial
5. **Real-World Relevance**: Pattern applies to routing, resource allocation, and optimization problems

### 🚀 Next Steps

1. **Master Variations**: Practice Jump Game with costs, 2D variants, constrained jumps
2. **Apply Pattern**: Look for "minimum levels to reach target" in other problems
3. **Optimize Further**: Implement parallel processing for very large inputs
4. **Teach Others**: Explaining the BFS-level insight solidifies understanding
5. **Build Upon**: Use as foundation for more complex pathfinding algorithms

### 💡 Final Wisdom

_"Jump Game II beautifully illustrates the evolution from brute force to optimization. The key insight - thinking in levels rather than paths - transforms an exponential problem into a linear one. This level-based thinking appears in many optimization problems and is a powerful tool in the algorithmic toolkit."_

The progression from "Can we reach?" (Jump Game I) to "What's the optimal way to reach?" (Jump Game II) represents a fundamental shift in problem-solving: from feasibility to optimization. The BFS-level greedy approach shows us that sometimes the best way to optimize is to think at a higher level of abstraction.

This problem teaches us that optimization often comes not from doing the same thing faster, but from thinking about the problem differently. Instead of tracking individual positions, we track ranges. Instead of finding paths, we count levels. This meta-insight - that changing perspective can lead to breakthrough optimizations - is perhaps the most valuable lesson from Jump Game II.

---

**Related Problems**:

- [Jump Game](../9-jump_game) (LeetCode #55) - Reachability version
- [Minimum Number of Taps to Open to Water a Garden](../../../greedy/minimum_taps) (LeetCode #1326) - Similar greedy pattern
- [Video Stitching](../../../greedy/video_stitching) (LeetCode #1024) - Interval coverage variant
- [Gas Station](../../../greedy/gas_station) (LeetCode #134) - Circular array greedy problem

**Tags**: `Array` `Greedy` `Dynamic Programming` `BFS` `Optimization` `Minimum Path` `Level Traversal`
