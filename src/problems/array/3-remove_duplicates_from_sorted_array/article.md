# 🧹 Remove Duplicates from Sorted Array - Seperti Merapikan Koleksi Kartu yang Berurut

## 📚 Apa itu Problem Ini?

Bayangkan kamu punya koleksi kartu yang sudah **diurutkan rapi** dari kecil ke besar, tapi ada beberapa kartu yang **duplikat**. Misalnya kartu: 1, 1, 2, 3, 3, 3, 4. Sekarang kamu diminta untuk **menghilangkan semua duplikat** sehingga setiap nomor hanya muncul **sekali saja**, tanpa menggunakan kotak baru. Hasil akhirnya harus tetap berurutan: 1, 2, 3, 4.

### 🎯 Problem Statement

**LeetCode #26 - Remove Duplicates from Sorted Array**

Sekarang mari kita translate analogi tadi ke bahasa programming yang sebenarnya:

#### 📖 **Kamus Sederhana (Glossary)**

Sebelum kita lanjut, mari kenalan dulu dengan istilah-istilah yang akan kita pakai:

- **Sorted Array** = "Koleksi kartu yang sudah diurutkan" (array dengan angka berurutan dari kecil ke besar)
- **Duplicates** = "Kartu kembar" (angka yang muncul lebih dari sekali)
- **Non-decreasing order** = "Urutan naik/rata" (tidak ada yang turun: 1,1,2,3,3 ✅ tapi 3,2,1 ❌)
- **Unique elements** = "Kartu unik" (setiap nomor hanya muncul sekali)
- **In-place** = "Tanpa kotak baru" (modifikasi array yang sama)
- **k** = Jumlah kartu unik yang tersisa
- **Relative order** = "Urutan asli tetap dipertahankan"

#### 🔄 **Dari Analogi ke Technical Language**

**Yang tadi kita bilang:**

> "Koleksi kartu yang sudah diurutkan rapi dari kecil ke besar"

**Dalam bahasa programming:**

> Given an integer array `nums` sorted in non-decreasing order

**Yang tadi kita bilang:**

> "Menghilangkan semua duplikat tanpa menggunakan kotak baru"

**Dalam bahasa programming:**

> Remove the duplicates in-place such that each unique element appears only once

**Yang tadi kita bilang:**

> "Setiap nomor hanya muncul sekali saja, tetap berurutan"

**Dalam bahasa programming:**

> The relative order of the elements should be kept the same

**Yang tadi kita bilang:**

> "Hitung berapa kartu unik yang tersisa"

**Dalam bahasa programming:**

> Return the number of unique elements in `nums`

### 📝 Contoh-contoh

Mari kita lihat beberapa contoh konkret untuk memahami masalahnya lebih baik:

**Contoh 1:**

```
Input: nums = [1,1,2]
Output: k = 2, nums = [1,2,_]

Penjelasan Analogi:
- Kartu awal: [As♠, As♥, Dua♠] (dua kartu As, satu kartu Dua)
- Buang kartu As duplikat: [As♠, Dua♠]
- Susun di depan: [As♠, Dua♠, _]
- Jumlah kartu unik: 2

Penjelasan Technical:
- Array awal: [1,1,2] (sudah sorted)
- Remove duplicate 1: [1,2]
- First k=2 elements: [1,2,_]
- Return k = 2
```

**Contoh 2:**

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: k = 5, nums = [0,1,2,3,4,_,_,_,_,_]

Penjelasan Analogi:
- Kartu awal: [0,0,1,1,1,2,2,3,3,4] (banyak kartu kembar)
- Ambil satu dari setiap jenis: [0,1,2,3,4]
- Sisanya jadi tempat kosong: [0,1,2,3,4,_,_,_,_,_]
- Jumlah kartu unik: 5

Penjelasan Technical:
- Array awal: [0,0,1,1,1,2,2,3,3,4] (sorted dengan duplicates)
- Keep only unique: [0,1,2,3,4]
- First k=5 elements contain unique values
- Return k = 5
```

**Contoh 3:**

```
Input: nums = [1]
Output: k = 1, nums = [1]

Penjelasan Analogi:
- Cuma ada satu kartu, pasti unik
- Tidak ada yang perlu dibuang

Penjelasan Technical:
- Single element, already unique
- No duplicates to remove
- Return k = 1
```

**Contoh 4:**

```
Input: nums = [2,2,2,2]
Output: k = 1, nums = [2,_,_,_]

Penjelasan Analogi:
- Semua kartu sama (empat kartu Dua)
- Ambil satu, buang sisanya
- Hasil: [Dua, _, _, _]

