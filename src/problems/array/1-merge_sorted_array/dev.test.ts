/**
 * Jest Test File for Merge Sorted Array
 * LeetCode #88
 */

import { merge } from "./dev";

describe("1. Array - Merge Sorted Array", () => {
  test("should merge [1,2,3,0,0,0] + [2,5,6] → [1,2,2,3,5,6]", () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [2, 5, 6];
    const n = 3;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
  });

  test("should handle [1] + [] → [1] (empty nums2)", () => {
    const nums1 = [1];
    const m = 1;
    const nums2: number[] = [];
    const n = 0;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1]);
  });

  test("should handle [] + [1] → [1] (empty nums1)", () => {
    const nums1 = [0];
    const m = 0;
    const nums2 = [1];
    const n = 1;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1]);
  });

  test("should handle [2] + [1] → [1,2] (nums1 larger)", () => {
    const nums1 = [2, 0];
    const m = 1;
    const nums2 = [1];
    const n = 1;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1, 2]);
  });

  test("should handle [1,3,5,7,9] + [2,4,6,8] → [1,2,3,4,5,6,7,8,9] (interleaved)", () => {
    const nums1 = [1, 3, 5, 7, 9, 0, 0, 0, 0];
    const m = 5;
    const nums2 = [2, 4, 6, 8];
    const n = 4;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("should handle [4,5,6] + [1,2,3] → [1,2,3,4,5,6] (nums2 all smaller)", () => {
    const nums1 = [4, 5, 6, 0, 0, 0];
    const m = 3;
    const nums2 = [1, 2, 3];
    const n = 3;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("should handle [1,2,3] + [4,5,6] → [1,2,3,4,5,6] (nums2 all larger)", () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [4, 5, 6];
    const n = 3;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("should handle [2] + [1] → [1,2] (single elements)", () => {
    const nums1 = [2, 0];
    const m = 1;
    const nums2 = [1];
    const n = 1;

    merge(nums1, m, nums2, n);

    expect(nums1).toEqual([1, 2]);
  });
});
