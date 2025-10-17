# 📈 Best Time to Buy and Sell Stock II - LeetCode #122

> **Mastering Multiple Transaction Stock Trading with Greedy Algorithm**
>
> _Dari single transaction ke unlimited transactions - Evolution of algorithmic trading_

## 🎯 Problem Overview

### Problem Statement

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one share** of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return **the maximum profit** you can achieve.

### Key Constraints

- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`
- **Unlimited transactions allowed**
- Must sell before buying again (can't hold multiple shares)
- Can buy and sell on the same day

### Examples

```typescript
// Example 1: Multiple profitable transactions
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation:
- Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 4
- Buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 3
- Total profit: 4 + 3 = 7

// Example 2: Continuous increasing trend
Input: prices = [1,2,3,4,5]
Output: 4
Explanation:
- Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 4
- Or equivalently: (1→2) + (2→3) + (3→4) + (4→5) = 1+1+1+1 = 4

// Example 3: No profitable opportunities
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: Prices only decrease, no profit possible
```

## 🧠 Core Insight: The Greedy Revelation

### 💡 The Key Breakthrough

**Stock II differs fundamentally from Stock I**: Instead of finding the optimal single transaction, we can capture **EVERY positive price movement**.

```typescript
// Stock I (Single Transaction): Find best buy-sell pair
maxProfit = max(sell_price - buy_price)

// Stock II (Multiple Transactions): Sum all positive moves
maxProfit = sum(all positive daily changes)
```

### 🎭 The Greedy Strategy

**Core Principle**: _"Capture every upward movement, ignore every downward movement"_

```
Prices: [1, 4, 2, 5, 3, 6]
         ↑  ↑  ↓  ↑  ↓  ↑
Moves:    +3    -2  +3  -2  +3
Capture:  ✓     ✗   ✓   ✗   ✓
Profit:   3  +  0 +  3 +  0 + 3 = 9
```

## 🔧 Algorithm Implementations

### 🌟 Approach 1: Greedy Algorithm (Optimal)

_The most elegant and efficient solution_

```typescript
/**
 * Greedy Algorithm - Capture all positive price movements
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(1) - Only using profit variable
 *
 * Core Logic: If today's price > yesterday's price, add difference to profit
 */
function maxProfit(prices: number[]): number {
  if (prices.length < 2) return 0;

  let profit = 0;

  // Check each consecutive pair of days
  for (let i = 1; i < prices.length; i++) {
    // If price increased, capture the profit
    if (prices[i]! > prices[i - 1]!) {
      profit += prices[i]! - prices[i - 1]!;
    }
    // If price decreased or stayed same, do nothing (greedy choice)
  }

  return profit;
}
```

**Why This Works:**

- **Mathematical Proof**: Any sequence of transactions can be decomposed into individual daily gains
- **Greedy Property**: Taking every positive move is always optimal
- **No Loss**: We never capture negative movements, ensuring maximum profit

### 🎯 Approach 2: Buy-Sell State Tracking

_Explicit transaction modeling with state management_

```typescript
/**
 * Buy-Sell Tracking - Explicit transaction state management
 * Time: O(n), Space: O(1)
 *
 * Models actual buying and selling decisions with state variables
 */
function maxProfitBuySell(prices: number[]): number {
  if (prices.length < 2) return 0;

  let profit = 0;
  let buyPrice = prices[0]!;
  let i = 0;

  while (i < prices.length - 1) {
    // Find local minimum (valley) - best buy point
    while (i < prices.length - 1 && prices[i + 1]! <= prices[i]!) {
      i++;
    }
    buyPrice = prices[i]!;

    // Find local maximum (peak) - best sell point
    while (i < prices.length - 1 && prices[i + 1]! > prices[i]!) {
      i++;
    }

    // Complete the transaction
    profit += prices[i]! - buyPrice;
  }

  return profit;
}
```

### 📊 Approach 3: Dynamic Programming

_State-based optimization with explicit buy/sell states_

```typescript
/**
 * Dynamic Programming - State transition optimization
 * Time: O(n), Space: O(1) - optimized space
 *
 * Models two states: holding stock vs not holding stock
 */