Penjelasan Technical:
- All elements are duplicates of 2
- Keep only first occurrence
- Return k = 1
```

**Contoh 5:**

```
Input: nums = [1,2,3,4,5]
Output: k = 5, nums = [1,2,3,4,5]

Penjelasan Analogi:
- Semua kartu sudah unik
- Tidak ada yang perlu dibuang
- Semua tetap di tempatnya

Penjelasan Technical:
- No duplicates present
- All elements are already unique
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
Technical: -100 <= nums[i] <= 100
Analogi: Setiap kartu punya nomor dari -100 sampai 100
```

#### 📊 **Urutan Kartu**

```
Technical: nums is sorted in non-decreasing order
Analogi: Kartu sudah diurutkan dari kecil ke besar (atau sama)
Contoh: [1,1,2,3,3] ✅ tapi [3,2,1] ❌
```

### 📋 Syarat Utama

Mari kita pahami aturan main yang harus kita ikuti:

#### 🔄 **Modifikasi in-place**

```
Technical: Remove duplicates in-place
Analogi: Rapikan kartu di tumpukan yang sama, jangan pakai tumpukan baru
Kenapa: Hemat tempat, seperti merapikan koleksi di kotak aslinya
```

#### 📊 **Urutan harus dipertahankan**

```
Technical: The relative order of elements should be kept the same
Analogi: Kartu yang tersisa harus tetap berurutan seperti semula
Contoh: Dari [1,1,2,3,3] → [1,2,3] (bukan [3,1,2] atau urutan lain)
```

#### 🎯 **Return count**

```
Technical: Return the number of unique elements
Analogi: Hitung berapa jenis kartu yang berbeda
Target: Angka yang dikembalikan = jumlah kartu unik
```

#### 🚨 **Yang di belakang tidak penting**

```
Technical: Remaining elements don't matter
Analogi: Tempat kosong di belakang boleh diisi apa saja
Contoh: Setelah k=3, posisi [3], [4], [5] bisa berisi angka apa saja
```

## 🤔 Intuisi Dasar: Mengapa Ini Berbeda dari Remove Element?

Sekarang setelah kita paham problem statement-nya, mari kita cari tahu **apa yang membuat masalah ini special** dan **kenapa berbeda** dari Remove Element.

### 🔍 **Perbedaan Kunci: Sorted Array vs Unsorted**

Mari kita bandingkan dengan problem sebelumnya:

**Remove Element (Problem #2):**

```
Input: [3,2,2,3], val = 3
Goal: Buang semua angka 3
Challenge: Angka tidak berurutan, harus cek setiap elemen vs target

Analogi: Cari dan buang semua bola merah dari kotak campur aduk
```

**Remove Duplicates (Problem #3):**

```
Input: [1,1,2,2,3], goal: Buang duplicates
Goal: Buang duplikat, biarkan satu dari setiap jenis
Challenge: Array sudah sorted, duplikat pasti bersebelahan!

Analogi: Dari tumpukan kartu berurutan, ambil satu dari setiap jenis
```

### 🎯 **Keunggulan Array yang Sudah Sorted**

**Insight cemerlang: Kalau array sudah sorted, semua duplikat pasti bersebelahan!**

```
Sorted array: [1,1,1,2,2,3,4,4,4]
               ↑ ↑ ↑     ↑ ↑       ↑ ↑ ↑
              duplikat  duplikat    duplikat

Unsorted array: [1,3,1,2,1,4,2]
                 ↑   ↑   ↑     ↑
                duplikat 1 tidak bersebelahan!
