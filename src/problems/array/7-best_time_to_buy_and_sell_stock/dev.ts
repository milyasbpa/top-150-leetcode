/**
 * 🎯 LeetCode #121 - Best Time to Buy and Sell Stock
 *
 * Problem Statement:
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing
 * a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve
 * any profit, return 0.
 *
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 * Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
 *
 * Example 2:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transactions are done and the max profit = 0.
 *
 * Constraints:
 * - 1 <= prices.length <= 10^5
 * - 0 <= prices[i] <= 10^4
 */

// 🌟 Solution 1: One-Pass Algorithm - O(n) time, O(1) space (OPTIMAL!)
function maxProfit(prices: number[]): number {
  // Edge case: if less than 2 prices, no profit possible
  if (prices.length < 2) return 0;

  let minPrice = prices[0]!; // Track minimum price seen so far
  let maxProfit = 0; // Track maximum profit achievable

  // Iterate through prices starting from day 2
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i]!;

    // If current price is lower than our minimum, update minimum
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    } else {
      // Calculate profit if we sell today
      const currentProfit = currentPrice - minPrice;
      // Update max profit if current profit is better
      maxProfit = Math.max(maxProfit, currentProfit);
    }
  }

  return maxProfit;
}

// 🔄 Solution 2: Two-Pointer Approach - O(n) time, O(1) space
function maxProfitTwoPointer(prices: number[]): number {
  if (prices.length < 2) return 0;

  let left = 0; // Buy pointer
  let right = 1; // Sell pointer
  let maxProfit = 0;

  while (right < prices.length) {
    // If we can make profit (sell price > buy price)
    if (prices[left]! < prices[right]!) {
      const profit = prices[right]! - prices[left]!;
      maxProfit = Math.max(maxProfit, profit);
    } else {
      // If sell price <= buy price, move buy pointer
      left = right;
    }
    right++;
  }

  return maxProfit;
}

// 💭 Solution 3: Brute Force - O(n²) time, O(1) space
function maxProfitBruteForce(prices: number[]): number {
  if (prices.length < 2) return 0;

  let maxProfit = 0;

  // Try every possible buy day
  for (let i = 0; i < prices.length - 1; i++) {
    // Try every possible sell day after buy day
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j]! - prices[i]!;
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}

// 📈 Solution 4: Dynamic Programming - O(n) time, O(1) space
function maxProfitDP(prices: number[]): number {
  if (prices.length < 2) return 0;

  // hold: maximum profit when holding a stock
  // sold: maximum profit when not holding a stock
  let hold = -prices[0]!; // Buy stock on day 1
  let sold = 0; // Don't hold any stock initially

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i]!;

    // Update sold: max of (keep not holding, sell stock today)
    const newSold = Math.max(sold, hold + currentPrice);

    // Update hold: max of (keep holding, buy stock today)
    const newHold = Math.max(hold, -currentPrice);

    sold = newSold;
    hold = newHold;
  }

  return sold; // Return profit when not holding stock
}

// 🔍 Solution 5: Kadane's Algorithm Variation - O(n) time, O(1) space
function maxProfitKadane(prices: number[]): number {
  if (prices.length < 2) return 0;

  let maxEndingHere = 0;
  let maxSoFar = 0;

  // Transform to profit differences array and apply Kadane's
  for (let i = 1; i < prices.length; i++) {
    const profitDiff = prices[i]! - prices[i - 1]!;

    maxEndingHere = Math.max(profitDiff, maxEndingHere + profitDiff);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// 📊 Solution 6: Valley Peak Approach - O(n) time, O(1) space
function maxProfitValleyPeak(prices: number[]): number {
  if (prices.length < 2) return 0;

  // This is actually equivalent to the one-pass approach
  // We track the global minimum seen so far and global maximum profit
  let minPrice = prices[0]!;
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i]!;

    // Update minimum price if we found a lower price
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    }

    // Calculate profit if we sell at current price
    const currentProfit = currentPrice - minPrice;
    maxProfit = Math.max(maxProfit, currentProfit);
  }

  return maxProfit;
}

