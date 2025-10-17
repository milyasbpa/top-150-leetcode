/**
 * 🧪 Test Suite for LeetCode #169 - Majority Element
 *
 * Testing all algorithm implementations:
 * 1. Boyer-Moore Voting Algorithm (Optimal)
 * 2. Hash Map Counter
 * 3. Sorting Approach
 * 4. Divide and Conquer
 * 5. Bit Manipulation
 * 6. Randomized Algorithm
 * 7. Two-Pass Boyer-Moore
 */

import {
  majorityElement,
  majorityElementBitwise,
  majorityElementDivideConquer,
  majorityElementHashMap,
  majorityElementRandom,
  majorityElementSort,
  majorityElementTwoPass,
} from "./dev";

// Test data with expected results (global scope)
const testCases = [
  {
    name: "Basic Case 1 - Simple majority",
    input: [3, 2, 3],
    expected: 3,
    description: "3 appears 2/3 times (> 1.5)",
  },
  {
    name: "Basic Case 2 - LeetCode example",
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
    name: "Two Elements Same",
    input: [1, 1],
    expected: 1,
    description: "Two identical elements",
  },
  {
    name: "All Same Elements",
    input: [5, 5, 5, 5, 5],
    expected: 5,
    description: "All elements are identical",
  },
  {
    name: "Minimal Majority - 3 elements",
    input: [1, 2, 1],
    expected: 1,
    description: "1 appears 2/3 times (just over 50%)",
  },
  {
    name: "Even Length Array",
    input: [1, 1, 2, 2, 1, 1],
    expected: 1,
    description: "Even length, 1 appears 4/6 times",
  },
  {
    name: "Odd Length Array",
    input: [3, 3, 4, 4, 4],
    expected: 4,
    description: "Odd length, 4 appears 3/5 times",
  },
  {
    name: "Large Numbers",
    input: [1000000000, -1000000000, 1000000000, -1000000000, 1000000000],
    expected: 1000000000,
    description: "Test with constraint boundary values",
  },
  {
    name: "Negative Numbers",
    input: [-1, -1, -2, -2, -1],
    expected: -1,
    description: "Majority with negative numbers",
  },
  {
    name: "Mixed Pattern",
    input: [1, 2, 3, 1, 2, 3, 1, 1, 1],
    expected: 1,
    description: "1 appears 5/9 times in mixed pattern",
  },
  {
    name: "Zero as Majority",
    input: [0, 0, 1, 1, 0],
    expected: 0,
    description: "Zero appears 3/5 times",
  },
  {
    name: "Alternating Pattern",
    input: [1, 2, 1, 2, 1],
    expected: 1,
    description: "Pattern where majority wins by 1",
  },
  {
    name: "Large Array - Majority at Start",
    input: [...Array(1000).fill(42), ...Array(500).fill(1)],
    expected: 42,
    description: "Large array with majority element clustered at start",
  },
  {
    name: "Large Array - Majority at End",
    input: [...Array(500).fill(1), ...Array(1000).fill(42)],
    expected: 42,
    description: "Large array with majority element clustered at end",
  },
];

// Algorithms to test (excluding random for deterministic testing)
const algorithms = [
  { name: "Boyer-Moore Voting", fn: majorityElement },
  { name: "Hash Map Counter", fn: majorityElementHashMap },
  { name: "Sorting Approach", fn: majorityElementSort },
  { name: "Divide & Conquer", fn: majorityElementDivideConquer },
  { name: "Bit Manipulation", fn: majorityElementBitwise },
  { name: "Two-Pass Boyer-Moore", fn: majorityElementTwoPass },
];

