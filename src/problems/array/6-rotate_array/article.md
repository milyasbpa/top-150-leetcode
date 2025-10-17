# 🎯 LeetCode #189: Rotate Array - Panduan Lengkap

## 📋 Deskripsi Problem

Diberikan sebuah array integer `nums`, putar array tersebut ke kanan sebanyak `k` langkah, dimana `k` adalah bilangan non-negatif.

### 🎯 Contoh Input/Output

**Contoh 1:**

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]

Penjelasan:
- Putar 1 langkah ke kanan: [7,1,2,3,4,5,6]
- Putar 2 langkah ke kanan: [6,7,1,2,3,4,5]
- Putar 3 langkah ke kanan: [5,6,7,1,2,3,4]
```

**Contoh 2:**

```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]

Penjelasan:
- Putar 1 langkah ke kanan: [99,-1,-100,3]
- Putar 2 langkah ke kanan: [3,99,-1,-100]
```

### 🔧 Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`
- **Challenge:** Bisakah Anda melakukannya in-place dengan O(1) extra memory?

---

## 🧠 Konsep dan Intuisi

### 🎭 Analogi Sederhana

Bayangkan Anda memiliki barisan orang yang sedang antri. Jika Anda ingin memutar barisan tersebut ke kanan sebanyak 3 posisi, maka 3 orang terakhir akan berpindah ke depan, sementara sisanya bergeser ke belakang.

### 🔍 Insight Kunci

1. **Rotasi Modular:** `k` yang lebih besar dari panjang array sama dengan `k % n`
2. **In-place vs Extra Space:** Trade-off antara kompleksitas ruang dan waktu
3. **Pattern Recognition:** Ada beberapa pendekatan matematis yang elegan

---

## 🌟 Solusi Optimal: Three Reverses Algorithm

### 💡 Ide Utama

Algoritma ini menggunakan fakta matematis bahwa memutar array dapat dicapai dengan 3 kali pembalikan (reverse):

1. **Reverse seluruh array**
2. **Reverse k elemen pertama**
3. **Reverse n-k elemen sisanya**

### 🎯 Contoh Step-by-step

Mari kita lihat contoh `[1,2,3,4,5,6,7]` dengan `k=3`:

```
Original: [1,2,3,4,5,6,7]

Step 1 - Reverse all: [7,6,5,4,3,2,1]

Step 2 - Reverse first k=3: [5,6,7,4,3,2,1]

Step 3 - Reverse remaining: [5,6,7,1,2,3,4]
```

