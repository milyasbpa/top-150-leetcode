# 🎯 Remove Duplicates from Sorted Array II - Seperti Merapikan Koleksi Kartu dengan Aturan "Maksimal Dua"

## 📚 Apa itu Problem Ini?

Bayangkan kamu punya koleksi kartu yang sudah **diurutkan rapi** dari kecil ke besar, tapi ada beberapa kartu yang **duplikat**. Misalnya kartu: 1, 1, 1, 2, 2, 3. Kali ini aturannya berbeda dari sebelumnya - sekarang kamu boleh **menyimpan maksimal 2 kartu dari setiap jenis**, bukan cuma satu. Hasil akhirnya: 1, 1, 2, 2, 3 (buang 1 kartu As yang ketiga).

### 🎯 Problem Statement

**LeetCode #80 - Remove Duplicates from Sorted Array II**

Sekarang mari kita translate analogi tadi ke bahasa programming yang sebenarnya:

#### 📖 **Kamus Sederhana (Glossary)**

Sebelum kita lanjut, mari kenalan dulu dengan istilah-istilah yang akan kita pakai:

- **At Most Twice** = "Maksimal dua kali" (setiap angka boleh muncul 1-2 kali, tapi tidak lebih)
- **Remove Some Duplicates** = "Buang sebagian duplikat" (bukan semua duplikat, hanya yang berlebihan)
- **3rd+ Occurrences** = "Kemunculan ketiga dan seterusnya" (yang harus dibuang)
- **Valid Occurrences** = "Kemunculan yang valid" (1st dan 2nd occurrence)
- **k-2 Comparison** = "Perbandingan dengan element 2 posisi sebelumnya"

#### 🔄 **Dari Analogi ke Technical Language**

**Yang tadi kita bilang:**

> "Koleksi kartu yang sudah diurutkan rapi, menyimpan maksimal 2 kartu dari setiap jenis"

**Dalam bahasa programming:**

> Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears **at most twice**

**Yang tadi kita bilang:**

> "Buang kartu As yang ketiga, tapi sisakan dua kartu As pertama"

**Dalam bahasa programming:**

> Remove 3rd+ occurrences while keeping 1st and 2nd occurrences of each element

**Yang tadi kita bilang:**

> "Hitung berapa kartu yang tersisa setelah aturan maksimal dua"

**Dalam bahasa programming:**

> Return k after placing the final result in the first k slots of nums

### 📝 Contoh-contoh

Mari kita lihat beberapa contoh konkret untuk memahami masalahnya lebih baik:

**Contoh 1:**

```
Input: nums = [1,1,1,2,2,3]
Output: k = 5, nums = [1,1,2,2,3,_]

Penjelasan Analogi:
- Kartu awal: [As♠, As♥, As♦, Dua♠, Dua♥, Tiga♠]
- Aturan: maksimal 2 kartu per jenis
- As: ambil 2, buang 1 → [As♠, As♥]
- Dua: sudah 2, tidak ada yang dibuang → [Dua♠, Dua♥]
- Tiga: cuma 1, tetap → [Tiga♠]
- Hasil: [As♠, As♥, Dua♠, Dua♥, Tiga♠, _]

Penjelasan Technical:
- Array awal: [1,1,1,2,2,3] (sorted dengan excess duplicates)
- Remove 3rd occurrence of 1: [1,1,2,2,3]
- First k=5 elements: [1,1,2,2,3,_]
- Return k = 5
```

**Contoh 2:**

```
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: k = 7, nums = [0,0,1,1,2,3,3,_,_]

Penjelasan Analogi:
- Kartu awal: [0,0,1,1,1,1,2,3,3] (angka 1 muncul 4 kali!)
- Aturan maksimal 2 per jenis:
  - 0: ambil 2 → [0,0]
  - 1: ambil 2, buang 2 → [1,1]
  - 2: ambil 1 → [2]
  - 3: ambil 2 → [3,3]
- Hasil: [0,0,1,1,2,3,3,_,_]

Penjelasan Technical:
- Array awal: [0,0,1,1,1,1,2,3,3] (1 appears 4 times)
- Keep at most 2 of each: [0,0,1,1,2,3,3]
- First k=7 elements contain valid result
- Return k = 7
```

**Contoh 3:**

```
Input: nums = [1,1,2,2,3,3]
Output: k = 6, nums = [1,1,2,2,3,3]

Penjelasan Analogi:
- Setiap kartu sudah muncul tepat 2 kali
- Tidak ada yang perlu dibuang
- Semua kartu tetap di tempatnya

Penjelasan Technical:
- Each element appears exactly twice
- Already satisfies "at most twice" condition
- No removal needed, return original length
```

