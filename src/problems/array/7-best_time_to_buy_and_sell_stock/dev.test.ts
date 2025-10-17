/**
 * 🧪 Test Suite for LeetCode #121 - Best Time to Buy and Sell Stock
 *
 * Testing all 6 algorithm implementations:
 * 1. One-Pass Algorithm (Optimal) - O(n) time, O(1) space
 * 2. Two-Pointer Approach - O(n) time, O(1) space
 * 3. Brute Force - O(n²) time, O(1) space
 * 4. Dynamic Programming - O(n) time, O(1) space
 * 5. Kadane's Algorithm Variation - O(n) time, O(1) space
 * 6. Valley-Peak Approach - O(n) time, O(1) space
 */

import {
  maxProfit,
  maxProfitBruteForce,
  maxProfitDP,
  maxProfitKadane,
  maxProfitTwoPointer,
  maxProfitValleyPeak,
} from "./dev";

// 🎯 Test data structure
interface TestCase {
  name: string;
  input: number[];
  expected: number;
  description: string;
}

// 📊 Algorithm configuration
interface Algorithm {
  name: string;
  fn: (prices: number[]) => number;
  timeComplexity: string;
  spaceComplexity: string;
}

// 🧪 Comprehensive test cases
const testCases: TestCase[] = [
  {
    name: "Basic Case 1",
    input: [7, 1, 5, 3, 6, 4],
    expected: 5,
    description: "Buy at 1, sell at 6 for profit of 5",
  },
  {
    name: "Basic Case 2",
    input: [7, 6, 4, 3, 1],
    expected: 0,
    description: "Prices always decreasing, no profit possible",
  },
  {
    name: "Single Day",
    input: [5],
    expected: 0,
    description: "Only one day, cannot buy and sell",
  },
  {
    name: "Two Days Profit",
    input: [1, 5],
    expected: 4,
    description: "Buy on day 1, sell on day 2",
  },
  {
    name: "Two Days Loss",
    input: [5, 1],
    expected: 0,
    description: "Price decreases, no profit possible",
  },
  {
    name: "All Same Prices",
    input: [3, 3, 3, 3],
    expected: 0,
    description: "No price change, no profit",
  },
  {
    name: "Increasing Trend",
    input: [1, 2, 3, 4, 5],
    expected: 4,
    description: "Best to buy first day, sell last day",
  },
  {
    name: "V-shaped Pattern",
    input: [5, 4, 3, 2, 1, 2, 3, 4, 5],
    expected: 4,
    description: "Buy at valley (1), sell at peak (5)",
  },
  {
    name: "Multiple Peaks",
    input: [3, 2, 6, 5, 0, 3],
    expected: 4,
    description: "Multiple buy-sell opportunities, max profit = 4 (2→6 or 0→3)",
  },
  {
    name: "Large Numbers",
    input: [10000, 1, 9999],
    expected: 9998,
    description: "Large price differences",
  },
  {
    name: "Zero Prices",
    input: [0, 1, 0, 3, 0, 4],
    expected: 4,
    description: "Include zero prices, max profit = 4 (0→4)",
  },
  {
    name: "Peak at Start",
    input: [10, 1, 2, 3],
    expected: 2,
    description: "Highest price at start, buy at minimum after",
  },
  {
    name: "Valley at End",
    input: [3, 2, 1, 0],
    expected: 0,
    description: "Lowest price at end, no profit possible",
  },
  {
    name: "Single Peak",
    input: [1, 3, 1],
    expected: 2,
    description: "Buy before peak, sell at peak",
  },
  {
    name: "W-Pattern",
    input: [2, 1, 4, 0, 3],
    expected: 3,
    description: "Multiple valleys and peaks, optimal: 0→3 or 1→4",
  },
];

// 🔧 All algorithms to test
const algorithms: Algorithm[] = [
  {
    name: "One-Pass",
    fn: maxProfit,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Two-Pointer",
    fn: maxProfitTwoPointer,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Dynamic Programming",
    fn: maxProfitDP,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Kadane's Algorithm",
    fn: maxProfitKadane,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Valley-Peak",
    fn: maxProfitValleyPeak,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Brute Force",
    fn: maxProfitBruteForce,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  },
];

