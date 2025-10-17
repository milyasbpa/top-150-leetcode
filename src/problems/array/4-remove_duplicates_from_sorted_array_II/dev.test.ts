import {
  removeDuplicates,
  removeDuplicatesCount,
  removeDuplicatesGeneral,
} from "./dev";

describe("Remove Duplicates from Sorted Array II (LeetCode #80)", () => {
  describe("Main Algorithm: removeDuplicates", () => {
    test("should handle basic case - allow at most 2 duplicates", () => {
      const nums = [1, 1, 1, 2, 2, 3];
      const expected = [1, 1, 2, 2, 3];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle complex case with multiple 3+ duplicates", () => {
      const nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
      const expected = [0, 0, 1, 1, 2, 3, 3];

      const k = removeDuplicates(nums);

      expect(k).toBe(7);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with length 1", () => {
      const nums = [1];
      const expected = [1];

      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with length 2 - same elements", () => {
      const nums = [1, 1];
      const expected = [1, 1];

      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with length 2 - different elements", () => {
      const nums = [1, 2];
      const expected = [1, 2];

      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with no duplicates", () => {
      const nums = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with all same elements", () => {
      const nums = [1, 1, 1, 1, 1];
      const expected = [1, 1];

      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with exactly 2 of each element", () => {
      const nums = [1, 1, 2, 2, 3, 3];
      const expected = [1, 1, 2, 2, 3, 3];

      const k = removeDuplicates(nums);

      expect(k).toBe(6);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle mixed pattern with varying duplicate counts", () => {
      const nums = [1, 1, 1, 1, 2, 2, 3];
      const expected = [1, 1, 2, 2, 3];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle negative numbers", () => {
      const nums = [-3, -3, -1, -1, -1, 0, 0, 1, 1, 1];
      const expected = [-3, -3, -1, -1, 0, 0, 1, 1];

      const k = removeDuplicates(nums);

      expect(k).toBe(8);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle large array with many duplicates", () => {
      const nums = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5];
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

      const k = removeDuplicates(nums);

      expect(k).toBe(10);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle alternating single and multiple duplicates", () => {
      const nums = [1, 2, 2, 2, 3, 4, 4, 4, 4, 5];
      const expected = [1, 2, 2, 3, 4, 4, 5];

      const k = removeDuplicates(nums);

      expect(k).toBe(7);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array starting with many duplicates", () => {
      const nums = [1, 1, 1, 1, 1, 2, 3, 4];
      const expected = [1, 1, 2, 3, 4];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array ending with many duplicates", () => {
      const nums = [1, 2, 3, 4, 4, 4, 4, 4];
      const expected = [1, 2, 3, 4, 4];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });
  });

  describe("Count-based Algorithm: removeDuplicatesCount", () => {
    test("should produce same result as main algorithm - basic case", () => {
      const nums1 = [1, 1, 1, 2, 2, 3];
      const nums2 = [1, 1, 1, 2, 2, 3];

      const k1 = removeDuplicates(nums1);
      const k2 = removeDuplicatesCount(nums2);

      expect(k1).toBe(k2);
      expect(nums1.slice(0, k1)).toEqual(nums2.slice(0, k2));
    });

    test("should produce same result as main algorithm - complex case", () => {
      const nums1 = [0, 0, 1, 1, 1, 1, 2, 3, 3];
      const nums2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];

      const k1 = removeDuplicates(nums1);
      const k2 = removeDuplicatesCount(nums2);

      expect(k1).toBe(k2);
      expect(nums1.slice(0, k1)).toEqual(nums2.slice(0, k2));
    });

    test("should handle edge cases like main algorithm", () => {
      const testCases = [[1], [1, 1], [1, 2], [1, 1, 1, 1, 1], [1, 2, 3, 4, 5]];

      testCases.forEach((testCase) => {
        const nums1 = [...testCase];
        const nums2 = [...testCase];

        const k1 = removeDuplicates(nums1);
        const k2 = removeDuplicatesCount(nums2);

        expect(k1).toBe(k2);
        expect(nums1.slice(0, k1)).toEqual(nums2.slice(0, k2));
      });
    });
  });

  describe("Generalized Algorithm: removeDuplicatesGeneral", () => {
    test("should work as Remove Duplicates I when maxAllowed = 1", () => {
      const nums = [1, 1, 2, 2, 3, 3];
      const k = removeDuplicatesGeneral(nums, 1);

      expect(k).toBe(3);
      expect(nums.slice(0, k)).toEqual([1, 2, 3]);
    });

    test("should work as Remove Duplicates II when maxAllowed = 2", () => {
      const nums1 = [1, 1, 1, 2, 2, 3];
      const nums2 = [1, 1, 1, 2, 2, 3];

      const k1 = removeDuplicates(nums1);
      const k2 = removeDuplicatesGeneral(nums2, 2);

      expect(k1).toBe(k2);
      expect(nums1.slice(0, k1)).toEqual(nums2.slice(0, k2));
    });

    test("should allow at most 3 duplicates when maxAllowed = 3", () => {
      const nums = [1, 1, 1, 1, 2, 2, 2, 3];
      const k = removeDuplicatesGeneral(nums, 3);

      expect(k).toBe(7);
      expect(nums.slice(0, k)).toEqual([1, 1, 1, 2, 2, 2, 3]);
    });

    test("should allow at most 4 duplicates when maxAllowed = 4", () => {
      const nums = [1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3];
      const k = removeDuplicatesGeneral(nums, 4);

      expect(k).toBe(10);
      expect(nums.slice(0, k)).toEqual([1, 1, 1, 1, 2, 2, 3, 3, 3, 3]);
    });

    test("should handle edge case when maxAllowed >= array length", () => {
      const nums = [1, 1, 2, 2];
      const k = removeDuplicatesGeneral(nums, 10);

      expect(k).toBe(4);
      expect(nums.slice(0, k)).toEqual([1, 1, 2, 2]);
    });
  });

  describe("Edge Cases & Boundary Testing", () => {
    test("should maintain relative order of elements", () => {
      const nums = [1, 1, 1, 3, 3, 3, 5, 5, 7];
      const k = removeDuplicates(nums);

      expect(k).toBe(7);
      expect(nums.slice(0, k)).toEqual([1, 1, 3, 3, 5, 5, 7]);

      // Verify order is maintained
      for (let i = 1; i < k; i++) {
        expect(nums[i]!).toBeGreaterThanOrEqual(nums[i - 1]!);
      }
    });

    test("should handle constraint boundaries - minimum array", () => {
      const nums = [1]; // Length 1 (minimum per constraint)
      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums[0]).toBe(1);
    });

    test("should handle constraint boundaries - value range", () => {
      const nums = [-10000, -10000, 10000, 10000, 10000]; // Min and max values
      const k = removeDuplicates(nums);

      expect(k).toBe(4);
      expect(nums.slice(0, k)).toEqual([-10000, -10000, 10000, 10000]);
    });

    test("should handle maximum duplicates scenario efficiently", () => {
      // Create array where many elements have 3+ duplicates
      const nums = [];
      for (let i = 0; i < 50; i++) {
        nums.push(i, i, i, i, i); // 5 duplicates of each number
      }

      const k = removeDuplicates(nums);

      expect(k).toBe(100); // 50 numbers × 2 allowed = 100

      // Verify each number appears at most twice
      const counts = new Map<number, number>();
      for (let i = 0; i < k; i++) {
        const num = nums[i]!;
        counts.set(num, (counts.get(num) || 0) + 1);
      }

      for (const count of counts.values()) {
        expect(count).toBeLessThanOrEqual(2);
      }
    });

    test("should work correctly with zeros", () => {
      const nums = [0, 0, 0, 0, 1, 1, 1];
      const k = removeDuplicates(nums);

      expect(k).toBe(4);
      expect(nums.slice(0, k)).toEqual([0, 0, 1, 1]);
    });
  });

  describe("Algorithm Properties Verification", () => {
    test("should be in-place modification", () => {
      const nums = [1, 1, 1, 2, 2, 3];
      const originalLength = nums.length;

      const k = removeDuplicates(nums);

      expect(nums.length).toBe(originalLength);
      expect(k).toBeLessThanOrEqual(originalLength);
    });

    test("should handle sorted property correctly", () => {
      const nums = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
      const k = removeDuplicates(nums);

      // Verify result is still sorted
      const result = nums.slice(0, k);
      for (let i = 1; i < result.length; i++) {
        expect(result[i]!).toBeGreaterThanOrEqual(result[i - 1]!);
      }
    });

    test("should return correct count matching processed elements", () => {
      const nums = [1, 1, 1, 2, 3, 3, 3, 4, 4];
      const k = removeDuplicates(nums);

      // Count unique elements allowing at most 2 each
      const expectedCount = 7; // [1,1,2,3,3,4,4]
      expect(k).toBe(expectedCount);
    });

    test("should handle performance efficiently with large input", () => {
      // Create large array with pattern
      const nums = [];
      for (let i = 0; i < 1000; i++) {
        nums.push(i, i, i); // 3 of each number
      }

      const start = performance.now();
      const k = removeDuplicates(nums);
      const end = performance.now();

      expect(k).toBe(2000); // 1000 numbers × 2 allowed
      expect(end - start).toBeLessThan(50); // Should be fast O(n)
    });
  });
});