**Contoh 4:**

```
Input: nums = [1,1,1,1,1]
Output: k = 2, nums = [1,1,_,_,_]

Penjelasan Analogi:
- Lima kartu As semua sama
- Ambil 2, buang 3
- Hasil: [As, As, _, _, _]

Penjelasan Technical:
- All elements are same (1 appears 5 times)
- Keep only first 2 occurrences
- Return k = 2
```

**Contoh 5:**

```
Input: nums = [1,2,3,4,5]
Output: k = 5, nums = [1,2,3,4,5]

Penjelasan Analogi:
- Semua kartu sudah unik
- Tidak ada duplikat untuk dibuang
- Semua tetap di tempatnya

Penjelasan Technical:
- No duplicates present
- All elements already satisfy "at most twice"
- Return original length k = 5
```

### 🎯 Batasan-Batasan (Constraints)

Mari kita translate aturan main LeetCode ke bahasa sehari-hari:

#### 📏 **Ukuran Koleksi**

```
Technical: 1 <= nums.length <= 3 * 10^4
Analogi: Koleksi minimal 1 kartu, maksimal 30.000 kartu
```

#### 🎨 **Nilai Kartu**

```
Technical: -10^4 <= nums[i] <= 10^4
Analogi: Setiap kartu punya nomor dari -10.000 sampai 10.000
(Range lebih besar dari problem sebelumnya)
```

#### 📊 **Urutan Kartu**

```
Technical: nums is sorted in non-decreasing order
Analogi: Kartu sudah diurutkan dari kecil ke besar (atau sama)
Contoh: [0,0,1,1,1,2,3,3] ✅
```

### 📋 Syarat Utama

Mari kita pahami aturan main yang harus kita ikuti:

#### 🔄 **Modifikasi in-place dengan O(1) memory**

```
Technical: Modify input array in-place with O(1) extra memory
Analogi: Rapikan kartu di tumpukan yang sama, cuma boleh pakai 2 jari untuk nunjuk
Kenapa: Memory constraint yang ketat, tidak boleh pakai array tambahan
```

#### 📊 **At Most Twice Rule**

```
Technical: Each unique element appears at most twice
Analogi: Setiap jenis kartu maksimal boleh ada 2
Challenge: Bedakan occurrence ke-1, ke-2 (keep) vs ke-3+ (remove)
```

#### 🎯 **Return count dan arrange result**

```
Technical: Return k, first k elements contain final result
Analogi: Hitung berapa kartu tersisa, susun rapi di depan
Target: k = jumlah kartu yang memenuhi aturan "maksimal dua"
```

## 🤔 Intuisi Dasar: Dari "At Most 1" ke "At Most 2"

Sekarang setelah kita paham problem statement-nya, mari kita cari tahu **apa yang berubah** dari problem sebelumnya dan **bagaimana strategi harus disesuaikan**.

### 🔍 **Evolution: Remove Duplicates I → Remove Duplicates II**

Mari kita bandingkan dengan problem sebelumnya:

