# 🎯 LeetCode #121: Best Time to Buy and Sell Stock - Panduan Lengkap

## 📋 Deskripsi Problem

Diberikan array `prices` dimana `prices[i]` adalah harga saham pada hari ke-i. Anda ingin memaksimalkan profit dengan memilih satu hari untuk membeli saham dan memilih hari lain di masa depan untuk menjual saham tersebut.

Kembalikan profit maksimum yang dapat dicapai dari transaksi ini. Jika tidak bisa mendapat profit, kembalikan 0.

### 🎯 Contoh Input/Output

**Contoh 1:**

```
Input: prices = [7,1,5,3,6,4]
Output: 5

Penjelasan:
- Beli pada hari 2 (harga = 1) dan jual pada hari 5 (harga = 6)
- Profit = 6-1 = 5
- Catatan: Membeli pada hari 2 dan menjual pada hari 1 tidak diperbolehkan
  karena harus membeli sebelum menjual.
```

**Contoh 2:**

```
Input: prices = [7,6,4,3,1]
Output: 0

Penjelasan:
- Harga terus menurun, tidak ada transaksi yang menguntungkan
- Profit maksimum = 0
```

### 🔧 Constraints

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

---

## 🧠 Konsep dan Intuisi

### 🎭 Analogi Sederhana

Bayangkan Anda adalah seorang trader saham yang memiliki mesin waktu untuk melihat harga saham di masa depan, tetapi hanya boleh melakukan satu kali transaksi (beli sekali, jual sekali). Anda akan mencari:

1. **Hari termurah** untuk membeli
2. **Hari termahal setelah hari beli** untuk menjual

### 🔍 Insight Kunci

1. **Single Transaction:** Hanya boleh beli sekali dan jual sekali
2. **Chronological Order:** Harus beli dulu baru bisa jual
3. **Greedy Approach:** Selalu cari harga beli minimum dan profit maksimum
4. **Dynamic Optimization:** Track minimum price dan maximum profit secara bersamaan

---

## 🌟 Solusi Optimal: One-Pass Algorithm

### 💡 Ide Utama

Algoritma ini menggunakan pendekatan greedy dengan tracking dua variabel penting:

1. **minPrice:** Harga minimum yang pernah ditemui
2. **maxProfit:** Profit maksimum yang bisa dicapai

### 🎯 Cara Kerja

```
Untuk setiap hari:
1. Jika harga hari ini < harga minimum sebelumnya:
   → Update harga minimum
2. Jika tidak:
   → Hitung profit jika jual hari ini
   → Update profit maksimum jika lebih baik
```

### 💻 Implementasi

```typescript
function maxProfit(prices: number[]): number {
  if (prices.length < 2) return 0;

  let minPrice = prices[0]; // Track harga minimum
  let maxProfit = 0; // Track profit maksimum

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];

    if (currentPrice < minPrice) {
      // Found new minimum price
      minPrice = currentPrice;
    } else {
      // Calculate profit if we sell today
      const currentProfit = currentPrice - minPrice;
      maxProfit = Math.max(maxProfit, currentProfit);
    }
  }

  return maxProfit;
}
```

### 🎭 Step-by-step Example

Mari lihat contoh `[7,1,5,3,6,4]`:

```
Day 1: Price=7, MinPrice=7, MaxProfit=0
Day 2: Price=1 < 7 → MinPrice=1, MaxProfit=0
Day 3: Price=5 > 1 → Profit=4, MaxProfit=4
Day 4: Price=3 > 1 → Profit=2, MaxProfit=4
Day 5: Price=6 > 1 → Profit=5, MaxProfit=5 ✨
Day 6: Price=4 > 1 → Profit=3, MaxProfit=5

Result: MaxProfit = 5 (Buy at 1, Sell at 6)
```

### ⚡ Kompleksitas

- **Time:** O(n) - Satu kali scan array
- **Space:** O(1) - Hanya menggunakan dua variabel