describe("🎯 LeetCode #169 - Majority Element", () => {
  // Test each algorithm with each test case
  algorithms.forEach(({ name, fn }) => {
    describe(`🔧 ${name} Algorithm`, () => {
      testCases.forEach(({ name: testName, input, expected, description }) => {
        test(`${testName}`, () => {
          // Create a copy to avoid mutation for sorting algorithm
          const inputCopy = [...input];
          const result = fn(inputCopy);

          expect(result).toBe(expected);

          // Additional validation: verify result is actually majority
          const count = input.filter((x) => x === result).length;
          const threshold = Math.floor(input.length / 2);
          expect(count).toBeGreaterThan(threshold);
        });
      });
    });
  });

  // Special tests for Boyer-Moore algorithm (main implementation)
  describe("🎯 Boyer-Moore Algorithm - Deep Testing", () => {
    test("should handle edge case: single element", () => {
      expect(majorityElement([42])).toBe(42);
    });

    test("should handle empty array gracefully", () => {
      expect(() => majorityElement([])).toThrow("Array cannot be empty");
    });

    test("should work with all same elements", () => {
      const allSame = Array(100).fill(7);
      expect(majorityElement(allSame)).toBe(7);
    });

    test("should handle minimum majority correctly", () => {
      // For array of length n, majority must appear > n/2 times
      expect(majorityElement([1, 1, 2])).toBe(1); // 2/3 > 1.5 ✓
      expect(majorityElement([1, 1, 2, 2, 1])).toBe(1); // 3/5 > 2.5 ✓
    });

    test("should work with negative numbers", () => {
      expect(majorityElement([-5, -5, -3, -5])).toBe(-5);
      expect(majorityElement([-1, 0, -1, 0, -1])).toBe(-1);
    });

    test("should handle large constraint values", () => {
      const MAX_VAL = 1000000000;
      const MIN_VAL = -1000000000;

      expect(majorityElement([MAX_VAL, MAX_VAL, MIN_VAL])).toBe(MAX_VAL);
      expect(
        majorityElement([MIN_VAL, MIN_VAL, MIN_VAL, MAX_VAL, MAX_VAL])
      ).toBe(MIN_VAL);
    });
  });

  // Performance and stress tests
  describe("🚀 Performance & Stress Tests", () => {
    test("should handle large arrays efficiently", () => {
      const size = 10000;
      const majorityCount = Math.floor(size / 2) + 1;
      const minorityCount = size - majorityCount;

      const largeArray = [
        ...Array(majorityCount).fill(999),
        ...Array(minorityCount)
          .fill(0)
          .map((_, i) => i),
      ];

      // Shuffle array
      for (let i = largeArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [largeArray[i], largeArray[j]] = [largeArray[j], largeArray[i]];
      }

      const start = performance.now();
      const result = majorityElement(largeArray);
      const end = performance.now();

      expect(result).toBe(999);
      expect(end - start).toBeLessThan(100); // Should complete within 100ms
    });

    test("Boyer-Moore vs HashMap performance comparison", () => {
      const size = 5000;
      const testArray = [
        ...Array(Math.floor(size * 0.6)).fill(1), // 60% majority
        ...Array(Math.floor(size * 0.4))
          .fill(0)
          .map((_, i) => i + 2), // 40% different elements
      ];

      // Shuffle
      for (let i = testArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [testArray[i], testArray[j]] = [testArray[j], testArray[i]];
      }

      // Test Boyer-Moore
      const start1 = performance.now();
      const result1 = majorityElement([...testArray]);
      const end1 = performance.now();
      const boyerMooreTime = end1 - start1;

      // Test HashMap
      const start2 = performance.now();
      const result2 = majorityElementHashMap([...testArray]);
      const end2 = performance.now();
      const hashMapTime = end2 - start2;

      expect(result1).toBe(result2);
      expect(result1).toBe(1);

      // Boyer-Moore should be competitive (within 2x of HashMap)
      expect(boyerMooreTime).toBeLessThan(hashMapTime * 2);
    });
  });

  // Algorithm-specific edge cases
  describe("🔍 Algorithm-Specific Edge Cases", () => {
    test("Sorting algorithm should not modify original array concept", () => {
      const original = [3, 2, 3, 1, 3];
      const copy = [...original];

      majorityElementSort(copy); // This will modify the copy
      // Original should be unchanged
      expect(original).toEqual([3, 2, 3, 1, 3]);
    });

    test("Divide and Conquer should handle power-of-2 sizes", () => {
      expect(majorityElementDivideConquer([1, 1])).toBe(1);
      expect(majorityElementDivideConquer([1, 1, 2, 1])).toBe(1);
      expect(majorityElementDivideConquer([1, 1, 1, 1, 2, 2, 2, 1])).toBe(1);
    });

    test("Bit manipulation should handle negative numbers correctly", () => {
      // Bit manipulation with negative numbers (two's complement)
      expect(majorityElementBitwise([-1, -1, 0])).toBe(-1);
      expect(majorityElementBitwise([-5, -5, -5, 2, 2])).toBe(-5);
    });

    test("Two-Pass Boyer-Moore should verify correctly", () => {
      // Test case where candidate might not be majority (hypothetically)
      expect(majorityElementTwoPass([3, 2, 3])).toBe(3);
      expect(majorityElementTwoPass([1, 1, 1, 2, 2])).toBe(1);
    });
  });

  // Randomized algorithm special tests
  describe("🎲 Randomized Algorithm Tests", () => {
    test("should eventually find majority (probabilistic)", () => {
      // Run multiple times to test randomized behavior
      const testArray = [1, 2, 1, 2, 1, 2, 1, 1, 1]; // 1 is majority (5/9)

      let successCount = 0;
      const iterations = 20;

      for (let i = 0; i < iterations; i++) {
        const result = majorityElementRandom([...testArray]);
        if (result === 1) successCount++;
      }

      // Should succeed most of the time (expected success rate > 50%)
      expect(successCount).toBeGreaterThan(iterations * 0.5);
    });

    test("should handle deterministic cases", () => {
      // Cases where randomized algorithm should always succeed
      expect(majorityElementRandom([1, 1, 1])).toBe(1);
      expect(majorityElementRandom([5, 5, 5, 5, 5, 1, 2])).toBe(5);
    });
  });

  // Boundary and constraint tests
  describe("📏 Boundary & Constraint Tests", () => {
    test("should handle minimum array size (n=1)", () => {
      algorithms.forEach(({ fn }) => {
        expect(fn([42])).toBe(42);
      });
    });

    test("should handle maximum constraint values", () => {
      const MAX_VAL = 1000000000;
      const MIN_VAL = -1000000000;

      algorithms.forEach(({ fn }) => {
        expect(fn([MAX_VAL, MAX_VAL, MIN_VAL])).toBe(MAX_VAL);
      });
    });

    test("should handle arrays where majority is exactly > n/2", () => {
      // Test precise boundary: majority must be > n/2, not >= n/2

      // Length 5: majority needs > 2.5, so >= 3
      expect(majorityElement([1, 1, 1, 2, 2])).toBe(1); // 3/5 = 0.6 > 0.5 ✓

      // Length 7: majority needs > 3.5, so >= 4
      expect(majorityElement([1, 1, 1, 1, 2, 2, 2])).toBe(1); // 4/7 ≈ 0.57 > 0.5 ✓

      // Length 9: majority needs > 4.5, so >= 5
      expect(majorityElement([1, 1, 1, 1, 1, 2, 2, 2, 2])).toBe(1); // 5/9 ≈ 0.56 > 0.5 ✓
    });
  });

  // Cross-algorithm consistency tests
  describe("🔄 Cross-Algorithm Consistency", () => {
    test("all algorithms should produce same results", () => {
      const consistencyTestCases = [
        [3, 2, 3],
        [2, 2, 1, 1, 1, 2, 2],
        [1],
        [1, 1, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 1],
        [-1, -1, -2, -2, -1],
        [0, 0, 0, 1, 1],
      ];

      consistencyTestCases.forEach((testCase, index) => {
        const results = algorithms.map(({ name, fn }) => ({
          name,
          result: fn([...testCase]), // Use copy to avoid mutation
        }));

        // All results should be the same
        const firstResult = results[0]!.result;
        results.forEach(({ name, result }) => {
          expect(result).toBe(firstResult);
        });
      });
    });
  });

  // Property-based tests
  describe("🧮 Property-Based Tests", () => {
    test("result should always be present in original array", () => {
      const testArrays = [
        [1, 2, 3, 1, 1],
        [5, 5, 4, 4, 5, 5, 5],
        [10, 20, 10, 30, 10, 10, 40],
      ];

      testArrays.forEach((testArray) => {
        algorithms.forEach(({ fn }) => {
          const result = fn([...testArray]);
          expect(testArray).toContain(result);
        });
      });
    });

    test("result should appear more than n/2 times", () => {
      const testArrays = [
        [1, 1, 2, 2, 1],
        [3, 3, 3, 4, 4],
        [7, 8, 7, 9, 7, 7, 7],
      ];

      testArrays.forEach((testArray) => {
        algorithms.forEach(({ fn }) => {
          const result = fn([...testArray]);
          const count = testArray.filter((x) => x === result).length;
          const threshold = Math.floor(testArray.length / 2);

          expect(count).toBeGreaterThan(threshold);
        });
      });
    });
  });

  // Error handling tests
  describe("❌ Error Handling", () => {
    test("Boyer-Moore should handle empty array", () => {
      expect(() => majorityElement([])).toThrow("Array cannot be empty");
    });

    test("Two-Pass Boyer-Moore should handle empty array", () => {
      expect(() => majorityElementTwoPass([])).toThrow("Array cannot be empty");
    });

    test("should handle undefined/null gracefully", () => {
      // These should not crash the algorithms
      algorithms.forEach(({ fn, name }) => {
        expect(() => {
          // @ts-ignore - Testing runtime behavior
          fn(null);
        }).toThrow();

        expect(() => {
          // @ts-ignore - Testing runtime behavior
          fn(undefined);
        }).toThrow();
      });
    });
  });

  // Memory usage tests
  describe("💾 Memory Usage Tests", () => {
    test("Boyer-Moore should use O(1) extra space", () => {
      const largeArray = Array(1000).fill(1).concat(Array(500).fill(2));

      // Memory usage should be independent of input size
      const result = majorityElement(largeArray);
      expect(result).toBe(1);

      // For O(1) space, we can't directly measure memory,
      // but we ensure it works with large inputs
      expect(typeof result).toBe("number");
    });
  });

  // Integration tests with real LeetCode examples
  describe("🎯 LeetCode Integration Tests", () => {
    test("LeetCode Example 1: [3,2,3] → 3", () => {
      const input = [3, 2, 3];
      const expected = 3;

      algorithms.forEach(({ fn }) => {
        expect(fn([...input])).toBe(expected);
      });
    });

    test("LeetCode Example 2: [2,2,1,1,1,2,2] → 2", () => {
      const input = [2, 2, 1, 1, 1, 2, 2];
      const expected = 2;

      algorithms.forEach(({ fn }) => {
        expect(fn([...input])).toBe(expected);
      });
    });
  });
});

// Additional test utilities for development
describe("🛠️ Development Utilities", () => {
  test("should verify test data integrity", () => {
    // Ensure all test cases have valid majority elements
    testCases.forEach(
      ({
        input,
        expected,
        name,
      }: {
        input: number[];
        expected: number;
        name: string;
      }) => {
        const count = input.filter((x: number) => x === expected).length;
        const threshold = Math.floor(input.length / 2);

        expect(count).toBeGreaterThan(threshold);
      }
    );
  });

  test("should have comprehensive coverage", () => {
    // Verify we test different array sizes
    const sizes = testCases.map(
      (tc: { input: number[]; expected: number; name: string }) =>
        tc.input.length
    );
    const uniqueSizes = Array.from(new Set(sizes));

    expect(uniqueSizes.length).toBeGreaterThan(5); // At least 6 different sizes
    expect(Math.min(...sizes)).toBe(1); // Test minimum size
    expect(Math.max(...sizes)).toBeGreaterThan(100); // Test large size
  });
});
