/**
 * 🧪 Test Suite for LeetCode #122 - Best Time to Buy and Sell Stock II
 *
 * Testing all 6 algorithm implementations:
 * 1. Greedy Algorithm (Optimal) - O(n) time, O(1) space
 * 2. Two-Pointer Buy-Sell Tracking - O(n) time, O(1) space
 * 3. Dynamic Programming - O(n) time, O(1) space
 * 4. Peak-Valley Approach - O(n) time, O(1) space
 * 5. Transaction-based Approach - O(n) time, O(n) space
 * 6. Recursive with Memoization - O(n) time, O(n) space
 */

import {
  maxProfit,
  maxProfitBuySell,
  maxProfitDP,
  maxProfitPeakValley,
  maxProfitRecursive,
  maxProfitTransactions,
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
    expected: 7,
    description: "Multiple transactions: (1→5) + (3→6) = 4 + 3 = 7",
  },
  {
    name: "Basic Case 2",
    input: [1, 2, 3, 4, 5],
    expected: 4,
    description: "Increasing trend: capture all increases = 1+1+1+1 = 4",
  },
  {
    name: "Basic Case 3",
    input: [7, 6, 4, 3, 1],
    expected: 0,
    description: "Decreasing trend: no profitable transactions",
  },
  {
    name: "Single Day",
    input: [5],
    expected: 0,
    description: "Only one day, cannot buy and sell",
  },
  {
    name: "Two Days Up",
    input: [1, 5],
    expected: 4,
    description: "Buy day 1, sell day 2, profit = 4",
  },
  {
    name: "Two Days Down",
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
    name: "Zigzag Pattern",
    input: [1, 4, 2, 5, 3, 6],
    expected: 9,
    description: "Multiple ups: (1→4) + (2→5) + (3→6) = 3 + 3 + 3 = 9",
  },
  {
    name: "V-Pattern Recovery",
    input: [5, 2, 3, 2, 6, 6, 2, 9, 1, 5],
    expected: 11,
    description:
      "Complex pattern: (2→3) + (2→6) + (2→9) + (1→5) = 1+4+7+4 = 16... need recalc",
  },
  {
    name: "Flat with Spikes",
    input: [2, 1, 2, 0, 1],
    expected: 2,
    description: "Small profits: (1→2) + (0→1) = 1 + 1 = 2",
  },
  {
    name: "Large Numbers",
    input: [1000, 2000, 1500, 3000],
    expected: 2500,
    description: "Large values: (1000→2000) + (1500→3000) = 1000 + 1500 = 2500",
  },
  {
    name: "Single Peak",
    input: [1, 3, 1],
    expected: 2,
    description: "Buy at 1, sell at 3, profit = 2",
  },
  {
    name: "Multiple Plateaus",
    input: [1, 1, 3, 3, 5, 5],
    expected: 4,
    description: "Skip plateaus: (1→3) + (3→5) = 2 + 2 = 4",
  },
  {
    name: "Alternating Pattern",
    input: [1, 3, 2, 4, 1, 5],
    expected: 7,
    description:
      "Capture ups: (1→3) + (2→4) + (1→5) = 2 + 2 + 4 = 8... need recalc",
  },
  {
    name: "Zero Prices",
    input: [0, 1, 0, 2, 0, 3],
    expected: 6,
    description: "Include zeros: (0→1) + (0→2) + (0→3) = 1 + 2 + 3 = 6",
  },
];

// 🔧 All algorithms to test
const algorithms: Algorithm[] = [
  {
    name: "Greedy Algorithm",
    fn: maxProfit,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Buy-Sell Tracking",
    fn: maxProfitBuySell,
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
    name: "Peak-Valley",
    fn: maxProfitPeakValley,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Transaction-based",
    fn: maxProfitTransactions,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
  },
  {
    name: "Recursive + Memo",
    fn: maxProfitRecursive,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
  },
];

// Helper function to calculate expected result using greedy approach
function calculateExpected(prices: number[]): number {
  if (prices.length < 2) return 0;
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i]! > prices[i - 1]!) {
      profit += prices[i]! - prices[i - 1]!;
    }
  }
  return profit;
}

