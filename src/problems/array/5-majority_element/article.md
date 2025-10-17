# 🎯 Majority Element - Seperti Mencari "Raja" dalam Kerajaan Angka

## 📚 Apa itu Problem Ini?

Bayangkan kamu sedang mengadakan **pemilihan umum** di sebuah kerajaan angka. Setiap angka adalah "warga negara" yang memberikan suara untuk dirinya sendiri. **Majority Element** adalah angka yang mendapat suara **lebih dari separuh** dari total warga. Misalnya dalam array `[3,2,3]`, angka 3 mendapat 2 suara dari total 3 warga, jadi 3 adalah "raja"nya!

### 🎯 Problem Statement

**LeetCode #169 - Majority Element**

Mari kita translate analogi kerajaan tadi ke bahasa programming yang sebenarnya:

#### 📖 **Kamus Sederhana (Glossary)**

Sebelum kita lanjut, mari kenalan dulu dengan istilah-istilah yang akan kita pakai:

- **Majority Element** = "Elemen mayoritas" (yang muncul > n/2 kali)
- **More than ⌊n/2⌋ times** = "Lebih dari setengah kemunculan" (bukan sama dengan setengah!)
- **Boyer-Moore Voting** = "Algoritma voting Boyer-Moore" (cara optimal mencari mayoritas)
- **Candidate** = "Calon mayoritas" (angka yang sedang kita pertimbangkan)
- **Vote Count** = "Jumlah suara" (counter untuk candidate saat ini)
- **Always exists** = "Selalu ada" (problem guarantee bahwa mayoritas pasti ada)

#### 🔄 **Dari Analogi ke Technical Language**

**Yang tadi kita bilang:**

> "Pemilihan umum di kerajaan angka, cari yang dapat suara lebih dari separuh"

**Dalam bahasa programming:**

> Given an array `nums` of size `n`, return the **majority element** that appears **more than ⌊n/2⌋ times**

**Yang tadi kita bilang:**

> "Angka 3 mendapat 2 suara dari total 3 warga, jadi 3 adalah raja"

**Dalam bahasa programming:**

> Element 3 appears 2 times in array of length 3, since 2 > ⌊3/2⌋ = 1, element 3 is the majority

**Yang tadi kita bilang:**

> "Problem guarantee bahwa selalu ada raja di kerajaan"

**Dalam bahasa programming:**

> You may assume that the majority element **always exists** in the array

### 📝 Contoh-contoh

Mari kita lihat beberapa contoh konkret untuk memahami masalahnya lebih baik:

**Contoh 1:**

```
Input: nums = [3,2,3]
Output: 3

Penjelasan Analogi:
- Kerajaan: [Raja♠, Menteri♥, Raja♦]
- Pemilihan: Raja=2 suara, Menteri=1 suara
- Total warga: 3, butuh > 1.5 suara untuk menang
- Raja menang dengan 2 > 1.5 ✓

Penjelasan Technical:
- Array length: 3, threshold: ⌊3/2⌋ = 1
- Element 3 appears 2 times: 2 > 1 ✓
- Element 2 appears 1 time: 1 ≤ 1 ✗
- Return 3 (majority element)
```

**Contoh 2:**

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2

Penjelasan Analogi:
- Kerajaan: [2,2,1,1,1,2,2] (7 warga)
- Pemilihan: 2=4 suara, 1=3 suara
- Total: 7, butuh > 3.5 suara untuk menang
- Angka 2 menang dengan 4 > 3.5 ✓

Penjelasan Technical:
- Array length: 7, threshold: ⌊7/2⌋ = 3
- Element 2 appears 4 times: 4 > 3 ✓
- Element 1 appears 3 times: 3 ≤ 3 ✗
- Return 2 (majority element)
```

**Contoh 3:**

```
Input: nums = [1]
Output: 1

Penjelasan Analogi:
- Kerajaan dengan 1 warga: [Raja♠]
- Otomatis Raja menang (100% suara)

Penjelasan Technical:
- Array length: 1, threshold: ⌊1/2⌋ = 0
- Element 1 appears 1 time: 1 > 0 ✓
- Return 1 (single element is always majority)
```

**Contoh 4:**

```
Input: nums = [1,1,2,2,1]
Output: 1

Penjelasan Analogi:
- Kerajaan: [1,1,2,2,1] (5 warga)
- Pemilihan: 1=3 suara, 2=2 suara
- Total: 5, butuh > 2.5 suara untuk menang
- Angka 1 menang dengan 3 > 2.5 ✓

Penjelasan Technical:
- Array length: 5, threshold: ⌊5/2⌋ = 2
- Element 1 appears 3 times: 3 > 2 ✓
- Element 2 appears 2 times: 2 ≤ 2 ✗
- Return 1 (majority element)
```

**Contoh 5:**

```
Input: nums = [5,5,5,5,5]
Output: 5

Penjelasan Analogi:
- Kerajaan dengan warga identik: [5,5,5,5,5]
- Unanimous victory (100% suara untuk 5)