// 📊 Performance Comparison Function
function performanceComparison(prices: number[]): void {
  console.log(`🎯 Testing Best Time to Buy and Sell Stock algorithms`);
  console.log(`Array length: ${prices.length}`);
  console.log(
    `Prices preview: [${prices.slice(0, 10).join(", ")}${
      prices.length > 10 ? "..." : ""
    }]`
  );

  const algorithms = [
    {
      name: "One-Pass",
      fn: maxProfit,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Two-Pointer",
      fn: maxProfitTwoPointer,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Dynamic Programming",
      fn: maxProfitDP,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Kadane's Algorithm",
      fn: maxProfitKadane,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Valley-Peak",
      fn: maxProfitValleyPeak,
      complexity: "O(n) time, O(1) space",
    },
  ];

  // Skip brute force for large arrays to avoid timeout
  if (prices.length <= 1000) {
    algorithms.push({
      name: "Brute Force",
      fn: maxProfitBruteForce,
      complexity: "O(n²) time, O(1) space",
    });
  }

  algorithms.forEach(({ name, fn, complexity }) => {
    const start = performance.now();
    const result = fn(prices);
    const end = performance.now();

    console.log(
      `✅ ${name}: ${result} (${(end - start).toFixed(4)}ms) - ${complexity}`
    );
  });

  console.log("\n" + "=".repeat(80));
}

// 🧪 Test Cases
function runTests(): void {
  console.log("🧪 Running Best Time to Buy and Sell Stock Tests...\n");

  const testCases = [
    {
      name: "Basic Case 1",
      input: [7, 1, 5, 3, 6, 4],
      expected: 5,
      description: "Buy at 1, sell at 6 for profit of 5",
    },
    {
      name: "Basic Case 2",
      input: [7, 6, 4, 3, 1],
      expected: 0,
      description: "Prices always decreasing, no profit possible",
    },
    {
      name: "Single Day",
      input: [5],
      expected: 0,
      description: "Only one day, cannot buy and sell",
    },
    {
      name: "Two Days Profit",
      input: [1, 5],
      expected: 4,
      description: "Buy on day 1, sell on day 2",
    },
    {
      name: "Two Days Loss",
      input: [5, 1],
      expected: 0,
      description: "Price decreases, no profit possible",
    },
    {
      name: "All Same Prices",
      input: [3, 3, 3, 3],
      expected: 0,
      description: "No price change, no profit",
    },
    {
      name: "Increasing Trend",
      input: [1, 2, 3, 4, 5],
      expected: 4,
      description: "Best to buy first day, sell last day",
    },
    {
      name: "V-shaped Pattern",
      input: [5, 4, 3, 2, 1, 2, 3, 4, 5],
      expected: 4,
      description: "Buy at valley (1), sell at peak (5)",
    },
    {
      name: "Multiple Peaks",
      input: [3, 2, 6, 5, 0, 3],
      expected: 4,
      description:
        "Multiple buy-sell opportunities, max profit = 4 (0→3 or 2→6)",
    },
    {
      name: "Large Numbers",
      input: [10000, 1, 9999],
      expected: 9998,
      description: "Large price differences",
    },
    {
      name: "Zero Prices",
      input: [0, 1, 0, 3, 0, 4],
      expected: 4,
      description: "Include zero prices, max profit = 4 (0→4)",
    },
  ];

  // Test main algorithm with each test case
  testCases.forEach(({ name, input, expected, description }, index) => {
    console.log(`\n📝 Test ${index + 1}: ${name}`);
    console.log(`📋 Description: ${description}`);
    console.log(`📥 Input: [${input.join(", ")}]`);
    console.log(`🎯 Expected: ${expected}`);

    const result = maxProfit(input);
    const passed = result === expected;

    console.log(`${passed ? "✅" : "❌"} Result: ${result}`);
    console.log(`📊 Status: ${passed ? "🎉 PASSED" : "💥 FAILED"}`);
  });
}