### 💻 Implementasi

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length;

  // Handle edge cases
  if (n <= 1 || k === 0) return;

  // Normalize k
  k = k % n;
  if (k === 0) return;

  // Helper function to reverse array segment
  function reverse(start: number, end: number): void {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }

  // Three reverses magic ✨
  reverse(0, n - 1); // Reverse all
  reverse(0, k - 1); // Reverse first k
  reverse(k, n - 1); // Reverse rest
}
```

### ⚡ Kompleksitas

- **Time:** O(n) - Setiap elemen diakses maksimal 2 kali
- **Space:** O(1) - Hanya menggunakan variabel tambahan konstan

---

## 🔄 Pendekatan Alternatif

### 1. 🔄 Cyclic Replacements

**Ide:** Pindahkan setiap elemen langsung ke posisi finalnya menggunakan cycle detection.

```typescript
function rotateCyclic(nums: number[], k: number): void {
  const n = nums.length;
  let count = 0;

  for (let start = 0; count < n; start++) {
    let current = start;
    let prev = nums[start];

    do {
      const next = (current + k) % n;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
      count++;
    } while (start !== current);
  }
}
```

**Kompleksitas:** O(n) time, O(1) space
**Keunggulan:** Mathematically elegant, minimal array accesses

### 2. 📋 Extra Array Approach

**Ide:** Buat array baru dan tempatkan setiap elemen di posisi yang benar.

```typescript
function rotateExtraArray(nums: number[], k: number): void {
  const n = nums.length;
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }

  for (let i = 0; i < n; i++) {
    nums[i] = result[i];
  }
}
```

**Kompleksitas:** O(n) time, O(n) space
**Keunggulan:** Paling mudah dipahami dan diimplementasi

### 3. 🔀 Brute Force

**Ide:** Lakukan rotasi satu per satu sebanyak k kali.

```typescript
function rotateBruteForce(nums: number[], k: number): void {
  k = k % nums.length;

  for (let step = 0; step < k; step++) {
    const last = nums[nums.length - 1];
    for (let i = nums.length - 1; i > 0; i--) {
      nums[i] = nums[i - 1];
    }
    nums[0] = last;
  }
}
```

**Kompleksitas:** O(n\*k) time, O(1) space
**Keunggulan:** Sangat intuitif untuk dipahami

### 4. 🌀 Recursive Approach

**Ide:** Gunakan rekursi untuk memindahkan elemen dengan cycle detection.

### 5. 🎯 Block Swap Algorithm

**Ide:** Teknik advanced untuk array yang sangat besar menggunakan GCD.

---

## 📊 Perbandingan Algoritma

| Algoritma               | Time Complexity | Space Complexity | Kesulitan  | Best Use Case            |
| ----------------------- | --------------- | ---------------- | ---------- | ------------------------ |
| **Three Reverses**      | O(n)            | O(1)             | ⭐⭐⭐     | **Production (Optimal)** |
| **Cyclic Replacements** | O(n)            | O(1)             | ⭐⭐⭐⭐   | Interview Advanced       |
| **Extra Array**         | O(n)            | O(n)             | ⭐⭐       | **Learning/Prototyping** |
| **Brute Force**         | O(n\*k)         | O(1)             | ⭐         | Small k values           |
| **Recursive**           | O(n)            | O(k)             | ⭐⭐⭐⭐   | Educational              |
| **Block Swap**          | O(n)            | O(1)             | ⭐⭐⭐⭐⭐ | Very large arrays        |

---

## 🎯 Tips & Tricks Interview

### 🔥 Pertanyaan Follow-up Umum

1. **"Bagaimana jika k sangat besar?"**

   - Gunakan modular arithmetic: `k = k % n`
   - Hindari rotasi yang tidak perlu

2. **"Bisakah tanpa extra space?"**

   - Ya! Three Reverses atau Cyclic Replacements
   - Jelaskan trade-off complexity

3. **"Bagaimana dengan rotasi ke kiri?"**

   - Rotasi kiri k = rotasi kanan (n-k)
   - Atau modifikasi algoritma langsung

4. **"Optimasi untuk array yang sangat besar?"**
   - Block Swap Algorithm
   - Memory-conscious implementations

### 💡 Insight untuk Interview

```typescript
// Pattern: Handle edge cases dulu
if (n <= 1 || k === 0) return;

// Pattern: Normalize input
k = k % n;
if (k === 0) return;

// Pattern: Mathematical insight
// Right rotation by k = Left rotation by (n-k)
```

### 🎭 Cara Menjelaskan Three Reverses

1. **Visualisasi:** Gambar array dan tunjukkan 3 langkah
2. **Analogi:** "Flip buku, flip halaman awal, flip halaman akhir"
3. **Mathematical Proof:** Jelaskan mengapa 3 reverse bekerja

---

## 🧪 Test Cases Penting

### ✅ Basic Cases

```typescript
// Standard case
rotate([1,2,3,4,5,6,7], 3) → [5,6,7,1,2,3,4]

// With negatives
rotate([-1,-100,3,99], 2) → [3,99,-1,-100]
```

### 🔍 Edge Cases

```typescript
// Single element
rotate([1], 1) → [1]

// No rotation
rotate([1,2,3,4], 0) → [1,2,3,4]

// Full rotation
rotate([1,2,3,4], 4) → [1,2,3,4]