Penjelasan Technical:
- Array length: 5, threshold: ⌊5/2⌋ = 2
- Element 5 appears 5 times: 5 > 2 ✓
- Return 5 (all elements same)
```

### 🎯 Batasan-Batasan (Constraints)

Mari kita translate aturan main LeetCode ke bahasa sehari-hari:

#### 📏 **Ukuran Array**

```
Technical: n == nums.length, 1 <= n <= 5 * 10^4
Analogi: Kerajaan minimal 1 warga, maksimal 50.000 warga
```

#### 🎨 **Nilai Element**

```
Technical: -10^9 <= nums[i] <= 10^9
Analogi: Setiap warga punya ID dari -1 miliar sampai 1 miliar
(Range sangat besar, bisa negatif!)
```

#### 👑 **Majority Guarantee**

```
Technical: The majority element always exists
Analogi: Selalu ada "raja" yang menguasai > 50% kerajaan
Critical: Tidak perlu validasi, pasti ada jawaban!
```

### 📋 Syarat Utama

Mari kita pahami aturan main yang harus kita ikuti:

#### 👑 **Definisi Majority: > n/2 (bukan >= n/2)**

```
Technical: Appears more than ⌊n/2⌋ times
Analogi: Harus dominan, bukan cuma setara
Key insight: Dalam array n elements, mayoritas = > n/2, bukan = n/2

Example:
- n=5 → majority needs > 2.5 → must appear ≥ 3 times
- n=6 → majority needs > 3.0 → must appear ≥ 4 times
- n=7 → majority needs > 3.5 → must appear ≥ 4 times
```

#### 🎯 **Return the Element (bukan count)**

```
Technical: Return the majority element (value), not its count
Analogi: Return siapa "raja"nya, bukan berapa suaranya
Target: Nilai element mayoritas itu sendiri
```

#### ⚡ **Performance Challenge**

```
Optimal Goal: O(n) time, O(1) space
Challenge: Bisa solve tanpa extra memory untuk counting?
Boyer-Moore: Brilliant algorithm yang achieve optimal complexity!
```

## 🤔 Intuisi Dasar: Dari Brute Force ke Optimal

Sekarang setelah kita paham problem statement-nya, mari kita explore berbagai cara menyelesaikannya, dari yang naive sampai yang brilliant!

### 🔍 **Progression: Naive → Optimal Solutions**

Mari kita build intuition step by step:

#### **🐌 Approach 0: Brute Force - O(n²)**

```typescript
// Naive: Count setiap element
function majorityBruteForce(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === nums[i]) count++;
        }
        if (count > Math.floor(nums.length / 2)) {
            return nums[i];
        }
    }
    return -1; // Should not reach here given constraints
}

Analogi: Untuk setiap warga, manual count suaranya satu per satu
Time: O(n²) - Sangat lambat untuk array besar
Space: O(1) - Tidak butuh extra memory
```

#### **📊 Approach 1: Hash Map Counter - O(n) time, O(n) space**

```typescript
function majorityHashMap(nums: number[]): number {
    const count = new Map<number, number>();
    const majority = Math.floor(nums.length / 2);

    for (const num of nums) {
        const currentCount = (count.get(num) || 0) + 1;
        count.set(num, currentCount);

        if (currentCount > majority) {
            return num; // Early return when majority found
        }
    }
    return -1; // Should not reach here
}

Analogi: Pakai "buku catatan" untuk track suara setiap calon
Time: O(n) - Single pass through array
Space: O(n) - Worst case semua element unique
```

#### **🔀 Approach 2: Sorting - O(n log n) time, O(1) space**

```typescript
function majoritySorting(nums: number[]): number {
    nums.sort((a, b) => a - b);

    // Majority element must occupy middle position
    return nums[Math.floor(nums.length / 2)];
}

Analogi: Urutkan warga berdasarkan ID, yang mayoritas pasti ada di tengah
Time: O(n log n) - Sorting overhead
Space: O(1) - In-place sorting
Key insight: Mayoritas pasti "dominate" middle area setelah sort!
```

#### **👑 Approach 3: Boyer-Moore Voting - O(n) time, O(1) space (OPTIMAL!)**

```typescript
function majorityBoyerMoore(nums: number[]): number {
    let candidate = nums[0];
    let count = 1;

    // Phase 1: Find potential majority candidate
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === candidate) {
            count++;
        } else {
            count--;
            if (count === 0) {
                candidate = nums[i];
                count = 1;
            }
        }
    }

    // No Phase 2 needed (problem guarantees majority exists)
    return candidate;
}

Analogi: "Voting battle" - setiap match +1, setiap mismatch -1
Time: O(n) - Single pass
Space: O(1) - Only 2 variables
Brilliant: Majority will "survive" the battle!
```

### 🌟 **Why Boyer-Moore is Brilliant?**

**🧠 Key Insight: "Survivor" Logic**

Boyer-Moore bekerja berdasarkan prinsip cemerlang:

> **"Jika mayoritas benar-benar dominan (> n/2), maka dalam 'battle' satu-lawan-satu, mayoritas pasti akan survive sampai akhir!"**

**Visual Example:**

```
Array: [2,2,1,1,1,2,2]

Battle simulation:
candidate=2, count=1    [2]
candidate=2, count=2    [2,2]
candidate=2, count=1    [2,2,1] (2 vs 1 → -1)
candidate=2, count=0    [2,2,1,1] (count=0!)
candidate=1, count=1    [2,2,1,1,1] (new candidate!)
candidate=1, count=0    [2,2,1,1,1,2] (1 vs 2 → -1, count=0!)
candidate=2, count=1    [2,2,1,1,1,2,2] (final survivor: 2)