// 🚀 Performance Tests
function runPerformanceTests(): void {
  console.log("\n🚀 Performance Testing...\n");

  // Test with different array sizes
  const testConfigs = [
    { size: 100, type: "Random" },
    { size: 1000, type: "Increasing" },
    { size: 5000, type: "Decreasing" },
    { size: 10000, type: "Volatile" },
  ];

  testConfigs.forEach(({ size, type }) => {
    console.log(`\n📏 Array Size: ${size} (${type} pattern)`);

    let testArray: number[];
    switch (type) {
      case "Random":
        testArray = Array.from({ length: size }, () =>
          Math.floor(Math.random() * 1000)
        );
        break;
      case "Increasing":
        testArray = Array.from({ length: size }, (_, i) => i + 1);
        break;
      case "Decreasing":
        testArray = Array.from({ length: size }, (_, i) => size - i);
        break;
      case "Volatile":
        testArray = Array.from({ length: size }, (_, i) =>
          Math.floor(Math.sin(i / 10) * 500 + 500)
        );
        break;
      default:
        testArray = [];
    }

    performanceComparison(testArray);
  });
}

// 🎯 Edge Case Testing
function runEdgeCaseTests(): void {
  console.log("\n🎯 Edge Case Testing...\n");

  const edgeCases = [
    {
      name: "Minimum Input",
      input: [1],
      description: "Single element array",
    },
    {
      name: "Two Elements Up",
      input: [1, 2],
      description: "Minimum profitable case",
    },
    {
      name: "Two Elements Down",
      input: [2, 1],
      description: "Minimum unprofitable case",
    },
    {
      name: "Maximum Constraints",
      input: Array.from({ length: 10000 }, (_, i) => i % 100),
      description: "Large array with repeating pattern",
    },
    {
      name: "All Zeros",
      input: new Array(100).fill(0),
      description: "All prices are zero",
    },
    {
      name: "Maximum Price Range",
      input: [0, 10000, 0, 10000],
      description: "Maximum possible price differences",
    },
  ];

  edgeCases.forEach(({ name, input, description }) => {
    console.log(`\n🔍 Edge Case: ${name}`);
    console.log(`📋 ${description}`);
    console.log(`📥 Array length: ${input.length}`);
    console.log(
      `📊 Price range: ${Math.min(...input)} - ${Math.max(...input)}`
    );

    try {
      const start = performance.now();
      const result = maxProfit(input);
      const end = performance.now();

      console.log(`✅ Result: ${result}`);
      console.log(`⏱️ Execution time: ${(end - start).toFixed(4)}ms`);

      // Verify non-negative result
      console.log(
        `📏 Profit check: ${result >= 0 ? "✅ Non-negative" : "❌ Negative"}`
      );
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
  });
}

// 🎮 Interactive Demo
function interactiveDemo(): void {
  console.log("\n🎮 Interactive One-Pass Algorithm Demo\n");

  const demo = (prices: number[]): void => {
    console.log(
      `🎯 Demonstrating One-Pass Algorithm with: [${prices.join(", ")}]`
    );

    let minPrice = prices[0]!;
    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;

    console.log(`\n📊 Day-by-day analysis:`);
    console.log(
      `Day 1: Price = ${prices[0]}, MinPrice = ${minPrice}, MaxProfit = ${maxProfit}`
    );

    for (let i = 1; i < prices.length; i++) {
      const currentPrice = prices[i]!;

      if (currentPrice < minPrice) {
        minPrice = currentPrice;
        buyDay = i;
        console.log(
          `Day ${
            i + 1
          }: Price = ${currentPrice}, 📉 New min price found! MinPrice = ${minPrice}, MaxProfit = ${maxProfit}`
        );
      } else {
        const currentProfit = currentPrice - minPrice;
        if (currentProfit > maxProfit) {
          maxProfit = currentProfit;
          sellDay = i;
          console.log(
            `Day ${
              i + 1
            }: Price = ${currentPrice}, 📈 New max profit! Profit = ${currentProfit} (${minPrice}→${currentPrice}), MaxProfit = ${maxProfit}`
          );
        } else {
          console.log(
            `Day ${
              i + 1
            }: Price = ${currentPrice}, Profit = ${currentProfit}, MaxProfit = ${maxProfit} (no change)`
          );
        }
      }
    }

    console.log(`\n🎉 Final Result:`);
    console.log(`💰 Maximum Profit: ${maxProfit}`);
    if (maxProfit > 0) {
      console.log(
        `📅 Best Strategy: Buy on day ${buyDay + 1} (price = ${
          prices[buyDay]
        }) and sell on day ${sellDay + 1} (price = ${prices[sellDay]})`
      );
    } else {
      console.log(`📅 Strategy: Hold cash, no profitable trades available`);
    }
  };

  // Demo with different examples
  const examples = [
    [7, 1, 5, 3, 6, 4],
    [7, 6, 4, 3, 1],
    [1, 2, 3, 4, 5],
    [3, 2, 6, 5, 0, 3],
  ];

  examples.forEach((example, index) => {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`📚 Example ${index + 1}:`);
    demo(example);
  });
}

