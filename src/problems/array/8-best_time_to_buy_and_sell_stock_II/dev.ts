/**
 * 🎯 LeetCode #122 - Best Time to Buy and Sell Stock II
 *
 * Problem Statement:
 * You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
 * On each day, you may decide to buy and/or sell the stock. You can only hold at most one share
 * of the stock at any time. However, you can buy it then immediately sell it on the same day.
 * Find and return the maximum profit you can achieve.
 *
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 7
 * Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
 * Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
 * Total profit is 4 + 3 = 7.
 *
 * Example 2:
 * Input: prices = [1,2,3,4,5]
 * Output: 4
 * Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
 * Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging
 * multiple transactions at the same time. You must sell before buying again.
 *
 * Example 3:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: There is no way to make a positive profit, so we never buy the stock to achieve
 * the maximum profit of 0.
 *
 * Constraints:
 * - 1 <= prices.length <= 3 * 10^4
 * - 0 <= prices[i] <= 10^4
 */

// 🌟 Solution 1: Greedy Algorithm - O(n) time, O(1) space (OPTIMAL!)
function maxProfit(prices: number[]): number {
  // Edge case: if less than 2 prices, no profit possible
  if (prices.length < 2) return 0;

  let totalProfit = 0;

  // Iterate through consecutive days
  for (let i = 1; i < prices.length; i++) {
    // If price increased from yesterday, capture the profit
    if (prices[i]! > prices[i - 1]!) {
      totalProfit += prices[i]! - prices[i - 1]!;
    }
  }

  return totalProfit;
}

// 🔄 Solution 2: Two-Pointer Buy-Sell Tracking - O(n) time, O(1) space
function maxProfitBuySell(prices: number[]): number {
  if (prices.length < 2) return 0;

  let totalProfit = 0;
  let buyPrice = prices[0]!;
  let i = 0;

  while (i < prices.length - 1) {
    // Find valley (local minimum) - best buy point
    while (i < prices.length - 1 && prices[i + 1]! <= prices[i]!) {
      i++;
    }
    buyPrice = prices[i]!;

    // Find peak (local maximum) - best sell point
    while (i < prices.length - 1 && prices[i + 1]! >= prices[i]!) {
      i++;
    }

    // Add profit from this buy-sell pair
    totalProfit += prices[i]! - buyPrice;
  }

  return totalProfit;
}

// 📈 Solution 3: Dynamic Programming - O(n) time, O(1) space
function maxProfitDP(prices: number[]): number {
  if (prices.length < 2) return 0;

  // State definitions:
  // hold: maximum profit when holding a stock
  // sold: maximum profit when not holding a stock
  let hold = -prices[0]!; // Buy stock on day 1
  let sold = 0; // Don't hold any stock initially

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i]!;

    // Update sold: max of (keep not holding, sell stock today)
    const newSold = Math.max(sold, hold + currentPrice);

    // Update hold: max of (keep holding, buy stock today)
    // Note: Unlike Stock I, we can buy again after selling (sold - currentPrice)
    const newHold = Math.max(hold, sold - currentPrice);

    sold = newSold;
    hold = newHold;
  }

  return sold; // Return profit when not holding stock
}

// 🔍 Solution 4: Peak-Valley Approach with Explicit Tracking - O(n) time, O(1) space
function maxProfitPeakValley(prices: number[]): number {
  if (prices.length < 2) return 0;

  let totalProfit = 0;
  let valley = prices[0]!;
  let peak = prices[0]!;
  let i = 0;

  while (i < prices.length - 1) {
    // Find valley
    while (i < prices.length - 1 && prices[i + 1]! <= prices[i]!) {
      i++;
    }
    valley = prices[i]!;

    // Find peak
    while (i < prices.length - 1 && prices[i + 1]! >= prices[i]!) {
      i++;
    }
    peak = prices[i]!;

    // Add profit from valley to peak
    totalProfit += peak - valley;
  }

  return totalProfit;
}

// 🎯 Solution 5: Transaction-based Approach - O(n) time, O(n) space
function maxProfitTransactions(prices: number[]): number {
  if (prices.length < 2) return 0;

  const transactions: Array<{ buy: number; sell: number; profit: number }> = [];
  let i = 0;

  while (i < prices.length - 1) {
    // Skip decreasing prices (find valley)
    while (i < prices.length - 1 && prices[i + 1]! <= prices[i]!) {
      i++;
    }

    if (i === prices.length - 1) break;

    const buyDay = i;
    const buyPrice = prices[i]!;

    // Find peak
    while (i < prices.length - 1 && prices[i + 1]! >= prices[i]!) {
      i++;
    }

    const sellDay = i;
    const sellPrice = prices[i]!;
    const profit = sellPrice - buyPrice;

    if (profit > 0) {
      transactions.push({
        buy: buyDay,
        sell: sellDay,
        profit: profit,
      });
    }
  }

  return transactions.reduce(
    (total, transaction) => total + transaction.profit,
    0
  );
}