Result: 2 ✓ (benar, 2 muncul 4/7 kali)
```

**🎯 Why it works mathematically:**

1. **Majority property:** Mayoritas muncul > n/2 kali
2. **Cancellation principle:** Setiap majority vs non-majority = net +0
3. **Survival guarantee:** Setelah semua cancellation, mayoritas pasti tersisa

**Proof sketch:**

- Misalkan mayoritas muncul M kali, non-mayoritas total N kali
- Given: M > N (karena M > n/2 dan N < n/2)
- Worst case cancellation: M - N matches canceled out
- Remaining: M - (M - N) = N, tapi impossible karena M > N
- **Conclusion:** Mayoritas pasti survive dengan positive count!

---

## 🎯 Strategi Penyelesaian

Sekarang mari kita deep dive ke implementasi optimal menggunakan Boyer-Moore Voting Algorithm!

### 🎮 **Setup "Pemain" untuk Boyer-Moore Voting**

Boyer-Moore Algorithm menggunakan **2 variabel** untuk simulate "voting battle":

#### 🏆 **Variable #1: Candidate (Calon Terkuat)**

```
nums: [2, 2, 1, 1, 1, 2, 2]
       ↑
   candidate = 2 (calon yang sedang kita "dukung")
```

- **Tugasnya:** Track angka yang berpotensi jadi mayoritas
- **Nama variabelnya:** `candidate` (calon mayoritas saat ini)
- **Start dari:** `nums[0]` (elemen pertama jadi candidate awal)
- **Updates:** Berubah ketika count = 0 (candidate kalah battle)

#### 🗳️ **Variable #2: Count (Kekuatan Suara)**

```
Battle state: candidate=2, count=3
   ↑
Candidate 2 punya "kekuatan" 3 (unggul 3 suara)
```

- **Tugasnya:** Track seberapa kuat candidate saat ini
- **Nama variabelnya:** `count` (net vote advantage)
- **Start dari:** `1` (candidate awal punya 1 suara)
- **Updates:** +1 jika match, -1 jika mismatch

#### 🥊 **Battle Rules: Vote Counting Logic**

```
Rule 1: Same element → Support current candidate
if (nums[i] === candidate) count++;

Rule 2: Different element → Attack current candidate
if (nums[i] !== candidate) count--;

Rule 3: Candidate eliminated → New candidate rises
if (count === 0) {
    candidate = nums[i];
    count = 1;
}
```

### 🔧 **Implementasi: Dari Konsep ke Kode**

#### 💭 **Step 1: Setup Initial Candidate**

**🧠 Logika:** "Elemen pertama jadi calon awal dengan 1 suara"

```typescript
// Setup: candidate awal dan vote count
let candidate = nums[0]; // 👑 Elemen pertama jadi "raja sementara"
let count = 1; // 🗳️ Mulai dengan 1 suara
```

**🤔 Kenapa start dari nums[0] dengan count=1?**

- Elemen pertama pasti ada (constraint: n ≥ 1)
- Langsung masuk battle dari elemen kedua (efisien)
- Count=1 karena candidate sudah "claim" elemen pertama

#### 🥊 **Step 2: Battle Simulation Loop**

**🧠 Logika:** "Simulate voting battle untuk setiap elemen"

```typescript
// Battle loop: mulai dari elemen kedua
for (let i = 1; i < nums.length; i++) {
  if (nums[i] === candidate) {
    // 👍 Support: elemen sama dengan candidate
    count++;
  } else {
    // 👎 Attack: elemen berbeda, serang candidate
    count--;

    // 💥 Elimination: candidate kalah, ganti baru
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    }
  }
}
```

#### 🏆 **Step 3: Return Winner**

```typescript
return candidate; // Survivor pasti adalah mayoritas!
```

#### 🔧 **Kode Lengkap: Solusi Optimal**

```typescript
function majorityElement(nums: number[]): number {
  // Edge case: array kosong (seharusnya tidak terjadi per constraints)
  if (nums.length === 0) throw new Error("Array cannot be empty");

  // Edge case: single element pasti mayoritas
  if (nums.length === 1) return nums[0];

  // Step 1: Setup initial candidate
  let candidate = nums[0]; // 👑 Raja sementara
  let count = 1; // 🗳️ Kekuatan awal

  // Step 2: Battle simulation
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++; // 👍 Support candidate
    } else {
      count--; // 👎 Attack candidate

      // 💥 Candidate eliminated, new one rises
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  // Step 3: Return survivor (guaranteed to be majority)
  return candidate;
}
```

#### 🎭 **Testing: Trace Kode dengan Contoh**

Mari kita test kode kita dengan contoh: `nums = [2,2,1,1,1,2,2]`

```typescript
// Initial setup
candidate = 2, count = 1  (nums[0] = 2)
nums = [2,2,1,1,1,2,2]
        ↑ start dari sini

// Iteration 1: i=1, nums[1]=2
nums[1] = 2 === candidate = 2 → match!
count++ → count = 2
// State: candidate=2, count=2

// Iteration 2: i=2, nums[2]=1
nums[2] = 1 !== candidate = 2 → mismatch!
count-- → count = 1
// State: candidate=2, count=1

// Iteration 3: i=3, nums[3]=1
nums[3] = 1 !== candidate = 2 → mismatch!
count-- → count = 0 → ELIMINATION!
candidate = nums[3] = 1, count = 1
// State: candidate=1, count=1

// Iteration 4: i=4, nums[4]=1
nums[4] = 1 === candidate = 1 → match!
count++ → count = 2
// State: candidate=1, count=2

// Iteration 5: i=5, nums[5]=2
nums[5] = 2 !== candidate = 1 → mismatch!
count-- → count = 1
// State: candidate=1, count=1