// 🔍 Algorithm Comparison Demo
function algorithmComparison(): void {
  console.log("\n🔍 Algorithm Comparison Demo\n");

  const testArray = [7, 1, 5, 3, 6, 4];

  console.log(`📋 Test: Find max profit in [${testArray.join(", ")}]\n`);

  const algorithms = [
    { name: "One-Pass", fn: maxProfit },
    { name: "Two-Pointer", fn: maxProfitTwoPointer },
    { name: "Dynamic Programming", fn: maxProfitDP },
    { name: "Kadane's Algorithm", fn: maxProfitKadane },
    { name: "Valley-Peak", fn: maxProfitValleyPeak },
    { name: "Brute Force", fn: maxProfitBruteForce },
  ];

  algorithms.forEach(({ name, fn }) => {
    console.log(`🔧 ${name}:`);

    const start = performance.now();
    const result = fn(testArray);
    const end = performance.now();

    console.log(`   Result: ${result}`);
    console.log(`   Time:   ${(end - start).toFixed(4)}ms\n`);
  });
}

// 💡 Trading Strategy Analysis
function tradingStrategyAnalysis(): void {
  console.log("\n💡 Trading Strategy Analysis\n");

  const analyzeStrategy = (prices: number[], name: string): void => {
    console.log(`📈 Analyzing ${name}:`);
    console.log(`   Prices: [${prices.join(", ")}]`);

    const profit = maxProfit(prices);
    const trend =
      prices[prices.length - 1]! > prices[0]! ? "📈 Bullish" : "📉 Bearish";
    const volatility = Math.max(...prices) - Math.min(...prices);

    console.log(`   Max Profit: ${profit}`);
    console.log(`   Trend: ${trend}`);
    console.log(`   Volatility: ${volatility}`);
    console.log(
      `   ROI: ${
        profit > 0
          ? ((profit / Math.min(...prices)) * 100).toFixed(2) + "%"
          : "0%"
      }`
    );
    console.log("");
  };

  const strategies = [
    { name: "Stable Growth", prices: [100, 105, 110, 115, 120] },
    { name: "High Volatility", prices: [100, 150, 80, 200, 50] },
    { name: "Bear Market", prices: [200, 180, 160, 140, 120] },
    { name: "V-Recovery", prices: [100, 80, 60, 40, 80, 120] },
  ];

  strategies.forEach(({ name, prices }) => analyzeStrategy(prices, name));
}

// 🎯 Main execution
if (require.main === module) {
  console.log("🎯 LeetCode #121 - Best Time to Buy and Sell Stock\n");

  // Run all tests
  runTests();
  runEdgeCaseTests();
  runPerformanceTests();
  interactiveDemo();
  algorithmComparison();
  tradingStrategyAnalysis();

  console.log("\n🎉 All tests completed!");
  console.log("\n💡 Key Insights:");
  console.log("   🥇 One-Pass is optimal: O(n) time, O(1) space");
  console.log("   📊 Track min price and max profit simultaneously");
  console.log("   🔄 Can be viewed as maximum subarray problem");
  console.log("   💰 Real-world application in financial algorithms");
  console.log("   🧮 Multiple algorithmic paradigms applicable");
}

// Export all functions for testing
export {
  algorithmComparison,
  interactiveDemo,
  maxProfit,
  maxProfitBruteForce,
  maxProfitDP,
  maxProfitKadane,
  maxProfitTwoPointer,
  maxProfitValleyPeak,
  performanceComparison,
  runEdgeCaseTests,
  runPerformanceTests,
  runTests,
  tradingStrategyAnalysis,
};
