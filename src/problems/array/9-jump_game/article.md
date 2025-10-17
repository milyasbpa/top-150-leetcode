# 🎮 Jump Game - LeetCode #55

> **Mastering Array Traversal with Greedy Algorithm**
>
> _From brute force to optimal greedy - A comprehensive journey through reachability problems_

## 🎯 Problem Overview

### Problem Statement

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your **maximum jump length** at that position.

Return `true` if you can reach the last index, or `false` otherwise.

### Key Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`
- Start at index 0
- Each element represents **maximum** jump length
- Must reach the last index (nums.length - 1)

### Examples

```typescript
// Example 1: Multiple valid paths
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Path: 0 → 1 → 4 (indices)

// Example 2: Blocked by zero
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum
jump length is 0, which makes it impossible to reach the last index.

// Example 3: Single element (already at end)
Input: nums = [0]
Output: true
Explanation: Already at the last index.
```

## 🧠 Core Insight: The Greedy Revolution

### 💡 The Key Breakthrough

**Jump Game is fundamentally about reachability, not path finding**. We don't need to find the actual jumps—we just need to know if the end is reachable.

```typescript
// Wrong approach: Try to find specific path
// This leads to exponential complexity

// Right approach: Track farthest reachable position
// This gives us linear time solution
```

### 🎭 The Greedy Strategy

**Core Principle**: _"Track the farthest position reachable so far"_

```
Array: [2, 3, 1, 1, 4]
Index:  0  1  2  3  4

Step by step:
- At index 0: can reach up to index 0+2=2, farthest = 2
- At index 1: can reach up to index 1+3=4, farthest = 4
- At index 2: can reach up to index 2+1=3, farthest = 4
- At index 3: can reach up to index 3+1=4, farthest = 4
- Since farthest >= 4 (last index), return true
```

## 🔧 Algorithm Implementations

### 🌟 Approach 1: Greedy Algorithm (Optimal)

_The most elegant and efficient solution_

```typescript
/**
 * Greedy Algorithm - Track farthest reachable position
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(1) - Only using farthest variable
 *
 * Key Insight: If we can reach position i, and from i we can jump
 * nums[i] steps, then we can reach any position up to i + nums[i]
 */
function canJump(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let farthest = 0; // Farthest position we can reach
  const lastIndex = nums.length - 1;

  for (let i = 0; i < nums.length; i++) {
    // If current position is beyond what we can reach, impossible
    if (i > farthest) return false;

    // Update farthest position we can reach from current position
    farthest = Math.max(farthest, i + nums[i]);

    // Early termination: if we can already reach the end
    if (farthest >= lastIndex) return true;
  }

  return farthest >= lastIndex;
}
```

**Why This Works:**

- **Greedy Choice**: Always extend our reach as far as possible
- **Optimal Substructure**: If we can reach position i optimally, we can make optimal decisions from i
- **No Backtracking**: We never need to reconsider previous decisions

### 🎯 Approach 2: Backward Greedy

_Alternative perspective: Start from end and work backwards_

```typescript
/**
 * Backward Greedy - Start from target and work backwards
 * Time Complexity: O(n) - Single pass backwards
 * Space Complexity: O(1) - Only using target variable
 *
 * Insight: If we can reach the end from some position i,
 * then reaching i becomes our new goal
 */
function canJumpBackward(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let target = nums.length - 1; // Start from the last index

  // Work backwards through the array
  for (let i = nums.length - 2; i >= 0; i--) {
    // If from position i we can reach the current target
    if (i + nums[i] >= target) {
      target = i; // Update target to current position
    }
  }

  // If we can reach the starting position, return true
  return target === 0;
}
```

### 📊 Approach 3: Dynamic Programming (Educational)

_More intuitive but less efficient approach_