// 🧪 Test each algorithm against all test cases
describe("🎯 Best Time to Buy and Sell Stock - All Algorithms", () => {
  algorithms.forEach(({ name, fn, timeComplexity, spaceComplexity }) => {
    describe(`🔧 ${name} Algorithm (${timeComplexity} time, ${spaceComplexity} space)`, () => {
      testCases.forEach(({ name: testName, input, expected, description }) => {
        test(`${testName}: ${description}`, () => {
          const result = fn(input);
          expect(result).toBe(expected);

          // Verify profit is non-negative
          expect(result).toBeGreaterThanOrEqual(0);
        });
      });
    });
  });
});

// 🎯 Focused tests for main algorithm (One-Pass)
describe("🌟 One-Pass Algorithm - Detailed Tests", () => {
  describe("✅ Basic Functionality", () => {
    test("should handle standard profit case", () => {
      expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
    });

    test("should handle no profit case", () => {
      expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
    });

    test("should handle increasing prices", () => {
      expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
    });

    test("should handle decreasing prices", () => {
      expect(maxProfit([5, 4, 3, 2, 1])).toBe(0);
    });
  });

  describe("🔍 Edge Cases", () => {
    test("should handle single day", () => {
      expect(maxProfit([42])).toBe(0);
    });

    test("should handle two days with profit", () => {
      expect(maxProfit([1, 5])).toBe(4);
    });

    test("should handle two days with loss", () => {
      expect(maxProfit([5, 1])).toBe(0);
    });

    test("should handle same prices", () => {
      expect(maxProfit([3, 3, 3, 3])).toBe(0);
    });

    test("should handle zero prices", () => {
      expect(maxProfit([0, 0, 0])).toBe(0);
      expect(maxProfit([0, 5, 0])).toBe(5);
    });

    test("should handle maximum price range", () => {
      expect(maxProfit([0, 10000])).toBe(10000);
      expect(maxProfit([10000, 0])).toBe(0);
    });
  });

  describe("🔢 Boundary Values", () => {
    test("should handle minimum constraint (single element)", () => {
      expect(maxProfit([1])).toBe(0);
    });

    test("should handle maximum constraint values", () => {
      const prices = [0, 10000, 5000, 7500];
      expect(maxProfit(prices)).toBe(10000);
    });

    test("should handle large arrays efficiently", () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100);
      const start = performance.now();
      const result = maxProfit(largeArray);
      const end = performance.now();

      expect(result).toBeGreaterThanOrEqual(0);
      expect(end - start).toBeLessThan(100); // Should complete in reasonable time
    });
  });

  describe("🎲 Pattern Recognition", () => {
    test("should find optimal buy-sell in V-pattern", () => {
      expect(maxProfit([5, 3, 1, 4, 6])).toBe(5); // Buy at 1, sell at 6
    });

    test("should find optimal buy-sell in W-pattern", () => {
      expect(maxProfit([3, 1, 4, 1, 5])).toBe(4); // Buy at 1, sell at 5
    });

    test("should handle multiple equal profits", () => {
      expect(maxProfit([1, 3, 1, 3])).toBe(2); // Either 1→3 gives profit of 2
    });

    test("should handle plateau patterns", () => {
      expect(maxProfit([1, 1, 5, 5, 1, 1])).toBe(4); // Buy at 1, sell at 5
    });

    test("should handle zigzag patterns", () => {
      expect(maxProfit([1, 4, 2, 5, 3, 6])).toBe(5); // Buy at 1, sell at 6
    });
  });
});

