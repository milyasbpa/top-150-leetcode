# Product of Array Except Self

## Problem Description

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in **O(n)** time and without using the division operation.

**Constraints:**

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

## Examples

```typescript
// Example 1
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation: [2*3*4, 1*3*4, 1*2*4, 1*2*3]

// Example 2
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
Explanation: When there's a zero, all products except the zero position become 0
```

## Algorithmic Approaches

### 1. Two-Pass with Extra Space O(n)

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

```typescript
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const leftProducts = new Array(n);
  const rightProducts = new Array(n);
  const result = new Array(n);

  // Calculate left products
  leftProducts[0] = 1;
  for (let i = 1; i < n; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
  }

  // Calculate right products
  rightProducts[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }

  // Combine results
  for (let i = 0; i < n; i++) {
    result[i] = leftProducts[i] * rightProducts[i];
  }

  return result;
}
```

**Key Insights:**

- Uses separate arrays to store left and right products
- Clear separation of concerns makes logic easy to understand
- Good for learning the concept before optimization

### 2. Optimized Two-Pass O(1) Space ⭐

**Time Complexity:** O(n)  
**Space Complexity:** O(1) (excluding output array)

```typescript
function productExceptSelfOptimized(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // First pass: store left products in result array
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Second pass: multiply by right products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}
```

**Key Insights:**

- **Most optimal solution** for interviews
- Uses output array to store intermediate results
- Only requires two passes through the array
- Space complexity is O(1) if we don't count the output array

### 3. Division-Based Approach (Educational)

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```typescript
function productExceptSelfDivision(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n);

  // Handle zeros specially
  const zeroCount = nums.filter((x) => x === 0).length;
  if (zeroCount > 1) {
    return new Array(n).fill(0);
  }

  if (zeroCount === 1) {
    const zeroIndex = nums.indexOf(0);
    const product = nums.reduce(
      (acc, val, i) => (i === zeroIndex ? acc : acc * val),
      1
    );
    result.fill(0);
    result[zeroIndex] = product;
    return result;
  }

  // No zeros - use division
  const totalProduct = nums.reduce((acc, val) => acc * val, 1);
  for (let i = 0; i < n; i++) {
    result[i] = totalProduct / nums[i];
  }

  return result;
}
```

**Key Insights:**

- **Not allowed** in most interview settings
- Shows understanding of the mathematical relationship
- Must handle zero cases carefully to avoid division by zero

### 4. Advanced Approaches

#### Prefix-Suffix Array Technique

Uses the mathematical property that `result[i] = prefix[i-1] * suffix[i+1]`

#### Two Pointers Optimization

Calculates left and right products simultaneously from both ends

#### Recursive Implementation

Demonstrates divide-and-conquer thinking (though less efficient)

#### Stack-Based Solution

Uses auxiliary stack to track products (educational value)

#### Logarithmic Approach

Uses logarithms to handle very large numbers and avoid overflow

## Problem-Solving Strategies

### 1. Pattern Recognition

- **Product problems** often involve prefix/suffix decomposition
- When division is prohibited, think about **two-pass algorithms**
- Zero handling is crucial in product calculations

### 2. Space Optimization Techniques

- Use output array as temporary storage
- Eliminate auxiliary arrays by combining operations
- Think about what information you need when

### 3. Edge Case Handling

```typescript
// Critical edge cases to consider:
- Single zero: [1, 0, 3, 4] → [0, 12, 0, 0]
- Multiple zeros: [0, 0, 3] → [0, 0, 0]
- All negative: [-1, -2, -3] → [6, 3, 2]
- Mixed signs: [-1, 2, -3] → [6, 3, 2]
```

## Interview Strategy

### What Interviewers Look For

1. **Initial Approach**: Can you identify the brute force O(n²) solution?
2. **Optimization**: Do you recognize the prefix/suffix pattern?
3. **Space Optimization**: Can you reduce from O(n) to O(1) extra space?
4. **Edge Cases**: Do you handle zeros and negative numbers correctly?
5. **Mathematical Insight**: Understanding why division approach works but isn't allowed

### Common Follow-ups

1. **"What if division was allowed?"** - Show the division approach
2. **"How would you handle overflow?"** - Discuss logarithmic approach
3. **"Can you solve it in one pass?"** - Explain why two passes are needed
4. **"What about very large arrays?"** - Discuss memory-efficient streaming approaches

## Real-World Applications

### 1. Financial Analysis