---

## 🔄 Pendekatan Alternatif

### 1. 🔄 Two-Pointer Approach

**Ide:** Gunakan dua pointer untuk tracking buy dan sell positions.

```typescript
function maxProfitTwoPointer(prices: number[]): number {
  if (prices.length < 2) return 0;

  let left = 0; // Buy pointer
  let right = 1; // Sell pointer
  let maxProfit = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      // Can make profit
      const profit = prices[right] - prices[left];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      // Move buy pointer to lower price
      left = right;
    }
    right++;
  }

  return maxProfit;
}
```

**Kompleksitas:** O(n) time, O(1) space
**Keunggulan:** Intuitive sliding window approach

### 2. 📈 Dynamic Programming Approach

**Ide:** Model sebagai state machine dengan dua state: hold stock atau not hold.

```typescript
function maxProfitDP(prices: number[]): number {
  if (prices.length < 2) return 0;

  let hold = -prices[0]; // Max profit when holding stock
  let sold = 0; // Max profit when not holding stock

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];

    // Update sold: max of (keep not holding, sell stock today)
    const newSold = Math.max(sold, hold + price);

    // Update hold: max of (keep holding, buy stock today)
    const newHold = Math.max(hold, -price);

    sold = newSold;
    hold = newHold;
  }

  return sold; // Return profit when not holding stock
}
```

**Kompleksitas:** O(n) time, O(1) space
**Keunggulan:** Extensible untuk multiple transactions

### 3. 🔍 Kadane's Algorithm Variation

**Ide:** Transform ke maximum subarray problem.

```typescript
function maxProfitKadane(prices: number[]): number {
  if (prices.length < 2) return 0;

  let maxEndingHere = 0;
  let maxSoFar = 0;

  // Convert to daily profit differences
  for (let i = 1; i < prices.length; i++) {
    const profitDiff = prices[i] - prices[i - 1];

    maxEndingHere = Math.max(profitDiff, maxEndingHere + profitDiff);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}
```

**Kompleksitas:** O(n) time, O(1) space
**Keunggulan:** Shows connection to classic algorithmic problems

### 4. 💭 Brute Force Approach

**Ide:** Try semua kemungkinan buy-sell combinations.

```typescript
function maxProfitBruteForce(prices: number[]): number {
  if (prices.length < 2) return 0;

  let maxProfit = 0;

  // Try every possible buy day
  for (let i = 0; i < prices.length - 1; i++) {
    // Try every possible sell day after buy day
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
```

**Kompleksitas:** O(n²) time, O(1) space
**Keunggulan:** Most intuitive, easy to understand

---

## 📊 Perbandingan Algoritma

| Algoritma               | Time Complexity | Space Complexity | Kesulitan | Best Use Case             |
| ----------------------- | --------------- | ---------------- | --------- | ------------------------- |
| **One-Pass**            | O(n)            | O(1)             | ⭐⭐⭐    | **Production (Optimal)**  |
| **Two-Pointer**         | O(n)            | O(1)             | ⭐⭐⭐    | **Interview (Intuitive)** |
| **Dynamic Programming** | O(n)            | O(1)             | ⭐⭐⭐⭐  | **Extensible Design**     |
| **Kadane's Variation**  | O(n)            | O(1)             | ⭐⭐⭐⭐  | **Academic Interest**     |
| **Brute Force**         | O(n²)           | O(1)             | ⭐        | **Learning/Small Input**  |

---

## 🎯 Tips & Tricks Interview

### 🔥 Pertanyaan Follow-up Umum

1. **"Bagaimana jika boleh multiple transactions?"**

   - Extend DP approach dengan transaction counter
   - Become LeetCode #122 or #123

2. **"Bagaimana jika ada transaction fee?"**

   - Subtract fee dari setiap profit calculation
   - Modify DP state transitions

3. **"Bagaimana jika ada cooldown period?"**

   - Add cooldown state ke DP
   - Become LeetCode #309

