# 🔢 Merge Sorted Array - Seperti Menggabungkan Dua Antrian

## 📚 Apa itu Problem Ini?

Bayangkan kamu punya dua antrian anak-anak yang sudah berurutan dari yang paling pendek ke paling tinggi. Sekarang kamu harus menggabungkan kedua antrian ini menjadi satu antrian yang tetap berurutan, tapi dengan syarat khusus: **kamu harus menggunakan tempat antrian pertama yang sudah disediakan ruang kosong di belakangnya**.

### 🎯 Problem Statement

**LeetCode #88 - Merge Sorted Array**

You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be **stored inside the array** `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements are the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

### 📝 Examples

**Example 1:**

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

Explanation:
- nums1 = [1,2,3] + [0,0,0] (m=3 elements + n=3 spaces)
- nums2 = [2,5,6] (n=3 elements)
- Merge: [1,2,2,3,5,6]
```

**Example 2:**

```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]

Explanation:
- nums1 has 1 element, nums2 is empty
- Nothing to merge, result is [1]
```

**Example 3:**

```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]

Explanation:
- nums1 is empty (m=0), nums2 has [1]
- Copy nums2 to nums1: [1]
```

**Example 4:**

```
Input: nums1 = [4,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3
Output: [1,2,3,4,5,6]

Explanation:
- All nums2 elements are smaller than nums1
- Result: sorted merge of both arrays
```

**Example 5:**

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [4,5,6], n = 3
Output: [1,2,3,4,5,6]

Explanation:
- All nums1 elements are smaller than nums2
- Result: nums1 first, then nums2
```

### 🎯 Constraints

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-10^9 <= nums1[i], nums2[j] <= 10^9`

### 📋 Key Requirements

1. **In-place modification**: Modify nums1 directly, don't create new array
2. **Non-decreasing order**: Result must be sorted
3. **Handle edge cases**: Empty arrays, single elements
4. **Optimal solution**: Should be better than O(n log n)

## 🤔 Intuisi Dasar: Mengapa Ini Tricky?

### Masalah Utama

Kalau kita mulai dari depan (kiri ke kanan), kita akan "menginjak" angka yang belum kita proses!

Contoh yang SALAH:

```
nums1 = [1,2,3,0,0,0]  nums2 = [2,5,6]
         ↑ mulai dari sini?

Kalau kita taruh 1 di posisi 0 → OK
Kalau kita taruh 2 (dari nums2) di posisi 1 → MASALAH!
Angka 2 (dari nums1) belum kita proses, tapi udah ketimpa!
```

### 💡 Solusi: Mulai dari Belakang!

Kenapa dari belakang? Karena di belakang ada tempat kosong yang aman!

## 🎯 Strategi Penyelesaian

### Pendekatan 1: Cara Mudah (Tapi Kurang Optimal)

```javascript
// Cara "curang" - gabungkan dulu, sort kemudian
function mergeEasy(nums1, m, nums2, n) {
  // Taro semua nums2 ke tempat kosong di nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  // Sort ulang seluruhnya
  nums1.sort((a, b) => a - b);
}
```

**Kenapa ini kurang bagus?**

- Kompleksitas waktu: O((m+n) log(m+n)) karena sorting
- Padahal array sudah terurut, sayang banget!

### Pendekatan 2: Cara Pintar (Optimal)

```javascript
// Menggunakan "Two Pointers" dari belakang
function mergeOptimal(nums1, m, nums2, n) {
  let i = m - 1; // Pointer nums1 (angka asli terakhir)
  let j = n - 1; // Pointer nums2 (angka terakhir)
  let k = m + n - 1; // Pointer posisi pengisian (paling belakang)

  // Isi dari belakang, bandingkan angka terbesar
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Kalau nums2 masih ada sisa, pindahkan
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }

  // Kalau nums1 masih ada sisa, udah di tempat yang benar
}
```

## 🎭 Analogi: Menggabungkan Dua Tumpukan Kartu

### 🃏 Bayangkan Seperti Ini:

**Setup:**

- Tumpukan A (nums1): `[1,2,3]` + ruang kosong `[_,_,_]`
- Tumpukan B (nums2): `[2,5,6]`
- Target: Gabungkan jadi satu tumpukan terurut