// Iteration 6: i=6, nums[6]=2
nums[6] = 2 !== candidate = 1 → mismatch!
count-- → count = 0 → ELIMINATION!
candidate = nums[6] = 2, count = 1
// State: candidate=2, count=1

// Final result: candidate = 2 ✅
// Verification: 2 appears 4/7 times = 57% > 50% ✓
```

---

## 🚀 **Advanced Topics & Analysis**

Sekarang mari kita explore topik-topik advanced dan berbagai variasi algoritma!

### ⚡ **Time & Space Complexity Analysis**

#### 📊 **Boyer-Moore Voting Complexity**

**Time Complexity: O(n)**

```
Analogi:
Seperti menonton pertandingan voting sekali jalan dari awal sampai akhir,
tanpa perlu rewind atau ulang dari tengah.

Technical Analysis:
- Single pass: iterate array tepat sekali
- Constant work per element: 1 comparison + 1-2 arithmetic operations
- No nested loops atau recursive calls
- Total: O(n) × O(1) = O(n)

Best case: O(n) - harus cek semua elemen
Worst case: O(n) - tetap single pass
Average case: O(n)
```

**Space Complexity: O(1)**

```
Analogi:
Cuma butuh 2 tangan: 1 untuk pegang "nama candidate",
1 lagi untuk hitung "jari" (count). Tidak peduli seberapa
besar kerajaan, tetap cuma butuh 2 tangan.

Technical Analysis:
- Variables used: candidate, count, loop counter i
- Memory usage: O(1) regardless of input size
- No hash tables, arrays, atau recursive stack
- In-place algorithm: tidak modify original array

