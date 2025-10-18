/**
 * @fileoverview Product of Array Except Self - LeetCode Problem 238
 *
 * Given an integer array nums, return an array answer such that answer[i]
 * is equal to the product of all the elements of nums except nums[i].
 *
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operator.
 *
 * Difficulty: Medium
 * Topics: Array, Prefix Sum
 *
 * Key Insights:
 * - Two-pass approach: left products then right products
 * - Space optimization: use output array for intermediate storage
 * - Handle zeros carefully without division
 * - Can be solved with O(1) extra space (excluding output array)
 */

/**
 * Approach 1: Two-Pass with Extra Space
 * Build left products and right products separately, then combine
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - excluding output array
 */
export function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // Build left products array
  const leftProducts = new Array(n);
  leftProducts[0] = 1;
  for (let i = 1; i < n; i++) {
    leftProducts[i] = (leftProducts[i - 1] ?? 1) * (nums[i - 1] ?? 1);
  }

  // Build right products array
  const rightProducts = new Array(n);
  rightProducts[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    rightProducts[i] = (rightProducts[i + 1] ?? 1) * (nums[i + 1] ?? 1);
  }

  // Combine left and right products
  for (let i = 0; i < n; i++) {
    result[i] = leftProducts[i] * rightProducts[i];
  }

  return result;
}

/**
 * Approach 2: Optimized Two-Pass (Space O(1))
 * Use output array to store left products, then multiply by right products in second pass
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding output array
 */
export function productExceptSelfOptimized(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // First pass: compute left products and store in result
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i] ?? 1;
  }

  // Second pass: multiply by right products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i] ?? 1;
  }

  return result;
}

/**
 * Approach 3: Division-Based (Not allowed per problem constraints, but educational)
 * Calculate total product, then divide by each element
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Note: This approach has issues with zeros and is not allowed per problem statement
 */
export function productExceptSelfDivision(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // Count zeros and calculate product of non-zero elements
  let zeroCount = 0;
  let totalProduct = 1;

  for (const num of nums) {
    if (num === 0) {
      zeroCount++;
    } else {
      totalProduct *= num;
    }
  }

  // Handle different zero scenarios
  for (let i = 0; i < n; i++) {
    if (zeroCount > 1) {
      // More than one zero: all results are 0
      result[i] = 0;
    } else if (zeroCount === 1) {
      // Exactly one zero: only that position gets the product
      result[i] = nums[i] === 0 ? totalProduct : 0;
    } else {
      // No zeros: divide total by current element
      result[i] = totalProduct / (nums[i] ?? 1);
    }
  }

  return result;
}

/**
 * Approach 4: Prefix and Suffix Product Arrays (Educational)
 * Explicit prefix and suffix arrays for clarity
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function productExceptSelfPrefixSuffix(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // Calculate prefix products
  const prefix = new Array(n);
  prefix[0] = nums[0] ?? 1;
  for (let i = 1; i < n; i++) {
    prefix[i] = (prefix[i - 1] ?? 1) * (nums[i] ?? 1);
  }

  // Calculate suffix products
  const suffix = new Array(n);
  suffix[n - 1] = nums[n - 1] ?? 1;
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = (suffix[i + 1] ?? 1) * (nums[i] ?? 1);
  }

  // Build result using prefix and suffix
  for (let i = 0; i < n; i++) {
    const leftProduct = i > 0 ? prefix[i - 1] : 1;
    const rightProduct = i < n - 1 ? suffix[i + 1] : 1;
    result[i] = leftProduct * rightProduct;
  }

  return result;
}

/**
 * Approach 5: Single Pass with Two Pointers (Advanced)
 * Calculate products from both ends simultaneously
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function productExceptSelfTwoPointers(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let left = 0,
    right = n - 1;
  let leftProduct = 1,
    rightProduct = 1;

  while (left < n) {
    result[left] *= leftProduct;
    result[right] *= rightProduct;

    leftProduct *= nums[left] ?? 1;
    rightProduct *= nums[right] ?? 1;

    left++;
    right--;
  }

  return result;
}

/**
 * Approach 6: Recursive Solution (Educational)
 * Divide and conquer approach using recursion
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) recursion stack
 */