**Langkah-langkah:**

1. **Lihat kartu paling atas dari kedua tumpukan**

   - Tumpukan A: kartu `3`
   - Tumpukan B: kartu `6`

2. **Pilih yang lebih besar** (karena kita isi dari belakang)

   - `6 > 3`, jadi ambil `6` dari tumpukan B
   - Taruh di posisi paling belakang: `[1,2,3,_,_,6]`

3. **Ulangi terus** sampai selesai:
   ```
   Step 1: [1,2,3,_,_,6] (ambil 6)
   Step 2: [1,2,3,_,5,6] (ambil 5)
   Step 3: [1,2,3,3,5,6] (ambil 3)
   Step 4: [1,2,2,3,5,6] (ambil 2 dari nums2)
   Step 5: [1,2,2,3,5,6] (ambil 2 dari nums1)
   Step 6: [1,2,2,3,5,6] (ambil 1)
   ```

## 🔍 Trace Execution: Step by Step

Mari kita trace dengan contoh: `nums1 = [1,2,3,0,0,0]`, `nums2 = [2,5,6]`

### Initial State:

```
nums1: [1, 2, 3, 0, 0, 0]
        ↑           ↑
        i=2         k=5
nums2: [2, 5, 6]
              ↑
              j=2
```

### Step 1: Compare 3 vs 6

```
nums1[2] = 3, nums2[2] = 6
6 > 3, jadi ambil 6

nums1: [1, 2, 3, 0, 0, 6]
        ↑        ↑
        i=2      k=4
nums2: [2, 5, 6]
           ↑
           j=1
```

### Step 2: Compare 3 vs 5

```
nums1[2] = 3, nums2[1] = 5
5 > 3, jadi ambil 5

nums1: [1, 2, 3, 0, 5, 6]
        ↑     ↑
        i=2   k=3
nums2: [2, 5, 6]
        ↑
        j=0
```

### Step 3: Compare 3 vs 2

```
nums1[2] = 3, nums2[0] = 2
3 > 2, jadi ambil 3

nums1: [1, 2, 3, 3, 5, 6]
           ↑  ↑
           i=1 k=2
nums2: [2, 5, 6]
        ↑
        j=0
```

### Step 4: Compare 2 vs 2

```
nums1[1] = 2, nums2[0] = 2
Sama! Ambil dari nums2 (atau nums1, bebas)

nums1: [1, 2, 2, 3, 5, 6]
        ↑  ↑
        i=1 k=1
nums2: [2, 5, 6]
        ↑
        j=-1 (habis!)
```

### Step 5: nums2 habis, nums1 sisa

```
nums2 sudah habis (j = -1)
nums1 masih ada [1,2] tapi udah di posisi yang benar
Selesai!

Result: [1, 2, 2, 3, 5, 6] ✅
```

## 🧠 Mental Model: Pattern Recognition

### 🔄 Pattern "Two Pointers from Back"

**Kapan menggunakan pattern ini?**

1. Ada dua array/list yang sudah terurut
2. Harus merge jadi satu
3. Ada constraint ruang (in-place atau limited space)
4. Mulai dari belakang lebih aman daripada depan

**Komponen utama:**

- `i`: pointer array pertama (dari belakang)
- `j`: pointer array kedua (dari belakang)
- `k`: pointer posisi hasil (dari belakang)

### 🎯 Decision Tree

```
Pada setiap step, tanya:
├── Apakah kedua pointer masih valid? (i >= 0 && j >= 0)
│   ├── Ya: Compare nums1[i] vs nums2[j]
│   │   ├── nums1[i] > nums2[j] → ambil nums1[i], i--
│   │   └── nums2[j] >= nums1[i] → ambil nums2[j], j--
│   └── Tidak:
│       ├── j < 0: nums2 habis, nums1 sisa sudah benar
│       └── i < 0: pindahkan sisa nums2
```

## 💡 Tips & Tricks

### ✅ Yang Perlu Diingat:

1. **Selalu mulai dari belakang** pada merge in-place
2. **Bandingkan elemen terbesar** saat isi dari belakang
3. **nums1 sisa tidak perlu dipindah** (sudah di tempat yang benar)
4. **nums2 sisa harus dipindah semua** (case edge penting!)