Space-efficient karena:
✅ Constant extra space (2 variables)
✅ No additional data structures
✅ No recursion overhead
```

#### 📈 **Comparison dengan Algorithm Lain**

| Algorithm            | Time       | Space    | Pros                               | Cons                             |
| -------------------- | ---------- | -------- | ---------------------------------- | -------------------------------- |
| **Boyer-Moore**      | O(n)       | O(1)     | 🥇 Optimal complexity, elegant     | Requires majority guarantee      |
| **HashMap**          | O(n)       | O(n)     | Intuitive, works without guarantee | High memory usage                |
| **Sorting**          | O(n log n) | O(1)     | Simple, no extra space             | Slower, modifies array           |
| **Divide & Conquer** | O(n log n) | O(log n) | Educational, generalizable         | Complex, not optimal             |
| **Bit Manipulation** | O(32n)     | O(1)     | Clever, constant space             | Complex, works only for integers |

### 🔄 **Algorithm Variations & Extensions**

#### 🥊 **Complete Boyer-Moore (dengan Verification)**

Standard problem guarantee mayoritas exists, tapi dalam real-world mungkin tidak:

```typescript
function majorityElementVerified(nums: number[]): number | null {
  if (nums.length === 0) return null;

  // Phase 1: Find candidate using Boyer-Moore
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  // Phase 2: Verify candidate is actually majority
  let actualCount = 0;
  for (const num of nums) {
    if (num === candidate) actualCount++;
  }

  return actualCount > Math.floor(nums.length / 2) ? candidate : null;
}
```

**Trade-off:** 2 passes vs guaranteed correctness

#### 🎯 **Generalized Majority (k-Majority)**

Boyer-Moore bisa digeneralize untuk find elements yang muncul > n/k kali:

```typescript
// Find all elements appearing > n/3 times (at most 2 elements)
function majorityElementsThirds(nums: number[]): number[] {
  if (nums.length === 0) return [];
  if (nums.length === 1) return nums;

  // Phase 1: Find 2 candidates (at most 2 elements can appear > n/3 times)
  let candidate1 = nums[0],
    candidate2 = nums[1];
  let count1 = 0,
    count2 = 0;

  for (const num of nums) {
    if (num === candidate1) {
      count1++;
    } else if (num === candidate2) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  // Phase 2: Verify candidates
  const result: number[] = [];
  const threshold = Math.floor(nums.length / 3);

  count1 = nums.filter((x) => x === candidate1).length;
  count2 = nums.filter((x) => x === candidate2).length;

  if (count1 > threshold) result.push(candidate1);
  if (count2 > threshold && candidate2 !== candidate1) result.push(candidate2);

  return result;
}
```

**Key insight:** For > n/k threshold, at most k-1 elements dapat qualify

#### 🔀 **Alternative Approaches Deep Dive**

**Sorting Approach - Why Middle Element Works:**

```typescript
function majorityElementSort(nums: number[]): number {
  nums.sort((a, b) => a - b);

  // Mathematical proof mengapa middle element = majority:
  // - Array length: n
  // - Majority appears > n/2 times
  // - Setelah sort, majority occupy consecutive positions
  // - Middle index: Math.floor(n/2)
  // - Majority pasti "cover" middle position!

  return nums[Math.floor(nums.length / 2)];
}

// Visual proof:
// [1,2,1] → sort → [1,1,2], middle=nums[1]=1 ✓
// [1,1,2,2,1] → sort → [1,1,1,2,2], middle=nums[2]=1 ✓
// [3,2,3,3,3] → sort → [2,3,3,3,3], middle=nums[2]=3 ✓
```

**Bit Manipulation - Build Result Bit by Bit:**

```typescript
function majorityElementBitwise(nums: number[]): number {
  let result = 0;
  const n = nums.length;

  // Check each bit position (32 bits for signed integer)
  for (let bit = 0; bit < 32; bit++) {
    let onesCount = 0;

    // Count how many numbers have bit 'bit' set to 1
    for (const num of nums) {
      if ((num >> bit) & 1) {
        onesCount++;
      }
    }

    // If majority of numbers have this bit set, set it in result
    if (onesCount > n / 2) {
      result |= 1 << bit;
    }
  }

  return result;
}

// Insight: Majority element's bits akan dominan di setiap position
// Time: O(32n) = O(n), tapi konstanta besar
```

### 🎯 **Optimization Techniques**

#### 🚀 **Early Termination Optimizations**

```typescript
// Optimization 1: Early return untuk obviously majority
function majorityElementOptimized(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  // Quick check: if first element appears > n/2 at start, likely majority
  let firstElement = nums[0];
  let quickCount = 0;
  const threshold = Math.floor(nums.length / 2);

  for (let i = 0; i < Math.min(threshold + 2, nums.length); i++) {
    if (nums[i] === firstElement) quickCount++;
  }

  if (quickCount > threshold) {
    // Verify it's actually majority
    let totalCount = 0;
    for (const num of nums) {
      if (num === firstElement) totalCount++;
    }
    if (totalCount > threshold) return firstElement;
  }

  // Fall back to standard Boyer-Moore
  return majorityElementStandard(nums);
}
```

#### 🎲 **Randomized Approach dengan Expected O(1)**

```typescript
function majorityElementRandomized(nums: number[]): number {
  const majority = Math.floor(nums.length / 2);

  while (true) {
    // Pick random element (expected 50% chance it's majority)
    const randomIndex = Math.floor(Math.random() * nums.length);
    const candidate = nums[randomIndex];

    // Count its occurrences
    let count = 0;
    for (const num of nums) {
      if (num === candidate) count++;
    }

    // If it's majority, return
    if (count > majority) return candidate;

    // Expected iterations: 2 (since majority > 50% of array)
  }
}

// Analysis:
// - Probability of picking majority = (majority_count / n) > 0.5
// - Expected iterations = 1 / P(success) < 1 / 0.5 = 2
// - Expected time: O(n) per iteration × 2 iterations = O(n)
```

### 🧠 **Problem Extensions & Related Problems**

#### 🔢 **LeetCode Problem Family:**

1. **Majority Element** (LeetCode #169) - Our current problem

   - Find element appearing > n/2 times
   - Always guaranteed to exist

2. **Majority Element II** (LeetCode #229)

   - Find all elements appearing > n/3 times
   - At most 2 such elements can exist
   - Uses generalized Boyer-Moore

3. **Valid Anagram** (LeetCode #242)

   - Different problem, but can use frequency counting
   - Related technique: character frequency analysis

4. **Find All Numbers Disappeared in Array** (LeetCode #448)
   - Different approach, but similar "finding missing/present" pattern

#### 🏗️ **Real-world Applications:**

**Distributed Systems:**

- Find majority vote dalam consensus algorithms (Raft, PBFT)
- Leader election dalam distributed computing
- Fault-tolerant systems dengan majority rule

**Data Analysis:**

- Find most common category dalam datasets
- Anomaly detection (majority = normal, minority = anomaly)
- Stream processing dengan sliding windows

**Network Security:**

- DDoS detection (majority traffic pattern vs malicious)
- Intrusion detection systems
- Traffic analysis dan pattern recognition

---

## 🎮 **Interactive Learning & Practice**

Mari kita test pemahaman kamu dengan quiz dan challenges!

### 🧩 **Quiz: Test Your Understanding**

#### **Quiz 1: Boyer-Moore Core Logic**

**❓ Pertanyaan:** Mengapa Boyer-Moore dapat work dengan hanya O(1) space, padahal kita perlu "count" semua elements?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena Boyer-Moore tidak benar-benar "count" - algorithm ini menggunakan **"relative counting" atau "battle simulation"**!

**Key insight:**

- **Traditional counting:** Track absolute count untuk setiap element (butuh O(n) space)
- **Boyer-Moore counting:** Track relative "kekuatan" candidate vs non-candidate (cukup 1 counter)

**Analogi:**
Traditional = "Hitung semua suara di kotak-kotak terpisah"  
Boyer-Moore = "Battle royale - yang survive pasti terkuat"

**Mathematical proof:**

- Jika element benar-benar mayoritas (> n/2)
- Maka dalam "battle" majority vs minority, net result > 0
- Survivor algorithm akan always find true majority

**Brilliant optimization:** Tidak perlu tahu exact count, cukup tahu "siapa yang menang"!

</details>

#### **Quiz 2: Edge Cases Mastery**

**❓ Pertanyaan:** Apa yang terjadi jika dalam array `[1,2,1,2,1,2,1]`, tidak ada element yang > n/2?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** **Trick question!** Dalam array tersebut, element 1 **memang mayoritas**!

**Analysis:**

```
Array: [1,2,1,2,1,2,1]
Length: 7
Threshold: ⌊7/2⌋ = 3, so need > 3 occurrences

Count:
- Element 1: appears 4 times (positions 0,2,4,6)
- Element 2: appears 3 times (positions 1,3,5)

4 > 3 ✓ → Element 1 is majority!
```

**Key insight:** Problem **guarantee** mayoritas selalu ada. Jika tidak ada, berarti ada error dalam problem setup atau understanding.

**Boyer-Moore trace:**

```
candidate=1, count=1  [1]
candidate=1, count=0  [1,2] → count becomes 0!
candidate=1, count=1  [1,2,1] → new candidate (same as before)
candidate=1, count=0  [1,2,1,2] → count becomes 0 again!
candidate=1, count=1  [1,2,1,2,1] → rise again
candidate=1, count=0  [1,2,1,2,1,2] → down again
candidate=1, count=1  [1,2,1,2,1,2,1] → final survivor

Result: 1 ✓
```

</details>

#### **Quiz 3: Algorithm Comparison**

**❓ Pertanyaan:** Kapan sebaiknya pakai HashMap approach daripada Boyer-Moore?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** HashMap lebih baik ketika:

**1. 🚨 No Majority Guarantee:**

```typescript
// Boyer-Moore assumes majority exists
// HashMap can detect "no majority" case
function findMajorityHashMap(nums: number[]): number | null {
  const count = new Map();
  const threshold = Math.floor(nums.length / 2);

  for (const num of nums) {
    const currentCount = (count.get(num) || 0) + 1;
    count.set(num, currentCount);
    if (currentCount > threshold) return num;
  }

  return null; // No majority found
}
```

**2. 📊 Need All Frequencies:**

```typescript
// Want frequency of ALL elements, not just majority
function getAllFrequencies(nums: number[]): Map<number, number> {
  const frequencies = new Map();
  for (const num of nums) {
    frequencies.set(num, (frequencies.get(num) || 0) + 1);
  }
  return frequencies;
}
```

**3. 🔍 Multiple Majority Elements:**

```typescript
// Find all elements appearing > threshold times
function findAllMajority(nums: number[], k: number): number[] {
  const count = new Map();
  const threshold = Math.floor(nums.length / k);
  const result = [];

  // ... counting logic

  return result;
}
```

**4. 🛡️ Defensive Programming:**

```typescript
// When you're not sure about input quality
// HashMap is more "robust" to edge cases
```

**Boyer-Moore optimal when:**

- ✅ Guaranteed majority exists
- ✅ Only need THE majority (not all frequencies)
- ✅ Memory is constrained
- ✅ Performance is critical

</details>

### 🏆 **Challenges: Practice Makes Perfect**

#### **Challenge 1: Algorithm Trace**

**🎯 Task:** Trace Boyer-Moore step-by-step untuk input:

```
Input: nums = [1,3,1,1,3,1]
Expected result: 1 (appears 4/6 times)
```

<details>
<summary>💪 Click untuk melihat solution</summary>

```typescript
// Step-by-step Boyer-Moore trace:

Initial: candidate = 1, count = 1  (nums[0] = 1)
Array: [1,3,1,1,3,1]
        ↑ starting from index 1

// i=1: nums[1] = 3
nums[1] = 3 ≠ candidate = 1 → mismatch
count-- → count = 0 → ELIMINATION!
candidate = nums[1] = 3, count = 1
State: candidate = 3, count = 1

// i=2: nums[2] = 1
nums[2] = 1 ≠ candidate = 3 → mismatch
count-- → count = 0 → ELIMINATION!
candidate = nums[2] = 1, count = 1
State: candidate = 1, count = 1

// i=3: nums[3] = 1
nums[3] = 1 = candidate = 1 → match!
count++ → count = 2
State: candidate = 1, count = 2

// i=4: nums[4] = 3
nums[4] = 3 ≠ candidate = 1 → mismatch
count-- → count = 1
State: candidate = 1, count = 1

// i=5: nums[5] = 1
nums[5] = 1 = candidate = 1 → match!
count++ → count = 2
State: candidate = 1, count = 2

Final result: candidate = 1 ✅

Verification:
Element 1: appears at positions [0,2,3,5] = 4 times
Element 3: appears at positions [1,4] = 2 times
4 > 6/2 = 3 ✓ → Element 1 is majority!
```

</details>

#### **Challenge 2: Edge Case Engineering**

**🎯 Task:** Implement Boyer-Moore yang handle edge case `nums = []` dan return appropriate error:

<details>
<summary>🧠 Click untuk melihat solution</summary>

```typescript
function majorityElementRobust(nums: number[]): number {
  // Edge case 1: Empty array
  if (nums.length === 0) {
    throw new Error("Cannot find majority in empty array");
  }

  // Edge case 2: Single element (always majority)
  if (nums.length === 1) {
    return nums[0];
  }

  // Edge case 3: Two elements (need to check)
  if (nums.length === 2) {
    // For n=2, majority needs > 1 occurrence → both must be same
    if (nums[0] === nums[1]) {
      return nums[0];
    } else {
      throw new Error("No majority in 2-element array with different values");
    }
  }

  // Standard Boyer-Moore for n >= 3
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  return candidate;
}

// Test cases:
try {
  console.log(majorityElementRobust([])); // Error
} catch (e) {
  console.log("✅ Empty array handled:", e.message);
}

console.log(majorityElementRobust([5])); // 5
console.log(majorityElementRobust([1, 1])); // 1

try {
  console.log(majorityElementRobust([1, 2])); // Error
} catch (e) {
  console.log("✅ No majority handled:", e.message);
}
```

**Key insight:** Robust code handles edge cases explicitly, even when problem constraints guarantee they won't occur!

</details>

#### **Challenge 3: Performance Optimization**

**🎯 Task:** Optimize Boyer-Moore untuk very large arrays dengan early termination:

<details>
<summary>⚡ Click untuk melihat solution</summary>

```typescript
function majorityElementTurbo(nums: number[]): number {
  if (nums.length <= 2) {
    return nums.length === 1
      ? nums[0]
      : nums[0] === nums[1]
      ? nums[0]
      : nums[0]; // Problem guarantees majority
  }

  const n = nums.length;
  const threshold = Math.floor(n / 2);

  // Optimization 1: Quick dominant element check
  // If first element appears in first threshold+1 positions frequently,
  // it might be majority
  const firstElement = nums[0];
  let quickCount = 0;
  const sampleSize = Math.min(threshold + 10, n);

  for (let i = 0; i < sampleSize; i++) {
    if (nums[i] === firstElement) quickCount++;
  }

  // If first element dominates early sample, verify fully
  if (quickCount > sampleSize * 0.6) {
    let fullCount = 0;
    for (const num of nums) {
      if (num === firstElement) {
        fullCount++;
        // Early termination: once we exceed threshold, we found it
        if (fullCount > threshold) {
          return firstElement;
        }
      }
    }
  }

  // Optimization 2: Standard Boyer-Moore with counter optimization
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < n; i++) {
    if (nums[i] === candidate) {
      count++;

      // Early termination: if count becomes very high,
      // and we've processed significant portion, likely majority
      if (count > threshold && i > threshold) {
        return candidate;
      }
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  return candidate;
}

// Performance comparison function
function benchmarkMajority(arraySize: number): void {
  // Create test array: 60% majority, 40% random
  const majorityCount = Math.floor(arraySize * 0.6);
  const testArray = [
    ...Array(majorityCount).fill(42),
    ...Array(arraySize - majorityCount)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100)),
  ];

  // Shuffle
  for (let i = testArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [testArray[i], testArray[j]] = [testArray[j], testArray[i]];
  }

  // Benchmark
  const start1 = performance.now();
  const result1 = majorityElement(testArray.slice());
  const time1 = performance.now() - start1;

  const start2 = performance.now();
  const result2 = majorityElementTurbo(testArray.slice());
  const time2 = performance.now() - start2;

  console.log(`Array size: ${arraySize}`);
  console.log(`Standard Boyer-Moore: ${time1.toFixed(4)}ms`);
  console.log(`Optimized Boyer-Moore: ${time2.toFixed(4)}ms`);
  console.log(`Results match: ${result1 === result2}`);
  console.log(`Speedup: ${(time1 / time2).toFixed(2)}x\n`);
}

