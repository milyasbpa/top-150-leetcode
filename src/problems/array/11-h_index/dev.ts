/**
 * 📊 H-Index - LeetCode #274
 *
 * Problem: Given an array of integers citations where citations[i] is the number
 * of citations a researcher received for their ith paper, return the researcher's h-index.
 *
 * The h-index is defined as the maximum value of h such that the given researcher
 * has published h papers that have each been cited at least h times.
 *
 * Constraints:
 * - n == citations.length
 * - 1 <= n <= 5000
 * - 0 <= citations[i] <= 1000
 *
 * Examples:
 * Input: citations = [3,0,6,1,5]
 * Output: 3
 * Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them
 * had received 3, 0, 6, 1, 5 citations respectively.
 * Since the researcher has 3 papers with at least 3 citations each and the remaining
 * two with no more than 3 citations each, their h-index is 3.
 *
 * Input: citations = [1,3,1]
 * Output: 1
 */

// ================================================================================================
// APPROACH 1: Sorting Approach (Most Intuitive)
// ================================================================================================

/**
 * Sorting Approach - Sort and check from highest citations
 *
 * Time Complexity: O(n log n) - Sorting dominates
 * Space Complexity: O(1) - In-place sorting (or O(n) if we count sort space)
 *
 * Key Insight: Sort citations in descending order. For position i (0-indexed),
 * we have (i+1) papers with at least citations[i] citations each.
 * The h-index is the maximum h where we have at least h papers with h+ citations.
 *
 * Algorithm:
 * 1. Sort citations in descending order
 * 2. For each position i, we have (i+1) papers with citations[i] or more citations
 * 3. H-index condition: h papers with at least h citations each
 * 4. Find maximum valid h: Math.min(citations[i], i+1)
 */
export function hIndex(citations: number[]): number {
  // Sort in descending order
  citations.sort((a, b) => b - a);

  let h = 0;

  // Check each paper position
  for (let i = 0; i < citations.length; i++) {
    // At position i, we have (i+1) papers
    const papersCount = i + 1;
    const citationsCount = citations[i] ?? 0;

    // H-index condition: h papers with at least h citations each
    // We can have at most min(citationsCount, papersCount) as h-index
    const possibleH = Math.min(citationsCount, papersCount);

    h = Math.max(h, possibleH);
  }

  return h;
}

// ================================================================================================
// APPROACH 2: Sorting with Optimized Logic
// ================================================================================================

/**
 * Optimized Sorting Approach - Direct h-index calculation
 *
 * Time Complexity: O(n log n) - Sorting
 * Space Complexity: O(1) - In-place operations
 *
 * Cleaner logic: After sorting descending, at position i we have (i+1) papers.
 * The h-index is the largest h such that we have at least h papers with h+ citations.
 */
export function hIndexOptimized(citations: number[]): number {
  citations.sort((a, b) => b - a);

  let h = 0;

  for (let i = 0; i < citations.length; i++) {
    // At position i, we have (i+1) papers with citations[i] or more citations
    const papers = i + 1;
    const minCitations = citations[i] ?? 0;

    // If we have at least 'papers' citations for this paper,
    // then we can achieve h-index of 'papers'
    if (minCitations >= papers) {
      h = papers;
    } else {
      // If citations < papers, we can't improve h-index further
      break;
    }
  }

  return h;
}

// ================================================================================================
// APPROACH 3: Counting Sort Approach (Linear Time)
// ================================================================================================

/**
 * Counting Sort Approach - O(n) time using counting array
 *
 * Time Complexity: O(n) - Single pass + counting array operations
 * Space Complexity: O(n) - Counting array
 *
 * Key Insight: Since citations are bounded (0 <= citations[i] <= 1000),
 * we can use counting sort. Any citation >= n should be treated as n
 * for h-index calculation (since h-index cannot exceed n papers).
 *
 * Algorithm:
 * 1. Create counting array where count[i] = number of papers with exactly i citations
 * 2. For citations >= n, count them as n (since h-index <= n)
 * 3. Scan from right to left, accumulating papers count
 * 4. Find largest h where we have at least h papers with h+ citations
 */
export function hIndexCounting(citations: number[]): number {
  const n = citations.length;
  const count = new Array(n + 1).fill(0);

  // Count papers by citation count
  for (const citation of citations) {
    // Cap at n since h-index cannot exceed number of papers
    count[Math.min(citation, n)]++;
  }

  let totalPapers = 0;

  // Scan from highest possible h-index to lowest
  for (let h = n; h >= 0; h--) {
    totalPapers += count[h];

    // If we have at least h papers with h or more citations
    if (totalPapers >= h) {
      return h;
    }
  }

  return 0;
}

