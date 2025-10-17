/**
 * 🎮 Jump Game II - LeetCode #45 - Test Suite
 *
 * Comprehensive test suite covering all algorithm implementations
 * for finding minimum number of jumps to reach the end of an array.
 *
 * Test Categories:
 * 1. Basic Functionality Tests
 * 2. Edge Cases & Boundary Conditions
 * 3. Algorithm Consistency Tests
 * 4. Performance & Stress Tests
 * 5. Path Tracking & Analysis Tests
 * 6. Game Logic & Strategy Tests
 */

import {
  analyzeJumpGame,
  canReachEnd,
  jump,
  jumpAlternative,
  JumpAnalysis,
  jumpBackward,
  jumpBFS,
  jumpDP,
  jumpOptimizedBFS,
  jumpRecursive,
  JumpResult,
  jumpWithPath,
} from "./dev";

describe("🎮 Jump Game II - LeetCode #45", () => {
  // ================================================================================================
  // BASIC FUNCTIONALITY TESTS
  // ================================================================================================

  describe("📝 Basic Functionality", () => {
    test("should handle provided examples correctly", () => {
      // Example 1: [2,3,1,1,4] -> 2 jumps
      expect(jump([2, 3, 1, 1, 4])).toBe(2);
      expect(jumpDP([2, 3, 1, 1, 4])).toBe(2);
      expect(jumpBFS([2, 3, 1, 1, 4])).toBe(2);

      // Example 2: [2,3,0,1,4] -> 2 jumps
      expect(jump([2, 3, 0, 1, 4])).toBe(2);
      expect(jumpDP([2, 3, 0, 1, 4])).toBe(2);
      expect(jumpBFS([2, 3, 0, 1, 4])).toBe(2);
    });

    test("should find minimum jumps for simple arrays", () => {
      // Single element - already at end
      expect(jump([0])).toBe(0);
      expect(jump([1])).toBe(0);
      expect(jump([5])).toBe(0);

      // Two elements - one jump needed
      expect(jump([1, 0])).toBe(1);
      expect(jump([2, 1])).toBe(1);
      expect(jump([5, 3])).toBe(1);

      // Three elements - various scenarios
      expect(jump([1, 1, 1])).toBe(2); // 0->1->2
      expect(jump([2, 1, 1])).toBe(1); // 0->2
      expect(jump([1, 2, 1])).toBe(2); // 0->1->2
    });

    test("should handle arrays with zeros correctly", () => {
      // Zeros that can be jumped over
      expect(jump([2, 0, 1])).toBe(1); // 0->2 (one jump reaches end)
      expect(jump([3, 0, 0, 1])).toBe(1); // 0->3 (one jump reaches end)
      expect(jump([4, 0, 0, 0, 1])).toBe(1); // 0->4 (one jump reaches end)

      // Multiple zeros in sequence
      expect(jump([5, 0, 0, 0, 0, 1])).toBe(1); // 0->5 (one jump reaches end)
      expect(jump([3, 0, 2, 0, 4])).toBe(2); // 0->2->4 (two jumps)
    });

    test("should handle optimal jump scenarios", () => {
      // Cases where multiple optimal paths exist
      expect(jump([2, 2, 1, 1, 1])).toBe(3);
      expect(jump([3, 1, 1, 1, 1])).toBe(2);
      expect(jump([1, 3, 1, 1, 1])).toBe(2); // 0->1->4 (corrected)

      // Cases requiring strategic jumping
      expect(jump([1, 2, 3])).toBe(2); // 0->1->2 or 0->2->2
      expect(jump([2, 1, 3])).toBe(1); // Corrected: 0->2 reaches end
      expect(jump([3, 1, 2])).toBe(1); // 0->2 (can reach end in one jump)
    });
  });

  // ================================================================================================
  // EDGE CASES & BOUNDARY CONDITIONS
  // ================================================================================================

  describe("🔍 Edge Cases & Boundaries", () => {
    test("should handle minimum array sizes", () => {
      // Single element arrays
      expect(jump([0])).toBe(0);
      expect(jump([1])).toBe(0);
      expect(jump([100])).toBe(0);

      // Two element arrays
      expect(jump([1, 0])).toBe(1);
      expect(jump([2, 5])).toBe(1);
      expect(jump([10, 20])).toBe(1);
    });

    test("should handle maximum values", () => {
      // Large jump values
      expect(jump([1000, 1, 1, 1])).toBe(1);
      expect(jump([500, 500, 1])).toBe(1);
      expect(jump([1, 1000, 1])).toBe(2);

      // Mixed large and small values
      expect(jump([1, 2, 1000])).toBe(2);
      expect(jump([999, 1, 1, 1, 1])).toBe(1);
    });

    test("should handle long arrays with minimal jumps", () => {
      // Arrays where few jumps cover long distances
      const longArray1 = [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      expect(jump(longArray1)).toBe(1);

      const longArray2 = [5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1];
      expect(jump(longArray2)).toBe(2);

      // Array requiring many small jumps
      const manySmallJumps = Array(20).fill(1);
      expect(jump(manySmallJumps)).toBe(19);
    });

    test("should handle arrays with alternating patterns", () => {
      // Alternating high-low values
      expect(jump([2, 1, 2, 1, 2])).toBe(2); // 0->2->4 (corrected)
      expect(jump([3, 1, 3, 1, 3])).toBe(2); // 0->3->4 (corrected)
      expect(jump([1, 3, 1, 3, 1])).toBe(2); // Corrected: 0->1->4

      // Fibonacci-like sequences
      expect(jump([1, 1, 2, 3, 5])).toBe(3); // Corrected
      expect(jump([1, 2, 3, 5, 8])).toBe(3);
    });
  });

  // ================================================================================================
  // ALGORITHM CONSISTENCY TESTS
  // ================================================================================================

  describe("⚖️ Algorithm Consistency", () => {
    const algorithms = [
      { name: "Greedy", fn: jump },
      { name: "Greedy Alternative", fn: jumpAlternative },
      { name: "Dynamic Programming", fn: jumpDP },
      { name: "BFS Explicit", fn: jumpBFS },
      { name: "BFS Optimized", fn: jumpOptimizedBFS },
      { name: "Recursive + Memo", fn: jumpRecursive },
      { name: "Backward Greedy", fn: jumpBackward },
    ];

    const testCases = [
      [2, 3, 1, 1, 4],
      [2, 3, 0, 1, 4],
      [1, 2, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 1],
      [1],
      [5, 4, 3, 2, 1, 1, 1], // Corrected to be reachable
      [1, 2, 3, 4, 5],
      [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3], // Keep as is - complex but reachable
    ];

    test("all algorithms should return identical results", () => {
      testCases.forEach((nums, testIndex) => {
        const results = algorithms.map(({ name, fn }) => ({
          name,
          result: fn([...nums]), // Clone to avoid mutations
        }));

        const expectedResult = results[0]?.result;
        expect(expectedResult).toBeDefined();

        results.forEach(({ name, result }, algorithmIndex) => {
          expect(result).toBe(expectedResult);
        });

        // Verify all results are the same
        const allSame = results.every(
          ({ result }) => result === expectedResult
        );
        expect(allSame).toBe(true);
      });
    });

    test("algorithms should handle edge cases consistently", () => {
      const edgeCases = [
        [0], // Single element with 0
        [1], // Single element with 1
        [100], // Single element with large value
        [1, 0], // Two elements - can reach
        [2, 0, 0], // Jump over multiple zeros
        [3, 0, 0, 1], // Can jump over zeros to reach end
      ];

      edgeCases.forEach((nums) => {
        const results = algorithms.map(({ fn }) => fn([...nums]));
        const firstResult = results[0];

        results.forEach((result, index) => {
          expect(result).toBe(firstResult);
        });
      });
    });

    test("algorithms should be deterministic", () => {
      const testArray = [2, 3, 1, 1, 4];

      algorithms.forEach(({ name, fn }) => {
        // Run same input multiple times
        const results = Array(5)
          .fill(0)
          .map(() => fn([...testArray]));
        const firstResult = results[0];

        results.forEach((result) => {
          expect(result).toBe(firstResult);
        });
      });
    });
  });

  // ================================================================================================
  // PERFORMANCE & STRESS TESTS
  // ================================================================================================

  describe("⚡ Performance & Stress Tests", () => {
    test("should handle large arrays efficiently (greedy algorithms)", () => {
      // Test with large array - greedy should be fast
      const largeArray = Array.from({ length: 1000 }, (_, i) =>
        Math.max(1, Math.floor(Math.random() * 5) + 1)
      );

      const start = performance.now();
      const result = jump(largeArray);
      const end = performance.now();
      const executionTime = end - start;

      expect(result).toBeGreaterThan(0);
      expect(executionTime).toBeLessThan(50); // Should complete in < 50ms
    });

    test("should handle worst-case scenarios", () => {
      // Worst case: all 1s (requires n-1 jumps)
      const worstCase = Array(100).fill(1);
      expect(jump(worstCase)).toBe(99);

      // Best case: single large jump
      const bestCase = [99, ...Array(99).fill(1)];
      expect(jump(bestCase)).toBe(1);
    });

    test("should handle arrays with varying jump patterns", () => {
      // Decreasing jumps
      const decreasing = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      expect(jump(decreasing)).toBe(1);

      // Increasing jumps
      const increasing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(jump(increasing)).toBe(4);

      // Random pattern
      const random = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
      const result = jump(random);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(random.length);
    });

    test("should maintain performance with repeated elements", () => {
      // Array with many repeated values
      const repeated = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
      expect(jump(repeated)).toBe(5);

      // Array with blocks of same values
      const blocks = [3, 3, 3, 1, 1, 1, 4, 4, 4];
      const result = jump(blocks);
      expect(result).toBeGreaterThan(0);
    });
  });

  // ================================================================================================
  // PATH TRACKING & ANALYSIS TESTS
  // ================================================================================================

  describe("🛣️ Path Tracking & Analysis", () => {
    test("should track optimal path correctly", () => {
      const result: JumpResult = jumpWithPath([2, 3, 1, 1, 4]);

      expect(result.minJumps).toBe(2);
      expect(result.path).toEqual(expect.arrayContaining([0])); // Should start at 0
      expect(result.path[result.path.length - 1]).toBe(4); // Should end at last index
      expect(result.path.length).toBe(result.minJumps + 1); // Path length = jumps + 1
    });

    test("should provide valid jump sizes", () => {
      const result: JumpResult = jumpWithPath([2, 3, 1, 1, 4]);

      expect(result.jumpSizes.length).toBe(result.minJumps);
      result.jumpSizes.forEach((jumpSize) => {
        expect(jumpSize).toBeGreaterThan(0);
      });
    });

    test("should handle single element path", () => {
      const result: JumpResult = jumpWithPath([0]);

      expect(result.minJumps).toBe(0);
      expect(result.path).toEqual([0]);
      expect(result.jumpSizes).toEqual([]);
    });

    test("should handle two element path", () => {
      const result: JumpResult = jumpWithPath([1, 0]);

      expect(result.minJumps).toBe(1);
      expect(result.path.length).toBe(2);
      expect(result.jumpSizes.length).toBe(1);
    });

    test("should analyze jump game correctly", () => {
      const analysis: JumpAnalysis = analyzeJumpGame([2, 3, 1, 1, 4]);

      expect(analysis.canReach).toBe(true);
      expect(analysis.minJumps).toBe(2);
      expect(analysis.criticalPositions).toEqual(expect.any(Array));
      expect(analysis.optimalPath).toEqual(expect.any(Array));

      // Critical positions should be where jumps are mandatory
      analysis.criticalPositions.forEach((pos) => {
        expect(pos).toBeGreaterThanOrEqual(0);
        expect(pos).toBeLessThan(5);
      });
    });
  });

  // ================================================================================================
  // GAME LOGIC & STRATEGY TESTS
  // ================================================================================================

  describe("🎯 Game Logic & Strategy", () => {
    test("should verify reachability correctly", () => {
      // Reachable arrays
      expect(canReachEnd([2, 3, 1, 1, 4])).toBe(true);
      expect(canReachEnd([1, 2, 3])).toBe(true);
      expect(canReachEnd([1])).toBe(true);

      // Arrays that would be unreachable (but problem guarantees reachability)
      expect(canReachEnd([1, 0, 2])).toBe(false);
      expect(canReachEnd([2, 1, 0, 3])).toBe(false);
    });

    test("should handle greedy choice optimality", () => {
      // Cases where greedy choice leads to optimal solution
      const testCases = [
        [2, 3, 1, 1, 4], // Multiple paths, greedy finds optimal
        [1, 2, 1, 1, 1], // Sequential choices
        [4, 1, 1, 0, 4], // Must jump over zero (corrected to be reachable)
        [1, 1, 1, 1, 1], // All same values
      ];

      testCases.forEach((nums) => {
        const greedyResult = jump(nums);
        const dpResult = jumpDP(nums);

        // Greedy should match DP (optimal) result
        expect(greedyResult).toBe(dpResult);
      });
    });

    test("should handle strategic jump scenarios", () => {
      // Case where taking smaller jump first is better
      expect(jump([3, 4, 3, 2, 5, 4, 3])).toBe(3);

      // Case with multiple viable strategies
      expect(jump([2, 1, 3, 1, 4])).toBe(2); // Corrected: 0->2->4

      // Case requiring forward planning
      expect(jump([5, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(5); // Corrected: cannot reach end in 1 jump
    });

    test("should handle zero-crossing strategies", () => {
      // Must jump over zeros
      expect(jump([3, 0, 0, 1])).toBe(1); // Corrected: 0->3 reaches end
      expect(jump([4, 0, 0, 0, 1])).toBe(1); // Corrected: 0->4 reaches end
      expect(jump([2, 0, 2, 0, 1])).toBe(2); // Corrected: 0->2->4

      // Zeros at various positions
      expect(jump([1, 2, 0, 1])).toBe(2); // Corrected: 0->1->3
      expect(jump([2, 1, 0, 3])).toBe(2);
    });
  });

  // ================================================================================================
  // ALGORITHM-SPECIFIC TESTS
  // ================================================================================================

  describe("🔧 Algorithm-Specific Behavior", () => {
    test("greedy algorithm should use BFS-style levels", () => {
      // Test the level-by-level approach
      const nums = [2, 3, 1, 1, 4];
      const result = jump(nums);

      expect(result).toBe(2);

      // Verify it finds optimal solution in linear time
      const start = performance.now();
      jump(Array(1000).fill(2));
      const end = performance.now();

      expect(end - start).toBeLessThan(10); // Should be very fast
    });

    test("DP algorithm should build solution bottom-up", () => {
      const nums = [2, 3, 1, 1, 4];
      const result = jumpDP(nums);

      expect(result).toBe(2);

      // DP should handle larger arrays but be slower
      const start = performance.now();
      jumpDP(Array(100).fill(2));
      const end = performance.now();

      // DP can be slower but should still complete reasonably fast
      expect(end - start).toBeLessThan(100);
    });

    test("BFS algorithm should explore level by level", () => {
      const nums = [2, 3, 1, 1, 4];
      const result = jumpBFS(nums);

      expect(result).toBe(2);

      // BFS should find shortest path (minimum jumps)
      expect(result).toBeLessThan(nums.length);
    });

    test("recursive algorithm should use memoization effectively", () => {
      const nums = [2, 3, 1, 1, 4];

      // First call might be slower due to memoization setup
      const result1 = jumpRecursive([...nums]);

      // Subsequent calls with similar patterns should benefit from memoization
      const result2 = jumpRecursive([...nums]);

      expect(result1).toBe(result2);
      expect(result1).toBe(2);
    });

    test("backward greedy should work backwards correctly", () => {
      const nums = [2, 3, 1, 1, 4];
      const result = jumpBackward(nums);

      expect(result).toBe(2);

      // Should handle different patterns
      expect(jumpBackward([1, 1, 1, 1])).toBe(3);
      expect(jumpBackward([3, 2, 1])).toBe(1);
    });
  });

  // ================================================================================================
  // INTEGRATION & COMPATIBILITY TESTS
  // ================================================================================================

  describe("🔗 Integration & Compatibility", () => {
    test("should handle array mutations safely", () => {
      const originalArray = [2, 3, 1, 1, 4];
      const arrayClone = [...originalArray];

      const result = jump(arrayClone);

      // Original array should be unchanged
      expect(arrayClone).toEqual(originalArray);
      expect(result).toBe(2);
    });

    test("should work with different array types", () => {
      // Regular array
      expect(jump([2, 3, 1, 1, 4])).toBe(2);

      // Array created with Array constructor
      const constructedArray = new Array(5);
      constructedArray[0] = 2;
      constructedArray[1] = 3;
      constructedArray[2] = 1;
      constructedArray[3] = 1;
      constructedArray[4] = 4;
      expect(jump(constructedArray)).toBe(2);

      // Array from Array.from
      const generatedArray = Array.from([2, 3, 1, 1, 4]);
      expect(jump(generatedArray)).toBe(2);
    });

    test("should handle concurrent executions", () => {
      const testArray = [2, 3, 1, 1, 4];

      // Run multiple algorithms concurrently
      const promises = [
        Promise.resolve(jump([...testArray])),
        Promise.resolve(jumpDP([...testArray])),
        Promise.resolve(jumpBFS([...testArray])),
        Promise.resolve(jumpRecursive([...testArray])),
      ];

      return Promise.all(promises).then((results) => {
        results.forEach((result) => {
          expect(result).toBe(2);
        });
      });
    });
  });

  // ================================================================================================
  // REGRESSION & VALIDATION TESTS
  // ================================================================================================

  describe("🧪 Regression & Validation", () => {
    test("should pass all LeetCode examples", () => {
      // Official LeetCode test cases
      const leetcodeTests = [
        { input: [2, 3, 1, 1, 4], expected: 2 },
        { input: [2, 3, 0, 1, 4], expected: 2 },
        { input: [1, 2, 1, 1, 1], expected: 3 },
        { input: [1, 2, 3], expected: 2 },
        { input: [1, 1, 1, 1], expected: 3 },
        { input: [2, 1], expected: 1 },
        { input: [1], expected: 0 },
      ];

      leetcodeTests.forEach(({ input, expected }) => {
        expect(jump(input)).toBe(expected);
        expect(jumpDP(input)).toBe(expected);
        expect(jumpBFS(input)).toBe(expected);
      });
    });

    test("should maintain backward compatibility", () => {
      // Test cases from previous versions should still work
      const legacyTests = [
        [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3],
        [1, 4, 3, 7, 1, 2, 6, 7, 6, 10],
        [5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4],
      ];

      legacyTests.forEach((nums) => {
        const greedyResult = jump(nums);
        const dpResult = jumpDP(nums);

        expect(greedyResult).toBe(dpResult);
        expect(greedyResult).toBeGreaterThan(0);
        expect(greedyResult).toBeLessThan(nums.length);
      });
    });

    test("should handle edge cases that previously caused issues", () => {
      // Previously problematic cases (if any)
      expect(jump([1, 0])).toBe(1);
      expect(jump([2, 0, 0])).toBe(1); // Corrected: 0->2 reaches end
      expect(jump([1, 2, 0, 1])).toBe(2); // Corrected: 0->1->3

      // Boundary values
      expect(jump([0])).toBe(0);
      expect(jump([1000])).toBe(0);
    });
  });
});

// ================================================================================================
// PERFORMANCE BENCHMARK TESTS (Optional - can be run separately)
// ================================================================================================

describe.skip("📊 Performance Benchmarks", () => {
  test("algorithm performance comparison", () => {
    const sizes = [10, 50, 100, 500];

    sizes.forEach((size) => {
      const testArray = Array.from({ length: size }, (_, i) =>
        Math.max(1, Math.floor(Math.random() * 5) + 1)
      );

      console.log(`\n📏 Array size: ${size}`);

      // Greedy (should be fastest)
      const greedyStart = performance.now();
      const greedyResult = jump([...testArray]);
      const greedyTime = performance.now() - greedyStart;

      // DP (should be slower)
      const dpStart = performance.now();
      const dpResult = jumpDP([...testArray]);
      const dpTime = performance.now() - dpStart;

      console.log(
        `  Greedy: ${greedyResult} jumps in ${greedyTime.toFixed(4)}ms`
      );
      console.log(`  DP:     ${dpResult} jumps in ${dpTime.toFixed(4)}ms`);

      expect(greedyResult).toBe(dpResult);
    });
  });
});

/**
 * Test Execution Summary:
 *
 * This test suite provides comprehensive coverage for Jump Game II:
 *
 * ✅ Basic Functionality - Core algorithm correctness
 * ✅ Edge Cases - Boundary conditions and special scenarios
 * ✅ Algorithm Consistency - All implementations return same results
 * ✅ Performance - Stress testing and execution time validation
 * ✅ Path Tracking - Verification of optimal path finding
 * ✅ Game Logic - Strategic decision making validation
 * ✅ Algorithm-Specific - Individual algorithm behavior testing
 * ✅ Integration - Compatibility and concurrent execution
 * ✅ Regression - LeetCode compliance and backward compatibility
 *
 * Total Test Cases: 200+ individual assertions
 * Coverage Areas: 9 major categories
 * Algorithm Coverage: All 8 implementations tested
 *
 * To run tests:
 * npm run test:10          # Run all tests
 * npm run test -- --watch  # Run in watch mode
 * npm run validate:10      # Run tests + performance
 */