// Test with different sizes
[1000, 10000, 50000].forEach((size) => benchmarkMajority(size));
```

</details>

### 🎨 **Visual Learning: Rich Diagrams**

#### **📊 Algorithm Comparison Flowchart**

```
Input: [2,2,1,1,1,2,2]

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Brute Force   │    │    HashMap      │    │  Boyer-Moore    │
│   O(n²) time    │    │ O(n) time/space │    │ O(n) time, O(1) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ For each element│    │ Count in HashMap│    │ Battle simulation│
│ count manually  │    │ {2:4, 1:3}     │    │ candidate vs all │
│ 2→4, 1→3       │    │ Return 2 (>3.5) │    │ Survivor: 2     │
│ Return 2       │    └─────────────────┘    └─────────────────┘
└─────────────────┘
```

#### **🥊 Boyer-Moore Battle Visualization**

```
Battle Timeline: [2,2,1,1,1,2,2]

Round 1: 2 vs 2 → MATCH!
  👑2(count:2) vs 👤others(0)

Round 2: 2 vs 1 → ATTACK!
  👑2(count:1) vs 👤1(power:1)

Round 3: 2 vs 1 → DEFEATED!
  👑2(count:0) → 💥ELIMINATED
  👑1 rises (count:1)

Round 4: 1 vs 1 → MATCH!
  👑1(count:2) vs 👤others(0)

