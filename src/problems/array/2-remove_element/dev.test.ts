/**
 * Jest Test File for Remove Element
 * LeetCode #27
 */

import { removeElement } from "./dev";

describe("2. Array - Remove Element", () => {
  test("should remove val=3 from [3,2,2,3] → k=2, first 2 elements are [2,2]", () => {
    const nums = [3, 2, 2, 3];
    const val = 3;

    const k = removeElement(nums, val);

    expect(k).toBe(2);
    expect(nums.slice(0, k).sort()).toEqual([2, 2]);
  });

  test("should remove val=2 from [0,1,2,2,3,0,4,2] → k=5, first 5 elements contain [0,1,3,0,4]", () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];
    const val = 2;

    const k = removeElement(nums, val);

    expect(k).toBe(5);
    expect(nums.slice(0, k).sort()).toEqual([0, 0, 1, 3, 4]);
  });

  test("should handle empty array → k=0", () => {
    const nums: number[] = [];
    const val = 1;

    const k = removeElement(nums, val);

    expect(k).toBe(0);
    expect(nums).toEqual([]);
  });

  test("should handle all elements equal to val [2,2,2] with val=2 → k=0", () => {
    const nums = [2, 2, 2];
    const val = 2;

    const k = removeElement(nums, val);

    expect(k).toBe(0);
    // Elements beyond k can be anything, so we don't test them
  });

  test("should handle no elements equal to val [1,2,3,4] with val=5 → k=4", () => {
    const nums = [1, 2, 3, 4];
    const val = 5;

    const k = removeElement(nums, val);

    expect(k).toBe(4);
    expect(nums.slice(0, k)).toEqual([1, 2, 3, 4]);
  });

  test("should handle single element equal to val [1] with val=1 → k=0", () => {
    const nums = [1];
    const val = 1;

    const k = removeElement(nums, val);

    expect(k).toBe(0);
  });

  test("should handle single element not equal to val [1] with val=2 → k=1", () => {
    const nums = [1];
    const val = 2;

    const k = removeElement(nums, val);

    expect(k).toBe(1);
    expect(nums.slice(0, k)).toEqual([1]);
  });

  test("should handle alternating pattern [1,2,1,2,1] with val=2 → k=3", () => {
    const nums = [1, 2, 1, 2, 1];
    const val = 2;

    const k = removeElement(nums, val);

    expect(k).toBe(3);
    expect(nums.slice(0, k).sort()).toEqual([1, 1, 1]);
  });

  test("should handle first element equals val [5,1,2,3] with val=5 → k=3", () => {
    const nums = [5, 1, 2, 3];
    const val = 5;

    const k = removeElement(nums, val);

    expect(k).toBe(3);
    expect(nums.slice(0, k)).toEqual([1, 2, 3]);
  });

  test("should handle last element equals val [1,2,3,5] with val=5 → k=3", () => {
    const nums = [1, 2, 3, 5];
    const val = 5;

    const k = removeElement(nums, val);

    expect(k).toBe(3);
    expect(nums.slice(0, k)).toEqual([1, 2, 3]);
  });

  test("should handle multiple consecutive occurrences [1,1,1,2,3] with val=1 → k=2", () => {
    const nums = [1, 1, 1, 2, 3];
    const val = 1;

    const k = removeElement(nums, val);

    expect(k).toBe(2);
    expect(nums.slice(0, k).sort()).toEqual([2, 3]);
  });

  test("should handle large array with scattered elements", () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2, 1, 3, 2];
    const val = 2;
    const originalNums = [...nums];
    const expectedElements = originalNums.filter((x) => x !== val);

    const k = removeElement(nums, val);

    expect(k).toBe(expectedElements.length);
    expect(nums.slice(0, k).sort()).toEqual(expectedElements.sort());
  });

  // Edge case: constraints boundary testing
  test("should handle maximum constraint values", () => {
    const nums = Array(100).fill(50); // Array of 100 elements, all value 50
    const val = 50;

    const k = removeElement(nums, val);

    expect(k).toBe(0);
  });

  test("should handle constraint boundary: val at max", () => {
    const nums = [0, 1, 2, 100, 4];
    const val = 100;

    const k = removeElement(nums, val);

    expect(k).toBe(4);
    expect(nums.slice(0, k)).toEqual([0, 1, 2, 4]);
  });
});