function maxProfitDP(prices: number[]): number {
  if (prices.length < 2) return 0;

  // State variables
  let buy = -prices[0]!; // Max profit when holding stock
  let sell = 0; // Max profit when not holding stock

  for (let i = 1; i < prices.length; i++) {
    const newBuy = Math.max(buy, sell - prices[i]!);
    const newSell = Math.max(sell, buy + prices[i]!);

    buy = newBuy;
    sell = newSell;
  }

  return sell; // End with no stock for maximum profit
}
```

### ⛰️ Approach 4: Peak-Valley Strategy

_Geometric approach identifying market turning points_

```typescript
/**
 * Peak-Valley Algorithm - Geometric market analysis
 * Time: O(n), Space: O(1)
 *
 * Identifies market peaks and valleys for optimal transaction timing
 */
function maxProfitPeakValley(prices: number[]): number {
  if (prices.length < 2) return 0;

  let profit = 0;
  let valley = prices[0]!;
  let peak = prices[0]!;
  let i = 0;

  while (i < prices.length - 1) {
    // Find valley (local minimum)
    while (i < prices.length - 1 && prices[i]! >= prices[i + 1]!) {
      i++;
    }
    valley = prices[i]!;

    // Find peak (local maximum)
    while (i < prices.length - 1 && prices[i]! <= prices[i + 1]!) {
      i++;
    }
    peak = prices[i]!;

    // Add profit from valley to peak
    profit += peak - valley;
  }

  return profit;
}
```

### 💼 Approach 5: Transaction-Based Tracking

_Explicit transaction logging and analysis_

```typescript
/**
 * Transaction-based Approach - Detailed transaction tracking
 * Time: O(n), Space: O(n) - stores all transactions
 *
 * Maintains detailed log of all transactions for analysis
 */
function maxProfitTransactions(prices: number[]): number {
  if (prices.length < 2) return 0;

  const transactions: Array<{ buy: number; sell: number; profit: number }> = [];
  let i = 0;

  while (i < prices.length - 1) {
    // Find buy point (start of upward trend)
    while (i < prices.length - 1 && prices[i + 1]! <= prices[i]!) {
      i++;
    }
    const buyPrice = prices[i]!;

    // Find sell point (end of upward trend)
    while (i < prices.length - 1 && prices[i + 1]! > prices[i]!) {
      i++;
    }
    const sellPrice = prices[i]!;

    // Record transaction
    if (sellPrice > buyPrice) {
      transactions.push({
        buy: buyPrice,
        sell: sellPrice,
        profit: sellPrice - buyPrice,
      });
    }
  }

  // Calculate total profit
  return transactions.reduce((total, t) => total + t.profit, 0);
}
```

### 🔄 Approach 6: Recursive with Memoization

_Top-down recursive approach with caching_

```typescript
/**
 * Recursive with Memoization - Top-down dynamic programming
 * Time: O(n), Space: O(n) - memoization cache
 *
 * Recursive decision making with state caching for optimization
 */