export function productExceptSelfRecursive(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  function helper(start: number, end: number): number {
    if (start > end) return 1;
    if (start === end) return nums[start] ?? 0;

    const mid = Math.floor((start + end) / 2);
    const leftProduct = helper(start, mid);
    const rightProduct = helper(mid + 1, end);

    return leftProduct * rightProduct;
  }

  for (let i = 0; i < n; i++) {
    const leftProduct = i > 0 ? helper(0, i - 1) : 1;
    const rightProduct = i < n - 1 ? helper(i + 1, n - 1) : 1;
    result[i] = leftProduct * rightProduct;
  }

  return result;
}

/**
 * Approach 7: Iterative with Stack (Alternative Implementation)
 * Use stack to calculate products in different order
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function productExceptSelfStack(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);
  const stack: number[] = [];

  // Forward pass: build left products using stack
  for (let i = 0; i < n; i++) {
    result[i] =
      stack.length === 0 ? 1 : stack.reduce((acc, val) => acc * val, 1);
    stack.push(nums[i] ?? 0);
  }

  // Clear stack for right products
  stack.length = 0;

  // Backward pass: multiply by right products
  for (let i = n - 1; i >= 0; i--) {
    const rightProduct =
      stack.length === 0 ? 1 : stack.reduce((acc, val) => acc * val, 1);
    result[i] *= rightProduct;
    stack.push(nums[i] ?? 0);
  }

  return result;
}

/**
 * Approach 8: Mathematical Approach with Logarithms (Advanced)
 * Use logarithms to handle large numbers and avoid overflow
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Note: This approach may have precision issues with floating point
 */
export function productExceptSelfLogarithm(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // Handle zeros separately
  const zeroIndices = nums
    .map((num, i) => (num === 0 ? i : -1))
    .filter((i) => i !== -1);

  if (zeroIndices.length > 1) {
    return new Array(n).fill(0);
  }

  if (zeroIndices.length === 1) {
    const zeroIndex = zeroIndices[0];
    const productWithoutZero = nums.reduce(
      (acc, num, i) => (i === zeroIndex ? acc : acc * num),
      1
    );

    return nums.map((_, i) => (i === zeroIndex ? productWithoutZero : 0));
  }

  // No zeros: use logarithms
  const logSum = nums.reduce((sum, num) => sum + Math.log(Math.abs(num)), 0);
  const negativeCount = nums.filter((num) => num < 0).length;

  for (let i = 0; i < n; i++) {
    const logResult = logSum - Math.log(Math.abs(nums[i] ?? 1));
    const sign =
      (negativeCount - ((nums[i] ?? 0) < 0 ? 1 : 0)) % 2 === 0 ? 1 : -1;
    result[i] = Math.round(sign * Math.exp(logResult));
  }

  return result;
}

/**
 * Performance testing and comparison utilities
 */
export interface AlgorithmResult {
  name: string;
  result: number[];
  timeMs: number;
  spaceComplexity: string;
}

export function compareAlgorithms(nums: number[]): AlgorithmResult[] {
  const algorithms = [
    { name: "Two-Pass Extra Space", fn: productExceptSelf, space: "O(n)" },
    {
      name: "Optimized Two-Pass",
      fn: productExceptSelfOptimized,
      space: "O(1)",
    },
    { name: "Division Method", fn: productExceptSelfDivision, space: "O(1)" },
    { name: "Prefix-Suffix", fn: productExceptSelfPrefixSuffix, space: "O(n)" },
    { name: "Two Pointers", fn: productExceptSelfTwoPointers, space: "O(1)" },
    { name: "Recursive", fn: productExceptSelfRecursive, space: "O(log n)" },
    { name: "Stack-based", fn: productExceptSelfStack, space: "O(n)" },
    { name: "Logarithmic", fn: productExceptSelfLogarithm, space: "O(1)" },
  ];

  console.log("🔄 Product of Array Except Self - Algorithm Comparison");
  console.log("=".repeat(60));
  console.log(
    `Input: [${nums.slice(0, 10).join(", ")}${nums.length > 10 ? "..." : ""}]`
  );
  console.log(`Array Length: ${nums.length}`);
  console.log();

  const results: AlgorithmResult[] = [];

  algorithms.forEach(({ name, fn, space }) => {
    try {
      const start = performance.now();
      const result = fn([...nums]); // Copy to avoid mutation
      const end = performance.now();
      const timeMs = end - start;

      results.push({
        name,
        result,
        timeMs,
        spaceComplexity: space,
      });

      const isCorrect = validateResult(nums, result);
      console.log(
        `${name.padEnd(20)} | Time: ${timeMs.toFixed(
          4
        )}ms | Space: ${space.padEnd(8)} | ${isCorrect ? "✅" : "❌"}`
      );
    } catch (error) {
      console.log(
        `${name.padEnd(20)} | Error: ${(error as Error).message} | ❌`
      );
    }
  });

  console.log();
  console.log("📊 Performance Summary:");
  const fastestTime = Math.min(...results.map((r) => r.timeMs));
  const fastest = results.find((r) => r.timeMs === fastestTime);
  console.log(`Fastest: ${fastest?.name} (${fastestTime.toFixed(4)}ms)`);

  const optimalSpace = results.filter((r) => r.spaceComplexity === "O(1)");
  console.log(`Optimal Space: ${optimalSpace.map((r) => r.name).join(", ")}`);

  return results;
}