Round 5: 1 vs 2 → ATTACK!
  👑1(count:1) vs 👤2(power:1)

Round 6: 1 vs 2 → DEFEATED!
  👑1(count:0) → 💥ELIMINATED
  👑2 returns (count:1)

🏆 Final Survivor: 2
```

#### **⚡ Complexity Comparison Chart**

```
Performance Comparison (n = array size):

Time Complexity:
Brute Force O(n²)  : ████████████████████████████████████████
HashMap O(n)       : ████████████████████
Sorting O(n log n) : ██████████████████████████████
Boyer-Moore O(n)   : ████████████████████  👑 OPTIMAL

Space Complexity:
Brute Force O(1)   : ██
HashMap O(n)       : ████████████████████████████████████████
Sorting O(1)       : ██
Boyer-Moore O(1)   : ██  👑 OPTIMAL
```

### 🎪 **Interactive Code Playground**

#### **🛠️ Debug-Friendly Implementation**

```typescript
function majorityElementDebug(nums: number[]): number {
  console.log(`🎯 Boyer-Moore Debug Mode`);
  console.log(`📋 Input: [${nums.join(", ")}] (length: ${nums.length})`);
  console.log(`🎚️ Majority threshold: > ${Math.floor(nums.length / 2)}`);

  if (nums.length === 0) throw new Error("Empty array");
  if (nums.length === 1) {
    console.log(`📦 Single element case, return ${nums[0]}`);
    return nums[0];
  }

  let candidate = nums[0];
  let count = 1;
  console.log(`\n🏁 Initial: candidate=${candidate}, count=${count}`);

  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    console.log(`\n🔍 Round ${i}: Processing ${current}`);

    if (current === candidate) {
      count++;
      console.log(`   ✅ MATCH! count++ = ${count}`);
    } else {
      count--;
      console.log(`   ❌ MISMATCH! count-- = ${count}`);

      if (count === 0) {
        console.log(`   💥 ELIMINATION! New candidate: ${current}`);
        candidate = current;
        count = 1;
      }
    }

    console.log(`   📊 State: candidate=${candidate}, count=${count}`);
  }

  console.log(`\n🏆 Final survivor: ${candidate}`);

  // Verification for educational purposes
  const actualCount = nums.filter((x) => x === candidate).length;
  const threshold = Math.floor(nums.length / 2);
  console.log(
    `✅ Verification: ${candidate} appears ${actualCount}/${nums.length} times`
  );
  console.log(
    `📈 Is majority? ${
      actualCount > threshold ? "YES ✅" : "NO ❌"
    } (needs > ${threshold})`
  );

  return candidate;
}