```typescript
/**
 * Dynamic Programming - Track reachability of each position
 * Time Complexity: O(n²) - Nested loops in worst case
 * Space Complexity: O(n) - DP array
 *
 * Good for understanding the problem structure
 */
function canJumpDP(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  const n = nums.length;
  const dp = new Array(n).fill(false);
  dp[0] = true; // Starting position is always reachable

  for (let i = 0; i < n; i++) {
    if (!dp[i]) continue; // Skip unreachable positions

    // From position i, we can jump up to nums[i] steps
    const maxJump = Math.min(i + nums[i], n - 1);
    for (let j = i + 1; j <= maxJump; j++) {
      dp[j] = true;

      // Early termination if we reach the end
      if (j === n - 1) return true;
    }
  }

  return dp[n - 1];
}
```

### 🔍 Approach 4: BFS (Graph Perspective)

_Treats problem as graph traversal_

```typescript
/**
 * BFS Approach - Graph traversal perspective
 * Time Complexity: O(n²) - Visit all positions and edges
 * Space Complexity: O(n) - Queue and visited set
 *
 * Educational value: Shows connection to graph problems
 */
function canJumpBFS(nums: number[]): boolean {
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
    const maxJump = Math.min(current + nums[current], n - 1);
    for (let next = current + 1; next <= maxJump; next++) {
      if (!visited.has(next)) {
        queue.push(next);
      }
    }
  }

  return false;
}
```

### 🔄 Approach 5: DFS with Memoization

_Recursive approach with optimization_

```typescript
/**
 * DFS with Memoization - Top-down recursive approach
 * Time Complexity: O(n²) - Each position computed once
 * Space Complexity: O(n) - Recursion stack and memoization
 *
 * Shows recursive structure of the problem
 */
function canJumpDFS(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  const memo = new Map<number, boolean>();

  function dfs(position: number): boolean {
    // Base cases
    if (position >= nums.length - 1) return true;
    if (nums[position] === 0) return false;

    // Check memoization
    if (memo.has(position)) return memo.get(position)!;

    // Try all possible jumps from current position
    for (let jump = 1; jump <= nums[position]; jump++) {
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
```

## 📈 Algorithm Comparison & Analysis

### 🏆 Performance Comparison

| Algorithm               | Time  | Space | Readability | Best Use Case               |
| ----------------------- | ----- | ----- | ----------- | --------------------------- |
| **Greedy Forward**      | O(n)  | O(1)  | ⭐⭐⭐⭐⭐  | **Production - Optimal**    |
| **Greedy Backward**     | O(n)  | O(1)  | ⭐⭐⭐⭐    | **Alternative Perspective** |
| **Dynamic Programming** | O(n²) | O(n)  | ⭐⭐⭐      | **Educational - Intuitive** |
| **BFS**                 | O(n²) | O(n)  | ⭐⭐⭐      | **Graph Theory Learning**   |
| **DFS + Memo**          | O(n²) | O(n)  | ⭐⭐        | **Recursive Understanding** |

### 🎯 When to Use Each Approach

1. **Production Code**: **Greedy Forward** - Optimal time/space, simple logic
2. **Technical Interviews**: **Greedy Forward or Backward** - Shows algorithmic insight
3. **Educational Purposes**: **Dynamic Programming** - Most intuitive progression
4. **Graph Problems**: **BFS** - Connects to broader graph concepts
5. **Recursive Thinking**: **DFS + Memo** - Understanding problem structure

## 🎮 Jump Game Mechanics Deep Dive

### 🎯 Game Rules Analysis

#### **Rule 1: Starting Position**

```typescript
// Always start at index 0
// This is given and cannot be changed
const startPosition = 0;
```

#### **Rule 2: Jump Constraints**

```typescript
// From position i with value nums[i], can jump 1 to nums[i] steps
// Can choose ANY jump size from 1 to nums[i] (inclusive)
function possibleJumps(position: number, value: number): number[] {
  return Array.from({ length: value }, (_, i) => position + i + 1);
}
```

#### **Rule 3: Win Condition**

```typescript
// Must reach or exceed the last index
function isWin(position: number, arrayLength: number): boolean {
  return position >= arrayLength - 1;
}
```

### 🚧 Obstacle Analysis

#### **Type 1: Zero Barriers**

```typescript
// Zero creates absolute barrier - cannot proceed
const blockedExample = [2, 0, 1, 4]; // Blocked at index 1

// Solution requires jumping over zeros
const passableExample = [3, 0, 0, 1]; // Jump from 0 to 3, skip zeros
```