### ❌ Common Mistakes:

1. Mulai dari depan → overwrite data yang belum diproses
2. Lupa handle sisa nums2 → hasil tidak lengkap
3. Salah hitung index → off-by-one error
4. Tidak cek boundary → array out of bounds

### 🐛 Edge Cases:

```javascript
// Case 1: nums2 kosong
(nums1 = [1, 2, 3]), (nums2 = []);
// Result: [1,2,3] (tidak ada yang diubah)

// Case 2: nums1 kosong (hanya ruang kosong)
(nums1 = [0, 0, 0]), (nums2 = [1, 2, 3]);
// Result: [1,2,3] (copy semua nums2)

// Case 3: Semua nums2 lebih besar
(nums1 = [1, 2, 3, 0, 0, 0]), (nums2 = [4, 5, 6]);
// Result: [1,2,3,4,5,6]

// Case 4: Semua nums1 lebih besar
(nums1 = [4, 5, 6, 0, 0, 0]), (nums2 = [1, 2, 3]);
// Result: [1,2,3,4,5,6]
```

## 🎓 Complexity Analysis

### Time Complexity: O(m + n)

- Setiap elemen diproses tepat satu kali
- Tidak ada nested loop atau operasi berulang
- Linear terhadap total ukuran input

### Space Complexity: O(1)

- Hanya menggunakan beberapa pointer variable
- Tidak ada extra array atau recursive call stack
- In-place modification

### Comparison dengan Alternatif:

```
Approach          | Time        | Space | Pros & Cons
------------------|-------------|-------|------------------
Merge + Sort      | O(n log n)  | O(1)  | Simple but slow
Two Pointers Back | O(m + n)    | O(1)  | Optimal! ✅
Extra Array       | O(m + n)    | O(m+n)| Fast but uses space
```

## 🚀 Implementation Variations

### Variation 1: Basic Implementation

```javascript
function merge(nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;

  while (i >= 0 && j >= 0) {
    nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }

  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
}
```

### Variation 2: More Readable

```javascript
function merge(nums1, m, nums2, n) {
  let p1 = m - 1; // Pointer for nums1
  let p2 = n - 1; // Pointer for nums2
  let p = m + n - 1; // Pointer for result position

  // Merge from back to front
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  // Copy remaining elements from nums2 (if any)
  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }

  // Note: remaining elements in nums1 are already in correct position
}
```

### Variation 3: With Detailed Comments

```javascript
function merge(nums1, m, nums2, n) {
  // Initialize pointers at the last elements
  let i = m - 1; // Last actual element in nums1
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Last position in merged array

  // Compare and merge from largest to smallest
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      // nums1 element is larger, place it at position k
      nums1[k] = nums1[i];
      i--; // Move to next smaller element in nums1
    } else {
      // nums2 element is larger or equal, place it at position k
      nums1[k] = nums2[j];
      j--; // Move to next smaller element in nums2
    }
    k--; // Move to next position to fill
  }

  // If nums2 still has elements, copy them
  // (nums1 remaining elements are already in correct positions)
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}
```

## 🏁 Kesimpulan

### 🎯 Key Takeaways:

1. **Pattern Recognition**: Two-pointers from back adalah pattern powerful untuk merge in-place
2. **Intuisi**: Mulai dari belakang menghindari overwrite data yang belum diproses
3. **Efficiency**: O(m+n) time, O(1) space - optimal solution!
4. **Edge Cases**: Jangan lupa handle sisa nums2

### 🌟 Mindset untuk Problem Serupa:

- Kalau ada constraint "in-place", coba mulai dari belakang
- Kalau ada dua structure terurut, pertimbangkan two-pointers
- Selalu trace manual dengan contoh kecil dulu
- Identifikasi edge cases sebelum coding

### 📚 Next Steps:

Setelah menguasai problem ini, coba problem serupa:

- Merge Two Sorted Lists (LinkedList version)
- Merge Intervals
- Sort Colors (Dutch National Flag)
- Remove Duplicates from Sorted Array

---

**💪 Practice Makes Perfect!**

Try implementing this yourself, trace through different examples, and most importantly - understand the intuition behind starting from the back. Happy coding! 🚀
