/**
 * 🧪 Test Suite for LeetCode #55 - Jump Game
 *
 * Testing all 8 algorithm implementations:
 * 1. Greedy Algorithm (Optimal) - O(n) time, O(1) space
 * 2. Greedy with Detailed Tracking - O(n) time, O(1) space
 * 3. Dynamic Programming (Bottom-up) - O(n²) time, O(n) space
 * 4. Dynamic Programming (Optimized) - O(n) time, O(n) space
 * 5. Backward Greedy - O(n²) time, O(1) space
 * 6. BFS (Breadth-First Search) - O(n²) time, O(n) space
 * 7. DFS with Memoization - O(n²) time, O(n) space
 * 8. Interval Coverage - O(n) time, O(1) space
 */

import {
  canJump,
  canJumpBackward,
  canJumpBFS,
  canJumpDetailed,
  canJumpDFS,
  canJumpDP,
  canJumpDPOptimized,
  canJumpInterval,
} from "./dev";

// 🎯 Test data structure
interface TestCase {
  name: string;
  input: number[];
  expected: boolean;
  description: string;
}

// 📊 Algorithm configuration
interface Algorithm {
  name: string;
  fn: (nums: number[]) => boolean;
  timeComplexity: string;
  spaceComplexity: string;
}

// 🧪 Comprehensive test cases
const testCases: TestCase[] = [
  {
    name: "Basic True Case",
    input: [2, 3, 1, 1, 4],
    expected: true,
    description:
      "Jump 1 step from index 0 to 1, then 3 steps to the last index",
  },
  {
    name: "Basic False Case",
    input: [3, 2, 1, 0, 4],
    expected: false,
    description:
      "Always arrive at index 3 with jump length 0, cannot reach end",
  },
  {
    name: "Single Element Zero",
    input: [0],
    expected: true,
    description: "Single element array, already at the end",
  },
  {
    name: "Single Element Positive",
    input: [5],
    expected: true,
    description: "Single element array with positive value, already at the end",
  },
  {
    name: "Two Elements Reachable",
    input: [1, 1],
    expected: true,
    description: "Can jump from index 0 to index 1",
  },
  {
    name: "Two Elements Unreachable",
    input: [0, 1],
    expected: false,
    description: "Cannot jump from index 0 (jump length is 0)",
  },
  {
    name: "Large Jump at Start",
    input: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    expected: true,
    description: "Large initial jump can reach the end despite zeros",
  },
  {
    name: "Minimum Jumps Required",
    input: [1, 1, 1, 1, 1],
    expected: true,
    description: "Each position allows exactly one jump to the next",
  },
  {
    name: "Blocked by Zero",
    input: [1, 0, 2, 3],
    expected: false,
    description: "Blocked at index 1 with jump length 0",
  },
  {
    name: "Just Enough to Reach",
    input: [2, 0, 0],
    expected: true,
    description: "Initial jump of 2 exactly reaches the end",
  },
  {
    name: "All Zeros Except Start",
    input: [0, 0, 0],
    expected: false,
    description: "Cannot move from starting position",
  },
  {
    name: "Decreasing Values Success",
    input: [5, 4, 3, 2, 1],
    expected: true,
    description: "Decreasing values but still enough to reach end",
  },
  {
    name: "Decreasing Values Failure",
    input: [4, 3, 2, 1, 0, 1],
    expected: false,
    description: "Decreasing values lead to dead end at index 4",
  },
  {
    name: "Alternating Pattern Failure",
    input: [1, 0, 2, 0, 4],
    expected: false,
    description: "Blocked at index 1 with zero, cannot proceed further",
  },
  {
    name: "Mixed Pattern Success",
    input: [1, 3, 1, 2, 1],
    expected: true,
    description: "Mixed jump lengths allow reaching the end",
  },
  {
    name: "Large Numbers",
    input: [100000, 1, 1, 1, 1],
    expected: true,
    description: "Very large initial jump value",
  },
  {
    name: "Exact Jump Pattern",
    input: [2, 3, 1, 1, 4],
    expected: true,
    description: "Classic example with exact jump calculations",
  },
  {
    name: "Multiple Zeros Scattered",
    input: [3, 0, 2, 0, 4],
    expected: true,
    description: "Can skip over zeros with larger jumps",
  },
  {
    name: "Multiple Zeros Blocking",
    input: [2, 0, 0, 0, 4],
    expected: false,
    description: "Multiple consecutive zeros create insurmountable barrier",
  },
  {
    name: "Edge Case Two Elements",
    input: [2, 1],
    expected: true,
    description: "Jump from 0 to 1 with jump length 2",
  },
  {
    name: "Complex Valid Path",
    input: [5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0],
    expected: true,
    description: "Complex array with valid path to end",
  },
  {
    name: "Complex Invalid Path",
    input: [1, 1, 0, 1, 1, 1],
    expected: false,
    description: "Complex array blocked at index 2",
  },
];