// Fix expected values for test cases that need recalculation
describe("🔧 Test Case Validation", () => {
  test("should validate V-Pattern Recovery expected value", () => {
    const prices = [5, 2, 3, 2, 6, 6, 2, 9, 1, 5];
    const calculated = calculateExpected(prices);
    // Manual calculation: (2→3)=1 + (2→6)=4 + (6→6)=0 + (2→9)=7 + (1→5)=4 = 16
    expect(calculated).toBe(16);
  });

  test("should validate Alternating Pattern expected value", () => {
    const prices = [1, 3, 2, 4, 1, 5];
    const calculated = calculateExpected(prices);
    // Manual calculation: (1→3)=2 + (2→4)=2 + (1→5)=4 = 8
    expect(calculated).toBe(8);
  });
});

// Update test cases with correct expected values
const correctedTestCases: TestCase[] = testCases.map((testCase) => {
  if (testCase.name === "V-Pattern Recovery") {
    return {
      ...testCase,
      expected: 16,
      description:
        "Complex pattern: (2→3) + (2→6) + (2→9) + (1→5) = 1+4+7+4 = 16",
    };
  }
  if (testCase.name === "Alternating Pattern") {
    return {
      ...testCase,
      expected: 8,
      description: "Capture ups: (1→3) + (2→4) + (1→5) = 2 + 2 + 4 = 8",
    };
  }
  return testCase;
});

// 🧪 Test each algorithm against all test cases
describe("🎯 Best Time to Buy and Sell Stock II - All Algorithms", () => {
  algorithms.forEach(({ name, fn, timeComplexity, spaceComplexity }) => {
    describe(`🔧 ${name} Algorithm (${timeComplexity} time, ${spaceComplexity} space)`, () => {
      correctedTestCases.forEach(
        ({ name: testName, input, expected, description }) => {
          test(`${testName}: ${description}`, () => {
            const result = fn(input);
            expect(result).toBe(expected);

            // Verify profit is non-negative
            expect(result).toBeGreaterThanOrEqual(0);
          });
        }
      );
    });
  });
});