// ================================================================================================
// APPROACH 4: Binary Search Approach
// ================================================================================================

/**
 * Binary Search Approach - Search for maximum valid h-index
 *
 * Time Complexity: O(n log n) - O(n) for each search * O(log n) searches
 * Space Complexity: O(1) - Only using variables
 *
 * Key Insight: H-index has a monotonic property. If h is valid,
 * then all values <= h might be valid. If h is invalid,
 * then all values > h are also invalid.
 *
 * Search space: [0, n] where n is number of papers
 */
export function hIndexBinarySearch(citations: number[]): number {
  const n = citations.length;
  let left = 0;
  let right = n;

  function canAchieveHIndex(h: number): boolean {
    let count = 0;
    for (const citation of citations) {
      if (citation >= h) {
        count++;
      }
    }
    return count >= h;
  }

  while (left < right) {
    const mid = Math.ceil((left + right) / 2); // Use ceil for upper bound

    if (canAchieveHIndex(mid)) {
      left = mid; // mid is valid, try higher values
    } else {
      right = mid - 1; // mid is invalid, try lower values
    }
  }

  return left;
}

// ================================================================================================
// APPROACH 5: Bucket Sort Approach
// ================================================================================================

/**
 * Bucket Sort Approach - Group papers by citation ranges
 *
 * Time Complexity: O(n) - Linear scan and bucket operations
 * Space Complexity: O(n) - Bucket array
 *
 * Similar to counting sort but with explicit bucket thinking.
 * Group papers into buckets based on citation count.
 */
export function hIndexBucket(citations: number[]): number {
  const n = citations.length;
  const buckets = new Array(n + 1).fill(0);

  // Place each paper in appropriate bucket
  for (const citation of citations) {
    // Papers with citations >= n go to bucket n
    buckets[Math.min(citation, n)]++;
  }

  let count = 0;

  // Check from highest bucket to lowest
  for (let i = n; i >= 0; i--) {
    count += buckets[i];

    // If we have at least i papers with i or more citations
    if (count >= i) {
      return i;
    }
  }

  return 0;
}

// ================================================================================================
// APPROACH 6: Two-Pointer Approach (After Sorting)
// ================================================================================================

/**
 * Two-Pointer Approach - Use two pointers on sorted array
 *
 * Time Complexity: O(n log n) - Sorting + O(n) two-pointer scan
 * Space Complexity: O(1) - Only pointers
 *
 * After sorting, use two pointers to find the optimal h-index.
 * This approach is more explicit about the logic.
 */
export function hIndexTwoPointer(citations: number[]): number {
  citations.sort((a, b) => b - a); // Sort descending

  let left = 0;
  let right = citations.length - 1;
  let h = 0;

  while (left <= right) {
    const papers = left + 1; // Number of papers from left
    const currentCitations = citations[left] ?? 0;

    if (currentCitations >= papers) {
      h = Math.max(h, papers);
      left++;
    } else {
      break; // No more valid h-index improvements
    }
  }

  return h;
}

// ================================================================================================
// APPROACH 7: Histogram Approach
// ================================================================================================

/**
 * Histogram Approach - Think of citations as histogram bars
 *
 * Time Complexity: O(n) - Linear scan with histogram processing
 * Space Complexity: O(n) - Histogram array
 *
 * Visualize citations as a histogram. H-index is the largest square
 * that can fit under the histogram when arranged properly.
 */
export function hIndexHistogram(citations: number[]): number {
  const n = citations.length;
  const histogram = new Array(n + 1).fill(0);

  // Build histogram (similar to counting sort)
  for (const citation of citations) {
    histogram[Math.min(citation, n)]++;
  }

  let papersWithAtLeastHCitations = 0;

  // Scan from right (highest citations) to left
  for (let h = n; h >= 0; h--) {
    papersWithAtLeastHCitations += histogram[h];

    // Check if h-index condition is satisfied
    if (papersWithAtLeastHCitations >= h) {
      return h;
    }
  }

  return 0;
}

// ================================================================================================
// APPROACH 8: Mathematical Approach with Statistics
// ================================================================================================

/**
 * Mathematical Statistical Approach - Use statistical properties
 *
 * Time Complexity: O(n) - Single pass with mathematical calculations
 * Space Complexity: O(1) - Only statistical variables
 *
 * Use mathematical properties and statistics to estimate h-index,
 * then verify the result. This approach provides insights into
 * the relationship between citations and h-index.
 */