**Remove Duplicates I (Problem #3):**

```
Input: [1,1,2,2,3]
Goal: At most 1 occurrence → [1,2,3]
Strategy: Compare dengan nums[i-1], skip jika sama

Analogi: Dari setiap jenis kartu, ambil hanya 1
```

**Remove Duplicates II (Problem #4):**

```
Input: [1,1,1,2,2,3]
Goal: At most 2 occurrences → [1,1,2,2,3]
Strategy: Compare dengan nums[k-2], skip jika sama

Analogi: Dari setiap jenis kartu, ambil maksimal 2
```

### 🎯 **Key Insight: The Magic of k-2 Comparison**

**Insight cemerlang: Untuk allow "at most 2", compare dengan element 2 posisi sebelumnya!**

**Mengapa k-2 bukan k-1?**

Mari kita trace dengan contoh `[1,1,1,2,2]`:

```
At most 1 (Problem #3):
Compare dengan k-1:
[1,1,1,2,2] → nums[1]=1 vs nums[0]=1 → same, skip
Result: [1,2] ✓

At most 2 (Problem #4):
Compare dengan k-2:
[1,1,1,2,2] → nums[2]=1 vs nums[0]=1 → same, skip (3rd occurrence!)
             → nums[3]=2 vs nums[1]=1 → diff, keep
Result: [1,1,2,2] ✓
```

**Brilliant Pattern:**

- **At most 1:** Compare dengan `nums[k-1]`
- **At most 2:** Compare dengan `nums[k-2]`
- **At most K:** Compare dengan `nums[k-K]`

### 🚨 **Mengapa Tidak Bisa Pakai Count-based Approach?**

Sebenarnya bisa, tapi **kurang elegant**:

**❌ Count-based approach:**

```typescript
function removeDuplicatesCount(nums: number[]): number {
  let k = 1,
    count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      count++;
    } else {
      count = 1;
    }

    if (count <= 2) {
      // Extra condition check
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

**✅ k-2 comparison approach:**

```typescript
function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let k = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 2]) {
      // Simple comparison!
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

**Keunggulan k-2 approach:**

- ✅ **Simpler logic:** Tidak perlu track count
- ✅ **Generalizable:** Easy extension ke "at most K"
- ✅ **Less state:** Tidak perlu variable tambahan

### 🎯 **Solusi yang Benar: Modified Two Pointer dengan k-2**

**Ide cemerlang: Gunakan "jarak 2" untuk detect 3rd occurrence!**

#### 💡 **Step-by-Step Logic:**

**Step 1: Setup awal**

```
Analogi:
Kartu: [1, 1, 1, 2, 2, 3]
        ↑  ↑  ↑
        0  1  k=2 (mulai dari sini)
              i=2 (periksa dari sini)

Technical:
nums = [1,1,1,2,2,3]
k=2 (posisi untuk elemen valid berikutnya)
i=2 (mulai periksa dari index 2)
```

**Mengapa start dari k=2, i=2?**

- 2 elemen pertama **pasti valid** (at most 2, jadi 1st dan 2nd selalu OK)
- Mulai periksa dari elemen ke-3 (potential 3rd occurrence)

**Step 2: Check dengan k-2 distance**

```
Analogi:
i=2: Bandingkan kartu ke-3 dengan kartu ke-1
     Kartu[2]=1 vs Kartu[0]=1 → sama!
     → Ini occurrence ke-3 dari angka 1, buang!

Technical:
i=2: nums[2]=1 vs nums[k-2]=nums[0]=1 → same
     → This is 3rd occurrence of 1, skip!
     → k stays 2, i moves to 3
```

**Step 3: Continue pattern**

```
i=3: nums[3]=2 vs nums[k-2]=nums[0]=1 → different
     → This is 1st occurrence of 2, keep!
     → nums[2]=2, k=3, i=4

i=4: nums[4]=2 vs nums[k-2]=nums[1]=1 → different
     → This is 2nd occurrence of 2, keep!
     → nums[3]=2, k=4, i=5

i=5: nums[5]=3 vs nums[k-2]=nums[2]=2 → different
     → This is 1st occurrence of 3, keep!
     → nums[4]=3, k=5

Final: [1,1,2,2,3,_], k=5 ✓
```

#### 🎯 **Kenapa k-2 Distance Brilliant?**

**Magic insight:**

```
If nums[i] === nums[k-2], then nums[i] is AT LEAST the 3rd occurrence!

Proof:
- Position k-2: 1st occurrence of this value (worst case)
- Position k-1: 2nd occurrence of this value (worst case)
- Position i: Would be 3rd occurrence → SKIP!
```

**Visual proof:**

```
[..., X, X, ..., X]
      ↑  ↑       ↑
     k-2 k-1     i

If nums[i] == nums[k-2], maka ada minimal 3 X: k-2, k-1, i
→ nums[i] is 3rd+ occurrence → skip!
```

---

## 🎯 Strategi Penyelesaian

Sekarang mari kita translate pemikiran tadi menjadi kode yang efisien!

### 🎮 **Setup "Pemain" untuk Modified Two Pointer**

Seperti problem sebelumnya, kita butuh **2 pointer**, tapi dengan **twist untuk "at most 2"**:

#### 🤔 **Modified Pointer Strategy**

**👈 Pointer #1: Slow Pointer (k)**

```
Kartu: [1, 1, _, _, _]
            ↑
        Jari #1 tunjuk kesini (posisi untuk kartu valid berikutnya)
```

- **Tugasnya:** Tunjuk posisi untuk **elemen valid** berikutnya (at most 2nd occurrence)
- **Nama variabelnya:** `k` (dari "keep valid")
- **Start dari:** `k = 2` (bukan 1, karena 2 elemen pertama pasti valid!)

**👉 Pointer #2: Fast Pointer (i)**

```
Kartu: [1, 1, 1, 2, 2, 3]
                ↑
            Jari #2 tunjuk kesini (kartu yang sedang diperiksa)
```

- **Tugasnya:** Tunjuk kartu yang **sedang diperiksa** sekarang
- **Nama variabelnya:** `i` (dari "iterate")
- **Start dari:** `i = 2` (bukan 0, karena 2 kartu pertama sudah pasti valid!)

#### 🆚 **Evolusi dari Problem Sebelumnya:**

| Aspect      | Remove Duplicates I (#26) | Remove Duplicates II (#80) |
| ----------- | ------------------------- | -------------------------- |
| **Start k** | `k = 1`                   | `k = 2`                    |
| **Start i** | `i = 1`                   | `i = 2`                    |
| **Compare** | `nums[i] !== nums[i-1]`   | `nums[i] !== nums[k-2]`    |
| **Logic**   | Skip all duplicates       | Skip 3rd+ occurrences      |
| **Allow**   | At most 1                 | At most 2                  |

#### 🏃‍♂️ **Gerakan Pointer Pattern:**

**📍 Jari #1 (k): Conditional Movement**

```
Awal:    [1, 1, _, _, _]     k=2 (siap terima elemen valid ketiga)
Step 1:  [1, 1, 2, _, _]     k=3 (angka 2 valid, siap terima elemen keempat)
Step 2:  [1, 1, 2, 2, _]     k=4 (angka 2 kedua valid, siap terima kelima)
Step 3:  [1, 1, 2, 2, 3]     k=5 (angka 3 valid, done!)
```

**📍 Jari #2 (i): Always Moving**

```
Awal:    [1, 1, 1, 2, 2, 3]    i=2 (periksa elemen ketiga)
Step 1:  [1, 1, 1, 2, 2, 3]    i=3 (periksa elemen keempat)
Step 2:  [1, 1, 1, 2, 2, 3]    i=4 (periksa elemen kelima)
Step 3:  [1, 1, 1, 2, 2, 3]    i=5 (periksa elemen keenam)
Step 4:  Done! (i >= nums.length)
```

### 🔧 **Implementasi: Dari Konsep ke Kode**

#### 💭 **Step 1: Handle Edge Cases**

**🧠 Logika:** "Array dengan ≤ 2 elemen sudah pasti memenuhi syarat 'at most 2'"

```typescript
// Edge case: arrays with length <= 2 already satisfy condition
if (nums.length <= 2) return nums.length;

// Why? Examples:
// [1] → at most 2? ✓ (1 occurrence)
// [1,1] → at most 2? ✓ (2 occurrences)
// [1,2] → at most 2? ✓ (1 each)
```

#### 🔍 **Step 2: Setup Variables**

**🧠 Logika:** "2 elemen pertama pasti valid, mulai periksa dari elemen ketiga"

```typescript
// Setup: posisi awal untuk kedua pointer
let k: number = 2; // 👈 Posisi untuk elemen valid berikutnya (mulai dari index 2!)
// i akan diatur di loop mulai dari 2  // 👉 Periksa mulai dari elemen ketiga
```

**🤔 Kenapa k dan i dimulai dari 2?**

- Elemen di index 0 dan 1 **pasti valid** (maksimal 2 occurrence, jadi 1st dan 2nd OK)
- Mulai detect "3rd occurrence" dari index 2

#### 🔍 **Step 3: Main Loop dengan k-2 Comparison**

**🧠 Logika:** "Compare setiap elemen dengan elemen 2 posisi sebelumnya di result"

```typescript
// Loop utama: mulai dari elemen ketiga (index 2)
for (let i = 2; i < nums.length; i++) {
  // 👉 Compare dengan elemen 2 posisi sebelumnya di result array
  if (nums[i] !== nums[k - 2]) {
    // Elemen valid! (bukan 3rd+ occurrence)
    nums[k] = nums[i];
    k++; // 👈 Pindah ke posisi berikutnya
  }
  // Kalau nums[i] === nums[k-2], ini 3rd+ occurrence → skip
}
```

#### 🔢 **Step 4: Return Count**

```typescript
return k; // Jumlah elemen yang memenuhi "at most 2" rule
```

#### 🔧 **Kode Lengkap: Solusi Final**

```typescript
function removeDuplicates(nums: number[]): number {
  // Step 1: Handle edge cases
  if (nums.length <= 2) return nums.length;

  // Step 2: Setup variables (2 elemen pertama pasti valid)
  let k: number = 2; // 👈 Posisi untuk elemen valid berikutnya

  // Step 3: Main loop (periksa dari elemen ketiga)
  for (let i = 2; i < nums.length; i++) {
    // 👉 Compare dengan elemen 2 posisi sebelumnya
    if (nums[i] !== nums[k - 2]) {
      // Valid element! (at most 2nd occurrence)
      nums[k] = nums[i];
      k++;
    }
    // 3rd+ occurrence → skip, k tidak berubah
  }

  // Step 4: Return count
  return k; // Jumlah elemen valid
}
```

#### 🎭 **Testing: Trace Kode dengan Contoh**

Mari kita test kode kita dengan contoh: `nums = [0,0,1,1,1,1,2,3,3]`

```typescript
// Initial setup
k = 2 (elemen nums[0]=0, nums[1]=0 sudah pasti valid)
nums = [0,0,1,1,1,1,2,3,3]

// Iteration 1: i=2
nums[2] = 1, nums[k-2] = nums[0] = 0 → berbeda, valid
nums[2] = nums[2] = 1, k = 3
// Result: [0,0,1,1,1,1,2,3,3], k=3

// Iteration 2: i=3
nums[3] = 1, nums[k-2] = nums[1] = 0 → berbeda, valid
nums[3] = nums[3] = 1, k = 4
// Result: [0,0,1,1,1,1,2,3,3], k=4

// Iteration 3: i=4
nums[4] = 1, nums[k-2] = nums[2] = 1 → sama, 3rd occurrence!
skip, k tetap 4
// Result: [0,0,1,1,1,1,2,3,3], k=4

// Iteration 4: i=5
nums[5] = 1, nums[k-2] = nums[2] = 1 → sama, 4th occurrence!
skip, k tetap 4
// Result: [0,0,1,1,1,1,2,3,3], k=4

// Iteration 5: i=6
nums[6] = 2, nums[k-2] = nums[2] = 1 → berbeda, valid
nums[4] = nums[6] = 2, k = 5
// Result: [0,0,1,1,2,1,2,3,3], k=5

// Iteration 6: i=7
nums[7] = 3, nums[k-2] = nums[3] = 1 → berbeda, valid
nums[5] = nums[7] = 3, k = 6
// Result: [0,0,1,1,2,3,2,3,3], k=6

// Iteration 7: i=8
nums[8] = 3, nums[k-2] = nums[4] = 2 → berbeda, valid
nums[6] = nums[8] = 3, k = 7
// Result: [0,0,1,1,2,3,3,3,3], k=7

// Final: k=7, first 7 elements = [0,0,1,1,2,3,3] ✅
```

---

## 🚀 **Advanced Topics & Analysis**

Sekarang mari kita explore topik-topik advanced dan generalization!

### ⚡ **Time & Space Complexity Analysis**

#### 📊 **Time Complexity: O(n)**

```
Analogi:
Seperti melihat setiap kartu tepat sekali saja, dan cuma compare
dengan kartu 2 posisi sebelumnya (bukan dengan semua kartu).

Technical Analysis:
- Best case: O(n) - harus periksa semua elemen
- Worst case: O(n) - periksa semua elemen tepat sekali
- Average case: O(n)

Proof:
- Single loop: iterate melalui n-2 elements (start from index 2)
- Constant work per iteration: one comparison + conditional assignment
- Total: O(n-2) × O(1) = O(n)
```

#### 💾 **Space Complexity: O(1)**

```
Analogi:
Kita tidak butuh tumpukan kartu tambahan, cukup gunakan 2 jari
untuk menunjuk posisi di tumpukan yang sama.

Technical Analysis:
- Auxiliary space: Hanya 2 variables (i, k) = O(1)
- In-place modification: Menggunakan array yang sama
- No additional data structures

Space-efficient karena:
✅ Menggunakan array yang sudah ada
✅ Constant extra space regardless of input size
✅ No hash tables, sets, or counters needed
```

### 🔄 **Algorithm Variations & Extensions**

#### 🥊 **Comparison: Count-based vs k-2 Approach**

**Count-based Approach:**

```typescript
function removeDuplicatesCount(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let k = 1,
    count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      count++;
    } else {
      count = 1;
    }

    if (count <= 2) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

**k-2 Approach:**

```typescript
function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let k = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 2]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

**Comparison:**
| Aspect | Count-based | k-2 Approach |
|--------|-------------|--------------|
| **Variables** | k, count, i | k, i |
| **Logic complexity** | Track count + reset | Simple comparison |
| **Generalizability** | Hard to extend | Easy to extend |
| **Code lines** | More | Fewer |
| **Mental model** | Count occurrences | Distance-based |

#### 🌟 **Generalized Solution: At Most K Duplicates**

**The Ultimate Pattern:**

```typescript
// 🎯 Generalized: Allow at most k duplicates
function removeDuplicatesGeneral(nums: number[], maxAllowed: number): number {
  if (nums.length <= maxAllowed) return nums.length;

  let writeIndex = maxAllowed;

  for (let i = maxAllowed; i < nums.length; i++) {
    // Compare with element maxAllowed positions back
    if (nums[i] !== nums[writeIndex - maxAllowed]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}

// Usage examples:
// removeDuplicatesGeneral(nums, 1) → Remove Duplicates I
// removeDuplicatesGeneral(nums, 2) → Remove Duplicates II
// removeDuplicatesGeneral(nums, 3) → Allow at most 3 duplicates
```

**Pattern Recognition:**

- **At most 1:** Compare with `nums[k-1]`
- **At most 2:** Compare with `nums[k-2]`
- **At most K:** Compare with `nums[k-K]`

**Brilliant insight: The distance tells you the max allowed!**

### 🎯 **Optimization Techniques**

#### 🔀 **Early Termination Optimization**

```typescript
// 🎯 Optimized version with early termination
function removeDuplicatesOptimized(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let k = 2;

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 2]) {
      // Optimization: avoid unnecessary assignment
      if (k !== i) {
        nums[k] = nums[i];
      }
      k++;
    }
  }

  return k;
}
```

#### 🚀 **Performance Analysis**

**Best Case Scenario:**

- Array sudah memenuhi "at most 2" rule
- Example: `[1,1,2,2,3,3]`
- All elements kept, minimal array modifications

**Worst Case Scenario:**

- Banyak elements dengan 3+ occurrences
- Example: `[1,1,1,1,1,1,1]` → keep only first 2
- Maximum number of skips

**Average Case:**

- Mixed pattern dengan some 3+ duplicates
- Balanced between keep dan skip operations

### 🧠 **Problem Extensions & Related Problems**

#### 🔢 **LeetCode Problem Family:**

1. **Remove Duplicates from Sorted Array I** (LeetCode #26)

   - Allow at most 1 occurrence
   - Base case of our generalized solution

2. **Remove Duplicates from Sorted Array II** (LeetCode #80)

   - Our current problem - at most 2 occurrences
   - Extension of #26

3. **Remove Element** (LeetCode #27)

   - Remove specific value completely
   - Different logic: value-based vs occurrence-based

4. **Move Zeroes** (LeetCode #283)
   - Move specific elements to end
   - Similar two-pointer technique

#### 🏗️ **Real-world Applications:**

**Data Deduplication:**

- File systems removing duplicate files
- Database query optimization
- Log file processing

**Stream Processing:**

- Real-time data filtering
- Rate limiting (allow max N requests per user)
- Cache management

**Memory Management:**

- Garbage collection optimization
- Buffer management with limits

---

## 🎮 **Interactive Learning & Practice**

Mari kita test pemahaman kamu dengan quiz dan challenges!

### 🧩 **Quiz: Test Your Understanding**

#### **Quiz 1: Why Start from Index 2?**

**❓ Pertanyaan:** Mengapa kita mulai k=2 dan i=2, bukan dari 0 seperti problem lainnya?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena **2 elemen pertama pasti memenuhi "at most 2" rule**!

**Analogi:** Dalam aturan "maksimal 2 kartu per jenis", kartu pertama dan kedua dari jenis apapun pasti valid. Baru mulai ada masalah di kartu ketiga (potential 3rd occurrence).

**Technical:**

- `nums[0]` = 1st occurrence → always valid
- `nums[1]` = at most 2nd occurrence → always valid
- `nums[2]` = potential 3rd occurrence → need to check!

**Proof with examples:**

```typescript
[1] → 1 element, all valid
[1,1] → 2 elements, all valid
[1,2] → 2 different elements, all valid
[1,1,1] → 3rd element needs checking
```

</details>

#### **Quiz 2: Magic of k-2 Distance**

**❓ Pertanyaan:** Kenapa compare dengan `nums[k-2]` bisa detect 3rd occurrence?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena **jarak 2 memastikan maximum 2 occurrences**!

**Visual explanation:**

```
Position:  k-2  k-1   k    i
Array:     [X]  [?]  [?]  [X]

If nums[i] == nums[k-2]:
- Position k-2: 1st occurrence of X (worst case)
- Position k-1: 2nd occurrence of X (worst case)
- Position i: Would be 3rd occurrence of X → SKIP!
```

**Brilliant insight:** Distance of 2 positions = maximum 2 occurrences allowed between them!

**Generalization:** For "at most K", use distance K (`nums[writeIndex - K]`)

</details>

#### **Quiz 3: Edge Case Mastery**

**❓ Pertanyaan:** Apa output untuk `nums = [1,1,1,1,1,1]`?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** `k = 2`, result = `[1,1,_,_,_,_]`

**Step-by-step trace:**

```typescript
Initial: [1,1,1,1,1,1], k=2

i=2: nums[2]=1 vs nums[k-2]=nums[0]=1 → same, skip, k=2
i=3: nums[3]=1 vs nums[k-2]=nums[0]=1 → same, skip, k=2
i=4: nums[4]=1 vs nums[k-2]=nums[0]=1 → same, skip, k=2
i=5: nums[5]=1 vs nums[k-2]=nums[0]=1 → same, skip, k=2

Final: k=2, nums = [1,1,_,_,_,_]
```

**Key insight:** Semua elemen sama → hanya 2 occurrence pertama yang valid!

</details>

### 🏆 **Challenges: Practice Makes Perfect**

#### **Challenge 1: Algorithm Trace**

**🎯 Task:** Trace step-by-step untuk input:

```
Input: nums = [1,1,1,2,2,2,2,3]
Expected: k = 6, result = [1,1,2,2,3,?]
```

<details>
<summary>💪 Click untuk melihat solution</summary>

```typescript
// Initial: k=2, nums=[1,1,1,2,2,2,2,3]

// i=2: nums[2]=1 vs nums[0]=1 → same, skip (3rd occurrence of 1)
// k stays 2 → [1,1,1,2,2,2,2,3]

// i=3: nums[3]=2 vs nums[0]=1 → different, keep (1st occurrence of 2)
// nums[2]=2, k=3 → [1,1,2,2,2,2,2,3]

// i=4: nums[4]=2 vs nums[1]=1 → different, keep (2nd occurrence of 2)
// nums[3]=2, k=4 → [1,1,2,2,2,2,2,3]

// i=5: nums[5]=2 vs nums[2]=2 → same, skip (3rd occurrence of 2)
// k stays 4 → [1,1,2,2,2,2,2,3]

// i=6: nums[6]=2 vs nums[2]=2 → same, skip (4th occurrence of 2)
// k stays 4 → [1,1,2,2,2,2,2,3]

// i=7: nums[7]=3 vs nums[2]=2 → different, keep (1st occurrence of 3)
// nums[4]=3, k=5 → [1,1,2,2,3,2,2,3]

// Final: k=5, first 5 elements = [1,1,2,2,3] ✅
```

</details>

#### **Challenge 2: Generalization Test**

**🎯 Task:** Implement dan test "at most 3" version:

```typescript
// Allow at most 3 duplicates
function removeDuplicates3(nums: number[]): number {
  // Your implementation here
}

// Test case:
nums = [1, 1, 1, 1, 2, 2, 2, 3];
// Expected result: [1,1,1,2,2,2,3] (k=7)
```

<details>
<summary>🧠 Click untuk melihat solution</summary>

```typescript
function removeDuplicates3(nums: number[]): number {
  if (nums.length <= 3) return nums.length;

  let k = 3; // Start from index 3

  for (let i = 3; i < nums.length; i++) {
    // Compare with element 3 positions back
    if (nums[i] !== nums[k - 3]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}

// Test:
const nums = [1, 1, 1, 1, 2, 2, 2, 3];
const k = removeDuplicates3(nums);
console.log(k); // 7
console.log(nums.slice(0, k)); // [1,1,1,2,2,2,3]
```

**Pattern confirmed:** For "at most K", compare with `nums[k-K]`!

</details>

#### **Challenge 3: Bug Detective**

**🎯 Task:** Find dan fix bug di kode ini:

```typescript
function removeDuplicatesBuggy(nums: number[]): number {
  let k = 2;

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      // 🐛 Bug here?
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

<details>
<summary>🔍 Click untuk melihat bug analysis</summary>

**🐛 Bug Analysis:**

**Bug:** `nums[k - 1]` should be `nums[k - 2]`

**Why it's wrong:**

- `k - 1` comparison allows only 1 duplicate (like Remove Duplicates I)
- For "at most 2", need `k - 2` comparison

**Example failure:**

```typescript
Input: [1,1,1,2]
With bug: nums[2]=1 vs nums[k-1]=nums[1]=1 → same, skip
Result: [1,1,2,_] ✗ (should keep second 1)

Fixed: nums[2]=1 vs nums[k-2]=nums[0]=1 → same, skip
Result: [1,1,2,_] ✓ (correctly keeps two 1's)
```

**✅ Fixed version:**

```typescript
function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let k = 2;

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 2]) {
      // Fix: k-2 not k-1
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

</details>

### 🎨 **Visual Learning: Rich Diagrams**

#### **📊 Algorithm Evolution Comparison**

```
Remove Duplicates I (#26):
Input:  [1,1,2,2,3]
Logic:  Compare with k-1 (allow at most 1)
Output: [1,2,3]

Remove Duplicates II (#80):
Input:  [1,1,1,2,2,3]
Logic:  Compare with k-2 (allow at most 2)
Output: [1,1,2,2,3]

Generalized (at most K):
Logic:  Compare with k-K (allow at most K)
```

#### **🎯 k-2 Distance Visualization**

```
Array: [1, 1, 1, 2, 2, 3]
Index:  0  1  2  3  4  5

Step 1: k=2, i=2
        Compare nums[2]=1 vs nums[0]=1
        [1][1][1] 2  2  3
         ↑     ↑
        k-2    i
        Same → Skip (3rd occurrence)

Step 2: k=2, i=3
        Compare nums[3]=2 vs nums[0]=1
        [1][1] 1 [2] 2  3
         ↑        ↑
        k-2       i
        Different → Keep (1st occurrence of 2)
```

#### **⚡ Performance Visualization**

```
Time Complexity Comparison:
Naive O(n²)         : ████████████████████████████████
Count-based O(n)    : ████████████████████
k-2 approach O(n)   : ████████████████████

Space Complexity:
Extra arrays O(n)   : ████████████████████
Count-based O(1)    : ██
k-2 approach O(1)   : ██

Code Complexity:
Count-based         : ████████████ (multiple variables)
k-2 approach        : ████████ (simple comparison)
```

### 🎪 **Interactive Code Playground**

#### **🛠️ Debug-Friendly Implementation**

```typescript
function removeDuplicatesDebug(nums: number[]): number {
  console.log(`🏁 START: nums=[${nums}]`);

  if (nums.length <= 2) {
    console.log(
      `📭 Array length ≤ 2, all elements valid, return ${nums.length}`
    );
    return nums.length;
  }

  let k = 2;
  console.log(
    `🎯 First 2 elements nums[0]=${nums[0]}, nums[1]=${nums[1]} always valid, k=${k}`
  );

  for (let i = 2; i < nums.length; i++) {
    const current = nums[i];
    const compareWith = nums[k - 2];

    console.log(
      `\n🔍 Check i=${i}: nums[${i}]=${current} vs nums[${
        k - 2
      }]=${compareWith}`
    );

    if (current !== compareWith) {
      console.log(`✅ Valid! (at most 2nd occurrence) nums[${k}] = ${current}`);
      nums[k] = current;
      k++;
    } else {
      console.log(`❌ Skip! (3rd+ occurrence of ${current})`);
    }

    console.log(`📊 Current: k=${k}, nums=[${nums}]`);
    console.log(`📋 Valid so far: [${nums.slice(0, k)}]`);
  }

  console.log(`\n🎉 FINAL: k=${k}, result=[${nums.slice(0, k)}]`);
  return k;
}

// 🎯 Try these:
// removeDuplicatesDebug([1,1,1,2,2,3]);
// removeDuplicatesDebug([0,0,1,1,1,1,2,3,3]);
// removeDuplicatesDebug([1,1,1,1,1]);
```

---

## 🎉 **Selamat!**

Kamu sudah berhasil memahami dan mengimplementasikan algoritma **Remove Duplicates from Sorted Array II** dengan pendekatan optimal!

**💡 Key Takeaways:**

- **k-2 distance magic:** Compare dengan element 2 posisi sebelumnya untuk detect 3rd occurrence
- **Generalized pattern:** At most K → compare dengan `nums[k-K]`
- **Evolution insight:** From "at most 1" to "at most 2" dengan simple modification
- **O(n) time, O(1) space:** Optimal complexity dengan elegant solution

**🚀 Next Steps:**

- Implement generalized version untuk "at most K"
- Practice dengan different K values (3, 4, 5...)
- Explore related problems: Remove Element, Move Zeroes
- Apply pattern ke non-sorted arrays dengan modifications

**🎯 Master Achievement Unlocked:**

- ✅ Two Pointer Technique Mastery
- ✅ In-place Array Modification
- ✅ Pattern Recognition & Generalization
- ✅ Edge Case Handling

Keep coding and happy learning! 🌟