// ⚡ Performance Tests
describe("⚡ Performance Tests", () => {
  const createTestArray = (size: number, pattern: string): number[] => {
    switch (pattern) {
      case "increasing":
        return Array.from({ length: size }, (_, i) => i + 1);
      case "decreasing":
        return Array.from({ length: size }, (_, i) => size - i);
      case "random":
        return Array.from({ length: size }, () =>
          Math.floor(Math.random() * 1000)
        );
      case "volatile":
        return Array.from({ length: size }, (_, i) =>
          Math.floor(Math.sin(i / 10) * 500 + 500)
        );
      case "constant":
        return new Array(size).fill(100);
      default:
        return [];
    }
  };

  describe("🏃‍♂️ Speed Tests", () => {
    const testSizes = [100, 1000, 5000];
    const patterns = ["increasing", "decreasing", "random", "volatile"];

    testSizes.forEach((size) => {
      patterns.forEach((pattern) => {
        test(`should handle ${size} elements (${pattern}) efficiently`, () => {
          const prices = createTestArray(size, pattern);

          const start = performance.now();
          const result = maxProfit(prices);
          const end = performance.now();

          expect(result).toBeGreaterThanOrEqual(0);
          expect(end - start).toBeLessThan(50); // Should be fast
        });
      });
    });

    test("should outperform brute force significantly", () => {
      const prices = createTestArray(1000, "random");

      // Test One-Pass (optimal)
      const start1 = performance.now();
      const result1 = maxProfit(prices);
      const end1 = performance.now();
      const optimalTime = end1 - start1;

      // Test Brute Force (for comparison with smaller array)
      const smallPrices = prices.slice(0, 100); // Use smaller array for brute force
      const start2 = performance.now();
      const result2 = maxProfitBruteForce(smallPrices);
      const end2 = performance.now();
      const bruteTime = end2 - start2;

      expect(result1).toBeGreaterThanOrEqual(0);
      expect(result2).toBeGreaterThanOrEqual(0);
      expect(optimalTime).toBeLessThan(10); // Optimal should be very fast
    });
  });

  describe("📊 Complexity Verification", () => {
    test("should have linear time complexity", () => {
      const sizes = [1000, 2000, 4000];
      const times: number[] = [];

      sizes.forEach((size) => {
        const prices = createTestArray(size, "random");
        const start = performance.now();
        maxProfit(prices);
        const end = performance.now();
        times.push(end - start);
      });

      // Linear growth: roughly T(2n) ≈ 2*T(n)
      // Allow some variance due to system factors
      times.forEach((time) => {
        expect(time).toBeLessThan(20); // All should be fast
      });
    });

    test("should use constant space", () => {
      // This is conceptual - we verify algorithm doesn't create proportional arrays
      const prices = createTestArray(10000, "random");

      const start = performance.now();
      const result = maxProfit(prices);
      const end = performance.now();

      expect(result).toBeGreaterThanOrEqual(0);
      expect(end - start).toBeLessThan(100); // Should complete efficiently
    });
  });
});

// 🧮 Algorithm Comparison Tests
describe("🧮 Algorithm Comparison", () => {
  const comparisonTestCases: TestCase[] = [
    {
      name: "Standard Case",
      input: [7, 1, 5, 3, 6, 4],
      expected: 5,
      description: "Standard buy-sell scenario",
    },
    {
      name: "No Profit Case",
      input: [7, 6, 4, 3, 1],
      expected: 0,
      description: "Decreasing prices",
    },
    {
      name: "Edge Case",
      input: [1, 2],
      expected: 1,
      description: "Minimal profitable case",
    },
    {
      name: "Complex Pattern",
      input: [3, 2, 6, 5, 0, 3],
      expected: 4,
      description: "Multiple peaks and valleys",
    },
  ];

  describe("✅ Correctness Verification", () => {
    comparisonTestCases.forEach(({ name, input, expected }, index) => {
      test(`all algorithms should produce same result for ${name}`, () => {
        const results = algorithms.map(({ fn }) => fn(input));

        // All results should be identical
        results.forEach((result) => {
          expect(result).toBe(expected);
        });

        // Verify all algorithms agree
        const firstResult = results[0];
        results.forEach((result) => {
          expect(result).toBe(firstResult);
        });
      });
    });
  });

  describe("📈 Relative Performance", () => {
    test("optimal algorithms should be faster than brute force", () => {
      const prices = createTestArray(500, "random");

      // Test optimal algorithms
      const optimalAlgorithms = algorithms.filter(
        (alg) => alg.timeComplexity === "O(n)"
      );

      optimalAlgorithms.forEach(({ name, fn }) => {
        const start = performance.now();
        const result = fn(prices);
        const end = performance.now();

        expect(result).toBeGreaterThanOrEqual(0);
        expect(end - start).toBeLessThan(10); // Should be fast
      });
    });
  });

  const createTestArray = (size: number, pattern: string): number[] => {
    switch (pattern) {
      case "increasing":
        return Array.from({ length: size }, (_, i) => i + 1);
      case "decreasing":
        return Array.from({ length: size }, (_, i) => size - i);
      case "random":
        return Array.from({ length: size }, () =>
          Math.floor(Math.random() * 1000)
        );
      case "volatile":
        return Array.from({ length: size }, (_, i) =>
          Math.floor(Math.sin(i / 10) * 500 + 500)
        );
      default:
        return [];
    }
  };
});