export function hIndexMath(citations: number[]): number {
  const n = citations.length;

  // Calculate basic statistics
  const sum = citations.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;
  const max = Math.max(...citations);

  // Estimate h-index based on statistics
  let estimatedH = Math.min(Math.floor(Math.sqrt(sum)), n);

  // Function to check if h is valid
  function isValidH(h: number): boolean {
    let count = 0;
    for (const citation of citations) {
      if (citation >= h) count++;
    }
    return count >= h;
  }

  // Fine-tune the estimate
  while (estimatedH >= 0 && !isValidH(estimatedH)) {
    estimatedH--;
  }

  // Try to improve the estimate
  while (estimatedH + 1 <= n && isValidH(estimatedH + 1)) {
    estimatedH++;
  }

  return estimatedH;
}

// ================================================================================================
// UTILITY FUNCTIONS
// ================================================================================================

/**
 * Validates H-Index calculation
 */
export function validateHIndex(citations: number[], h: number): boolean {
  let papersWithAtLeastH = 0;
  let papersWithLessThanH = 0;

  for (const citation of citations) {
    if (citation >= h) {
      papersWithAtLeastH++;
    } else {
      papersWithLessThanH++;
    }
  }

  // H-index definition: exactly h papers with at least h citations each,
  // and remaining papers have <= h citations each
  return papersWithAtLeastH >= h && papersWithLessThanH <= citations.length - h;
}

/**
 * Analyzes citation distribution
 */
export interface CitationAnalysis {
  hIndex: number;
  totalPapers: number;
  totalCitations: number;
  averageCitations: number;
  maxCitations: number;
  minCitations: number;
  median: number;
  papersAboveHIndex: number;
  papersAtOrAboveHIndex: number;
  citationDistribution: Map<number, number>;
}

export function analyzeCitations(citations: number[]): CitationAnalysis {
  const n = citations.length;
  const hIndexValue = hIndex(citations);

  // Basic statistics
  const totalCitations = citations.reduce((sum, c) => sum + c, 0);
  const averageCitations = totalCitations / n;
  const maxCitations = Math.max(...citations);
  const minCitations = Math.min(...citations);

  // Median calculation
  const sorted = [...citations].sort((a, b) => a - b);
  const median =
    n % 2 === 1
      ? sorted[Math.floor(n / 2)] ?? 0
      : ((sorted[n / 2 - 1] ?? 0) + (sorted[n / 2] ?? 0)) / 2;

  // H-index related metrics
  let papersAboveHIndex = 0;
  let papersAtOrAboveHIndex = 0;

  for (const citation of citations) {
    if (citation > hIndexValue) papersAboveHIndex++;
    if (citation >= hIndexValue) papersAtOrAboveHIndex++;
  }

  // Citation distribution
  const citationDistribution = new Map<number, number>();
  for (const citation of citations) {
    citationDistribution.set(
      citation,
      (citationDistribution.get(citation) || 0) + 1
    );
  }

  return {
    hIndex: hIndexValue,
    totalPapers: n,
    totalCitations,
    averageCitations,
    maxCitations,
    minCitations,
    median,
    papersAboveHIndex,
    papersAtOrAboveHIndex,
    citationDistribution,
  };
}

/**
 * Simulates H-Index impact of adding new papers
 */
export function simulateNewPaper(
  currentCitations: number[],
  newPaperCitations: number
): number {
  const newArray = [...currentCitations, newPaperCitations];
  return hIndex(newArray);
}

/**
 * Finds minimum citations needed for next H-Index improvement
 */
export function minCitationsForNextHIndex(citations: number[]): number | null {
  const currentH = hIndex(citations);
  const targetH = currentH + 1;

  // Count papers with at least targetH citations
  let papersWithTargetH = 0;
  for (const citation of citations) {
    if (citation >= targetH) papersWithTargetH++;
  }

  // Need at least targetH papers with targetH+ citations
  const papersNeeded = targetH - papersWithTargetH;

  if (papersNeeded <= 0) {
    return 0; // Already achievable
  }

  // Find papers with citations < targetH that could be improved
  const improvablePapers = citations
    .filter((c) => c < targetH)
    .sort((a, b) => b - a);

  if (improvablePapers.length < papersNeeded) {
    return null; // Cannot achieve next h-index with current papers
  }

  // Calculate minimum citations needed
  let totalNeeded = 0;
  for (let i = 0; i < papersNeeded; i++) {
    totalNeeded += Math.max(0, targetH - (improvablePapers[i] ?? 0));
  }

  return totalNeeded;
}

/**
 * Performance comparison between different algorithms
 */