function maxProfitRecursive(prices: number[]): number {
  if (prices.length < 2) return 0;

  // Memoization cache: [day][holding] -> max profit
  const memo = new Map<string, number>();

  function solve(day: number, holding: boolean): number {
    // Base case: no more days
    if (day >= prices.length) return 0;

    // Check memoization cache
    const key = `${day}-${holding}`;
    if (memo.has(key)) return memo.get(key)!;

    let result;
    if (holding) {
      // If holding stock: sell today or keep holding
      result = Math.max(
        prices[day]! + solve(day + 1, false), // Sell today
        solve(day + 1, true) // Keep holding
      );
    } else {
      // If not holding: buy today or stay without stock
      result = Math.max(
        -prices[day]! + solve(day + 1, true), // Buy today
        solve(day + 1, false) // Stay without stock
      );
    }

    memo.set(key, result);
    return result;
  }

  return solve(0, false); // Start with no stock
}
```

## 📈 Algorithm Comparison & Analysis

### 🏆 Performance Comparison

| Algorithm           | Time | Space | Readability | Use Case                      |
| ------------------- | ---- | ----- | ----------- | ----------------------------- |
| **Greedy**          | O(n) | O(1)  | ⭐⭐⭐⭐⭐  | **Production - Optimal**      |
| Buy-Sell Tracking   | O(n) | O(1)  | ⭐⭐⭐⭐    | Educational - Clear Logic     |
| Dynamic Programming | O(n) | O(1)  | ⭐⭐⭐      | Interview - Shows DP Skills   |
| Peak-Valley         | O(n) | O(1)  | ⭐⭐⭐      | Analysis - Market Insights    |
| Transaction-Based   | O(n) | O(n)  | ⭐⭐⭐⭐    | Reporting - Detailed Logs     |
| Recursive + Memo    | O(n) | O(n)  | ⭐⭐        | Learning - Recursive Thinking |

### 🎯 When to Use Each Approach

1. **Production Code**: **Greedy Algorithm** - Optimal performance, clean code
2. **Technical Interviews**: **Dynamic Programming** - Shows algorithmic thinking
3. **Financial Analysis**: **Peak-Valley** - Provides market insights
4. **Educational Purposes**: **Buy-Sell Tracking** - Most intuitive logic
5. **Detailed Reporting**: **Transaction-Based** - Complete transaction history
6. **Learning Recursion**: **Recursive + Memo** - Understanding state transitions

## 💰 Real-World Trading Applications

### 🎭 Market Scenario Analysis

#### 📊 Bull Market Strategy

```typescript
// Continuous upward trend
const bullMarket = [100, 110, 120, 130, 140, 150];
// Strategy: Hold throughout the trend
// Greedy captures: 10+10+10+10+10 = 50
// Equivalent to buying at 100, selling at 150
```

#### 🐻 Bear Market Strategy

```typescript
// Continuous downward trend
const bearMarket = [150, 140, 130, 120, 110, 100];
// Strategy: Stay in cash, no transactions
// Greedy captures: 0 (no positive movements)
```

#### 🌪️ Volatile Market Strategy

```typescript
// High volatility with multiple opportunities
const volatileMarket = [100, 150, 80, 200, 60, 180];
// Strategy: Multiple quick trades
// Greedy captures: 50 + 0 + 120 + 0 + 120 = 290
// Transactions: (100→150), (80→200), (60→180)
```

#### 📈 Sideways Market Strategy

```typescript
// Trading range with small opportunities
const sidewaysMarket = [100, 105, 95, 102, 98, 101];
// Strategy: Capture small moves
// Greedy captures: 5 + 0 + 7 + 0 + 3 = 15
// Multiple small profitable trades
```

### 🎯 Trading Rules & Constraints

1. **Single Share Limitation**: Can only hold one share at a time
2. **Same-Day Trading**: Buy and sell on same day allowed
3. **Transaction Ordering**: Must sell before buying again
4. **Zero Commission**: No transaction fees (simplified model)
5. **Perfect Information**: All future prices known (theoretical optimal)

### 🏦 Practical Trading Insights

#### ✅ **Advantages of Multiple Transactions:**

- **Compound Growth**: Reinvest profits immediately
- **Risk Reduction**: Don't need to time single perfect trade
- **Flexibility**: Adapt to changing market conditions
- **Opportunity Maximization**: Capture all profitable moves

#### ⚠️ **Real-World Considerations:**

- **Transaction Costs**: Fees reduce profit from frequent trading
- **Tax Implications**: Short-term vs long-term capital gains
- **Market Impact**: Large trades affect prices
- **Slippage**: Execution price differs from expected price
- **Information Delay**: Real markets don't provide future prices

## 🎓 Educational Deep Dive

### 🧩 Mathematical Foundation

#### **Proof of Greedy Optimality:**

**Theorem**: _The greedy algorithm (capturing all positive moves) yields optimal profit for unlimited transactions._

**Proof by Contradiction:**

1. Assume optimal solution O uses different transaction set than greedy G
2. Any transaction (buy_i, sell_j) in O can be decomposed into daily moves
3. Each daily move is either positive (captured by G) or negative (ignored by G)
4. Therefore: profit(O) ≤ sum of positive moves = profit(G)
5. Since G achieves this upper bound, G is optimal ∎

#### **Complexity Analysis:**

```typescript
// Time Complexity: O(n)
for (let i = 1; i < prices.length; i++) {
  // n-1 iterations
  if (prices[i] > prices[i - 1]) {
    // O(1) comparison
    profit += prices[i] - prices[i - 1]; // O(1) arithmetic
  }
}
// Total: O(n) time