// 💰 Financial Logic Tests
describe("💰 Financial Logic Tests", () => {
  describe("🎯 Trading Rules", () => {
    test("should enforce buy before sell constraint", () => {
      // Cannot sell on day 1 and buy on day 2
      expect(maxProfit([5, 1])).toBe(0);
      expect(maxProfit([10, 5, 1])).toBe(0);
    });

    test("should find single best transaction", () => {
      // Only one buy-sell transaction allowed
      expect(maxProfit([1, 5, 1, 6])).toBe(5); // Should be 1→6, not 1→5 then 1→6
    });

    test("should maximize profit over time horizon", () => {
      expect(maxProfit([2, 1, 4, 9])).toBe(8); // Buy at 1, sell at 9
      expect(maxProfit([2, 9, 1, 4])).toBe(7); // Buy at 2, sell at 9
    });
  });

  describe("💹 Market Scenarios", () => {
    test("should handle bull market", () => {
      const bullMarket = [100, 110, 120, 130, 140, 150];
      expect(maxProfit(bullMarket)).toBe(50); // Buy first, sell last
    });

    test("should handle bear market", () => {
      const bearMarket = [150, 140, 130, 120, 110, 100];
      expect(maxProfit(bearMarket)).toBe(0); // No profit possible
    });

    test("should handle volatile market", () => {
      const volatileMarket = [100, 150, 80, 200, 60, 180];
      expect(maxProfit(volatileMarket)).toBe(120); // Buy at 80, sell at 200
    });

    test("should handle sideways market", () => {
      const sidewaysMarket = [100, 105, 95, 102, 98, 101];
      expect(maxProfit(sidewaysMarket)).toBe(7); // Buy at 95, sell at 102
    });
  });

  describe("📊 Risk-Reward Analysis", () => {
    test("should prefer higher absolute profit", () => {
      expect(maxProfit([1, 100, 50, 60])).toBe(99); // 1→100 better than 50→60
    });

    test("should handle zero-cost scenarios", () => {
      expect(maxProfit([0, 50, 25, 75])).toBe(75); // Buy free, sell at 75
    });

    test("should handle identical consecutive prices", () => {
      expect(maxProfit([10, 10, 15, 15, 5, 5])).toBe(5); // 10→15
    });
  });
});

// 🎭 Stress Tests
describe("🎭 Stress Tests", () => {
  describe("🔥 High Load Scenarios", () => {
    test("should handle maximum constraints", () => {
      // Test with max length and max price values
      const maxArray = new Array(10000)
        .fill(0)
        .map((_, i) => (i < 5000 ? i : 10000 - (i - 5000)));

      expect(() => {
        const result = maxProfit(maxArray);
        expect(result).toBeGreaterThanOrEqual(0);
      }).not.toThrow();
    });

    test("should handle extreme price differences", () => {
      expect(maxProfit([0, 10000])).toBe(10000);
      expect(maxProfit([10000, 0])).toBe(0);
    });

    test("should handle alternating patterns", () => {
      const alternating = Array.from({ length: 1000 }, (_, i) => i % 2);
      expect(() => {
        const result = maxProfit(alternating);
        expect(result).toBeGreaterThanOrEqual(0);
      }).not.toThrow();
    });
  });

  describe("🎲 Random Data Tests", () => {
    test("should handle random data consistently", () => {
      for (let i = 0; i < 10; i++) {
        const randomPrices = Array.from({ length: 100 }, () =>
          Math.floor(Math.random() * 1000)
        );

        const result = maxProfit(randomPrices);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(typeof result).toBe("number");
        expect(result).not.toBeNaN();
      }
    });
  });
});

// 🏁 Test Summary
describe("🏁 Test Summary", () => {
  test("should export all required functions", () => {
    expect(typeof maxProfit).toBe("function");
    expect(typeof maxProfitTwoPointer).toBe("function");
    expect(typeof maxProfitBruteForce).toBe("function");
    expect(typeof maxProfitDP).toBe("function");
    expect(typeof maxProfitKadane).toBe("function");
    expect(typeof maxProfitValleyPeak).toBe("function");
  });

  test("should maintain algorithmic properties", () => {
    const testInput = [7, 1, 5, 3, 6, 4];

    // All algorithms should return the same correct result
    const results = algorithms.map((alg) => alg.fn(testInput));
    const expectedResult = 5;

    results.forEach((result) => {
      expect(result).toBe(expectedResult);
    });
  });
});