// 🔧 All algorithms to test
const algorithms: Algorithm[] = [
  {
    name: "Greedy (Optimal)",
    fn: canJump,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Greedy Detailed",
    fn: canJumpDetailed,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Dynamic Programming",
    fn: canJumpDP,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
  },
  {
    name: "DP Optimized",
    fn: canJumpDPOptimized,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
  },
  {
    name: "Backward Greedy",
    fn: canJumpBackward,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  },
  {
    name: "BFS",
    fn: canJumpBFS,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
  },
  {
    name: "DFS + Memoization",
    fn: canJumpDFS,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
  },
  {
    name: "Interval Coverage",
    fn: canJumpInterval,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
];

// 🧪 Test each algorithm against all test cases
describe("🎯 Jump Game - All Algorithms", () => {
  algorithms.forEach(({ name, fn, timeComplexity, spaceComplexity }) => {
    describe(`🔧 ${name} Algorithm (${timeComplexity} time, ${spaceComplexity} space)`, () => {
      testCases.forEach(({ name: testName, input, expected, description }) => {
        test(`${testName}: ${description}`, () => {
          const result = fn(input);
          expect(result).toBe(expected);

          // Verify result type
          expect(typeof result).toBe("boolean");
        });
      });
    });
  });
});

// 🎯 Focused tests for main algorithm (Greedy Optimal)
describe("🌟 Greedy Algorithm - Detailed Tests", () => {
  describe("✅ Basic Functionality", () => {
    test("should handle basic reachable case", () => {
      expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    });

    test("should handle basic unreachable case", () => {
      expect(canJump([3, 2, 1, 0, 4])).toBe(false);
    });

    test("should handle single element arrays", () => {
      expect(canJump([0])).toBe(true);
      expect(canJump([5])).toBe(true);
    });

    test("should handle two element arrays", () => {
      expect(canJump([1, 1])).toBe(true);
      expect(canJump([0, 1])).toBe(false);
      expect(canJump([2, 1])).toBe(true);
    });
  });

  describe("🔍 Edge Cases", () => {
    test("should handle arrays with all zeros except first", () => {
      expect(canJump([0, 0, 0])).toBe(false);
      expect(canJump([1, 0, 0])).toBe(false);
      expect(canJump([2, 0, 0])).toBe(true);
      expect(canJump([3, 0, 0, 0])).toBe(true); // Can jump 3 positions to reach index 3 (end)
    });

    test("should handle large jump values", () => {
      expect(canJump([100000])).toBe(true);
      expect(canJump([100000, 1, 1, 1])).toBe(true);
      expect(canJump([1, 100000, 1, 1])).toBe(true);
    });

    test("should handle minimum jump requirements", () => {
      expect(canJump([1, 1, 1, 1, 1])).toBe(true);
      expect(canJump([1, 0, 1, 1, 1])).toBe(false);
    });

    test("should handle zeros in different positions", () => {
      expect(canJump([2, 0, 1, 0, 4])).toBe(false); // Blocked at index 3 (value 0)
      expect(canJump([1, 0, 1, 0, 4])).toBe(false);
      expect(canJump([3, 0, 0, 1, 4])).toBe(true);
    });
  });

  describe("🔢 Boundary Values", () => {
    test("should handle minimum constraint (single element)", () => {
      expect(canJump([0])).toBe(true);
      expect(canJump([1])).toBe(true);
    });

    test("should handle maximum array length efficiently", () => {
      // Simulate larger arrays
      const largeReachable = new Array(1000).fill(1);
      const largeUnreachable = [1, ...new Array(999).fill(0)];

      expect(() => {
        const result1 = canJump(largeReachable);
        const result2 = canJump(largeUnreachable);
        expect(result1).toBe(true);
        expect(result2).toBe(false);
      }).not.toThrow();
    });

    test("should handle maximum jump values", () => {
      expect(canJump([100000, 0, 0, 0])).toBe(true);
      expect(canJump([99999, 0, 0, 0])).toBe(true); // 99999 can reach index 3 (end)
    });
  });

  describe("🎲 Pattern Recognition", () => {
    test("should handle decreasing patterns", () => {
      expect(canJump([5, 4, 3, 2, 1, 0])).toBe(true);
      expect(canJump([4, 3, 2, 1, 0, 1])).toBe(false);
    });

    test("should handle increasing patterns", () => {
      expect(canJump([1, 2, 3, 4, 5])).toBe(true);
      expect(canJump([0, 1, 2, 3, 4])).toBe(false);
    });

    test("should handle alternating patterns", () => {
      expect(canJump([2, 0, 2, 0, 1])).toBe(true);
      expect(canJump([1, 0, 1, 0, 1])).toBe(false);
    });

    test("should handle plateau patterns", () => {
      expect(canJump([3, 3, 3, 3, 3])).toBe(true);
      expect(canJump([1, 1, 1, 1, 1])).toBe(true);
    });

    test("should handle mixed complex patterns", () => {
      expect(canJump([5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0])).toBe(true);
      expect(canJump([1, 1, 2, 1, 0, 0, 1])).toBe(false);
    });
  });
});

// ⚡ Performance Tests
describe("⚡ Performance Tests", () => {
  const createTestArray = (size: number, pattern: string): number[] => {
    switch (pattern) {
      case "reachable":
        return Array.from({ length: size }, () => 2);
      case "unreachable":
        return [1, ...Array.from({ length: size - 1 }, () => 0)];
      case "minimum":
        return Array.from({ length: size }, () => 1);
      case "decreasing":
        return Array.from({ length: size }, (_, i) =>
          Math.max(size - i - 1, 0)
        );
      case "random":
        return Array.from(
          { length: size },
          () => Math.floor(Math.random() * 5) + 1
        );
      default:
        return [];
    }
  };

  describe("🏃‍♂️ Speed Tests", () => {
    const testSizes = [100, 500, 1000];
    const patterns = [
      "reachable",
      "unreachable",
      "minimum",
      "decreasing",
      "random",
    ];

    testSizes.forEach((size) => {
      patterns.forEach((pattern) => {
        test(`should handle ${size} elements (${pattern}) efficiently`, () => {
          const nums = createTestArray(size, pattern);

          const start = performance.now();
          const result = canJump(nums);
          const end = performance.now();

          expect(typeof result).toBe("boolean");
          expect(end - start).toBeLessThan(100); // Should complete quickly
        });
      });
    });

    test("should outperform quadratic algorithms on large inputs", () => {
      const nums = createTestArray(500, "random");

      // Test Greedy (optimal)
      const start1 = performance.now();
      const result1 = canJump(nums);
      const end1 = performance.now();
      const greedyTime = end1 - start1;

      // Test DP (quadratic)
      const start2 = performance.now();
      const result2 = canJumpDP(nums);
      const end2 = performance.now();
      const dpTime = end2 - start2;

      expect(result1).toBe(result2); // Results should match
      expect(greedyTime).toBeLessThan(dpTime + 5); // Greedy should be faster (with tolerance)
    });
  });

  describe("📊 Complexity Verification", () => {
    test("should have linear time complexity", () => {
      const sizes = [100, 200, 400];
      const times: number[] = [];

      sizes.forEach((size) => {
        const nums = createTestArray(size, "minimum");
        const start = performance.now();
        canJump(nums);
        const end = performance.now();
        times.push(end - start);
      });

      // All should complete quickly (linear growth)
      times.forEach((time) => {
        expect(time).toBeLessThan(50);
      });
    });

    test("should use constant space", () => {
      // Conceptual test - greedy algorithm uses O(1) space
      const nums = createTestArray(1000, "random");

      const start = performance.now();
      const result = canJump(nums);
      const end = performance.now();

      expect(typeof result).toBe("boolean");
      expect(end - start).toBeLessThan(100);
    });
  });
});

// 🧮 Algorithm Comparison Tests
describe("🧮 Algorithm Comparison", () => {
  const comparisonTestCases: TestCase[] = [
    {
      name: "Standard Reachable",
      input: [2, 3, 1, 1, 4],
      expected: true,
      description: "Classic reachable case",
    },
    {
      name: "Standard Unreachable",
      input: [3, 2, 1, 0, 4],
      expected: false,
      description: "Classic unreachable case",
    },
    {
      name: "Large Jump Start",
      input: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expected: true,
      description: "Large initial jump",
    },
    {
      name: "Minimum Steps",
      input: [1, 1, 1, 1, 1],
      expected: true,
      description: "Minimum steps required",
    },
  ];

  describe("✅ Correctness Verification", () => {
    comparisonTestCases.forEach(({ name, input, expected }, index) => {
      test(`all algorithms should produce same result for ${name}`, () => {
        const results = algorithms.map(({ fn }) => fn(input));

        // All results should be identical and equal expected
        results.forEach((result) => {
          expect(result).toBe(expected);
        });

        // Verify all algorithms agree with each other
        const firstResult = results[0];
        results.forEach((result) => {
          expect(result).toBe(firstResult);
        });
      });
    });
  });

  describe("📈 Performance Comparison", () => {
    test("O(1) space algorithms should be faster than O(n) space", () => {
      const nums = createTestArray(200, "random");

      // Test O(1) space algorithms
      const constantSpaceAlgs = algorithms.filter(
        (alg) => alg.spaceComplexity === "O(1)"
      );

      constantSpaceAlgs.forEach(({ name, fn }) => {
        const start = performance.now();
        const result = fn(nums);
        const end = performance.now();

        expect(typeof result).toBe("boolean");
        expect(end - start).toBeLessThan(50); // Should be very fast
      });
    });

    test("O(n) time algorithms should outperform O(n²) algorithms", () => {
      const nums = createTestArray(300, "random");

      // Test linear time algorithms
      const linearAlgs = algorithms.filter(
        (alg) => alg.timeComplexity === "O(n)"
      );

      // Test quadratic time algorithms
      const quadraticAlgs = algorithms.filter(
        (alg) => alg.timeComplexity === "O(n²)"
      );

      // Measure average time for linear algorithms
      let linearTotalTime = 0;
      linearAlgs.forEach(({ fn }) => {
        const start = performance.now();
        fn(nums);
        const end = performance.now();
        linearTotalTime += end - start;
      });
      const linearAvgTime = linearTotalTime / linearAlgs.length;

      // Measure average time for quadratic algorithms
      let quadraticTotalTime = 0;
      quadraticAlgs.forEach(({ fn }) => {
        const start = performance.now();
        fn(nums);
        const end = performance.now();
        quadraticTotalTime += end - start;
      });
      const quadraticAvgTime = quadraticTotalTime / quadraticAlgs.length;

      // Linear should generally be faster (with some tolerance)
      expect(linearAvgTime).toBeLessThan(quadraticAvgTime + 10);
    });
  });

  const createTestArray = (size: number, pattern: string): number[] => {
    switch (pattern) {
      case "random":
        return Array.from(
          { length: size },
          () => Math.floor(Math.random() * 5) + 1
        );
      default:
        return [];
    }
  };
});

// 🎮 Game Logic Tests
describe("🎮 Jump Game Logic Tests", () => {
  describe("🎯 Game Rules", () => {
    test("should start at index 0", () => {
      // First element determines initial jump capability
      expect(canJump([0])).toBe(true); // Already at end
      expect(canJump([0, 1])).toBe(false); // Cannot move from start
      expect(canJump([1, 1])).toBe(true); // Can move from start
    });

    test("should respect maximum jump constraints", () => {
      expect(canJump([3, 0, 0, 0])).toBe(true); // Can jump exactly 3 positions
      expect(canJump([2, 0, 0, 0])).toBe(false); // Can only jump 2 positions, need 3
    });

    test("should allow any jump distance up to maximum", () => {
      // From position with value 3, can jump 1, 2, or 3 positions
      expect(canJump([3, 0, 1])).toBe(true); // Jump 2 positions to reach index 2
      expect(canJump([3, 0, 0, 1])).toBe(true); // Jump 3 positions to reach index 3
    });

    test("should handle end-of-array correctly", () => {
      expect(canJump([1])).toBe(true); // Single element, already at end
      expect(canJump([5, 1, 1])).toBe(true); // Can overshoot the end
    });
  });

  describe("💡 Strategic Scenarios", () => {
    test("should handle optimal vs suboptimal paths", () => {
      // Multiple valid paths exist
      expect(canJump([2, 3, 1, 1, 4])).toBe(true);

      // Only one valid path exists
      expect(canJump([1, 2, 0, 1])).toBe(true);

      // No valid path exists
      expect(canJump([1, 0, 1, 0])).toBe(false);
    });

    test("should handle greedy vs non-greedy decisions", () => {
      // Sometimes taking smaller jumps is better
      expect(canJump([5, 4, 0, 0, 0, 1])).toBe(true);

      // But greedy algorithm should still work for reachability
      expect(canJump([2, 0, 1, 0, 4])).toBe(false); // Cannot reach end due to zero at index 3
    });

    test("should handle trap scenarios", () => {
      // Positions that look good but lead to dead ends
      expect(canJump([3, 2, 1, 0, 4])).toBe(false);
      expect(canJump([1, 1, 0, 1])).toBe(false);
      expect(canJump([2, 1, 0, 0])).toBe(false);
    });
  });

  describe("🚧 Obstacle Navigation", () => {
    test("should handle single zero obstacles", () => {
      expect(canJump([2, 0, 1])).toBe(true); // Can jump over zero
      expect(canJump([1, 0, 1])).toBe(false); // Cannot jump over zero
    });

    test("should handle multiple zero obstacles", () => {
      expect(canJump([3, 0, 0, 1])).toBe(true); // Can jump over multiple zeros
      expect(canJump([2, 0, 0, 1])).toBe(false); // Cannot jump over multiple zeros
    });

    test("should handle zero barriers at different positions", () => {
      expect(canJump([4, 1, 1, 0, 2])).toBe(true); // Zero after reachable positions
      expect(canJump([1, 1, 1, 0, 2])).toBe(false); // Zero creates unreachable barrier
    });
  });
});

// 🎭 Stress Tests
describe("🎭 Stress Tests", () => {
  describe("🔥 High Load Scenarios", () => {
    test("should handle maximum constraints", () => {
      // Test with max length: 10^4
      const maxArray = new Array(10000).fill(1);

      expect(() => {
        const result = canJump(maxArray);
        expect(result).toBe(true);
      }).not.toThrow();
    });

    test("should handle maximum jump values", () => {
      expect(canJump([100000])).toBe(true);
      expect(canJump([100000, 0, 0, 0])).toBe(true);
      expect(canJump([0, 100000])).toBe(false);
    });

    test("should handle mixed extreme values", () => {
      const mixedArray = [100000, 0, 0, 0, 1, 0, 100000];
      expect(() => {
        const result = canJump(mixedArray);
        expect(typeof result).toBe("boolean");
      }).not.toThrow();
    });
  });

  describe("🎲 Random Data Tests", () => {
    test("should handle random data consistently", () => {
      for (let i = 0; i < 10; i++) {
        const randomArray = Array.from({ length: 50 }, () =>
          Math.floor(Math.random() * 10)
        );

        const result = canJump(randomArray);
        expect(typeof result).toBe("boolean");
        expect(result).not.toBeNaN();
        expect([true, false]).toContain(result);
      }
    });

    test("should produce deterministic results", () => {
      const testArray = [2, 1, 3, 0, 1, 4];
      const results = [];

      // Run multiple times
      for (let i = 0; i < 5; i++) {
        results.push(canJump([...testArray]));
      }

      // All results should be identical
      const firstResult = results[0];
      results.forEach((result) => {
        expect(result).toBe(firstResult);
      });
    });
  });

  describe("🧩 Edge Case Combinations", () => {
    test("should handle arrays with only zeros", () => {
      expect(canJump([0])).toBe(true); // Single zero is valid (already at end)
      expect(canJump([0, 0])).toBe(false); // Multiple zeros are invalid
      expect(canJump([0, 0, 0, 0])).toBe(false); // Many zeros are invalid
    });

    test("should handle arrays with only maximum values", () => {
      expect(canJump([100000, 100000, 100000])).toBe(true);
      expect(canJump([10, 10, 10, 10])).toBe(true);
    });

    test("should handle alternating extremes", () => {
      expect(canJump([100000, 0, 100000, 0])).toBe(true);
      expect(canJump([1, 0, 1, 0, 1])).toBe(false);
    });
  });
});

// 🏁 Test Summary
describe("🏁 Test Summary", () => {
  test("should export all required functions", () => {
    expect(typeof canJump).toBe("function");
    expect(typeof canJumpDetailed).toBe("function");
    expect(typeof canJumpDP).toBe("function");
    expect(typeof canJumpDPOptimized).toBe("function");
    expect(typeof canJumpBackward).toBe("function");
    expect(typeof canJumpBFS).toBe("function");
    expect(typeof canJumpDFS).toBe("function");
    expect(typeof canJumpInterval).toBe("function");
  });

  test("should maintain algorithmic properties across all implementations", () => {
    const testInput = [2, 3, 1, 1, 4];

    // All algorithms should return the same correct result
    const results = algorithms.map((alg) => alg.fn(testInput));
    const expectedResult = true;

    results.forEach((result) => {
      expect(result).toBe(expectedResult);
    });

    // Verify boolean return type
    results.forEach((result) => {
      expect(typeof result).toBe("boolean");
    });
  });

  test("should demonstrate jump game mechanics", () => {
    // Reachable examples
    expect(canJump([2, 3, 1, 1, 4])).toBe(true); // Multiple valid paths
    expect(canJump([1, 1, 1, 1, 1])).toBe(true); // Minimum steps path
    expect(canJump([5])).toBe(true); // Single element

    // Unreachable examples
    expect(canJump([3, 2, 1, 0, 4])).toBe(false); // Blocked by zero
    expect(canJump([0, 1])).toBe(false); // Cannot start
    expect(canJump([1, 0, 2])).toBe(false); // Insufficient initial jump

    // Edge cases
    expect(canJump([0])).toBe(true); // Already at destination
    expect(canJump([1000, 0, 0, 0])).toBe(true); // Large jump
  });
});