// 🌀 Solution 6: Recursive with Memoization - O(n) time, O(n) space
function maxProfitRecursive(prices: number[]): number {
  if (prices.length < 2) return 0;

  const memo = new Map<string, number>();

  function helper(day: number, holding: boolean): number {
    // Base case: no more days
    if (day >= prices.length) return 0;

    // Check memoization
    const key = `${day}-${holding}`;
    if (memo.has(key)) return memo.get(key)!;

    let result: number;

    if (holding) {
      // Currently holding stock: can sell or hold
      const sellProfit = prices[day]! + helper(day + 1, false);
      const holdProfit = helper(day + 1, true);
      result = Math.max(sellProfit, holdProfit);
    } else {
      // Not holding stock: can buy or skip
      const buyProfit = -prices[day]! + helper(day + 1, true);
      const skipProfit = helper(day + 1, false);
      result = Math.max(buyProfit, skipProfit);
    }

    memo.set(key, result);
    return result;
  }

  return helper(0, false);
}

// 📊 Performance Comparison Function
function performanceComparison(prices: number[]): void {
  console.log(`🎯 Testing Best Time to Buy and Sell Stock II algorithms`);
  console.log(`Array length: ${prices.length}`);
  console.log(
    `Prices preview: [${prices.slice(0, 10).join(", ")}${
      prices.length > 10 ? "..." : ""
    }]`
  );

  const algorithms = [
    {
      name: "Greedy Algorithm",
      fn: maxProfit,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Buy-Sell Tracking",
      fn: maxProfitBuySell,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Dynamic Programming",
      fn: maxProfitDP,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Peak-Valley",
      fn: maxProfitPeakValley,
      complexity: "O(n) time, O(1) space",
    },
    {
      name: "Transaction-based",
      fn: maxProfitTransactions,
      complexity: "O(n) time, O(n) space",
    },
  ];

  // Skip recursive for large arrays to avoid timeout
  if (prices.length <= 1000) {
    algorithms.push({
      name: "Recursive + Memo",
      fn: maxProfitRecursive,
      complexity: "O(n) time, O(n) space",
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
  console.log("🧪 Running Best Time to Buy and Sell Stock II Tests...\n");

  const testCases = [
    {
      name: "Basic Case 1",
      input: [7, 1, 5, 3, 6, 4],
      expected: 7,
      description: "Multiple transactions: (1→5) + (3→6) = 4 + 3 = 7",
    },
    {
      name: "Basic Case 2",
      input: [1, 2, 3, 4, 5],
      expected: 4,
      description: "Increasing trend: buy at 1, sell at 5, profit = 4",
    },
    {
      name: "Basic Case 3",
      input: [7, 6, 4, 3, 1],
      expected: 0,
      description: "Decreasing trend: no profitable transactions",
    },
    {
      name: "Single Day",
      input: [5],
      expected: 0,
      description: "Only one day, cannot buy and sell",
    },
    {
      name: "Two Days Up",
      input: [1, 5],
      expected: 4,
      description: "Buy day 1, sell day 2, profit = 4",
    },
    {
      name: "Two Days Down",
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
      name: "Zigzag Pattern",
      input: [1, 4, 2, 5, 3, 6],
      expected: 9,
      description: "Multiple ups: (1→4) + (2→5) + (3→6) = 3 + 3 + 3 = 9",
    },
    {
      name: "V-Pattern Recovery",
      input: [5, 2, 3, 2, 6, 6, 2, 9, 1, 5],
      expected: 11,
      description: "Complex pattern with multiple opportunities",
    },
    {
      name: "Flat with Spikes",
      input: [2, 1, 2, 0, 1],
      expected: 2,
      description: "Small profits: (1→2) + (0→1) = 1 + 1 = 2",
    },
    {
      name: "Large Numbers",
      input: [1000, 2000, 1500, 3000],
      expected: 2500,
      description:
        "Large values: (1000→2000) + (1500→3000) = 1000 + 1500 = 2500",
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

    // Show detailed calculation for failed tests
    if (!passed) {
      console.log(`🔍 Detailed calculation needed for: [${input.join(", ")}]`);
    }
  });
}

// 🚀 Performance Tests
function runPerformanceTests(): void {
  console.log("\n🚀 Performance Testing...\n");

  // Test with different array sizes and patterns
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
      input: Array.from({ length: 30000 }, (_, i) => (i % 100) + 1),
      description: "Large array with repeating pattern",
    },
    {
      name: "All Zeros",
      input: new Array(100).fill(0),
      description: "All prices are zero",
    },
    {
      name: "Maximum Price Range",
      input: [0, 10000, 0, 10000, 0],
      description:
        "Maximum possible price differences with multiple transactions",
    },
    {
      name: "Alternating Pattern",
      input: Array.from({ length: 1000 }, (_, i) => i % 2),
      description: "Alternating 0,1,0,1... pattern",
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
  console.log("\n🎮 Interactive Greedy Algorithm Demo\n");

  const demo = (prices: number[]): void => {
    console.log(
      `🎯 Demonstrating Greedy Algorithm with: [${prices.join(", ")}]`
    );

    let totalProfit = 0;
    const transactions: Array<{
      day: number;
      action: string;
      price: number;
      profit: number;
    }> = [];

    console.log(`\n📊 Day-by-day analysis:`);

    for (let i = 1; i < prices.length; i++) {
      const yesterday = prices[i - 1]!;
      const today = prices[i]!;
      const dailyProfit = Math.max(0, today - yesterday);

      if (today > yesterday) {
        totalProfit += dailyProfit;
        transactions.push({
          day: i + 1,
          action: `Buy day ${i}, Sell day ${i + 1}`,
          price: today,
          profit: dailyProfit,
        });
        console.log(
          `Day ${
            i + 1
          }: Price = ${today}, 📈 Profit opportunity! Buy at ${yesterday}, sell at ${today} = +${dailyProfit}`
        );
      } else {
        console.log(
          `Day ${
            i + 1
          }: Price = ${today}, 📉 No profit (${yesterday} → ${today})`
        );
      }
    }

    console.log(`\n🎉 Final Result:`);
    console.log(`💰 Total Profit: ${totalProfit}`);
    console.log(`🔢 Number of Transactions: ${transactions.length}`);

    if (transactions.length > 0) {
      console.log(`📋 Transaction Details:`);
      transactions.forEach((tx, idx) => {
        console.log(`  ${idx + 1}. ${tx.action} → Profit: ${tx.profit}`);
      });
    } else {
      console.log(`📅 Strategy: Hold cash, no profitable opportunities`);
    }
  };

  // Demo with different examples
  const examples = [
    [7, 1, 5, 3, 6, 4],
    [1, 2, 3, 4, 5],
    [7, 6, 4, 3, 1],
    [1, 4, 2, 5, 3, 6],
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
    { name: "Greedy Algorithm", fn: maxProfit },
    { name: "Buy-Sell Tracking", fn: maxProfitBuySell },
    { name: "Dynamic Programming", fn: maxProfitDP },
    { name: "Peak-Valley", fn: maxProfitPeakValley },
    { name: "Transaction-based", fn: maxProfitTransactions },
    { name: "Recursive + Memo", fn: maxProfitRecursive },
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
  console.log("\n💡 Advanced Trading Strategy Analysis\n");

  const analyzeStrategy = (prices: number[], name: string): void => {
    console.log(`📈 Analyzing ${name}:`);
    console.log(`   Prices: [${prices.join(", ")}]`);

    const profit = maxProfit(prices);
    const transactions = maxProfitTransactions(prices);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const volatility = maxPrice - minPrice;

    console.log(`   Max Profit: ${profit}`);
    console.log(`   Number of Transactions: ${transactions}`);
    console.log(`   Volatility: ${volatility}`);
    console.log(
      `   Avg Profit per Transaction: ${
        transactions > 0 ? (profit / transactions).toFixed(2) : "N/A"
      }`
    );
    console.log(
      `   ROI vs Buy-Hold: ${profit} vs ${maxPrice - minPrice} = ${
        profit >= maxPrice - minPrice ? "Better" : "Worse"
      }`
    );
    console.log("");
  };

  const strategies = [
    { name: "Steady Growth", prices: [100, 105, 110, 115, 120, 125] },
    { name: "High Volatility", prices: [100, 150, 80, 200, 50, 180] },
    { name: "Bear Market", prices: [200, 180, 160, 140, 120, 100] },
    { name: "Sideways Market", prices: [100, 105, 95, 102, 98, 101] },
    { name: "Bubble Pattern", prices: [50, 100, 200, 300, 150, 75] },
  ];

  strategies.forEach(({ name, prices }) => analyzeStrategy(prices, name));
}

// 🎯 Main execution
if (require.main === module) {
  console.log("🎯 LeetCode #122 - Best Time to Buy and Sell Stock II\n");

  // Run all tests
  runTests();
  runEdgeCaseTests();
  runPerformanceTests();
  interactiveDemo();
  algorithmComparison();
  tradingStrategyAnalysis();

  console.log("\n🎉 All tests completed!");
  console.log("\n💡 Key Insights:");
  console.log("   🥇 Greedy Algorithm is optimal: O(n) time, O(1) space");
  console.log("   📈 Capture every positive price difference");
  console.log("   🔄 Multiple transactions allowed vs Stock I");
  console.log("   💰 Real-world: frequent trading strategy");
  console.log("   🧮 Equivalent to sum of all positive daily returns");
}

// Export all functions for testing
export {
  algorithmComparison,
  interactiveDemo,
  maxProfit,
  maxProfitBuySell,
  maxProfitDP,
  maxProfitPeakValley,
  maxProfitRecursive,
  maxProfitTransactions,
  performanceComparison,
  runEdgeCaseTests,
  runPerformanceTests,
  runTests,
  tradingStrategyAnalysis,
};