```

**Ini artinya:**

- ✅ Kita cuma perlu **compare dengan elemen sebelumnya**
- ✅ Tidak perlu scan seluruh array untuk setiap elemen
- ✅ **Single pass** sudah cukup!

### 🚨 **Mengapa Tidak Bisa Pakai Pendekatan Remove Element?**

Mari kita coba approach yang **SALAH** dulu untuk memahami bedanya:

**❌ Kalau kita pakai pendekatan Remove Element:**

```typescript
// APPROACH SALAH - tidak memanfaatkan sorted property
function removeDuplicatesWrong(nums: number[]): number {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    // Cek apakah nums[i] sudah ada di bagian yang "clean"
    let isDuplicate = false;
    for (let j = 0; j < k; j++) {
      if (nums[j] === nums[i]) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}

// Time complexity: O(n²) - nested loops!
// Tidak efisien dan tidak memanfaatkan sorted property
```

**Masalah approach ini:**

- ⚠️ **O(n²) time complexity** - nested loops
- ⚠️ **Tidak memanfaatkan sorted property**
- ⚠️ **Redundant checks** - mengecek elemen yang sudah pasti berbeda

### 🎯 **Solusi yang Benar: Manfaatkan Sorted Property!**

**Ide cemerlang: Cukup compare dengan elemen sebelumnya!**

Karena array sudah sorted, kita tahu bahwa:

```
nums[i] !== nums[i-1] → pasti unique!
nums[i] === nums[i-1] → pasti duplicate!
```

#### 🤔 **Strategi: Modified Two Pointer**

Mirip dengan Remove Element, tapi ada twist:

**👈 Pointer #1 (k):** "Ini posisi untuk elemen unik berikutnya"
**👉 Pointer #2 (i):** "Ini elemen yang sedang saya periksa"

#### 💡 **Step-by-Step Process:**

**Step 1: Setup awal**

```
Analogi:
Kartu: [1, 1, 2, 2, 3]
        ↑  ↑
    Posisi k  i
    (start k=1, karena kartu pertama pasti unik)

Technical:
nums = [1,1,2,2,3]
        ↑  ↑
        k=1 i=1 (start from index 1)
```

**Step 2: Periksa kartu kedua**

```
Analogi:
i melihat: "Kartu 1, sama dengan kartu sebelumnya (1)"
→ Ini duplikat! Skip, i lanjut ke kanan
Kartu: [1, 1, 2, 2, 3]
        ↑     ↑
    Posisi k   i

Technical:
nums[1] = 1, nums[0] = 1 → sama, duplikat
i++, k tetap di 1
```

**Step 3: Periksa kartu ketiga**

```
Analogi:
i melihat: "Kartu 2, berbeda dengan kartu sebelumnya (1)"
→ Ini unik! Taruh di posisi k, kedua pointer maju
Kartu: [1, 2, 2, 2, 3]
           ↑     ↑
       Posisi k   i

Technical:
nums[2] = 2, nums[1] = 1 → beda, unique
nums[1] = nums[2] = 2, k++, i++
Result: [1,2,2,2,3], k=2
```

**Step 4: Terus sampai selesai**

```
Final result: [1,2,3,_,_], k=3

Analogi result:
Kartu unik: [1, 2, 3, _, _]
            ←--k=3 kartu unik--→

Technical result:
nums = [1,2,3,_,_], k = 3
```

#### 🎯 **Kenapa Approach Ini Brilliant?**

**✅ Memanfaatkan sorted property:** Compare cuma dengan elemen sebelumnya
**✅ Single pass:** O(n) time complexity  
**✅ In-place:** O(1) space complexity
**✅ Simple:** Logic mudah diikuti

---

## 🎯 Strategi Penyelesaian

Sekarang mari kita translate pemikiran tadi menjadi kode!

### 🎮 **Siapa Saja "Pemain" yang Kita Butuhkan?**

Seperti problem Remove Element, kita butuh **2 "jari"** untuk menunjuk posisi, tapi dengan **twist khusus untuk sorted array**!

#### 🤔 **Kenapa Masih Butuh 2 Pointer?**

Mari kita bayangkan kayak main game **"Tunjuk-Tunjuk Kartu Unik"**:

**👈 Pointer #1: Slow Pointer (k)**

```
Kartu: [1, _, _, _, _]
        ↑
    Jari #1 tunjuk kesini (posisi untuk kartu unik berikutnya)
```

- **Tugasnya:** Tunjuk posisi untuk **naruh kartu unik** berikutnya
- **Nama variabelnya:** `k` (dari "keep unique")
- **Start dari:** `k = 1` (bukan 0, karena kartu pertama pasti unik!)

**👉 Pointer #2: Fast Pointer (i)**

```
Kartu: [1, 1, 2, 2, 3]
           ↑
       Jari #2 tunjuk kesini (kartu yang sedang diperiksa)
```

- **Tugasnya:** Tunjuk kartu yang **sedang diperiksa** sekarang
- **Nama variabelnya:** `i` (dari "iterate")
- **Start dari:** `i = 1` (bukan 0, karena kartu pertama sudah pasti unik!)

#### 🆚 **Perbedaan dengan Remove Element:**

| Aspek       | Remove Element      | Remove Duplicates       |
| ----------- | ------------------- | ----------------------- |
| **Start k** | `k = 0`             | `k = 1`                 |
| **Start i** | `i = 0`             | `i = 1`                 |
| **Compare** | `nums[i] !== val`   | `nums[i] !== nums[i-1]` |
| **Logic**   | Skip specific value | Skip duplicates         |

#### 🏃‍♂️ **Gimana "Jari-Jari" Ini Bergerak?**

**📍 Jari #1 (k): Bergerak Kondiional**

```
Awal:    [1, _, _, _]     k=1 (siap terima kartu unik kedua)
Step 1:  [1, 2, _, _]     k=2 (kartu 2 disimpan, siap terima kartu unik ketiga)
Step 2:  [1, 2, 3, _]     k=3 (kartu 3 disimpan, done!)
```

**📍 Jari #2 (i): Bergerak Selalu**

```
Awal:    [1, 1, 2, 3]    i=1 (periksa kartu kedua)
Step 1:  [1, 1, 2, 3]    i=2 (periksa kartu ketiga)
Step 2:  [1, 1, 2, 3]    i=3 (periksa kartu keempat)
Step 3:  Done! (i >= nums.length)
```

**🎯 Pola Geraknya:**

- Jari #1 (k): Gerak hanya kalau nemuin kartu unik baru
- Jari #2 (i): Gerak terus setiap iterasi
- Gap antara k dan i = jumlah duplikat yang sudah dilewati

### 🔧 **Implementasi: Dari Konsep ke Kode**

#### 💭 **Step 1: Setup Variable (Persiapan "Jari")**

**🧠 Logika:** "Kartu pertama pasti unik, mulai periksa dari kartu kedua"

```typescript
// Edge case: array kosong (meskipun constraint bilang minimal 1)
if (nums.length === 0) return 0;

// Setup: posisi awal untuk kedua "jari"
let k: number = 1; // 👈 Jari #1: Posisi untuk kartu unik berikutnya (mulai dari 1!)
// i akan diatur di loop mulai dari 1  // 👉 Jari #2: Periksa mulai dari kartu kedua
```

**🤔 Kenapa k dimulai dari 1, bukan 0?**

- Kartu di index 0 **pasti unik** (tidak ada kartu sebelumnya untuk dibandingkan)
- Mulai periksa duplikat dari kartu kedua (index 1)

#### 🔍 **Step 2: Main Loop (Periksa dari Kartu Kedua)**

**🧠 Logika:** "Periksa setiap kartu, bandingkan dengan kartu sebelumnya"

```typescript
// Loop utama: mulai dari kartu kedua (index 1)
for (let i = 1; i < nums.length; i++) {
  // 👉 Jari #2 (i) periksa kartu di posisi i
  // Compare dengan kartu sebelumnya
  if (nums[i] !== nums[i - 1]) {
    // Kartu unik! Simpan di posisi yang ditunjuk Jari #1 (k)
    nums[k] = nums[i];
    k++; // 👈 Jari #1 pindah ke posisi kosong berikutnya
  }
  // Kalau nums[i] === nums[i-1], skip (jari #1 tidak bergerak)
}
```

#### 🔢 **Step 3: Return Count (Kembalikan Jumlah)**

**🧠 Logika:** "k menunjukkan berapa kartu unik yang berhasil disimpan"

```typescript
return k; // Jumlah kartu unik
```

#### 🔧 **Kode Lengkap: Solusi Final**

```typescript
function removeDuplicates(nums: number[]): number {
  // Step 1: Handle edge case
  if (nums.length === 0) return 0;

  // Step 2: Setup variables (kartu pertama pasti unik)
  let k: number = 1; // 👈 Posisi untuk kartu unik berikutnya

  // Step 3: Main loop (periksa dari kartu kedua)
  for (let i = 1; i < nums.length; i++) {
    // 👉 Bandingkan dengan kartu sebelumnya
    if (nums[i] !== nums[i - 1]) {
      // Kartu unik! Simpan di posisi k
      nums[k] = nums[i];
      k++;
    }
    // Kartu duplikat → skip, k tidak berubah
  }

  // Step 4: Return count
  return k; // Jumlah kartu unik
}
```

#### 🎭 **Testing: Trace Kode dengan Contoh**

Mari kita test kode kita dengan contoh: `nums = [0,0,1,1,1,2,2,3,3,4]`

```typescript
// Initial setup
k = 1 (kartu pertama nums[0]=0 pasti unik)
nums = [0,0,1,1,1,2,2,3,3,4]

// Iteration 1: i=1
nums[1] = 0, nums[0] = 0 → sama, duplikat, skip
k tetap 1
// Result: [0,0,1,1,1,2,2,3,3,4], k=1

// Iteration 2: i=2
nums[2] = 1, nums[1] = 0 → beda, unik
nums[1] = nums[2] = 1, k = 2
// Result: [0,1,1,1,1,2,2,3,3,4], k=2

// Iteration 3: i=3
nums[3] = 1, nums[2] = 1 → sama, duplikat, skip
k tetap 2
// Result: [0,1,1,1,1,2,2,3,3,4], k=2

// Iteration 4: i=4
nums[4] = 1, nums[3] = 1 → sama, duplikat, skip
k tetap 2
// Result: [0,1,1,1,1,2,2,3,3,4], k=2

// Iteration 5: i=5
nums[5] = 2, nums[4] = 1 → beda, unik
nums[2] = nums[5] = 2, k = 3
// Result: [0,1,2,1,1,2,2,3,3,4], k=3

// Continue pattern...
// Final: [0,1,2,3,4,_,_,_,_,_], k=5 ✅
```

---

## 🚀 **Advanced Topics & Analysis**

Sekarang setelah kamu paham konsep dasar, mari kita dive deeper ke topik-topik advanced!

### ⚡ **Time & Space Complexity Analysis**

#### 📊 **Time Complexity: O(n)**

```
Analogi:
Seperti melihat setiap kartu tepat sekali saja, dan cuma compare
dengan kartu sebelumnya (bukan dengan semua kartu).

Technical Analysis:
- Best case: O(n) - tetap harus periksa semua elemen
- Worst case: O(n) - periksa semua elemen tepat sekali
- Average case: O(n)

Proof:
- Single loop: iterate melalui n-1 elements (start from index 1)
- Constant work per iteration: one comparison + conditional assignment
- Total: O(n-1) × O(1) = O(n)
```

**Bandingkan dengan pendekatan naive O(n²):**

```
Naive approach: Untuk setiap element, cek vs semua element sebelumnya
- Outer loop: n iterations
- Inner loop: up to k iterations (k = current unique count)
- Total: O(n×k) ≈ O(n²) in worst case

Our approach: Untuk setiap element, cek vs 1 element sebelumnya saja
- Single loop: n iterations
- Single comparison per iteration
- Total: O(n)
```

#### 💾 **Space Complexity: O(1)**

```
Analogi:
Kita tidak butuh tumpukan kartu tambahan, cukup gunakan 2 jari
untuk menunjuk posisi di tumpukan yang sama.

Technical Analysis:
- Auxiliary space: Hanya 2 variables (i, k) = O(1)
- In-place modification: Menggunakan array yang sama
- No additional data structures needed

Space-efficient karena:
✅ Menggunakan array yang sudah ada
✅ Constant extra space regardless of input size
✅ No recursion (no stack space)
✅ No hash tables or sets needed
```

### 🔄 **Alternative Approaches & Comparisons**

#### 🥊 **vs. Hash Set Approach**

```typescript
// ❌ Alternative approach dengan Set (tidak optimal)
function removeDuplicatesSet(nums: number[]): number {
  const seen = new Set<number>();
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (!seen.has(nums[i])) {
      seen.add(nums[i]);
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

**Comparison:**
| Aspect | Our Solution | Set Approach |
|--------|-------------|--------------|
| **Time** | O(n) | O(n) |
| **Space** | O(1) | O(k) where k = unique count |
| **Sorted aware** | ✅ Yes | ❌ No |
| **Cache friendly** | ✅ Yes | ❌ No |

#### 🌟 **vs. Filter-Based Approach**

```typescript
// ❌ Functional approach (creates new array)
function removeDuplicatesFilter(nums: number[]): number {
  const unique = nums.filter(
    (val, index) => index === 0 || val !== nums[index - 1]
  );

  // Copy back to original array
  for (let i = 0; i < unique.length; i++) {
    nums[i] = unique[i];
  }

  return unique.length;
}
```

**Trade-offs:**
| Aspect | Our Solution | Filter Approach |
|--------|-------------|-----------------|
| **Readability** | Good | Excellent |
| **Memory** | O(1) | O(n) |
| **In-place** | ✅ Yes | ❌ No |
| **Performance** | Faster | Slower (array creation) |

### 🎯 **Optimization Techniques**

#### 🔀 **Alternative Implementation: Compare with Last Unique**

```typescript
// 📝 Alternative: Compare dengan last unique element
function removeDuplicatesAlt(nums: number[]): number {
  if (nums.length === 0) return 0;

  let k = 1; // Position for next unique element

  for (let i = 1; i < nums.length; i++) {
    // Compare with last unique element (at position k-1)
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

**Key Differences:**
| Approach | Compare With | Logic |
|----------|-------------|-------|
| **Main** | `nums[i-1]` | Compare adjacent elements |
| **Alt** | `nums[k-1]` | Compare with last kept unique |

**Both are equivalent for sorted arrays!**

#### 🚀 **Micro-Optimizations:**

```typescript
// 🎯 Avoid unnecessary assignments
function removeDuplicatesOptimized(nums: number[]): number {
  if (nums.length <= 1) return nums.length;

  let k = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      // Optimization: avoid self-assignment when k === i
      if (k !== i) {
        nums[k] = nums[i];
      }
      k++;
    }
  }

  return k;
}
```

### 🧠 **Problem Variations & Extensions**

#### 🔢 **Related LeetCode Problems:**

1. **Remove Duplicates from Sorted Array II** (LeetCode #80)

   - Allow duplicates to appear at most twice
   - Extension: `nums[i] !== nums[k-2]`

2. **Remove Element** (LeetCode #27)

   - Remove specific value instead of duplicates
   - Different: unsorted array, different comparison

3. **Remove Duplicates from Unsorted Array**
   - Would need O(n) space with hash set
   - Our O(1) approach only works because array is sorted

#### 🏗️ **Extension: Allow K Duplicates**

```typescript
// 🎯 Generalized: Allow at most k duplicates
function removeDuplicatesK(nums: number[], maxDuplicates: number): number {
  if (nums.length <= maxDuplicates) return nums.length;

  let writeIndex = maxDuplicates;

  for (let i = maxDuplicates; i < nums.length; i++) {
    // Compare with element k positions back
    if (nums[i] !== nums[writeIndex - maxDuplicates]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}

// Usage:
// removeDuplicatesK(nums, 1) → our original problem
// removeDuplicatesK(nums, 2) → LeetCode #80
```

---

## 🎮 **Interactive Learning & Practice**

Mari kita test pemahaman kamu dengan quiz dan challenges yang fun!

### 🧩 **Quiz: Test Your Understanding**

#### **Quiz 1: Why Start from Index 1?**

**❓ Pertanyaan:** Mengapa kita mulai loop dari `i = 1` dan `k = 1`, bukan dari 0?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena **elemen pertama pasti unik**!

**Analogi:** Dalam tumpukan kartu berurutan, kartu pertama tidak punya "kartu sebelumnya" untuk dibandingkan. Jadi pasti unik dan bisa langsung disimpan.

**Technical:**

- `nums[0]` tidak ada `nums[-1]` untuk dibandingkan
- Elemen pertama otomatis masuk ke hasil final
- Mulai periksa duplikat dari elemen kedua vs pertama

**Proof:**

```typescript
[1,1,2] → nums[0]=1 pasti unik (no previous element)
         → nums[1]=1 vs nums[0]=1 → duplicate!
         → nums[2]=2 vs nums[1]=1 → unique!
```

</details>

#### **Quiz 2: Sorted vs Unsorted Impact**

**❓ Pertanyaan:** Kenapa algoritma ini hanya O(1) space untuk sorted array, tapi butuh O(n) space untuk unsorted?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena **lokasi duplikat berbeda**!

**Sorted array:** Duplikat pasti **bersebelahan**

```
[1,1,2,2,3] → duplikat selalu adjacent
Compare cuma dengan nums[i-1] → O(1) space
```

**Unsorted array:** Duplikat bisa **tersebar dimana saja**

```
[1,3,1,2,1] → duplikat 1 ada di index 0,2,4
Perlu remember semua unique elements seen → O(n) space dengan Set/Map
```

**Insight:** Sorted property memungkinkan kita memanfaatkan **locality** untuk efisiensi space!

</details>

#### **Quiz 3: Edge Case Mastery**

**❓ Pertanyaan:** Apa output untuk input `nums = [1,1,1,1,1]`?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** `k = 1`, dengan `nums[0] = 1`

**Step-by-step trace:**

```typescript
Initial: [1,1,1,1,1], k=1

i=1: nums[1]=1 vs nums[0]=1 → same, skip, k=1
i=2: nums[2]=1 vs nums[1]=1 → same, skip, k=1
i=3: nums[3]=1 vs nums[2]=1 → same, skip, k=1
i=4: nums[4]=1 vs nums[3]=1 → same, skip, k=1

Final: k=1, nums = [1,_,_,_,_]
```

**Key insight:** Semua elemen sama → hanya elemen pertama yang unik!

</details>

### 🏆 **Challenges: Practice Makes Perfect**

#### **Challenge 1: Manual Trace**

**🎯 Task:** Trace algoritma step-by-step untuk input:

```
Input: nums = [1,1,2,3,3,4,4,4,5]
Expected: k = 5, result = [1,2,3,4,5]
```

<details>
<summary>💪 Click untuk melihat solution</summary>

```typescript
// Initial: k=1, nums=[1,1,2,3,3,4,4,4,5]

// i=1: nums[1]=1 vs nums[0]=1 → same, skip
// k stays 1 → [1,1,2,3,3,4,4,4,5]

// i=2: nums[2]=2 vs nums[1]=1 → different, keep
// nums[1]=2, k=2 → [1,2,2,3,3,4,4,4,5]

// i=3: nums[3]=3 vs nums[2]=2 → different, keep
// nums[2]=3, k=3 → [1,2,3,3,3,4,4,4,5]

// i=4: nums[4]=3 vs nums[3]=3 → same, skip
// k stays 3 → [1,2,3,3,3,4,4,4,5]

// i=5: nums[5]=4 vs nums[4]=3 → different, keep
// nums[3]=4, k=4 → [1,2,3,4,3,4,4,4,5]

// i=6: nums[6]=4 vs nums[5]=4 → same, skip
// k stays 4 → [1,2,3,4,3,4,4,4,5]

// i=7: nums[7]=4 vs nums[6]=4 → same, skip
// k stays 4 → [1,2,3,4,3,4,4,4,5]

// i=8: nums[8]=5 vs nums[7]=4 → different, keep
// nums[4]=5, k=5 → [1,2,3,4,5,4,4,4,5]

// Final: k=5, first 5 elements = [1,2,3,4,5] ✅
```

</details>

#### **Challenge 2: Edge Case Olympics**

**🎯 Task:** Predict output untuk edge cases:

```typescript
// Test Case 1: Single element
nums = [42];
// Your answer: k = ?

// Test Case 2: Two same elements
nums = [7, 7];
// Your answer: k = ?

// Test Case 3: Two different elements
nums = [1, 2];
// Your answer: k = ?

// Test Case 4: Already unique
nums = [1, 2, 3, 4, 5];
// Your answer: k = ?
```

<details>
<summary>🧠 Click untuk melihat solutions</summary>

```typescript
// Test Case 1: k = 1
// Single element, pasti unik

// Test Case 2: k = 1
// nums[1]=7 vs nums[0]=7 → same, duplicate
// Only keep first occurrence

// Test Case 3: k = 2
// nums[1]=2 vs nums[0]=1 → different, keep both

// Test Case 4: k = 5
// Semua elemen sudah unik, tidak ada yang di-remove
```

</details>

#### **Challenge 3: Bug Hunt**

**🎯 Task:** Ada bug di kode ini! Find and fix it:

```typescript
function removeDuplicatesBuggy(nums: number[]): number {
  let k = 0; // 🐛 Bug #1?

  for (let i = 0; i < nums.length; i++) {
    // 🐛 Bug #2?
    if (nums[i] !== nums[i - 1]) {
      // 🐛 Bug #3?
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

**Bug #1:** `k = 0` should be `k = 1`

- First element is always unique, should start unique count at 1

**Bug #2:** `i = 0` should be `i = 1`

- Should start comparison from second element

**Bug #3:** `nums[i - 1]` akan crash saat i=0

- Array access out of bounds: `nums[-1]`

**✅ Fixed version:**

```typescript
function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let k = 1; // Fix: start from 1

  for (let i = 1; i < nums.length; i++) {
    // Fix: start from 1
    if (nums[i] !== nums[i - 1]) {
      // Now safe
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

</details>

### 🎨 **Visual Learning: Rich Diagrams**

#### **📊 Algorithm Flow Diagram**

```
🏁 START
    ↓
📋 Check if empty → Yes → Return 0
    ↓ No
📋 Setup k=1 (first element unique)
    ↓
🔄 For i = 1 to n-1
    ↓
🔍 nums[i] ≠ nums[i-1] ?
    ↓                    ↓
   YES                  NO
    ↓                    ↓
📤 nums[k] = nums[i]    ⏭️ Skip (duplicate)
📈 k++                     │
    ↓                    ↓
    📈 i++  ←────────────┘
    ↓
🔄 Loop back
    ↓
📊 Return k
    ↓
🎉 END
```

#### **🎭 Memory Layout Visualization**

```
Initial State:
┌─────────────────────────────────┐
│ nums: [1][1][2][2][3]          │
│        ↑  ↑  ↑  ↑  ↑           │
│        0  1  2  3  4           │
│           k  i                 │
│        (first unique) (check)  │
└─────────────────────────────────┘

After processing:
┌─────────────────────────────────┐
│ nums: [1][2][3][_][_]          │
│        ←--k=3 unique--→        │
│        result elements         │
└─────────────────────────────────┘

Pointer Movement Pattern:
Step 1: [1][1][2][2][3] → k=1,i=1 → duplicate, skip
Step 2: [1][2][2][2][3] → k=2,i=2 → unique, keep
Step 3: [1][2][2][2][3] → k=2,i=3 → duplicate, skip
Step 4: [1][2][3][2][3] → k=3,i=4 → unique, keep
Final:  [1][2][3][_][_] → k=3 unique elements
```

#### **⚡ Complexity Visualization**

```
Time Complexity Growth:
                   Our Algorithm O(n)
Input Size    │████████████████████
    10        │██
    100       │████████
    1000      │████████████████████
    10000     │████████████████████

                   Naive O(n²)
Input Size    │████████████████████
    10        │███
    100       │████████████████
    1000      │████████████████████████████████████████
    10000     │██████████████████████████████████████████████████████████

Space Complexity:
Our Algorithm: ██ O(1) - constant
Set Approach:  ████████████████████ O(n) - grows with unique count
```

#### **🎯 Sorted vs Unsorted Comparison**

```
Sorted Array Advantage:
[1,1,2,2,3,3] → duplicates adjacent
 ↑ ↑ compare neighbors only

Unsorted Array Challenge:
[1,3,1,2,1] → duplicates scattered
 ↑   ↑   ↑ need to track all seen values

Algorithm Efficiency:
Sorted:   Single comparison per element → O(1) space
Unsorted: Track all unique elements → O(n) space
```

### 🎪 **Interactive Code Playground**

#### **🛠️ Debug-Friendly Implementation**

```typescript
function removeDuplicatesDebug(nums: number[]): number {
  console.log(`🏁 START: nums=[${nums}]`);

  if (nums.length === 0) {
    console.log(`📭 Empty array, return 0`);
    return 0;
  }

  let k = 1;
  console.log(`🎯 First element nums[0]=${nums[0]} is always unique, k=${k}`);

  for (let i = 1; i < nums.length; i++) {
    console.log(
      `\n🔍 Check i=${i}: nums[${i}]=${nums[i]} vs nums[${i - 1}]=${
        nums[i - 1]
      }`
    );

    if (nums[i] !== nums[i - 1]) {
      console.log(`✅ Unique! nums[${k}] = ${nums[i]}`);
      nums[k] = nums[i];
      k++;
    } else {
      console.log(`❌ Duplicate! Skip ${nums[i]}`);
    }

    console.log(`📊 Current: k=${k}, nums=[${nums}]`);
    console.log(`📋 Unique so far: [${nums.slice(0, k)}]`);
  }

  console.log(`\n🎉 FINAL: k=${k}, unique=[${nums.slice(0, k)}]`);
  return k;
}

// 🎯 Try these:
// removeDuplicatesDebug([1,1,2]);
// removeDuplicatesDebug([0,0,1,1,1,2,2,3,3,4]);
// removeDuplicatesDebug([1,1,1]);
```

#### **🎲 Performance Tester**

```typescript
// 🏃‍♂️ Compare different approaches
function performanceTest() {
  const sizes = [100, 1000, 10000];

  sizes.forEach((size) => {
    // Generate test data: lots of duplicates
    const nums = Array(size)
      .fill(0)
      .map(() => Math.floor(Math.random() * (size / 10)));
    nums.sort();

    console.log(`\n🎯 Testing size ${size}:`);

    // Test our algorithm
    const start1 = performance.now();
    const result1 = removeDuplicates([...nums]);
    const end1 = performance.now();

    // Test set-based approach
    const start2 = performance.now();
    const result2 = removeDuplicatesSet([...nums]);
    const end2 = performance.now();

    console.log(
      `Our algorithm: ${(end1 - start1).toFixed(2)}ms, result=${result1}`
    );
    console.log(
      `Set approach: ${(end2 - start2).toFixed(2)}ms, result=${result2}`
    );
    console.log(
      `Speedup: ${((end2 - start2) / (end1 - start1)).toFixed(2)}x faster`
    );
  });
}
```

---

## 🎉 **Selamat!**

Kamu sudah berhasil memahami dan mengimplementasikan algoritma **Remove Duplicates from Sorted Array** dengan pendekatan optimal!

**💡 Key Takeaways:**

- **Sorted array advantage:** Duplikat pasti bersebelahan, cukup compare dengan elemen sebelumnya
- **Modified two pointer:** Start dari k=1, i=1 karena elemen pertama pasti unik
- **O(n) time, O(1) space:** Optimal complexity dengan memanfaatkan sorted property
- **In-place modification:** Hemat memori, tidak butuh structure tambahan

**🚀 Next Steps:**

- Coba dengan test cases sendiri (empty array, all same, all unique)
- Explore extension: Remove Duplicates II (allow at most 2 duplicates)
- Practice similar sorted array problems (Merge Intervals, Search in Rotated Array)
- Compare performance dengan pendekatan lain (Set-based, filter-based)

Keep coding and happy learning! 🌟