// k > n
rotate([1,2,3], 4) → [3,1,2]  // 4%3 = 1
```

### 🎯 Corner Cases

```typescript
// Very large k
rotate([1,2], 1000000) → depends on 1000000 % 2

// All same elements
rotate([1,1,1,1], 2) → [1,1,1,1]
```

---

## 🚀 Optimasi dan Variasi

### ⚡ Performance Tips

1. **Early Return:** Handle edge cases sebelum processing
2. **Modular Arithmetic:** Selalu normalize k
3. **Memory Access Pattern:** Three reverses cache-friendly
4. **Branch Prediction:** Predictable loop patterns

### 🔧 Code Golf Version

```typescript
const rotate = (a: number[], k: number): void => {
  k %= a.length;
  const r = (i: number, j: number) => {
    while (i < j) [a[i], a[j]] = [a[j--], a[i++]];
  };
  r(0, a.length - 1);
  r(0, k - 1);
  r(k, a.length - 1);
};
```

### 🌟 Generic Version

```typescript
function rotateGeneric<T>(arr: T[], k: number): void {
  // Same logic, works with any type
}
```

---

## 🎓 Konsep yang Dipelajari

### 📚 Computer Science Concepts

- **Array Manipulation:** In-place algorithms
- **Modular Arithmetic:** Handling overflow cases
- **Cycle Detection:** Mathematical patterns
- **Space-Time Tradeoffs:** Algorithm analysis

### 🧮 Mathematical Insights

- **Group Theory:** Rotation sebagai permutation
- **Number Theory:** GCD dalam Block Swap
- **Linear Algebra:** Array transformations

### 💻 Programming Patterns

- **Two Pointers:** Dalam reverse operations
- **Divide & Conquer:** Block swap approach
- **Greedy:** Local optimal choices
- **Dynamic Programming:** Memoization in recursive

---

## 🔗 Problem Terkait

### 🎯 LeetCode Problems

- **#61:** Rotate List (Linked List version)
- **#48:** Rotate Image (2D array rotation)
- **#151:** Reverse Words in String (Similar reverse pattern)
- **#186:** Reverse Words in String II (In-place string)

### 📈 Progression Path

1. **Beginner:** Extra Array approach
2. **Intermediate:** Three Reverses
3. **Advanced:** Cyclic Replacements
4. **Expert:** Block Swap Algorithm

---

## 💡 Key Takeaways

### 🎯 Algorithm Selection

- **Interview/Production:** Three Reverses (optimal balance)
- **Learning:** Extra Array (easiest to understand)
- **Advanced Interview:** Cyclic Replacements (shows math skills)

### 🧠 Problem-Solving Framework

1. **Understand:** Visualize dengan contoh kecil
2. **Edge Cases:** Handle n=1, k=0, k>n
3. **Optimize:** Modular arithmetic untuk k
4. **Verify:** Test dengan berbagai input

### 🏆 Interview Success

- Mulai dengan brute force, jelaskan optimasi
- Tunjukkan pemahaman space-time tradeoffs
- Diskusikan edge cases dan follow-up questions
- Code clean, readable, dan well-commented

---

## 🎊 Kesimpulan

Rotate Array adalah problem klasik yang mengajarkan:

- **Array manipulation** techniques
- **Mathematical insights** dalam algorithm design
- **Space optimization** strategies
- **Multiple solution approaches** untuk satu problem

**Three Reverses Algorithm** adalah solusi yang paling elegant karena:

- ✅ Optimal time complexity O(n)
- ✅ Optimal space complexity O(1)
- ✅ Easy to implement dan understand
- ✅ Cache-friendly memory access pattern

Problem ini sering muncul dalam interview karena menguji pemahaman fundamental tentang arrays, mathematical thinking, dan ability untuk optimize solutions. Master problem ini, dan Anda akan siap untuk array manipulation challenges yang lebih advanced! 🚀

---

_Happy Coding! 🎯_