// Space Complexity: O(1)
// Only uses profit variable, independent of input size
```

### 🎯 Problem Evolution: Stock I → Stock II

| Aspect           | **Stock I (Single)**  | **Stock II (Multiple)**  |
| ---------------- | --------------------- | ------------------------ |
| **Transactions** | Exactly 1             | Unlimited                |
| **Strategy**     | Find global optimum   | Capture all local optima |
| **Algorithm**    | Two-pointer, DP       | Greedy algorithm         |
| **Complexity**   | O(n) time, O(1) space | O(n) time, O(1) space    |
| **Difficulty**   | Find best single pair | Sum all positive moves   |

#### **Example Comparison:**

```typescript
const prices = [7, 1, 5, 3, 6, 4];

// Stock I (Single transaction):
// Best single trade: buy at 1, sell at 6
// Profit = 6 - 1 = 5

// Stock II (Multiple transactions):
// Trade 1: buy at 1, sell at 5 → profit = 4
// Trade 2: buy at 3, sell at 6 → profit = 3
// Total profit = 4 + 3 = 7 (better than Stock I!)
```

### 🎮 Interactive Examples

#### **Example 1: Zigzag Pattern**

```
Day:    1  2  3  4  5  6
Price:  1  4  2  5  3  6
Move:     +3 -2 +3 -2 +3
Action:   ↗  ✗  ↗  ✗  ↗

Transactions:
- Buy day 1 (1), sell day 2 (4) → profit = 3
- Buy day 3 (2), sell day 4 (5) → profit = 3
- Buy day 5 (3), sell day 6 (6) → profit = 3
Total profit = 9
```

#### **Example 2: Plateau Pattern**

```
Day:    1  2  3  4  5  6
Price:  1  1  3  3  5  5
Move:     0  +2 0  +2 0
Action:   ✗  ↗  ✗  ↗  ✗

Transactions:
- Buy day 2 (1), sell day 3 (3) → profit = 2
- Buy day 4 (3), sell day 5 (5) → profit = 2
Total profit = 4
```

## 🚀 Advanced Optimizations

### ⚡ Performance Enhancements

#### **1. Early Termination**

```typescript
function maxProfitOptimized(prices: number[]): number {
  if (prices.length < 2) return 0;

  let profit = 0;
  let hasProfit = false;

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i]! - prices[i - 1]!;
    if (diff > 0) {
      profit += diff;
      hasProfit = true;
    }
  }

  return hasProfit ? profit : 0; // Early return for no-profit scenarios
}
```

#### **2. Vectorized Processing** (for large datasets)

```typescript
function maxProfitVectorized(prices: number[]): number {
  if (prices.length < 2) return 0;

  // Calculate all daily changes
  const changes = prices.slice(1).map((price, i) => price - prices[i]!);

  // Sum only positive changes using reduce
  return changes.reduce(
    (profit, change) => profit + (change > 0 ? change : 0),
    0
  );
}
```

### 🧮 Memory Optimization for Streaming Data

```typescript
/**
 * Streaming Algorithm - Process prices one at a time
 * Useful for real-time trading systems with continuous price feeds
 */
class StreamingMaxProfit {
  private profit = 0;
  private lastPrice?: number;