4. **"Space complexity bisa lebih kecil?"**
   - Sudah optimal O(1) untuk single transaction
   - Jelaskan trade-off untuk multiple transactions

### 💡 Insight untuk Interview

```typescript
// Pattern: Track minimum so far and maximum profit
let minSoFar = prices[0];
let maxProfit = 0;

// Pattern: Update either minimum or profit, never both
if (currentPrice < minSoFar) {
  minSoFar = currentPrice;
} else {
  maxProfit = Math.max(maxProfit, currentPrice - minSoFar);
}
```

### 🎭 Cara Menjelaskan di Interview

1. **Start with Brute Force:** "Naive approach adalah try semua combinations"
2. **Identify Redundancy:** "Kita recalculate minimum price berulang-ulang"
3. **Optimize with Tracking:** "Track minimum price sepanjang jalan"
4. **Code the Solution:** "One-pass dengan dua variabel"

---

## 🧪 Test Cases Penting

### ✅ Basic Cases

```typescript
// Standard profit case
maxProfit([7,1,5,3,6,4]) → 5

// No profit case
maxProfit([7,6,4,3,1]) → 0

// Increasing prices
maxProfit([1,2,3,4,5]) → 4
```

### 🔍 Edge Cases

```typescript
// Single day
maxProfit([5]) → 0

// Two days profit
maxProfit([1,5]) → 4

// Two days loss
maxProfit([5,1]) → 0

// Same prices
maxProfit([3,3,3,3]) → 0
```

### 🎯 Corner Cases

```typescript
// Zero prices
maxProfit([0,1,0,3,0,4]) → 4

// Maximum constraints
maxProfit([0,10000]) → 10000

// Large array
const large = Array.from({length: 10000}, (_, i) => i % 100);
maxProfit(large) → should complete quickly
```

---

## 💰 Financial Context & Applications

### 🏦 Real-World Trading

**Stock Trading Rules:**

- Must buy before you can sell
- Transaction costs and slippage
- Market hours and liquidity
- Risk management and position sizing

**Algorithmic Trading Applications:**

- Signal generation untuk entry/exit points
- Backtesting trading strategies
- Risk-adjusted return calculations
- Portfolio optimization

### 📈 Market Scenarios

```typescript
// Bull Market (Trending Up)
const bullMarket = [100, 110, 120, 130, 140, 150];
// Strategy: Buy early, hold long

// Bear Market (Trending Down)
const bearMarket = [150, 140, 130, 120, 110, 100];
// Strategy: Stay in cash, no profitable trades

// Volatile Market (High Fluctuation)
const volatileMarket = [100, 150, 80, 200, 60, 180];
// Strategy: Buy dips, sell peaks

// Sideways Market (Range-bound)
const sidewaysMarket = [100, 105, 95, 102, 98, 101];
// Strategy: Small profits from ranges
```

### 💹 Performance Metrics

```typescript
// Calculate additional metrics
function analyzeStrategy(prices: number[]) {
  const profit = maxProfit(prices);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    absoluteProfit: profit,
    percentageReturn: (profit / minPrice) * 100,
    volatility: maxPrice - minPrice,
    riskRewardRatio: profit / (maxPrice - minPrice),
  };
}
```

---

## 🚀 Optimasi dan Variasi

### ⚡ Performance Tips

1. **Early Termination:** Jika current price adalah maksimum yang mungkin
2. **Branch Prediction:** Structure code untuk predictable branches
3. **Memory Access:** Linear scan is cache-friendly
4. **Numerical Stability:** Handle large numbers carefully

### 🔧 Code Golf Version

```typescript
const maxProfit = (p: number[]): number =>
  p.reduce(
    (acc, price, i) =>
      i === 0
        ? [price, 0]
        : [Math.min(acc[0], price), Math.max(acc[1], price - acc[0])],
    [Infinity, 0]
  )[1];
```