#### **Type 2: Insufficient Range**

```typescript
// Even non-zero values can create barriers
const insufficientRange = [1, 0, 2]; // Cannot reach index 2 from index 0

// Analysis: From index 0 (value 1), can only reach index 1
// From index 1 (value 0), cannot proceed → blocked
```

#### **Type 3: False Hopes**

```typescript
// Large values later in array don't help if unreachable
const falseHope = [3, 2, 1, 0, 100]; // 100 is unreachable

// Even though index 4 has value 100, we get stuck at index 3
```

### 🎲 Strategic Patterns

#### **Pattern 1: Greedy is Optimal**

```typescript
// For reachability, greedy choice is always optimal
const example = [2, 3, 1, 1, 4];

// Greedy: Extend reach as far as possible at each step
// Optimal: Same result, no better strategy exists
```

#### **Pattern 2: Multiple Valid Paths**

```typescript
const multiplePaths = [2, 3, 1, 1, 4];

// Path 1: 0 → 1 → 4 (jumps of 1, then 3)
// Path 2: 0 → 2 → 3 → 4 (jumps of 2, then 1, then 1)
// All paths lead to success, greedy finds one efficiently
```

#### **Pattern 3: Early Termination**

```typescript
// Can stop as soon as we know end is reachable
function optimizedGreedy(nums: number[]): boolean {
  let farthest = 0;
  for (let i = 0; i < nums.length && i <= farthest; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true; // Early exit
  }
  return false;
}
```

## 🧮 Mathematical Foundation

### 📐 Formal Problem Definition

**Given**: Array `A = [a₀, a₁, ..., aₙ₋₁]` where `aᵢ ≥ 0`

**Goal**: Determine if there exists a sequence of valid jumps from index 0 to index n-1

**Constraints**: From index i, can jump to any index j where `i < j ≤ i + aᵢ`

### 🎯 Greedy Algorithm Proof

**Theorem**: _The greedy algorithm (always extend farthest reach) is optimal for Jump Game_

**Proof**:

1. **Optimal Substructure**: If we can optimally reach position i, then making the greedy choice from i is optimal
2. **Greedy Choice Property**: Extending our reach as far as possible never hurts future choices
3. **Cut-and-Paste**: Any optimal solution can be modified to use greedy choices without losing optimality

**Invariant**: At step i, `farthest` represents the maximum index reachable using positions 0 through i

### 📊 Complexity Analysis

```typescript
// Time Complexity Analysis
function timeComplexityAnalysis() {
  // Greedy: Single pass through array
  // Each element processed exactly once
  // O(1) work per element
  // Total: O(n)
  // DP: For each position, check all reachable positions
  // Worst case: each position can reach all subsequent positions
  // Total: O(n²)
  // BFS/DFS: Each position can be visited multiple times
  // Each position can have up to n outgoing edges
  // Total: O(n²)
}
```

## 🎯 Problem Variations & Extensions

### 🔄 Jump Game II (Minimum Jumps)

```typescript
// Extension: Find MINIMUM number of jumps to reach end
// Requires different approach - greedy with level tracking
function minJumps(nums: number[]): number {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

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

### 🎮 Jump Game with Costs

```typescript
// Extension: Each jump has a cost, minimize total cost
interface JumpWithCost {
  position: number;
  cost: number;
}