/**
 * Validate if result is correct
 */
export function validateResult(nums: number[], result: number[]): boolean {
  if (nums.length !== result.length) return false;

  for (let i = 0; i < nums.length; i++) {
    let expectedProduct = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        expectedProduct *= nums[j] ?? 1;
      }
    }

    if (Math.abs((result[i] ?? 0) - expectedProduct) > 1e-10) {
      return false;
    }
  }

  return true;
}

/**
 * Generate test cases with different characteristics
 */
export function generateTestCases(): number[][] {
  return [
    // Basic cases
    [1, 2, 3, 4],
    [-1, 1, 0, -3, 3],

    // Edge cases
    [1, 1],
    [5],
    [0, 0],
    [1, 0],
    [0, 1, 2, 3],

    // Negative numbers
    [-1, -2, -3, -4],
    [1, -2, 3, -4],

    // Large numbers
    [100, 200, 300, 400],
    [1000000, 1000000, 1000000],

    // Mixed cases
    [2, 3, 0, 4, 5],
    [-2, -3, 0, 4, 5],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

    // Fractional-like results (when using integers)
    [2, 4, 6, 8],
    [3, 6, 9, 12],
  ];
}

/**
 * Analyze different properties of the input
 */
export interface ArrayAnalysis {
  length: number;
  hasZeros: boolean;
  zeroCount: number;
  hasNegatives: boolean;
  negativeCount: number;
  totalProduct: number;
  maxValue: number;
  minValue: number;
  averageValue: number;
}

export function analyzeArray(nums: number[]): ArrayAnalysis {
  const zeroCount = nums.filter((n) => n === 0).length;
  const negativeCount = nums.filter((n) => n < 0).length;
  const totalProduct = nums.reduce((acc, num) => acc * num, 1);

  return {
    length: nums.length,
    hasZeros: zeroCount > 0,
    zeroCount,
    hasNegatives: negativeCount > 0,
    negativeCount,
    totalProduct,
    maxValue: Math.max(...nums),
    minValue: Math.min(...nums),
    averageValue: nums.reduce((sum, num) => sum + num, 0) / nums.length,
  };
}

/**
 * Demonstration function
 */
export function demonstrateUsage(): void {
  console.log("🎯 Product of Array Except Self - Usage Demonstration");
  console.log("=".repeat(50));

  const testCases = [
    [1, 2, 3, 4],
    [-1, 1, 0, -3, 3],
    [2, 3, 0, 4, 5],
  ];

  testCases.forEach((nums, index) => {
    console.log(`\n📝 Test Case ${index + 1}: [${nums.join(", ")}]`);

    const analysis = analyzeArray(nums);
    console.log(
      `Analysis: ${analysis.zeroCount} zeros, ${analysis.negativeCount} negatives`
    );

    const result = productExceptSelfOptimized(nums);
    console.log(`Result: [${result.join(", ")}]`);

    const isValid = validateResult(nums, result);
    console.log(`Validation: ${isValid ? "✅ Correct" : "❌ Incorrect"}`);
  });

  console.log("\n🚀 Performance Comparison:");
  compareAlgorithms([1, 2, 3, 4, 5]);
}

// Export the main optimal function as default
export default productExceptSelfOptimized;

// Main function for npm run dev:13
export function main(): void {
  demonstrateUsage();
}