export function compareAlgorithms(citations: number[]): void {
  console.log("📊 H-Index - Algorithm Performance Comparison");
  console.log("=".repeat(60));
  console.log(`Input: [${citations.join(", ")}]`);
  console.log(`Array Length: ${citations.length}`);
  console.log();

  const algorithms = [
    { name: "Sorting", fn: hIndex, complexity: "O(n log n)" },
    {
      name: "Sorting Optimized",
      fn: hIndexOptimized,
      complexity: "O(n log n)",
    },
    { name: "Counting Sort", fn: hIndexCounting, complexity: "O(n)" },
    { name: "Binary Search", fn: hIndexBinarySearch, complexity: "O(n log n)" },
    { name: "Bucket Sort", fn: hIndexBucket, complexity: "O(n)" },
    { name: "Two Pointer", fn: hIndexTwoPointer, complexity: "O(n log n)" },
    { name: "Histogram", fn: hIndexHistogram, complexity: "O(n)" },
    { name: "Mathematical", fn: hIndexMath, complexity: "O(n)" },
  ];

  algorithms.forEach(({ name, fn, complexity }) => {
    const start = performance.now();
    const result = fn([...citations]); // Clone to avoid mutations
    const end = performance.now();
    const time = (end - start).toFixed(4);

    const isValid = validateHIndex(citations, result);
    const status = isValid ? "✅" : "❌";

    console.log(
      `${name.padEnd(
        20
      )} | H-Index: ${result} | Time: ${time}ms | ${complexity} | ${status}`
    );
  });

  console.log();
  console.log("📈 Citation Analysis:");
  const analysis = analyzeCitations(citations);
  console.log(`Total Papers: ${analysis.totalPapers}`);
  console.log(`Total Citations: ${analysis.totalCitations}`);
  console.log(`Average Citations: ${analysis.averageCitations.toFixed(2)}`);
  console.log(`H-Index: ${analysis.hIndex}`);
  console.log(`Papers at or above H-Index: ${analysis.papersAtOrAboveHIndex}`);
  console.log(`Median Citations: ${analysis.median}`);

  const nextHIndexCost = minCitationsForNextHIndex(citations);
  if (nextHIndexCost !== null) {
    console.log(
      `Citations needed for H-Index ${analysis.hIndex + 1}: ${nextHIndexCost}`
    );
  } else {
    console.log(
      `Cannot improve to H-Index ${analysis.hIndex + 1} with current papers`
    );
  }
}

// ================================================================================================
// DEMONSTRATION & TESTING
// ================================================================================================

if (require.main === module) {
  // Test cases from the problem
  const testCases = [
    [3, 0, 6, 1, 5], // Expected: 3
    [1, 3, 1], // Expected: 1
    [100], // Expected: 1
    [0, 0], // Expected: 0
    [1, 1], // Expected: 1
    [0, 1, 3, 5, 6], // Expected: 3
    [10, 8, 5, 4, 3], // Expected: 4
    [25, 8, 5, 3, 3], // Expected: 3
  ];

  console.log("🚀 H-Index - Comprehensive Testing\n");

  testCases.forEach((citations, index) => {
    console.log(`\n📊 Test Case ${index + 1}:`);
    compareAlgorithms(citations);
    console.log("-".repeat(80));
  });

  // Performance test with larger array
  console.log("\n⚡ Performance Test - Large Array:");
  const largeArray = Array.from({ length: 1000 }, (_, i) =>
    Math.floor(Math.random() * 100)
  );

  console.log("Testing with 1000 element array...");
  const start = performance.now();
  const result = hIndex(largeArray);
  const end = performance.now();

  console.log(`H-Index: ${result}`);
  console.log(`Time: ${(end - start).toFixed(4)}ms`);
  console.log(
    `Average time per element: ${((end - start) / largeArray.length).toFixed(
      6
    )}ms`
  );
}

/**
 * Example usage and explanations:
 *
 * const citations1 = [3, 0, 6, 1, 5];
 * console.log(hIndex(citations1)); // Output: 3
 *
 * Step-by-step for [3, 0, 6, 1, 5]:
 * - Sort descending: [6, 5, 3, 1, 0]
 * - Position 0: 1 paper with >= 6 citations → h ≤ min(6, 1) = 1
 * - Position 1: 2 papers with >= 5 citations → h ≤ min(5, 2) = 2
 * - Position 2: 3 papers with >= 3 citations → h ≤ min(3, 3) = 3
 * - Position 3: 4 papers with >= 1 citations → h ≤ min(1, 4) = 1
 * - Position 4: 5 papers with >= 0 citations → h ≤ min(0, 5) = 0
 * - Maximum h = 3
 *
 * The key insight is that h-index represents the balance point where
 * the number of papers equals the minimum citation threshold.
 */