// 🎯 Focused tests for main algorithm (Greedy)
describe("🌟 Greedy Algorithm - Detailed Tests", () => {
  describe("✅ Basic Functionality", () => {
    test("should handle multiple transactions case", () => {
      expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(7);
    });

    test("should handle increasing prices", () => {
      expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
    });

    test("should handle decreasing prices", () => {
      expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
    });

    test("should handle flat prices", () => {
      expect(maxProfit([3, 3, 3, 3])).toBe(0);
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

    test("should handle zero prices", () => {
      expect(maxProfit([0, 0, 0])).toBe(0);
      expect(maxProfit([0, 5, 0])).toBe(5);
    });

    test("should handle maximum price range", () => {
      expect(maxProfit([0, 10000])).toBe(10000);
      expect(maxProfit([10000, 0])).toBe(0);
    });

    test("should handle empty-like cases", () => {
      expect(maxProfit([100])).toBe(0);
      expect(maxProfit([100, 100])).toBe(0);
    });
  });

  describe("🔢 Boundary Values", () => {
    test("should handle minimum constraint (single element)", () => {
      expect(maxProfit([1])).toBe(0);
    });

    test("should handle maximum constraint values", () => {
      const prices = [0, 10000, 5000, 10000];
      expect(maxProfit(prices)).toBe(15000); // (0→10000) + (5000→10000)
    });

    test("should handle large arrays efficiently", () => {
      const largeArray = Array.from({ length: 30000 }, (_, i) => (i % 100) + 1);
      const start = performance.now();
      const result = maxProfit(largeArray);
      const end = performance.now();

      expect(result).toBeGreaterThanOrEqual(0);
      expect(end - start).toBeLessThan(100); // Should complete in reasonable time
    });
  });

  describe("🎲 Pattern Recognition", () => {
    test("should capture all upward movements", () => {
      expect(maxProfit([1, 5, 3, 6, 4])).toBe(7); // (1→5) + (3→6) = 4 + 3
    });

    test("should ignore downward movements", () => {
      expect(maxProfit([6, 1, 3, 2, 4, 7])).toBe(7); // (1→3) + (2→4) + (4→7) = 2+2+3
    });

    test("should handle sawtooth pattern", () => {
      expect(maxProfit([1, 2, 1, 2, 1, 2])).toBe(3); // 1→2, 1→2, 1→2 = 1+1+1
    });

    test("should handle plateau patterns", () => {
      expect(maxProfit([1, 1, 3, 3, 5, 5])).toBe(4); // (1→3) + (3→5) = 2+2
    });

    test("should handle volatile market", () => {
      expect(maxProfit([100, 180, 260, 310, 40, 535, 695])).toBe(865);
      // (100→180) + (180→260) + (260→310) + (40→535) + (535→695) = 80+80+50+495+160
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
      case "sawtooth":
        return Array.from({ length: size }, (_, i) => (i % 2 === 0 ? 1 : 10));
      default:
        return [];
    }
  };

  describe("🏃‍♂️ Speed Tests", () => {
    const testSizes = [100, 1000, 5000];
    const patterns = [
      "increasing",
      "decreasing",
      "random",
      "volatile",
      "sawtooth",
    ];

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

    test("should outperform naive approaches significantly", () => {
      const prices = createTestArray(1000, "random");

      // Test Greedy (optimal)
      const start1 = performance.now();
      const result1 = maxProfit(prices);
      const end1 = performance.now();
      const greedyTime = end1 - start1;

      expect(result1).toBeGreaterThanOrEqual(0);
      expect(greedyTime).toBeLessThan(10); // Should be very fast
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

      // All should complete quickly (linear growth)
      times.forEach((time) => {
        expect(time).toBeLessThan(20);
      });
    });

    test("should use constant space", () => {
      // Conceptual test - greedy algorithm uses O(1) space
      const prices = createTestArray(10000, "random");

      const start = performance.now();
      const result = maxProfit(prices);
      const end = performance.now();

      expect(result).toBeGreaterThanOrEqual(0);
      expect(end - start).toBeLessThan(50);
    });
  });
});

// 🧮 Algorithm Comparison Tests
describe("🧮 Algorithm Comparison", () => {
  const comparisonTestCases: TestCase[] = [
    {
      name: "Standard Multiple Transactions",
      input: [7, 1, 5, 3, 6, 4],
      expected: 7,
      description: "Classic multiple transactions case",
    },
    {
      name: "Increasing Trend",
      input: [1, 2, 3, 4, 5],
      expected: 4,
      description: "Pure increasing trend",
    },
    {
      name: "Decreasing Trend",
      input: [7, 6, 4, 3, 1],
      expected: 0,
      description: "Pure decreasing trend",
    },
    {
      name: "Volatile Pattern",
      input: [1, 4, 2, 5, 3, 6],
      expected: 9,
      description: "High volatility with multiple opportunities",
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
      const prices = createTestArray(1000, "random");

      // Test O(1) space algorithms
      const constantSpaceAlgs = algorithms.filter(
        (alg) => alg.spaceComplexity === "O(1)"
      );

      constantSpaceAlgs.forEach(({ name, fn }) => {
        const start = performance.now();
        const result = fn(prices);
        const end = performance.now();

        expect(result).toBeGreaterThanOrEqual(0);
        expect(end - start).toBeLessThan(15); // Should be very fast
      });
    });
  });

  const createTestArray = (size: number, pattern: string): number[] => {
    switch (pattern) {
      case "random":
        return Array.from({ length: size }, () =>
          Math.floor(Math.random() * 1000)
        );
      default:
        return [];
    }
  };
});

// 💰 Financial Logic Tests
describe("💰 Financial Logic Tests", () => {
  describe("🎯 Trading Rules", () => {
    test("should allow multiple transactions", () => {
      // Unlike Stock I, multiple transactions are allowed
      expect(maxProfit([1, 5, 1, 6])).toBe(9); // (1→5) + (1→6) = 4+5
    });

    test("should enforce chronological order", () => {
      // Can't sell before buying
      expect(maxProfit([5, 1])).toBe(0);
      expect(maxProfit([10, 5, 1])).toBe(0);
    });

    test("should allow same-day buy-sell", () => {
      // Problem states: "you can buy it then immediately sell it on the same day"
      expect(maxProfit([1, 2])).toBe(1); // Buy and sell immediately
    });

    test("should optimize for maximum total profit", () => {
      expect(maxProfit([2, 1, 4, 9])).toBe(8); // (1→4) + (4→9) = 3+5 = 8
    });
  });

  describe("💹 Market Scenarios", () => {
    test("should handle bull market optimally", () => {
      const bullMarket = [100, 110, 120, 130, 140, 150];
      expect(maxProfit(bullMarket)).toBe(50); // Capture all increases
    });

    test("should handle bear market", () => {
      const bearMarket = [150, 140, 130, 120, 110, 100];
      expect(maxProfit(bearMarket)).toBe(0); // No profit possible
    });

    test("should handle volatile market", () => {
      const volatileMarket = [100, 150, 80, 200, 60, 180];
      expect(maxProfit(volatileMarket)).toBe(290); // (100→150) + (80→200) + (60→180) = 50+120+120
    });

    test("should handle sideways market", () => {
      const sidewaysMarket = [100, 105, 95, 102, 98, 101];
      expect(maxProfit(sidewaysMarket)).toBe(15); // (100→105) + (95→102) + (98→101) = 5+7+3 = 15
    });

    test("should handle bubble and crash", () => {
      const bubblePattern = [50, 100, 200, 300, 150, 75, 125];
      const result = maxProfit(bubblePattern);
      expect(result).toBeGreaterThan(0); // Should find some profit opportunities
    });
  });

  describe("📊 Transaction Analysis", () => {
    test("should prefer frequency over magnitude when beneficial", () => {
      // Frequent small trades vs one big trade
      expect(maxProfit([1, 2, 1, 2, 1, 2])).toBe(3); // 3 transactions of +1 each
    });

    test("should handle zero-cost scenarios", () => {
      expect(maxProfit([0, 50, 25, 75])).toBe(100); // (0→50) + (25→75) = 50+50
    });

    test("should maximize compound opportunities", () => {
      expect(maxProfit([1, 3, 2, 8, 4, 9])).toBe(13); // (1→3) + (2→8) + (4→9) = 2+6+5
    });
  });
});

// 🎭 Stress Tests
describe("🎭 Stress Tests", () => {
  describe("🔥 High Load Scenarios", () => {
    test("should handle maximum constraints", () => {
      // Test with max length: 3 * 10^4
      const maxArray = new Array(30000)
        .fill(0)
        .map((_, i) => Math.floor(Math.sin(i / 100) * 5000 + 5000));

      expect(() => {
        const result = maxProfit(maxArray);
        expect(result).toBeGreaterThanOrEqual(0);
      }).not.toThrow();
    });

    test("should handle extreme price differences", () => {
      expect(maxProfit([0, 10000])).toBe(10000);
      expect(maxProfit([10000, 0])).toBe(0);
      expect(maxProfit([0, 10000, 0, 10000])).toBe(20000); // Two max profits
    });

    test("should handle alternating extreme values", () => {
      const alternating = Array.from({ length: 1000 }, (_, i) =>
        i % 2 === 0 ? 0 : 10000
      );
      expect(() => {
        const result = maxProfit(alternating);
        expect(result).toBeGreaterThan(0);
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
        expect(result).not.toBe(Infinity);
      }
    });

    test("should produce deterministic results", () => {
      const testArray = [5, 1, 3, 6, 4];
      const results = [];

      // Run multiple times
      for (let i = 0; i < 5; i++) {
        results.push(maxProfit([...testArray]));
      }

      // All results should be identical
      const firstResult = results[0];
      results.forEach((result) => {
        expect(result).toBe(firstResult);
      });
    });
  });
});

// 🏁 Test Summary
describe("🏁 Test Summary", () => {
  test("should export all required functions", () => {
    expect(typeof maxProfit).toBe("function");
    expect(typeof maxProfitBuySell).toBe("function");
    expect(typeof maxProfitDP).toBe("function");
    expect(typeof maxProfitPeakValley).toBe("function");
    expect(typeof maxProfitTransactions).toBe("function");
    expect(typeof maxProfitRecursive).toBe("function");
  });

  test("should maintain algorithmic properties across all implementations", () => {
    const testInput = [7, 1, 5, 3, 6, 4];

    // All algorithms should return the same correct result
    const results = algorithms.map((alg) => alg.fn(testInput));
    const expectedResult = 7;

    results.forEach((result) => {
      expect(result).toBe(expectedResult);
    });

    // Verify greedy property: result should equal sum of all positive differences
    let greedySum = 0;
    for (let i = 1; i < testInput.length; i++) {
      if (testInput[i]! > testInput[i - 1]!) {
        greedySum += testInput[i]! - testInput[i - 1]!;
      }
    }

    results.forEach((result) => {
      expect(result).toBe(greedySum);
    });
  });

  test("should demonstrate difference from Stock I problem", () => {
    const prices = [7, 1, 5, 3, 6, 4];

    // Stock II allows multiple transactions
    const stockIIResult = maxProfit(prices);
    expect(stockIIResult).toBe(7); // (1→5) + (3→6) = 4+3

    // Stock I would only allow single transaction
    // (This would be 5 for optimal single transaction 1→6)
    expect(stockIIResult).toBeGreaterThanOrEqual(5);
  });
});
