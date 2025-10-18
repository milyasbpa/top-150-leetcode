/**
 * @fileoverview Test Suite for H-Index Problem (LeetCode 274)
 *
 * Tests all implemented algorithms for consistency and correctness.
 * Covers edge cases, performance scenarios, and algorithm verification.
 *
 * Test Categories:
 * 1. Basic Examples - Standard test cases from problem description
 * 2. Edge Cases - Empty arrays, single elements, all zeros
 * 3. Large Values - High citation counts and large arrays
 * 4. Sorted Arrays - Pre-sorted input validation
 * 5. Reverse Sorted - Descending order arrays
 * 6. Duplicate Values - Arrays with repeated citation counts
 * 7. Mathematical Edge Cases - H-index boundary conditions
 * 8. Performance Tests - Large array handling
 * 9. Algorithm Consistency - All algorithms produce same results
 */

import {
  analyzeCitations,
  compareAlgorithms,
  hIndex,
  hIndexBinarySearch,
  hIndexBucket,
  hIndexCounting,
  hIndexHistogram,
  hIndexMath,
  hIndexOptimized,
  hIndexTwoPointer,
  validateHIndex,
} from "./dev";

describe("H-Index Problem - All Algorithms", () => {
  // All algorithm implementations for consistency testing
  const algorithms = [
    { name: "Sorting", fn: hIndex },
    { name: "Optimized Sorting", fn: hIndexOptimized },
    { name: "Counting Sort", fn: hIndexCounting },
    { name: "Binary Search", fn: hIndexBinarySearch },
    { name: "Bucket Sort", fn: hIndexBucket },
    { name: "Two Pointer", fn: hIndexTwoPointer },
    { name: "Histogram", fn: hIndexHistogram },
    { name: "Mathematical", fn: hIndexMath },
  ];

  /**
   * Category 1: Basic Examples
   * Standard test cases from the problem description
   */
  describe("Basic Examples", () => {
    const testCases = [
      {
        input: [3, 0, 6, 1, 5],
        expected: 3,
        description: "Standard example - H-index of 3",
      },
      {
        input: [1, 3, 1],
        expected: 1,
        description: "Small array with duplicates",
      },
      {
        input: [100],
        expected: 1,
        description: "Single high citation paper",
      },
      {
        input: [0, 0],
        expected: 0,
        description: "Multiple zero citations",
      },
      {
        input: [1, 1, 3],
        expected: 1,
        description: "Mixed low citations",
      },
    ];

    testCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 2: Edge Cases
   * Boundary conditions and minimal inputs
   */
  describe("Edge Cases", () => {
    const edgeCases = [
      {
        input: [],
        expected: 0,
        description: "Empty array",
      },
      {
        input: [0],
        expected: 0,
        description: "Single zero citation",
      },
      {
        input: [1],
        expected: 1,
        description: "Single citation",
      },
      {
        input: [0, 0, 0, 0],
        expected: 0,
        description: "All zeros",
      },
    ];

    edgeCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 3: Large Values
   * High citation counts and their H-index calculations
   */
  describe("Large Values", () => {
    const largeCases = [
      {
        input: [100, 200, 300, 400, 500],
        expected: 5,
        description: "All high citations",
      },
      {
        input: [1000, 1000, 1000],
        expected: 3,
        description: "Very high duplicate citations",
      },
      {
        input: [50, 60, 70, 80, 90, 100],
        expected: 6,
        description: "Increasing high citations",
      },
      {
        input: [1, 2, 1000],
        expected: 2,
        description: "Mixed with one very high",
      },
    ];

    largeCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 4: Sorted Arrays
   * Pre-sorted input validation
   */
  describe("Sorted Arrays", () => {
    const sortedCases = [
      {
        input: [0, 1, 2, 3, 4],
        expected: 2,
        description: "Ascending sorted",
      },
      {
        input: [1, 2, 3, 4, 5, 6],
        expected: 3,
        description: "Consecutive ascending",
      },
      {
        input: [0, 0, 1, 1, 2, 2],
        expected: 2,
        description: "Sorted with duplicates",
      },
    ];

    sortedCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 5: Reverse Sorted Arrays
   * Descending order inputs
   */
  describe("Reverse Sorted Arrays", () => {
    const reverseCases = [
      {
        input: [10, 8, 5, 4, 3],
        expected: 4,
        description: "Descending order",
      },
      {
        input: [6, 5, 4, 3, 2, 1],
        expected: 3,
        description: "Strict descending",
      },
      {
        input: [100, 50, 25, 10, 5],
        expected: 5,
        description: "Large descending values",
      },
    ];

    reverseCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 6: Duplicate Values
   * Arrays with repeated citation counts
   */
  describe("Duplicate Values", () => {
    const duplicateCases = [
      {
        input: [5, 5, 5, 5, 5],
        expected: 5,
        description: "All same high values",
      },
      {
        input: [2, 2, 2, 2],
        expected: 2,
        description: "All same medium values",
      },
      {
        input: [1, 1, 1, 1, 1, 1],
        expected: 1,
        description: "All ones",
      },
      {
        input: [3, 3, 1, 1, 0, 0],
        expected: 2,
        description: "Paired duplicates",
      },
    ];

    duplicateCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 7: Mathematical Edge Cases
   * H-index boundary conditions and mathematical properties
   */
  describe("Mathematical Edge Cases", () => {
    const mathCases = [
      {
        input: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        expected: 10,
        description: "H-index equals array length",
      },
      {
        input: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        expected: 1,
        description: "H-index much less than length",
      },
      {
        input: [0, 1, 4, 5, 6],
        expected: 3,
        description: "H-index in middle",
      },
      {
        input: [25, 8, 5, 3, 3],
        expected: 3,
        description: "Citation pyramid",
      },
    ];

    mathCases.forEach(({ input, expected, description }) => {
      algorithms.forEach(({ name, fn }) => {
        test(`${name}: ${description}`, () => {
          expect(fn([...input])).toBe(expected);
        });
      });
    });
  });

  /**
   * Category 8: Performance Tests
   * Large array handling and efficiency validation
   */
  describe("Performance Tests", () => {
    test("Large array with random values", () => {
      const size = 1000;
      const citations = Array.from({ length: size }, (_, i) =>
        Math.floor(Math.random() * 100)
      );

      // All algorithms should produce the same result
      const results = algorithms.map(({ name, fn }) => ({
        name,
        result: fn([...citations]),
      }));
      const firstResult = results[0]?.result ?? 0;

      results.forEach(({ name, result }) => {
        expect(result).toBe(firstResult);
      });

      // H-index should be within valid range
      expect(firstResult).toBeGreaterThanOrEqual(0);
      expect(firstResult).toBeLessThanOrEqual(size);
    });

    test("Large array with ascending pattern", () => {
      const size = 500;
      const citations = Array.from({ length: size }, (_, i) => i);

      const results = algorithms.map(({ fn }) => fn([...citations]));
      const expected = results[0];

      results.forEach((result) => {
        expect(result).toBe(expected);
      });
    });
  });

  /**
   * Category 9: Algorithm Consistency
   * Verify all algorithms produce identical results
   */
  describe("Algorithm Consistency", () => {
    const consistencyTests = [
      [3, 0, 6, 1, 5],
      [1, 3, 1],
      [100, 99, 98, 97, 96],
      [0, 0, 0, 0, 0],
      [10, 8, 5, 4, 3],
      [1, 1, 3, 6, 7, 10, 7, 1, 8, 5, 9, 1, 4, 4, 3],
      [],
      [42],
      [5, 5, 5, 5, 5],
    ];

    consistencyTests.forEach((citations, index) => {
      test(`Consistency test ${index + 1}: [${citations
        .slice(0, 10)
        .join(", ")}${citations.length > 10 ? "..." : ""}]`, () => {
        const results = algorithms.map(({ name, fn }) => {
          try {
            return { name, result: fn([...citations]), success: true };
          } catch (error) {
            return { name, result: null, success: false, error };
          }
        });

        // All algorithms should succeed
        results.forEach(({ name, success, error }) => {
          expect(success).toBe(true);
          if (!success) {
            console.error(`${name} failed:`, error);
          }
        });

        // All results should be identical
        const expectedResult = results[0]?.result ?? 0;
        results.forEach(({ name, result }) => {
          expect(result).toBe(expectedResult);
        });

        // Result should be valid H-index
        expect(expectedResult).toBeGreaterThanOrEqual(0);
        expect(expectedResult).toBeLessThanOrEqual(citations.length);
      });
    });
  });

  /**
   * Utility Function Tests
   * Test helper functions for correctness
   */
  describe("Utility Functions", () => {
    test("validateHIndex should correctly validate H-index", () => {
      expect(validateHIndex([3, 0, 6, 1, 5], 3)).toBe(true);
      expect(validateHIndex([3, 0, 6, 1, 5], 4)).toBe(false);
      expect(validateHIndex([1, 3, 1], 1)).toBe(true);
      expect(validateHIndex([1, 3, 1], 2)).toBe(false);
    });

    test("analyzeCitations should provide correct statistics", () => {
      const stats = analyzeCitations([3, 0, 6, 1, 5]);

      expect(stats.totalPapers).toBe(5);
      expect(stats.maxCitations).toBe(6);
      expect(stats.averageCitations).toBeCloseTo(3);
      expect(typeof stats.median).toBe("number");
      expect(stats.citationDistribution instanceof Map).toBe(true);
    });

    test("compareAlgorithms should run without errors", () => {
      const testCase = [3, 0, 6, 1, 5];

      expect(() => {
        compareAlgorithms(testCase);
      }).not.toThrow();
    });
  });
});

/**
 * Integration Tests
 * Test real-world scenarios and complex cases
 */
describe("H-Index Integration Tests", () => {
  // Define algorithms array for integration tests
  const integrationAlgorithms = [
    { name: "Sorting", fn: hIndex },
    { name: "Optimized Sorting", fn: hIndexOptimized },
    { name: "Counting Sort", fn: hIndexCounting },
    { name: "Binary Search", fn: hIndexBinarySearch },
    { name: "Bucket Sort", fn: hIndexBucket },
    { name: "Two Pointer", fn: hIndexTwoPointer },
    { name: "Histogram", fn: hIndexHistogram },
    { name: "Mathematical", fn: hIndexMath },
  ];

  test("Real research paper scenario", () => {
    // Simulated citation counts for a researcher's papers
    const citations = [45, 23, 67, 12, 8, 34, 56, 78, 90, 15, 25, 5, 3, 1, 89];

    const results = integrationAlgorithms.map(({ fn }) => fn([...citations]));
    const hIndexValue = results[0] ?? 0;

    // All algorithms agree
    results.forEach((result: number) => {
      expect(result).toBe(hIndexValue);
    });

    // Validate the H-index is correct
    expect(validateHIndex(citations, hIndexValue)).toBe(true);

    // H-index should be reasonable for this dataset
    expect(hIndexValue).toBeGreaterThan(0);
    expect(hIndexValue).toBeLessThanOrEqual(citations.length);
  });

  test("Progressive researcher career simulation", () => {
    // Simulate a researcher's career progression
    const careerStages = [
      [1, 0, 2], // Early career
      [5, 3, 8, 2, 1, 4], // Mid career
      [15, 25, 30, 12, 8, 45, 20, 18], // Established
      [50, 60, 40, 35, 70, 25, 30, 45, 55, 20], // Senior
    ];

    let previousHIndex = 0;

    careerStages.forEach((stage, index) => {
      const results = integrationAlgorithms.map(({ fn }) => fn([...stage]));
      const currentHIndex = results[0] ?? 0;

      // All algorithms should agree
      results.forEach((result: number) => {
        expect(result).toBe(currentHIndex);
      });

      // H-index should generally increase with career progression
      if (index > 0) {
        expect(currentHIndex).toBeGreaterThanOrEqual(previousHIndex);
      }

      previousHIndex = currentHIndex;
    });
  });
});
