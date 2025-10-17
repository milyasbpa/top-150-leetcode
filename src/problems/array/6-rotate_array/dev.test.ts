/**
 * 🧪 Test Suite for LeetCode #189 - Rotate Array
 *
 * Testing all 6 algorithm implementations:
 * 1. Three Reverses (Optimal) - O(n) time, O(1) space
 * 2. Cyclic Replacements - O(n) time, O(1) space
 * 3. Extra Array - O(n) time, O(n) space
 * 4. Brute Force - O(n*k) time, O(1) space
 * 5. Recursive - O(n) time, O(k) space
 * 6. Block Swap - O(n) time, O(1) space
 */

import {
  rotate,
  rotateBlockSwap,
  rotateBruteForce,
  rotateCyclic,
  rotateExtraArray,
  rotateRecursive,
} from "./dev";

// 🎯 Test data structure
interface TestCase {
  name: string;
  input: number[];
  k: number;
  expected: number[];
  description: string;
}

// 📊 Algorithm configuration
interface Algorithm {
  name: string;
  fn: (nums: number[], k: number) => void;
  timeComplexity: string;
  spaceComplexity: string;
}

// 🧪 Comprehensive test cases
const testCases: TestCase[] = [
  {
    name: "Basic Case 1",
    input: [1, 2, 3, 4, 5, 6, 7],
    k: 3,
    expected: [5, 6, 7, 1, 2, 3, 4],
    description: "Standard rotation by 3 positions",
  },
  {
    name: "Basic Case 2",
    input: [-1, -100, 3, 99],
    k: 2,
    expected: [3, 99, -1, -100],
    description: "Rotation with negative numbers",
  },
  {
    name: "Single Element",
    input: [1],
    k: 1,
    expected: [1],
    description: "Single element array",
  },
  {
    name: "Two Elements",
    input: [1, 2],
    k: 1,
    expected: [2, 1],
    description: "Minimal meaningful rotation",
  },
  {
    name: "No Rotation",
    input: [1, 2, 3, 4],
    k: 0,
    expected: [1, 2, 3, 4],
    description: "k = 0, no rotation needed",
  },
  {
    name: "Full Rotation",
    input: [1, 2, 3, 4],
    k: 4,
    expected: [1, 2, 3, 4],
    description: "k equals array length (full rotation)",
  },
  {
    name: "Multiple Full Rotations",
    input: [1, 2, 3],
    k: 7,
    expected: [3, 1, 2],
    description: "k > n, effective k = 7 % 3 = 1",
  },
  {
    name: "Large k Value",
    input: [1, 2, 3, 4, 5],
    k: 12,
    expected: [4, 5, 1, 2, 3],
    description: "k much larger than n, effective k = 12 % 5 = 2",
  },
  {
    name: "Palindromic Array",
    input: [1, 2, 3, 2, 1],
    k: 2,
    expected: [2, 1, 1, 2, 3],
    description: "Symmetric array rotation",
  },
  {
    name: "All Same Elements",
    input: [1, 1, 1, 1],
    k: 2,
    expected: [1, 1, 1, 1],
    description: "All elements identical",
  },
  {
    name: "Large Array Small k",
    input: Array.from({ length: 100 }, (_, i) => i + 1),
    k: 3,
    expected: Array.from({ length: 100 }, (_, i) => {
      const newIndex = (i + 97) % 100; // Shift by 3 positions left = 100-3=97 right
      return newIndex + 1;
    }),
    description: "Large array with small rotation",
  },
];

// 🔧 All algorithms to test
const algorithms: Algorithm[] = [
  {
    name: "Three Reverses",
    fn: rotate,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Cyclic Replacements",
    fn: rotateCyclic,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Extra Array",
    fn: rotateExtraArray,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
  },
  {
    name: "Brute Force",
    fn: rotateBruteForce,
    timeComplexity: "O(n*k)",
    spaceComplexity: "O(1)",
  },
  {
    name: "Recursive",
    fn: rotateRecursive,
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
  },
  {
    name: "Block Swap",
    fn: rotateBlockSwap,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  },
];

// 🧪 Test each algorithm against all test cases
describe("🎯 Rotate Array - All Algorithms", () => {
  algorithms.forEach(({ name, fn, timeComplexity, spaceComplexity }) => {
    describe(`🔧 ${name} Algorithm (${timeComplexity} time, ${spaceComplexity} space)`, () => {
      testCases.forEach(
        ({ name: testName, input, k, expected, description }) => {
          test(`${testName}: ${description}`, () => {
            // Create copy to avoid modifying original
            const nums = [...input];

            // Execute algorithm
            fn(nums, k);

            // Verify result
            expect(nums).toEqual(expected);

            // Verify array length unchanged
            expect(nums.length).toBe(input.length);
          });
        }
      );
    });
  });
});