```typescript
// Calculate portfolio performance excluding each stock
const stockReturns = [1.02, 0.98, 1.05, 1.01];
const portfolioWithoutStock = productExceptSelf(stockReturns);
// Result shows how portfolio would perform without each stock
```

### 2. Statistical Computing

```typescript
// Geometric mean calculations
// Product of all elements except outliers
const dataPoints = [2, 4, 100, 3, 5]; // 100 is outlier
const productsExceptOutlier = productExceptSelf(dataPoints);
```

### 3. Game Development

```typescript
// Damage multipliers in RPGs
const damageMultipliers = [1.2, 1.5, 2.0, 1.1];
// Calculate damage without each buff/debuff
const damageWithoutBuff = productExceptSelf(damageMultipliers);
```

## Common Pitfalls and How to Avoid Them

### 1. Integer Overflow

```typescript
// ❌ Wrong: Large numbers cause overflow
const nums = [1000, 1000, 1000, 1000];

// ✅ Right: Use logarithmic approach for large numbers
function productExceptSelfSafe(nums: number[]): number[] {
  // Use log properties: log(a*b) = log(a) + log(b)
  // Then convert back: result = exp(logSum - log(nums[i]))
}
```

### 2. Zero Handling

```typescript
// ❌ Wrong: Dividing by zero
if (totalProduct !== 0) {
  result[i] = totalProduct / nums[i]; // Crashes if nums[i] === 0
}

// ✅ Right: Handle zeros before division
const zeroCount = nums.filter((x) => x === 0).length;
if (zeroCount > 1) return new Array(n).fill(0);
```

### 3. Negative Zero (-0)

```typescript
// ❌ Wrong: -0 !== 0 in some contexts
// Some algorithms produce -0 which fails strict equality tests

// ✅ Right: Normalize zeros in tests
function normalizeZeros(arr: number[]): number[] {
  return arr.map((val) => (val === 0 ? 0 : val));
}
```

## Performance Analysis

| Approach               | Time     | Space    | Notes                         |
| ---------------------- | -------- | -------- | ----------------------------- |
| Brute Force            | O(n²)    | O(1)     | Not acceptable                |
| Two-Pass Extra         | O(n)     | O(n)     | Clear but uses extra space    |
| **Optimized Two-Pass** | **O(n)** | **O(1)** | **✅ Optimal for interviews** |
| Division               | O(n)     | O(1)     | ❌ Usually not allowed        |
| Recursive              | O(n)     | O(log n) | Educational, not optimal      |

## Advanced Optimizations

### 1. Memory Access Patterns

```typescript
// Cache-friendly implementation
// Access array elements sequentially for better cache performance
for (let i = 0; i < n; i++) {
  result[i] = leftProduct;
  leftProduct *= nums[i]; // Sequential access
}
```

### 2. SIMD Optimization Potential

```typescript
// For very large arrays, vectorization can help
// Modern JavaScript engines can optimize simple multiplication loops
// Keep operations simple and avoid complex branching in hot loops
```

### 3. Streaming for Massive Data

```typescript
// For arrays too large for memory
function* productExceptSelfStreaming(numsStream: Generator<number>) {
  // Two-pass streaming implementation
  // First pass: collect all values and calculate prefix products
  // Second pass: yield results using stored prefix products
}
```

## Testing Strategy

### Unit Test Categories

1. **Basic Functionality**

   - Standard positive numbers
   - Standard negative numbers
   - Mixed positive/negative

2. **Edge Cases**

   - Single zero
   - Multiple zeros
   - All ones
   - Two-element arrays

3. **Performance Tests**

   - Large arrays (avoiding overflow)
   - Time complexity verification
   - Memory usage validation

4. **Mathematical Properties**
   - Commutative property validation
   - Associative property verification
   - Identity element handling

## Conclusion

The **Product of Array Except Self** problem is an excellent example of:

- **Pattern Recognition**: Identifying prefix/suffix decomposition
- **Space Optimization**: Using output array as workspace
- **Mathematical Insight**: Understanding product relationships
- **Edge Case Handling**: Dealing with zeros and signs

The **optimized two-pass solution** is the gold standard for interviews, demonstrating both algorithmic thinking and practical optimization skills.

### Key Takeaways

1. **Always consider space optimization** after finding a working solution
2. **Handle zeros explicitly** in product problems
3. **Two passes can be more efficient** than complex single-pass algorithms
4. **Use the output array as workspace** when possible
5. **Understand why division is prohibited** to show mathematical insight

This problem appears frequently in technical interviews at companies like Google, Amazon, and Microsoft, making it essential to master multiple approaches and their trade-offs.