### 🌟 Generic Version

```typescript
function maxProfit<T>(prices: T[], getValue: (item: T) => number): number {
  if (prices.length < 2) return 0;

  let minPrice = getValue(prices[0]);
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = getValue(prices[i]);

    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    } else {
      maxProfit = Math.max(maxProfit, currentPrice - minPrice);
    }
  }

  return maxProfit;
}
```

---

## 🎓 Konsep yang Dipelajari

### 📚 Computer Science Concepts

- **Greedy Algorithms:** Local optimal choices lead to global optimum
- **Dynamic Programming:** Optimal substructure dan overlapping subproblems
- **Time-Space Tradeoffs:** Berbagai pendekatan dengan complexity berbeda
- **Problem Transformation:** Kadane's algorithm connection

### 🧮 Mathematical Insights

- **Optimization Theory:** Finding global maximum efficiently
- **Financial Mathematics:** Return calculation dan risk metrics
- **Statistical Analysis:** Trend analysis dan volatility measurement

### 💻 Programming Patterns

- **Single Pass Processing:** One-time data scan
- **State Tracking:** Maintain invariants throughout iteration
- **Early Termination:** Optimization opportunities
- **Code Readability:** Balance between performance dan clarity

---

## 🔗 Problem Terkait

### 🎯 LeetCode Stock Problems Series

- **#122:** Best Time to Buy and Sell Stock II (Multiple transactions)
- **#123:** Best Time to Buy and Sell Stock III (At most 2 transactions)
- **#188:** Best Time to Buy and Sell Stock IV (At most k transactions)
- **#309:** Best Time to Buy and Sell Stock with Cooldown
- **#714:** Best Time to Buy and Sell Stock with Transaction Fee

### 📈 Related Algorithm Problems

- **#53:** Maximum Subarray (Kadane's Algorithm)
- **#152:** Maximum Product Subarray
- **#238:** Product of Array Except Self
- **#121:** Contains Duplicate

### 🧩 Progression Path

1. **Beginner:** Start dengan brute force
2. **Intermediate:** Master one-pass algorithm
3. **Advanced:** Understand all variations
4. **Expert:** Extend ke multiple transactions

---

## 💡 Key Takeaways

### 🎯 Algorithm Selection

- **Interview/Production:** One-Pass (optimal balance)
- **Learning:** Two-Pointer (most intuitive)
- **Advanced Interview:** Dynamic Programming (shows extensibility)

### 🧠 Problem-Solving Framework

1. **Understand Constraints:** Single transaction, chronological order
2. **Identify Pattern:** Track minimum and maximum simultaneously
3. **Optimize Incrementally:** Brute force → Greedy → Optimal
4. **Test Thoroughly:** Edge cases, performance, correctness

### 🏆 Interview Success

- Start dengan problem understanding
- Explain multiple approaches dan trade-offs
- Code the optimal solution cleanly
- Discuss extensions dan variations
- Test dengan concrete examples

---

## 🎊 Kesimpulan

Best Time to Buy and Sell Stock adalah problem fundamental yang mengajarkan:

- **Greedy Algorithm Design** - Local optimal choices
- **Financial Problem Modeling** - Real-world constraints
- **Performance Optimization** - Time-space trade-offs
- **Problem Extension** - Building complex dari simple

**One-Pass Algorithm** adalah solusi yang paling elegant karena:

- ✅ Optimal time complexity O(n)
- ✅ Optimal space complexity O(1)
- ✅ Easy to understand dan implement
- ✅ Easily extensible untuk variations

Problem ini sering muncul dalam interview karena:

- 🎯 Tests greedy thinking
- 🎯 Has clear real-world applications
- 🎯 Multiple solution approaches
- 🎯 Good stepping stone untuk advanced problems

Master problem ini, dan Anda akan siap untuk entire stock trading problem series dan greedy algorithm challenges! 🚀

---

_Happy Trading & Coding! 💹_