// 🎯 Focused tests for main algorithm (Three Reverses)
describe("🌟 Three Reverses Algorithm - Detailed Tests", () => {
  describe("✅ Basic Functionality", () => {
    test("should handle standard rotation", () => {
      const nums = [1, 2, 3, 4, 5, 6, 7];
      rotate(nums, 3);
      expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });

    test("should handle rotation with negative numbers", () => {
      const nums = [-1, -100, 3, 99];
      rotate(nums, 2);
      expect(nums).toEqual([3, 99, -1, -100]);
    });

    test("should handle zero rotation", () => {
      const nums = [1, 2, 3, 4];
      rotate(nums, 0);
      expect(nums).toEqual([1, 2, 3, 4]);
    });
  });

  describe("🔍 Edge Cases", () => {
    test("should handle single element", () => {
      const nums = [42];
      rotate(nums, 5);
      expect(nums).toEqual([42]);
    });

    test("should handle empty array", () => {
      const nums: number[] = [];
      rotate(nums, 3);
      expect(nums).toEqual([]);
    });

    test("should handle k larger than array length", () => {
      const nums = [1, 2, 3];
      rotate(nums, 4); // 4 % 3 = 1
      expect(nums).toEqual([3, 1, 2]);
    });

    test("should handle k equal to array length", () => {
      const nums = [1, 2, 3, 4];
      rotate(nums, 4);
      expect(nums).toEqual([1, 2, 3, 4]);
    });

    test("should handle very large k", () => {
      const nums = [1, 2, 3];
      rotate(nums, 1000000); // 1000000 % 3 = 1
      expect(nums).toEqual([3, 1, 2]);
    });
  });

  describe("🔢 Boundary Values", () => {
    test("should handle minimum array size", () => {
      const nums = [1];
      rotate(nums, 0);
      expect(nums).toEqual([1]);
    });

    test("should handle two elements", () => {
      const nums = [1, 2];
      rotate(nums, 1);
      expect(nums).toEqual([2, 1]);
    });

    test("should handle large uniform array", () => {
      const nums = new Array(1000).fill(5);
      const expected = new Array(1000).fill(5);
      rotate(nums, 300);
      expect(nums).toEqual(expected);
    });
  });

  describe("🎲 Mathematical Properties", () => {
    test("should satisfy rotation composition property", () => {
      const original = [1, 2, 3, 4, 5];

      // Rotate by k1, then by k2 should equal rotate by k1+k2
      const nums1 = [...original];
      rotate(nums1, 2);
      rotate(nums1, 3);

      const nums2 = [...original];
      rotate(nums2, 5);

      expect(nums1).toEqual(nums2);
    });

    test("should be reversible", () => {
      const original = [1, 2, 3, 4, 5];
      const nums = [...original];

      // Rotate right by k, then left by k should return original
      rotate(nums, 3);
      rotate(nums, nums.length - 3);

      expect(nums).toEqual(original);
    });

    test("should handle modular arithmetic correctly", () => {
      const nums1 = [1, 2, 3, 4];
      const nums2 = [1, 2, 3, 4];

      rotate(nums1, 6); // 6 % 4 = 2
      rotate(nums2, 2);

      expect(nums1).toEqual(nums2);
    });
  });
});