function minCostJump(nums: number[], costs: number[]): number {
  // Dynamic programming approach needed
  // dp[i] = minimum cost to reach position i
  const dp = new Array(nums.length).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < nums.length; i++) {
    if (dp[i] === Infinity) continue;

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

### 🔄 Bidirectional Jump Game

```typescript
// Extension: Can jump backwards as well as forwards
function canJumpBidirectional(nums: number[]): boolean {
  // Much more complex - BFS or DP required
  // Greedy doesn't work due to backward jumps
  const visited = new Set<number>();
  const queue = [0];

  while (queue.length > 0) {
    const pos = queue.shift()!;
    if (pos === nums.length - 1) return true;
    if (visited.has(pos)) continue;
    visited.add(pos);

    // Forward jumps
    for (let jump = 1; jump <= nums[pos]; jump++) {
      const next = pos + jump;
      if (next < nums.length && !visited.has(next)) {
        queue.push(next);
      }
    }

    // Backward jumps
    for (let jump = 1; jump <= nums[pos]; jump++) {
      const prev = pos - jump;
      if (prev >= 0 && !visited.has(prev)) {
        queue.push(prev);
      }
    }
  }

  return false;
}
```

## 🎓 Educational Insights & Interview Tips

### 💡 Key Learning Points

1. **Greedy vs DP**: Jump Game showcases when greedy is optimal vs when DP is needed
2. **Problem Recognition**: Reachability problems often have greedy solutions
3. **Optimization**: Sometimes tracking maximum is better than tracking all possibilities
4. **Early Termination**: Can optimize by stopping as soon as goal is achieved

### 🎯 Interview Strategies

#### **Step 1: Problem Understanding**

```typescript
// Always clarify constraints and edge cases
function clarifyProblem() {
  // Can we jump backwards? → No, only forward
  // Can we jump 0 steps? → No, must jump at least 1 step
  // What if array has 1 element? → Already at end, return true
  // Can values be negative? → No, given nums[i] >= 0
}
```

#### **Step 2: Approach Selection**

```typescript
// Start with brute force, then optimize
function interviewProgression() {
  // 1. Brute force recursive (exponential)
  // 2. Add memoization (O(n²))
  // 3. Bottom-up DP (O(n²))
  // 4. Greedy optimization (O(n))
  // Show the progression and explain why each step is better
}
```

#### **Step 3: Edge Case Discussion**

```typescript
function edgeCases() {
  return [
    [0], // Single element - already at end
    [0, 1], // Cannot start - first element is 0
    [1, 0], // Can reach end in one jump
    [2, 0, 0], // Can jump over zeros
    [1, 0, 2], // Cannot jump over zero
  ];
}
```

### 🔧 Common Mistakes to Avoid

1. **Off-by-One Errors**: Remember last index is `length - 1`, not `length`
2. **Early Termination Logic**: Check `farthest >= lastIndex`, not `farthest > lastIndex`
3. **Zero Handling**: Don't forget that 0 means "cannot jump", not "skip this position"
4. **Boundary Conditions**: Handle single-element arrays correctly

## 🚀 Advanced Optimizations

### ⚡ Performance Enhancements

#### **1. Early Exit Optimization**

```typescript
function optimizedCanJump(nums: number[]): boolean {
  let farthest = 0;

  // Stop iterating once we can't progress further
  for (let i = 0; i <= farthest && i < nums.length; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    // Early success detection
    if (farthest >= nums.length - 1) return true;
  }

  return farthest >= nums.length - 1;
}
```

#### **2. Branch Prediction Friendly**

```typescript
function branchOptimizedCanJump(nums: number[]): boolean {
  if (nums.length <= 1) return true;

  let farthest = 0;
  const lastIndex = nums.length - 1;

  for (let i = 0; i < nums.length; i++) {
    // Combine conditions to reduce branching
    if (i > farthest) return false;

    const newReach = i + nums[i];
    farthest = newReach > farthest ? newReach : farthest;

    if (farthest >= lastIndex) return true;
  }

  return false;
}
```

#### **3. SIMD-Friendly Version** (for very large arrays)

```typescript
function simdFriendlyCanJump(nums: number[]): boolean {
  // Process multiple elements at once using vectorization
  // Useful for arrays larger than 10^6 elements

  let farthest = 0;
  const batchSize = 8; // Process 8 elements at a time

  for (let i = 0; i < nums.length; i += batchSize) {
    const end = Math.min(i + batchSize, nums.length);

    for (let j = i; j < end; j++) {
      if (j > farthest) return false;
      farthest = Math.max(farthest, j + nums[j]);
    }

    if (farthest >= nums.length - 1) return true;
  }

  return farthest >= nums.length - 1;
}
```

### 🧠 Memory Optimization

```typescript
// For streaming/online scenarios where array comes piece by piece
class StreamingJumpGame {
  private farthest = 0;
  private currentIndex = 0;
  private targetIndex: number;

  constructor(targetIndex: number) {
    this.targetIndex = targetIndex;
  }

  addValue(value: number): boolean | null {
    if (this.currentIndex > this.farthest) {
      return false; // Impossible to continue
    }

    this.farthest = Math.max(this.farthest, this.currentIndex + value);

    if (this.farthest >= this.targetIndex) {
      return true; // Success
    }

    this.currentIndex++;
    return null; // Need more data
  }
}
```

## 🌟 Real-World Applications

### 🎮 Game Development

```typescript
// Platform games: Can player reach the end of level?
interface Platform {
  position: number;
  jumpPower: number;
}

function canCompleteLevel(platforms: Platform[]): boolean {
  // Similar to Jump Game but with 2D coordinates
  let farthestReach = 0;

  for (const platform of platforms) {
    if (platform.position > farthestReach) return false;
    farthestReach = Math.max(
      farthestReach,
      platform.position + platform.jumpPower
    );
  }

  return farthestReach >= platforms[platforms.length - 1].position;
}
```

### 🚗 Route Planning

```typescript
// Vehicle routing: Can we reach destination with given fuel stations?
interface FuelStation {
  position: number;
  fuelAmount: number;
}

function canReachDestination(
  stations: FuelStation[],
  destination: number,
  initialFuel: number
): boolean {
  let farthestReach = initialFuel;

  for (const station of stations) {
    if (station.position > farthestReach) return false;
    farthestReach = Math.max(
      farthestReach,
      station.position + station.fuelAmount
    );
    if (farthestReach >= destination) return true;
  }

  return farthestReach >= destination;
}
```

### 📊 Network Connectivity

```typescript
// Network routing: Can data packet reach destination?
interface NetworkNode {
  id: number;
  transmissionRange: number;
}

function canRoutePacket(nodes: NetworkNode[], destination: number): boolean {
  // Greedy approach: always extend reach as far as possible
  let farthestReach = 0;

  for (const node of nodes) {
    if (node.id > farthestReach) return false;
    farthestReach = Math.max(farthestReach, node.id + node.transmissionRange);
    if (farthestReach >= destination) return true;
  }

  return farthestReach >= destination;
}
```

## 🎉 Conclusion

### 🌟 Key Takeaways

1. **Greedy Insight**: Jump Game teaches us that sometimes tracking the "maximum possible" is more efficient than exploring all possibilities
2. **Problem Recognition**: Reachability problems often have elegant greedy solutions
3. **Optimization Hierarchy**: Brute Force → DP → Greedy shows the natural progression of optimization
4. **Real-World Relevance**: Pattern applies to routing, planning, and connectivity problems

### 🚀 Next Steps

1. **Practice Variations**: Try Jump Game II (minimum jumps), Jump Game with costs
2. **Apply Pattern**: Look for similar "maximum reach" problems in other contexts
3. **Optimize Further**: Consider parallel processing for very large inputs
4. **Generalize**: Extend to 2D grids, weighted graphs, or time-dependent scenarios

### 💡 Final Wisdom

_"The Jump Game problem beautifully demonstrates that sometimes the optimal strategy is not to find the perfect path, but to simply keep all options open. By greedily extending our reach at each step, we ensure that we can always make the best decision when we need to."_

The elegant O(n) greedy solution shows us that complex-looking problems often have surprisingly simple solutions once we find the right perspective. In algorithms, as in life, sometimes the best strategy is to focus on maximizing our options rather than committing to a specific path too early.

---

**Related Problems**:

- [Jump Game II](../../../dynamic-programming/jump_game_II) (LeetCode #45) - Minimum jumps
- [Gas Station](../../../greedy/gas_station) (LeetCode #134) - Similar greedy pattern
- [Minimum Number of Taps](../../../greedy/minimum_taps) (LeetCode #1326) - Interval coverage variant

**Tags**: `Array` `Greedy` `Dynamic Programming` `Reachability` `Game Theory`
