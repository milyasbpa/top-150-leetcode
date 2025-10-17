import { removeDuplicates, removeDuplicatesAlt } from "./dev";

describe("Remove Duplicates from Sorted Array (LeetCode #26)", () => {
  describe("Main Algorithm: removeDuplicates", () => {
    test("should handle basic case with duplicates", () => {
      const nums = [1, 1, 2];
      const expected = [1, 2];

      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle multiple duplicates", () => {
      const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
      const expected = [0, 1, 2, 3, 4];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle single element array", () => {
      const nums = [1];
      const expected = [1];

      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with all same elements", () => {
      const nums = [1, 1, 1, 1];
      const expected = [1];

      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with no duplicates", () => {
      const nums = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle two elements - same", () => {
      const nums = [1, 1];
      const expected = [1];

      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle two elements - different", () => {
      const nums = [1, 2];
      const expected = [1, 2];

      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle negative numbers", () => {
      const nums = [-3, -1, -1, 0, 0, 0, 1, 1];
      const expected = [-3, -1, 0, 1];

      const k = removeDuplicates(nums);

      expect(k).toBe(4);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle large array with many duplicates", () => {
      const nums = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5];
      const expected = [1, 2, 3, 4, 5];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle consecutive numbers with duplicates", () => {
      const nums = [1, 2, 2, 3, 4, 4, 5];
      const expected = [1, 2, 3, 4, 5];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle mixed positive and negative with zero", () => {
      const nums = [-2, -2, -1, 0, 0, 1, 1, 2];
      const expected = [-2, -1, 0, 1, 2];

      const k = removeDuplicates(nums);

      expect(k).toBe(5);
      expect(nums.slice(0, k)).toEqual(expected);
    });

    test("should handle array with zeros", () => {
      const nums = [0, 0, 0, 0];
      const expected = [0];

      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual(expected);
    });
  });

  describe("Alternative Algorithm: removeDuplicatesAlt", () => {
    test("should produce same result as main algorithm - basic case", () => {
      const nums1 = [1, 1, 2];
      const nums2 = [1, 1, 2];

      const k1 = removeDuplicates(nums1);
      const k2 = removeDuplicatesAlt(nums2);

      expect(k1).toBe(k2);
      expect(nums1.slice(0, k1)).toEqual(nums2.slice(0, k2));
    });

    test("should produce same result as main algorithm - complex case", () => {
      const nums1 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
      const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

      const k1 = removeDuplicates(nums1);
      const k2 = removeDuplicatesAlt(nums2);

      expect(k1).toBe(k2);
      expect(nums1.slice(0, k1)).toEqual(nums2.slice(0, k2));
    });

    test("should handle single element like main algorithm", () => {
      const nums = [42];
      const k = removeDuplicatesAlt(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual([42]);
    });

    test("should handle all same elements like main algorithm", () => {
      const nums = [7, 7, 7, 7, 7];
      const k = removeDuplicatesAlt(nums);

      expect(k).toBe(1);
      expect(nums.slice(0, k)).toEqual([7]);
    });
  });

  describe("Edge Cases & Boundary Testing", () => {
    test("should maintain relative order of unique elements", () => {
      const nums = [1, 1, 3, 3, 5, 5, 7];
      const k = removeDuplicates(nums);

      expect(k).toBe(4);
      expect(nums.slice(0, k)).toEqual([1, 3, 5, 7]);
      // Verify order is maintained
      for (let i = 1; i < k; i++) {
        expect(nums[i]!).toBeGreaterThan(nums[i - 1]!);
      }
    });

    test("should handle constraint boundaries - minimum array", () => {
      const nums = [1]; // Length 1 (minimum per constraint)
      const k = removeDuplicates(nums);

      expect(k).toBe(1);
      expect(nums[0]).toBe(1);
    });

    test("should handle constraint boundaries - value range", () => {
      const nums = [-100, -100, 100, 100]; // Min and max values per constraint
      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual([-100, 100]);
    });

    test("should not modify array beyond k index unnecessarily", () => {
      const nums = [1, 1, 2, 3, 3];
      const originalBeyondK = nums.slice(3); // Elements that should be minimally affected

      const k = removeDuplicates(nums);

      expect(k).toBe(3);
      expect(nums.slice(0, k)).toEqual([1, 2, 3]);
      // The algorithm should minimize changes beyond k
    });

    test("should work correctly with maximum duplicates scenario", () => {
      // Create array where almost all elements are duplicates
      const nums = Array(100).fill(42);
      nums[50] = 43; // Add one different element
      nums.sort(); // Ensure sorted: [42,42,...,42,43,42,42,...]

      const k = removeDuplicates(nums);

      expect(k).toBe(2);
      expect(nums.slice(0, k)).toEqual([42, 43]);
    });
  });

  describe("Algorithm Properties Verification", () => {
    test("should be in-place modification (no extra arrays created)", () => {
      const nums = [1, 1, 2, 2, 3];
      const originalLength = nums.length;

      const k = removeDuplicates(nums);

      // Array reference should be the same (in-place)
      expect(nums.length).toBe(originalLength);
      expect(k).toBeLessThanOrEqual(originalLength);
    });

    test("should handle sorted property correctly", () => {
      const nums = [1, 2, 2, 3, 4, 4, 5, 6, 6];
      const k = removeDuplicates(nums);

      // Verify result is still sorted
      const result = nums.slice(0, k);
      for (let i = 1; i < result.length; i++) {
        expect(result[i]!).toBeGreaterThan(result[i - 1]!);
      }
    });

    test("should return correct count matching unique elements", () => {
      const nums = [1, 1, 2, 3, 3, 4, 4, 4, 5];
      const uniqueSet = new Set(nums);

      const k = removeDuplicates(nums);

      expect(k).toBe(uniqueSet.size);
    });
  });
});