  addPrice(price: number): number {
    if (this.lastPrice !== undefined) {
      const change = price - this.lastPrice;
      if (change > 0) {
        this.profit += change;
      }
    }
    this.lastPrice = price;
    return this.profit;
  }

  getTotalProfit(): number {
    return this.profit;
  }

  reset(): void {
    this.profit = 0;
    this.lastPrice = undefined;
  }
}
```

## 🎯 Interview Preparation Guide

### 📝 Common Interview Questions

#### **Q1: Why is greedy optimal for Stock II but not Stock I?**

**A**: Stock I requires finding the single best transaction globally, which needs considering all possibilities. Stock II allows unlimited transactions, so we can greedily capture every positive move without worrying about missing better future opportunities.

#### **Q2: How would transaction fees affect the algorithm?**

**A**: With transaction fees, we'd need to modify the condition:

```typescript
// With fee per transaction
if (prices[i] - prices[i - 1] > fee) {
  profit += prices[i] - prices[i - 1] - fee;
}
```

#### **Q3: What if we could hold multiple shares?**

**A**: The problem becomes more complex, requiring dynamic programming with state tracking for number of shares held.

#### **Q4: How does this relate to other stock problems?**

**A**:

- **Stock I**: Single transaction → Two-pointer approach
- **Stock II**: Unlimited transactions → Greedy approach
- **Stock III**: At most 2 transactions → DP with transaction limits
- **Stock IV**: At most k transactions → Generalized DP

### 🎭 Code Review Scenarios

#### **Scenario 1: Performance Critical System**

```typescript
// Optimized for high-frequency trading
function maxProfitHFT(prices: Float32Array): number {
  if (prices.length < 2) return 0;

  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i]! - prices[i - 1]!;
    profit += diff > 0 ? diff : 0; // Branchless for CPU optimization
  }
  return profit;
}
```

#### **Scenario 2: Debugging & Logging**

```typescript
function maxProfitWithLogging(prices: number[]): number {
  console.log(`Processing ${prices.length} price points`);

  let profit = 0;
  const transactions: string[] = [];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i]! - prices[i - 1]!;
    if (change > 0) {
      profit += change;
      transactions.push(
        `Day ${i}: Buy at ${prices[i - 1]}, sell at ${
          prices[i]
        }, profit: ${change}`
      );
    }
  }

  console.log(`Transactions executed: ${transactions.length}`);
  transactions.forEach((t) => console.log(t));
  console.log(`Total profit: ${profit}`);

  return profit;
}
```

## 🎉 Conclusion

### 🌟 Key Takeaways

1. **Greedy Strategy**: Stock II's unlimited transactions make greedy optimal
2. **Mathematical Elegance**: Sum of positive moves = optimal profit
3. **Multiple Approaches**: 6+ different algorithms, same optimal result
4. **Real-World Relevance**: Models algorithmic trading strategies
5. **Interview Favorite**: Tests greedy algorithm understanding

### 🚀 Next Steps

1. **Practice Variations**: Try Stock III (k=2) and Stock IV (k transactions)
2. **Add Constraints**: Implement with transaction fees or cooldown periods
3. **Real Data**: Test algorithms on actual historical stock prices
4. **Optimization**: Explore SIMD optimizations for large datasets
5. **Extensions**: Consider multi-asset portfolio optimization

### 💡 Final Wisdom

_"In trading as in algorithms, sometimes the simplest strategy - capturing every opportunity as it comes - yields the best results. The greedy algorithm teaches us that optimal solutions can emerge from locally optimal decisions when the problem structure allows it."_

---

**Related Problems**:

- [Best Time to Buy and Sell Stock](../7-best_time_to_buy_and_sell_stock) (LeetCode #121)
- [Best Time to Buy and Sell Stock III](../../../dynamic-programming/best_time_to_buy_and_sell_stock_III) (LeetCode #123)
- [Best Time to Buy and Sell Stock IV](../../../dynamic-programming/best_time_to_buy_and_sell_stock_IV) (LeetCode #188)

**Tags**: `Array` `Greedy` `Dynamic Programming` `Trading` `Financial Mathematics`