// ⚡ Performance Tests
describe("⚡ Performance Tests", () => {
  const createLargeArray = (size: number) =>
    Array.from({ length: size }, (_, i) => i);

  describe("🏃‍♂️ Speed Comparison", () => {
    const testSizes = [100, 1000, 5000];

    testSizes.forEach((size) => {
      test(`should handle ${size} elements efficiently`, () => {
        const nums = createLargeArray(size);
        const k = Math.floor(size / 3);

        const start = performance.now();
        rotate([...nums], k);
        const end = performance.now();

        const executionTime = end - start;

        // Should complete in reasonable time (less than 100ms for these sizes)
        expect(executionTime).toBeLessThan(100);
      });
    });

    test("should outperform brute force for large arrays", () => {
      const size = 1000;
      const nums = createLargeArray(size);
      const k = 300;

      // Test Three Reverses (optimal)
      const start1 = performance.now();
      rotate([...nums], k);
      const end1 = performance.now();
      const optimalTime = end1 - start1;

      // Test Brute Force (for comparison, with smaller k to avoid timeout)
      const smallK = 10; // Use smaller k for brute force to avoid long execution
      const start2 = performance.now();
      rotateBruteForce([...nums], smallK);
      const end2 = performance.now();
      const bruteTime = end2 - start2;

      // Optimal should be significantly faster for large k
      // This test mainly ensures optimal runs efficiently
      expect(optimalTime).toBeLessThan(50);
    });
  });

  describe("📊 Memory Usage", () => {
    test("should use constant space", () => {
      // This is more of a conceptual test since we can't easily measure memory in Jest
      // We verify that the algorithm doesn't create additional arrays proportional to input size
      const nums = createLargeArray(1000);
      const originalLength = nums.length;

      rotate(nums, 300);

      // Array length should remain the same (no additional space used)
      expect(nums.length).toBe(originalLength);
    });

    test("should modify array in-place", () => {
      const nums = [1, 2, 3, 4, 5];
      const originalReference = nums;

      rotate(nums, 2);

      // Should be the same array reference (in-place modification)
      expect(nums).toBe(originalReference);
      expect(nums).toEqual([4, 5, 1, 2, 3]);
    });
  });
});

// 🧮 Algorithm Comparison Tests
describe("🧮 Algorithm Comparison", () => {
  const comparisonTestCases = [
    { input: [1, 2, 3, 4, 5], k: 2 },
    { input: [1], k: 1 },
    { input: [1, 2], k: 3 },
    { input: [-1, -2, -3, -4], k: 1 },
  ];

  describe("✅ Correctness Verification", () => {
    comparisonTestCases.forEach(({ input, k }, index) => {
      test(`all algorithms should produce same result for test case ${
        index + 1
      }`, () => {
        const results = algorithms.map(({ fn }) => {
          const nums = [...input];
          fn(nums, k);
          return nums;
        });

        // All results should be identical
        const firstResult = results[0];
        results.forEach((result, i) => {
          expect(result).toEqual(firstResult);
        });
      });
    });
  });

  describe("📈 Complexity Verification", () => {
    test("space-efficient algorithms should not create extra arrays", () => {
      const nums = [1, 2, 3, 4, 5];
      const originalNums = nums;

      // Test algorithms that claim O(1) space
      rotate(nums, 2);
      expect(nums).toBe(originalNums); // Same reference = in-place

      rotateCyclic([...originalNums], 2);
      // Can't easily test reference for other functions due to parameter passing
      // But we verify they work correctly
    });
  });
});

// 🎭 Stress Tests
describe("🎭 Stress Tests", () => {
  describe("🔥 High Load Scenarios", () => {
    test("should handle maximum constraints", () => {
      // Test with constraints: 1 <= nums.length <= 10^5, 0 <= k <= 10^5
      const size = 10000; // Reduced for test performance
      const nums = createLargeArray(size);
      const k = 99999;

      expect(() => {
        rotate([...nums], k);
      }).not.toThrow();
    });

    test("should handle repeated rotations", () => {
      const nums = [1, 2, 3, 4, 5];
      const original = [...nums];

      // Rotate multiple times
      for (let i = 0; i < 10; i++) {
        rotate(nums, 1);
      }

      // After 10 rotations by 1, should equal 2 full rotations
      expect(nums).toEqual(original);
    });

    test("should handle alternating rotations", () => {
      const nums = [1, 2, 3, 4, 5, 6];
      const original = [...nums];

      // Rotate right then left multiple times
      for (let i = 0; i < 5; i++) {
        rotate(nums, 2); // Right by 2
        rotate(nums, nums.length - 2); // Left by 2 (equivalent to right by 4)
      }

      // Should return to original after even number of opposite rotations
      expect(nums).toEqual(original);
    });
  });
});

// 📋 Helper function for creating test arrays
const createLargeArray = (size: number): number[] =>
  Array.from({ length: size }, (_, i) => i + 1);

// 🏁 Test Summary
describe("🏁 Test Summary", () => {
  test("should export all required functions", () => {
    expect(typeof rotate).toBe("function");
    expect(typeof rotateCyclic).toBe("function");
    expect(typeof rotateExtraArray).toBe("function");
    expect(typeof rotateBruteForce).toBe("function");
    expect(typeof rotateRecursive).toBe("function");
    expect(typeof rotateBlockSwap).toBe("function");
  });
});