// 🎯 Try these examples:
// majorityElementDebug([3,2,3]);
// majorityElementDebug([2,2,1,1,1,2,2]);
// majorityElementDebug([1,1,1,1,1]);
// majorityElementDebug([1,2,1,2,1]);
```

---

## 🎉 **Selamat!**

Kamu sudah berhasil memahami dan mengimplementasikan berbagai algoritma untuk **Majority Element** dengan pemahaman mendalam tentang Boyer-Moore Voting Algorithm!

**💡 Key Takeaways:**

- **🥇 Boyer-Moore is brilliant:** O(n) time, O(1) space dengan elegant "battle" logic
- **📊 Multiple approaches:** HashMap, Sorting, Divide&Conquer, Bit Manipulation untuk educational purpose
- **🧠 Core insight:** Majority element akan "survive" dalam voting battle karena dominan > 50%
- **⚡ Optimal solution:** Single pass, constant space, works tanpa extra memory

**🚀 Next Steps:**

- Explore **Majority Element II** (LeetCode #229) untuk > n/3 case
- Practice **generalized Boyer-Moore** untuk arbitrary k-majority
- Apply pattern ke **distributed consensus algorithms**
- Master **stream processing** applications dengan sliding windows

**🎯 Master Achievement Unlocked:**

- ✅ Boyer-Moore Voting Algorithm Mastery
- ✅ Multiple Algorithm Approaches Understanding
- ✅ Complexity Analysis Expertise
- ✅ Real-world Applications Recognition
- ✅ Advanced Optimization Techniques

Keep coding and happy learning! 🌟

---

## 📚 **Appendix: Complete Code Reference**

### 🎯 **All Algorithm Implementations**

```typescript
// 1. 👑 Boyer-Moore Voting (Optimal)
function majorityElementBoyerMoore(nums: number[]): number {
  let candidate = nums[0],
    count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) count++;
    else if (--count === 0) (candidate = nums[i]), (count = 1);
  }

  return candidate;
}

// 2. 📊 HashMap Counter
function majorityElementHashMap(nums: number[]): number {
  const count = new Map<number, number>();
  const majority = Math.floor(nums.length / 2);

  for (const num of nums) {
    const currentCount = (count.get(num) || 0) + 1;
    count.set(num, currentCount);
    if (currentCount > majority) return num;
  }

  return nums[0];
}

// 3. 🔀 Sorting Approach
function majorityElementSort(nums: number[]): number {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
}

// 4. 🌳 Divide and Conquer
function majorityElementDC(nums: number[]): number {
  function helper(left: number, right: number): number {
    if (left === right) return nums[left];

    const mid = Math.floor((left + right) / 2);
    const leftMaj = helper(left, mid);
    const rightMaj = helper(mid + 1, right);

    if (leftMaj === rightMaj) return leftMaj;

    const leftCount = nums
      .slice(left, right + 1)
      .filter((x) => x === leftMaj).length;
    const rightCount = nums
      .slice(left, right + 1)
      .filter((x) => x === rightMaj).length;

    return leftCount > rightCount ? leftMaj : rightMaj;
  }

  return helper(0, nums.length - 1);
}

// 5. 🔢 Bit Manipulation
function majorityElementBit(nums: number[]): number {
  let result = 0;

  for (let bit = 0; bit < 32; bit++) {
    let ones = 0;
    for (const num of nums) {
      if ((num >> bit) & 1) ones++;
    }
    if (ones > nums.length / 2) {
      result |= 1 << bit;
    }
  }

  return result;
}
```

### 📊 **Performance Benchmarks**

| Algorithm        | Time       | Space    | Best Use Case                              |
| ---------------- | ---------- | -------- | ------------------------------------------ |
| Boyer-Moore      | O(n)       | O(1)     | 🥇 Production, memory-constrained          |
| HashMap          | O(n)       | O(n)     | 📊 Need frequencies, no majority guarantee |
| Sorting          | O(n log n) | O(1)     | 🔀 Simple implementation, small arrays     |
| Divide&Conquer   | O(n log n) | O(log n) | 🌳 Educational, parallel processing        |
| Bit Manipulation | O(32n)     | O(1)     | 🔢 Integers only, constant factor          |
| Randomized       | O(n) exp   | O(1)     | 🎲 Probabilistic, interesting approach     |

**🏆 Winner: Boyer-Moore Voting Algorithm - Perfect combination of optimal time/space complexity dengan elegant algorithmic insight!**
