# 🔢 Merge Sorted Array - Seperti Menggabungkan Dua Antrian

## 📚 Apa itu Problem Ini?

Bayangkan kamu punya dua antrian anak-anak yang sudah berurutan dari yang paling pendek ke paling tinggi. Sekarang kamu harus menggabungkan kedua antrian ini menjadi satu antrian yang tetap berurutan, tapi dengan syarat khusus: **kamu harus menggunakan tempat antrian pertama yang sudah disediakan ruang kosong di belakangnya**.

### 🎯 Problem Statement

**LeetCode #88 - Merge Sorted Array**

Sekarang mari kita translate analogi tadi ke bahasa programming yang sebenarnya:

#### 📖 **Kamus Sederhana (Glossary)**

Sebelum kita lanjut, mari kenalan dulu dengan istilah-istilah yang akan kita pakai:

- **Array** = "Kotak antrian" (deretan kotak yang berisi angka-angka)
- **Integer** = Angka bulat (1, 2, 3, bukan 1.5 atau 2.7)
- **Element** = "Anak" di dalam antrian (setiap angka di dalam array)
- **Index** = Nomor urut kotak (posisi 0, 1, 2, 3...)
- **nums1, nums2** = Nama untuk "antrian 1" dan "antrian 2"
- **m, n** = Jumlah anak di setiap antrian

#### 🔄 **Dari Analogi ke Technical Language**

**Yang tadi kita bilang:**

> "Dua antrian anak-anak yang sudah berurutan dari pendek ke tinggi"

**Dalam bahasa programming:**

> Kamu diberikan dua array integer `nums1` dan `nums2` yang sudah **diurutkan dari kecil ke besar**

**Yang tadi kita bilang:**

> "Jumlah anak di setiap antrian"

**Dalam bahasa programming:**

> Plus dua integer `m` dan `n` yang menunjukkan jumlah elemen di `nums1` dan `nums2`

**Yang tadi kita bilang:**

> "Gabungkan jadi satu antrian yang tetap terurut"

**Dalam bahasa programming:**

> **Gabungkan** `nums1` dan `nums2` menjadi satu array yang tetap **terurut dari kecil ke besar**

**Yang tadi kita bilang:**

> "Harus pakai tempat antrian pertama yang sudah ada ruang kosongnya"

**Dalam bahasa programming:**

> Array hasil akhir tidak boleh dikembalikan sebagai array baru, tetapi harus **disimpan di dalam array** `nums1`. Untuk mengakomodasi ini, `nums1` punya panjang `m + n`, dimana `m` elemen pertama adalah elemen yang harus digabung, dan `n` elemen terakhir diset ke `0` (harus diabaikan). `nums2` punya panjang `n`.

### 📝 Contoh-contoh

Mari kita lihat beberapa contoh konkret untuk memahami masalahnya lebih baik:

**Contoh 1:**

```
Input:
- nums1 = [1,2,3,0,0,0] (antrian 1 dengan 3 ruang kosong)
- m = 3 (jumlah anak asli di antrian 1)
- nums2 = [2,5,6] (antrian 2)
- n = 3 (jumlah anak di antrian 2)

Output: [1,2,2,3,5,6]

Penjelasan Analogi:
- Antrian 1: Punya anak tinggi 1, 2, 3 + 3 kursi kosong
- Antrian 2: Punya anak tinggi 2, 5, 6
- Gabungan terurut: 1, 2, 2, 3, 5, 6

Penjelasan Technical:
- nums1 = [1,2,3] + [0,0,0] (m=3 elemen + n=3 ruang kosong)
- nums2 = [2,5,6] (n=3 elemen)
- Hasil gabungan: [1,2,2,3,5,6]
```

**Contoh 2:**

```
Input:
- nums1 = [1], m = 1
- nums2 = [], n = 0

Output: [1]

Penjelasan Analogi:
- Antrian 1: Cuma ada 1 anak
- Antrian 2: Kosong (tidak ada anak)
- Ya sudah, hasilnya cuma si anak tadi

Penjelasan Technical:
- nums1 punya 1 elemen, nums2 kosong
- Tidak ada yang digabung, hasil [1]
```

**Contoh 3:**

```
Input:
- nums1 = [0], m = 0
- nums2 = [1], n = 1

Output: [1]

Penjelasan Analogi:
- Antrian 1: Sebenarnya kosong (cuma kursi kosong)
- Antrian 2: Punya 1 anak tinggi 1
- Pindahkan si anak ke antrian 1

Penjelasan Technical:
- nums1 kosong (m=0), nums2 punya [1]
- Copy nums2 ke nums1: [1]
```

**Contoh 4:**

```
Input:
- nums1 = [4,5,6,0,0,0], m = 3
- nums2 = [1,2,3], n = 3

Output: [1,2,3,4,5,6]

Penjelasan Analogi:
- Antrian 1: Anak-anak tinggi 4, 5, 6
- Antrian 2: Anak-anak tinggi 1, 2, 3
- Wah, semua anak antrian 2 lebih pendek!
- Gabungan: 1, 2, 3, 4, 5, 6

Penjelasan Technical:
- Semua elemen nums2 lebih kecil dari nums1
- Hasil: gabungan terurut dari kedua array
```

**Contoh 5:**

```
Input:
- nums1 = [1,2,3,0,0,0], m = 3
- nums2 = [4,5,6], n = 3

Output: [1,2,3,4,5,6]

Penjelasan Analogi:
- Antrian 1: Anak-anak tinggi 1, 2, 3
- Antrian 2: Anak-anak tinggi 4, 5, 6
- Semua anak antrian 1 lebih pendek!
- Gabungan: antrian 1 dulu, baru antrian 2

Penjelasan Technical:
- Semua elemen nums1 lebih kecil dari nums2
- Hasil: nums1 dulu, baru nums2
```

### 🎯 Batasan-Batasan (Constraints)

Mari kita translate aturan main LeetCode ke bahasa sehari-hari:

#### 📏 **Ukuran Antrian**

```
Technical: nums1.length == m + n
Analogi: Panjang antrian 1 = jumlah anak asli + ruang kosong

Technical: nums2.length == n
Analogi: Panjang antrian 2 = jumlah anak di antrian 2
```

#### 👥 **Jumlah Anak**

```
Technical: 0 <= m, n <= 200
Analogi: Setiap antrian bisa kosong atau maksimal 200 anak

Technical: 1 <= m + n <= 200
Analogi: Total gabungan minimal 1 anak, maksimal 200 anak
```

#### 🔢 **Tinggi Anak (Nilai)**

```
Technical: -10^9 <= nums1[i], nums2[j] <= 10^9
Analogi: Tinggi anak bisa dari -1 miliar sampai +1 miliar
(Ya, ada anak dengan tinggi negatif di dunia programming! 😄)
```

### 📋 Syarat Utama

Mari kita pahami aturan main yang harus kita ikuti:

#### 🔄 **Modifikasi in-place**

```
Technical: Ubah nums1 langsung, jangan buat array baru
Analogi: Atur ulang antrian 1 yang ada, jangan bikin antrian baru
Kenapa: Hemat ruang memori, seperti merapikan rumah tanpa beli rumah baru
```

#### ⬆️ **Urutan naik**

```
Technical: Hasil harus terurut dari kecil ke besar
Analogi: Anak-anak harus berurutan dari yang paling pendek ke paling tinggi
Contoh: [1,2,3,4,5] ✅  [3,1,4,2,5] ❌
```

#### 🚨 **Handle edge cases**

```
Technical: Array kosong, elemen tunggal
Analogi: Antrian kosong, atau cuma ada 1 anak
Contoh: [], [5], [0] - semua harus bisa ditangani
```

#### ⚡ **Solusi optimal**

```
Technical: Harus lebih baik dari O(n log n)
Analogi: Harus lebih cepat dari "acak-acak semua anak lalu urutkan ulang"
Target: O(m + n) - cukup lihat setiap anak sekali saja
```

## 🤔 Intuisi Dasar: Mengapa Ini Tricky?

Sekarang setelah kita paham problem statement-nya, mari kita cari tahu **kenapa masalah ini tidak sesederhana yang terlihat**.

### 🚨 Masalah Utama: Kenapa Tidak Bisa Mulai dari Depan?

Mari kita coba approach yang SALAH dulu untuk memahami masalahnya:

**Setup awal (dalam bahasa analogi):**

```
Antrian 1: [anak tinggi 1, anak tinggi 2, anak tinggi 3, kursi kosong, kursi kosong, kursi kosong]
Antrian 2: [anak tinggi 2, anak tinggi 5, anak tinggi 6]
Target: [1, 2, 2, 3, 5, 6] - semua anak terurut dari pendek ke tinggi
```

**Setup awal (dalam bahasa technical):**

```
nums1 = [1,2,3,0,0,0]  m = 3
nums2 = [2,5,6]        n = 3
Target: [1,2,2,3,5,6]
```

**Coba algoritma naive dari depan:**

**Step 1: Compare 1 vs 2**

```
Analogi:
Antrian 1: [anak-1, anak-2, anak-3, kosong, kosong, kosong]
            ↑ lihat anak pertama
Antrian 2: [anak-2, anak-5, anak-6]
            ↑ lihat anak pertama

Anak tinggi 1 vs anak tinggi 2 → yang tinggi 1 lebih pendek
Jadi taruh anak tinggi 1 di posisi pertama hasil akhir

Technical:
nums1: [1,2,3,0,0,0]
        ↑ (i=0)
nums2: [2,5,6]
        ↑ (j=0)

1 < 2, jadi taruh 1 di posisi 0
Result: [1,2,3,0,0,0] ← 1 sudah benar di posisi 0
```

**Step 2: Compare 2 vs 2 - INI MULAI BERMASALAH!**

```
Analogi:
Antrian 1: [?, anak-2, anak-3, kosong, kosong, kosong]
               ↑ lihat anak kedua
Antrian 2: [anak-2, anak-5, anak-6]
            ↑ masih lihat anak pertama

Anak tinggi 2 vs anak tinggi 2 → sama tinggi!
Mau taruh yang mana di posisi kedua?

MASALAH: Posisi kedua kan sudah ada anak tinggi 2 dari antrian 1!
Kalau kita taruh anak dari antrian 2, anak asli antrian 1 hilang! 😱

Technical:
nums1: [1,2,3,0,0,0]
         ↑ (i=1)
nums2: [2,5,6]
        ↑ (j=0)

2 == 2, taruh yang mana dulu? Mari kita taruh 2 dari nums1 di posisi 1
Tapi tunggu... posisi 1 sudah ada angka 2 dari nums1!
Kalau kita overwrite, data asli hilang!

Atau kalau kita taruh 2 dari nums2 di posisi 1:
Result: [1,2,3,0,0,0] → [1,2,3,0,0,0]
        Angka 2 asli dari nums1 hilang!
```

**Step 3: Masalah makin parah**

```
Analogi:
Sekarang antrian 1 kita jadi: [anak-1, ???, anak-3, kosong, kosong, kosong]
- Anak tinggi 2 yang asli hilang!
- Kita kehilangan informasi penting!
- Sistemnya jadi kacau

Technical:
Sekarang kita punya [1,2,3,0,0,0] tapi:
- Angka 2 asli dari nums1 (posisi 1) sudah ketimpa
- Kita kehilangan informasi penting!
- Algoritma jadi rusak
```

### 🔍 Mengapa Ini Terjadi?

Sekarang mari kita analisis kenapa pendekatan "dari depan" gagal:

**Alasan 1: Overwriting Problem (Masalah Menimpa Data)**

```
Analogi:
- Antrian 1 itu seperti rumah yang sudah ada penghuninya DAN ada kamar kosong
- Saat kita isi dari depan, kita "mengusir" penghuni lama yang belum pindah
- Tidak ada tempat sementara untuk penghuni lama menunggu

Technical:
- Saat kita isi dari depan, kita "menginjak" data yang belum diproses
- nums1 berisi data asli DAN tempat untuk hasil akhir
- Tidak ada "buffer" untuk menyimpan data sementara
```

**Alasan 2: Tidak Ada Ruang Aman**

```
Analogi:
Antrian 1: [anak-1, anak-2, anak-3, kosong, kosong, kosong]
            ←penghuni lama→ ←kamar kosong→

Kalau mulai dari kiri:
- Kamar 1,2,3 masih ada penghuninya
- Kalau kita isi kamar 1,2,3 → penghuni lama terusir dan hilang!

Technical:
nums1: [1,2,3,0,0,0]
        ←data asli→ ←ruang kosong→

Kalau mulai dari kiri:
- Posisi 0,1,2 masih berisi data penting
- Kalau kita isi posisi 0,1,2 → data asli hilang!
```

### 🎯 Solusi yang Benar: Isi dari Kanan ke Kiri!

**Ide cemerlang: Pakai ruang kosong dulu!**

Ingat, nums1 itu seperti kotak yang sudah ada isinya DAN ada ruang kosong:

```
nums1: [1,2,3,0,0,0]
        ↑ ↑ ↑ ↑ ↑ ↑
        isi  ruang kosong
```

**Langkah-langkahnya:**

**🤔 Pertanyaan: Gimana cara isi kotak kosong yang aman?**

Kunci utamanya: **Kita isi dari kotak kosong paling kanan dulu!**

Kenapa? Karena kotak kosong paling kanan itu paling aman - tidak akan mengganggu data yang belum kita proses.

**💡 Strategi: Siapa yang berhak duduk di kursi paling belakang?**

Dalam antrian dari kecil ke besar, yang paling besar berhak duduk paling belakang!

**Step 1: Cari siapa yang paling berhak duduk di tempat paling belakang**

```
nums1: [1,2,3,0,0,0]  ← data yang ada: 1, 2, 3
nums2: [2,5,6]        ← data yang ada: 2, 5, 6

Siapa yang paling besar dari SEMUA angka?
- Dari nums1: angka terbesar = 3
- Dari nums2: angka terbesar = 6
- Yang paling besar = 6 (dari nums2)

Jadi 6 berhak duduk di kursi paling belakang!
Result: [1,2,3,0,0,6]
```

**Step 2: Sekarang siapa yang berhak duduk di kursi kedua dari belakang?**

```
nums1: [1,2,3,0,0,6]  ← sisa: 1, 2, 3 (yang 6 sudah "pindah")
nums2: [2,5,_]        ← sisa: 2, 5 (yang 6 sudah dipake)

Siapa yang paling besar dari sisa angka?
- Dari nums1: angka terbesar = 3
- Dari nums2: angka terbesar = 5
- Yang paling besar = 5 (dari nums2)

Jadi 5 berhak duduk di kursi kedua dari belakang!
Result: [1,2,3,0,5,6]
```

**Step 3: Lanjutkan logika yang sama...**

```
nums1: [1,2,3,0,5,6]  ← sisa: 1, 2, 3
nums2: [2,_,_]        ← sisa: 2

Siapa yang paling besar dari sisa angka?
- Dari nums1: angka terbesar = 3
- Dari nums2: angka terbesar = 2
- Yang paling besar = 3 (dari nums1)

Jadi 3 berhak duduk di kursi ketiga dari belakang!

Tapi tunggu... angka 3 kan asalnya dari posisi nums1[2]
Kalau kita pindahkan 3 ke posisi yang tepat, posisi nums1[2] jadi kosong!
Result: [1,2,_,3,5,6]
```

**Nah ini yang genius!** Kita taruh di posisi yang baru jadi kosong:

```
Result: [1,2,3,3,5,6]
```

**Step 4: Terus sampai selesai**

```
nums1: [1,2,3,3,5,6]  ← angka terbesar = 2
nums2: [2,_,_]        ← angka terbesar = 2

2 vs 2 = sama! Pilih yang mana saja, misal dari nums2:
Result: [1,2,2,3,5,6]

nums1: [1,_,2,3,5,6]  ← angka terbesar = 1
nums2: [_,_,_]        ← sudah habis

Tinggal 1, langsung taruh:
Result: [1,1,2,3,5,6] ← eh salah! Harusnya [1,2,2,3,5,6]
```

**Koreksi:** Sebenarnya angka 1 dan 2 di nums1 sudah di tempat yang benar, jadi tidak perlu dipindah!

**Hasil akhir:** `[1,2,2,3,5,6]` ✅

## 🎯 Strategi Penyelesaian

Sekarang mari kita translate pemikiran tadi menjadi kode!

### 🎮 **Siapa Saja "Pemain" yang Kita Butuhkan?**

Sebelum kita bikin kode, mari kita pikir dulu: **berapa "pemain" yang kita butuhkan untuk main game ini?**

Ingat analogi kita tadi: kita punya **2 antrian anak-anak** yang mau **digabung jadi 1 antrian**. Nah, untuk bisa main game ini, kita butuh **3 "mata"** untuk lihat-lihat!

#### 🤔 **Kenapa Butuh 3 Mata (3 Variable)?**

Mari kita bayangkan kayak main game **"Tunjuk-Tunjuk Anak"**:

**👁️ Mata #1: Lihat Anak Terbesar di Antrian 1**

```
Antrian 1: [1, 2, 3, _, _, _]
                ↑
               Mata #1 lihat kesini
```

- **Tugasnya:** Tunjuk anak terbesar yang belum "lomba" di antrian 1
- **Nama variabelnya:** `i` (dari "index")
- **Kenapa butuh:** Kita harus tau siapa yang mau dilomba dari antrian 1

**👁️ Mata #2: Lihat Anak Terbesar di Antrian 2**

```
Antrian 2: [2, 5, 6]
                ↑
               Mata #2 lihat kesini
```

- **Tugasnya:** Tunjuk anak terbesar yang belum "lomba" di antrian 2
- **Nama variabelnya:** `j` (dari "index juga")
- **Kenapa butuh:** Kita harus tau siapa yang mau dilomba dari antrian 2

**👁️ Mata #3: Lihat Kursi Kosong yang Mau Diisi**

```
Antrian Gabungan: [_, _, _, _, _, _]
                               ↑
                          Mata #3 lihat kesini
```

- **Tugasnya:** Tunjuk kursi kosong yang mau diisi (dari belakang ke depan)
- **Nama variabelnya:** `k` (dari "kursi")
- **Kenapa butuh:** Kita harus tau dimana naruh si pemenang lomba

#### 🤷‍♂️ **Kenapa Gak Bisa Cuma 1 atau 2 Variable?**

**❌ Kalau Cuma 1 Variable:**

- Gimana cara kita bandingkan 2 anak sekaligus?
- Siapa yang ngatur dimana naruh si pemenang?
- Pasti bingung dan error!

**❌ Kalau Cuma 2 Variable:**

- Misalnya cuma ada mata #1 dan mata #2
- Terus si pemenang mau ditaruh dimana? Siapa yang ngatur?
- Atau misalnya cuma ada mata #1 dan mata #3
- Siapa yang jadi lawan si anak dari antrian 1?

**✅ Makanya Butuh 3 Variable:**

- 2 mata untuk lihat kontestan (mata #1 dan mata #2)
- 1 mata untuk lihat tempat naruh pemenang (mata #3)
- Lengkap dan tidak ada yang terlewat!

#### 🏃‍♂️ **Gimana "Mata-Mata" Ini Bergerak?**

Bayangkan kayak game **"Lomba Lari Mundur"**:

**📍 Mata #1 (i): Mundur di Antrian 1**

```
Awal:    [1, 2, 3, _, _, _]   i=2 (lihat angka 3)
Step 1:  [1, 2, _, _, _, _]   i=1 (lihat angka 2)
Step 2:  [1, _, _, _, _, _]   i=0 (lihat angka 1)
Step 3:  [_, _, _, _, _, _]   i=-1 (udah habis)
```

**📍 Mata #2 (j): Mundur di Antrian 2**

```
Awal:    [2, 5, 6]   j=2 (lihat angka 6)
Step 1:  [2, 5, _]   j=1 (lihat angka 5)
Step 2:  [2, _, _]   j=0 (lihat angka 2)
Step 3:  [_, _, _]   j=-1 (udah habis)
```

**📍 Mata #3 (k): Mundur di Antrian Gabungan**

```
Awal:    [_, _, _, _, _, _]   k=5 (kursi paling belakang)
Step 1:  [_, _, _, _, _, 6]   k=4 (kursi nomor 2 dari belakang)
Step 2:  [_, _, _, _, 5, 6]   k=3 (kursi nomor 3 dari belakang)
...dan seterusnya mundur ke depan
```

**🎯 Pola Geraknya:**

- Mata #1 dan #2: Mundur kalau "anak"nya menang/kalah
- Mata #3: Selalu mundur setiap kali ada yang ditaruh

### 🔧 **Implementasi: Dari Konsep ke Kode**

Sekarang setelah kita paham konsep 3 "mata", mari kita implementasikan step-by-step menjadi kode TypeScript:

#### 💭 **Step 1: Setup Variable (Persiapan "Mata")**

**🧠 Logika:** "Siapkan 3 mata untuk melihat posisi yang tepat"

```typescript
// Setup: posisi awal untuk semua "pemain"
let i: number = m - 1; // 👁️ Mata #1: Lihat angka terbesar di nums1
let j: number = n - 1; // 👁️ Mata #2: Lihat angka terbesar di nums2
let k: number = m + n - 1; // 👁️ Mata #3: Posisi kotak kosong paling kanan
```

#### � **Step 2: Main Loop (Lomba Utama)**

**🧠 Logika:** "Selama masih ada kontestan di kedua antrian, adakan lomba!"

```typescript
// Loop utama: "Siapa yang berhak duduk di kursi paling belakang?"
while (i >= 0 && j >= 0) {
  if (nums1[i] > nums2[j]) {
    // nums1 menang! Taruh di kursi belakang
    nums1[k] = nums1[i];
    i--; // Pindah ke "kontestan" nums1 berikutnya
  } else {
    // nums2 menang! Taruh di kursi belakang
    nums1[k] = nums2[j];
    j--; // Pindah ke "kontestan" nums2 berikutnya
  }
  k--; // Pindah ke kursi berikutnya (ke depan)
}
```

#### 🧹 **Step 3: Cleanup (Beres-beres Sisa)**

**🧠 Logika:** "Kalau nums2 masih ada sisa, pindahkan semua ke nums1"

```typescript
// Cleanup: kalau nums2 masih ada sisa, pindahkan semua
while (j >= 0) {
  nums1[k] = nums2[j];
  j--;
  k--;
}
// Note: nums1 sisa tidak perlu dipindah (sudah di tempat yang benar!) 🎉
```

#### 🔧 **Kode Lengkap: Solusi Final**

Berikut adalah gabungan semua step menjadi fungsi TypeScript yang lengkap:

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // Step 1: Setup variable (persiapan 3 "mata")
  let i: number = m - 1; // �️ Mata #1: Lihat angka terbesar di nums1
  let j: number = n - 1; // �️ Mata #2: Lihat angka terbesar di nums2
  let k: number = m + n - 1; // �️ Mata #3: Posisi kotak kosong paling kanan

  // Step 2: Main loop (lomba utama)
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

  // Step 3: Cleanup (beres-beres sisa)
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}
```

#### 🎭 **Testing: Trace Kode dengan Contoh**

Mari kita test kode kita dengan contoh: `nums1 = [1,2,3,0,0,0]`, `nums2 = [2,5,6]`

```typescript
// Initial setup (Step 1)
i = 2, j = 2, k = 5
nums1[2] = 3, nums2[2] = 6

// Iteration 1: while (2 >= 0 && 2 >= 0)
if (3 > 6) → false
nums1[5] = 6; j = 1; k = 4
// Result: [1,2,3,0,0,6]

// Iteration 2: while (2 >= 0 && 1 >= 0)
if (3 > 5) → false
nums1[4] = 5; j = 0; k = 3
// Result: [1,2,3,0,5,6]

// Iteration 3: while (2 >= 0 && 0 >= 0)
if (3 > 2) → true
nums1[3] = 3; i = 1; k = 2
// Result: [1,2,3,3,5,6]

// Iteration 4: while (1 >= 0 && 0 >= 0)
if (2 > 2) → false
nums1[2] = 2; j = -1; k = 1
// Result: [1,2,2,3,5,6]

// Loop berhenti karena j = -1 (nums2 habis)
// nums1 sisa [1,2] sudah di tempat yang benar
// Final result: [1,2,2,3,5,6] ✅
```

---

## 🚀 **Advanced Topics & Analysis**

Sekarang setelah kamu paham konsep dasar, mari kita dive deeper ke topik-topik advanced untuk pemahaman yang lebih komprehensif.

### ⚡ **Time & Space Complexity Analysis**

#### 📊 **Time Complexity: O(m + n)**

```
Analogi:
Seperti menghitung semua anak di kedua antrian tepat sekali saja.
Tidak ada anak yang dihitung berulang-ulang.

Technical Analysis:
- Worst case: Kita harus melihat setiap elemen di nums1 dan nums2 tepat sekali
- Best case: Sama dengan worst case, karena kita tetap harus merge semua
- Average case: O(m + n)

Proof:
- Main loop: maksimal (m + n) iterations
- Cleanup loop: maksimal n iterations
- Total: O(m + n) + O(n) = O(m + n)
```

#### 💾 **Space Complexity: O(1)**

```
Analogi:
Kita tidak perlu ruang tambahan, cukup gunakan kursi kosong yang sudah ada.

Technical Analysis:
- Auxiliary space: Hanya 3 variables (i, j, k) = O(1)
- In-place modification: Menggunakan ruang kosong di nums1
- No additional arrays: Tidak ada array tambahan yang dibuat

Space-efficient karena:
✅ Menggunakan space yang sudah dialokasikan (nums1)
✅ Constant extra space regardless of input size
```

### 🔄 **Comparison dengan Algoritma Lain**

#### 🥊 **vs. Naive Approach (Copy + Sort)**

```typescript
// ❌ Naive approach
function mergeNaive(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  // Step 1: Copy nums2 to nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  // Step 2: Sort the entire array
  nums1.sort((a, b) => a - b);
}
```

**Comparison:**
| Aspect | Our Solution | Naive Approach |
|--------|-------------|----------------|
| **Time** | O(m + n) | O((m+n) log(m+n)) |
| **Space** | O(1) | O(1) |
| **Optimality** | ✅ Optimal | ❌ Sub-optimal |
| **Elegance** | ✅ Clean | ❌ Wasteful |

#### 🌟 **vs. Merge Sort Algorithm**

```typescript
// 🔍 Merge Sort's merge function (creates new array)
function mergeSortMerge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

**Key Differences:**
| Aspect | Our Solution | Merge Sort |
|--------|-------------|------------|
| **Direction** | Right → Left | Left → Right |
| **Space** | In-place (O(1)) | New array (O(m+n)) |
| **Use Case** | Fixed space constraint | General sorting |
| **Overwriting** | Avoided by direction | Avoided by new array |

### 🎯 **Alternative Approaches & Optimizations**

#### 🔀 **Alternative 1: Two-Pass Approach**

```typescript
// 📝 Step 1: Copy valid elements to end
// 📝 Step 2: Merge from beginning
function mergeAlternative1(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  // Move nums1 elements to the end
  for (let i = m - 1; i >= 0; i--) {
    nums1[i + n] = nums1[i];
  }

  // Now merge from beginning
  let i = n,
    j = 0,
    k = 0;
  while (i < m + n && j < n) {
    if (nums1[i] <= nums2[j]) {
      nums1[k++] = nums1[i++];
    } else {
      nums1[k++] = nums2[j++];
    }
  }

  // Copy remaining elements
  while (j < n) nums1[k++] = nums2[j++];
}
```

**Trade-offs:**

- ✅ Easier to understand (standard merge direction)
- ❌ Requires additional copying step
- ❌ More operations overall

#### 🔀 **Alternative 2: Recursive Approach**

```typescript
function mergeRecursive(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  function merge(i: number, j: number, k: number): void {
    if (i < 0) {
      // Only nums2 elements left
      while (j >= 0) nums1[k--] = nums2[j--];
      return;
    }
    if (j < 0) {
      // Only nums1 elements left (already in place)
      return;
    }

    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      merge(i - 1, j, k - 1);
    } else {
      nums1[k] = nums2[j];
      merge(i, j - 1, k - 1);
    }
  }

  merge(m - 1, n - 1, m + n - 1);
}
```

**Trade-offs:**

- ✅ Elegant recursive structure
- ❌ O(m + n) space complexity due to call stack
- ❌ Potential stack overflow for large inputs

### 🎓 **When to Use Our Solution**

**✅ Perfect for:**

- **Memory-constrained environments**
- **In-place operations required**
- **Interview questions** (shows optimal thinking)
- **Large arrays** (no additional memory allocation)

**❌ Consider alternatives when:**

- **Code readability** is more important than optimization
- **Debugging** is critical (simpler approaches easier to debug)
- **Stack overflow** is a concern (very large inputs with recursion)

### 🧠 **Problem Variations & Extensions**

#### 🔢 **Related LeetCode Problems:**

1. **Merge k Sorted Arrays** (LeetCode #23)

   - Extension: Multiple arrays instead of just 2
   - Technique: Divide & conquer or priority queue

2. **Merge Sorted Array II** (Return new array)

   - Constraint: Cannot modify input arrays
   - Solution: Standard merge with new array

3. **Intersection of Two Sorted Arrays** (LeetCode #349)
   - Goal: Find common elements instead of merge
   - Technique: Two pointers from left

#### 🚀 **Advanced Optimizations:**

```typescript
// 🎯 Early termination optimization
function mergeOptimized(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  // Quick wins: handle edge cases
  if (n === 0) return;
  if (m === 0) {
    for (let i = 0; i < n; i++) nums1[i] = nums2[i];
    return;
  }

  // Early termination: if largest nums2 <= smallest nums1
  if (nums2[n - 1] <= nums1[0]) {
    // Shift nums1 to the right, insert nums2 at beginning
    for (let i = m - 1; i >= 0; i--) nums1[i + n] = nums1[i];
    for (let i = 0; i < n; i++) nums1[i] = nums2[i];
    return;
  }

  // Early termination: if smallest nums2 >= largest nums1
  if (nums2[0] >= nums1[m - 1]) {
    // Just append nums2 to nums1
    for (let i = 0; i < n; i++) nums1[m + i] = nums2[i];
    return;
  }

  // Otherwise use our standard algorithm
  // ... (main algorithm here)
}
```

---

## 🎮 **Interactive Learning & Practice**

Mari kita test pemahaman kamu dengan quiz dan challenges yang fun!

### 🧩 **Quiz: Test Your Understanding**

#### **Quiz 1: Conceptual Understanding**

**❓ Pertanyaan:** Mengapa kita tidak bisa mulai merge dari kiri ke kanan?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena akan terjadi **overwriting problem**!

**Analogi:** Seperti merapikan rumah sambil tinggal di dalamnya. Kalau kita mulai dari ruang tamu, kita akan "mengusir" penghuni lama sebelum mereka punya tempat baru.

**Technical:** nums1 berisi data asli DAN space untuk hasil akhir. Kalau kita isi dari kiri, data asli akan tertimpa sebelum diproses.

</details>

#### **Quiz 2: Variable Understanding**

**❓ Pertanyaan:** Kenapa butuh 3 variable (i, j, k)? Kenapa tidak 2 atau 4?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** Karena kita punya **3 tugas berbeda**:

1. **i:** Track posisi di nums1 (kontestan antrian 1)
2. **j:** Track posisi di nums2 (kontestan antrian 2)
3. **k:** Track posisi hasil merge (tempat duduk pemenang)

**Analogi:** Seperti wasit lomba yang butuh 3 mata: 2 mata lihat kontestan, 1 mata lihat finish line.

</details>

#### **Quiz 3: Edge Cases**

**❓ Pertanyaan:** Apa yang terjadi kalau nums2 kosong (n = 0)?

<details>
<summary>🤔 Click untuk melihat jawaban</summary>

**✅ Jawaban:** **Tidak perlu merge sama sekali!**

**Analogi:** Kalau antrian 2 kosong, antrian 1 sudah perfect sendiri.

**Technical:** Loop utama tidak akan dijalankan (j = -1), nums1 sudah terurut.

```typescript
// nums1 = [1,2,3], m = 3, nums2 = [], n = 0
// Result: nums1 tetap [1,2,3] ✅
```

</details>

### 🏆 **Challenges: Practice Makes Perfect**

#### **Challenge 1: Trace the Algorithm**

**🎯 Task:** Trace algoritma untuk input berikut step-by-step:

```
Input: nums1 = [2,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3
Expected: [1,2,2,3,5,6]
```

<details>
<summary>💪 Click untuk melihat solution</summary>

```typescript
// Initial: i=2, j=2, k=5
// nums1[2]=6, nums2[2]=3

// Step 1: 6 > 3 → nums1[5]=6, i=1, k=4
// Result: [2,5,6,0,0,6]

// Step 2: 5 > 3 → nums1[4]=5, i=0, k=3
// Result: [2,5,6,0,5,6]

// Step 3: 2 < 3 → nums1[3]=3, j=1, k=2
// Result: [2,5,6,3,5,6]

// Step 4: 2 = 2 → nums1[2]=2, j=0, k=1
// Result: [2,5,2,3,5,6]

// Step 5: 2 > 1 → nums1[1]=2, i=-1, k=0
// Result: [2,2,2,3,5,6]

// Cleanup: nums1[0]=nums2[0]=1
// Final: [1,2,2,3,5,6] ✅
```

</details>

#### **Challenge 2: Edge Case Master**

**🎯 Task:** Predict output untuk edge cases ini:

```typescript
// Test Case 1
(nums1 = [0]), (m = 0), (nums2 = [1]), (n = 1);
// Your answer: ?

// Test Case 2
(nums1 = [1, 2, 3, 0, 0, 0]), (m = 3), (nums2 = [4, 5, 6]), (n = 3);
// Your answer: ?

// Test Case 3
(nums1 = [4, 5, 6, 0, 0, 0]), (m = 3), (nums2 = [1, 2, 3]), (n = 3);
// Your answer: ?
```

<details>
<summary>🧠 Click untuk melihat solutions</summary>

```typescript
// Test Case 1: [1]
// nums1 kosong, copy semua nums2

// Test Case 2: [1,2,3,4,5,6]
// nums2 semua lebih besar, append di belakang

// Test Case 3: [1,2,3,4,5,6]
// nums2 semua lebih kecil, insert di depan
```

</details>

#### **Challenge 3: Code Debugging**

**🎯 Task:** Ada bug di kode ini! Bisakah kamu temukan dan fix?

```typescript
function mergeBuggy(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      // 🐛 Bug here?
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Missing cleanup code? 🐛
}
```

<details>
<summary>🔍 Click untuk melihat bug fixes</summary>

**🐛 Bug #1:** Condition `>=` seharusnya `>` untuk stable sort
**🐛 Bug #2:** Missing cleanup loop untuk sisa nums2

```typescript
// ✅ Fixed version:
while (i >= 0 && j >= 0) {
  if (nums1[i] > nums2[j]) {
    // Fixed: > instead of >=
    nums1[k] = nums1[i];
    i--;
  } else {
    nums1[k] = nums2[j];
    j--;
  }
  k--;
}

// ✅ Added missing cleanup:
while (j >= 0) {
  nums1[k] = nums2[j];
  j--;
  k--;
}
```

</details>

### 🎨 **Visual Learning: Rich Diagrams**

#### **📊 Algorithm Flow Diagram**

```
🏁 START
    ↓
📋 Setup Variables (i, j, k)
    ↓
🔄 While (i >= 0 && j >= 0)
    ↓
🥊 Compare nums1[i] vs nums2[j]
    ↓                    ↓
nums1[i] > nums2[j]    nums1[i] ≤ nums2[j]
    ↓                    ↓
📤 nums1[k] = nums1[i]  📤 nums1[k] = nums2[j]
📉 i--                  📉 j--
    ↓                    ↓
    📉 k--  ←------------┘
    ↓
🔄 Loop back
    ↓
🧹 Cleanup remaining nums2
    ↓
🎉 END
```

#### **🎭 Memory Layout Visualization**

```
Initial State:
┌─────────────────────────────────┐
│ nums1: [1][2][3][0][0][0]      │
│         ↑  ↑  ↑  ↑  ↑  ↑       │
│         0  1  2  3  4  5       │
│              i     k           │
│                               │
│ nums2: [2][5][6]              │
│         ↑  ↑  ↑                │
│         0  1  2                │
│              j                 │
└─────────────────────────────────┘

After Step 1 (6 wins):
┌─────────────────────────────────┐
│ nums1: [1][2][3][0][0][6]      │
│         ↑  ↑  ↑  ↑  ↑  ↑       │
│         0  1  2  3  4  5       │
│              i  k              │
│                               │
│ nums2: [2][5][×]              │
│         ↑  ↑  ↑                │
│         0  1  2                │
│           j                    │
└─────────────────────────────────┘

Final State:
┌─────────────────────────────────┐
│ nums1: [1][2][2][3][5][6]      │
│         ↑  ↑  ↑  ↑  ↑  ↑       │
│         0  1  2  3  4  5       │
│                               │
│ nums2: [×][×][×]              │
│         ↑  ↑  ↑                │
│         0  1  2                │
└─────────────────────────────────┘
```

#### **⚡ Performance Comparison Chart**

```
Time Complexity Comparison:
Our Solution    : ████████████████████ O(m+n)
Naive (sort)    : ████████████████████████████████████ O((m+n)log(m+n))
Brute Force     : ████████████████████████████████████████████ O(m*n)

Space Complexity Comparison:
Our Solution    : ██ O(1)
Create New Array: ████████████████████ O(m+n)
Merge Sort      : ████████████████████ O(m+n)

Legend: ████ = Relative time/space usage
```

#### **🎯 Decision Tree Flowchart**

```
         Start Merge
              │
    ┌─────────┴─────────┐
    │                   │
 nums1[i]           nums1[i]
    >                 ≤
 nums2[j]           nums2[j]
    │                   │
    ▼                   ▼
┌─────────┐         ┌─────────┐
│nums1[k] │         │nums1[k] │
│= nums1[i]│         │= nums2[j]│
│   i--   │         │   j--   │
└─────────┘         └─────────┘
    │                   │
    └─────────┬─────────┘
              │
           k--
              │
              ▼
    ┌─────────────────┐
    │ Continue loop?  │
    │ (i>=0 && j>=0)  │
    └─────────┬───────┘
              │
     ┌────────┴────────┐
     │                 │
    Yes               No
     │                 │
     ▼                 ▼
   Loop              Cleanup
   Back             remaining
                    elements
```

### 🎪 **Interactive Code Playground**

#### **🛠️ Try Different Inputs**

Copy kode ini dan coba dengan input berbeda:

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  console.log(`🏁 START: nums1=[${nums1}], nums2=[${nums2}]`);

  while (i >= 0 && j >= 0) {
    console.log(
      `🔍 Compare: nums1[${i}]=${nums1[i]} vs nums2[${j}]=${nums2[j]}`
    );

    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      console.log(`📤 nums1[${k}] = ${nums1[i]} (from nums1[${i}])`);
      i--;
    } else {
      nums1[k] = nums2[j];
      console.log(`📤 nums1[${k}] = ${nums2[j]} (from nums2[${j}])`);
      j--;
    }
    k--;
    console.log(`📊 Current state: [${nums1}]\n`);
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    console.log(`🧹 Cleanup: nums1[${k}] = ${nums2[j]}`);
    j--;
    k--;
  }

  console.log(`🎉 FINAL: [${nums1}]`);
}

// 🎯 Try these test cases:
// Test 1: merge([1,2,3,0,0,0], 3, [2,5,6], 3);
// Test 2: merge([1], 1, [], 0);
// Test 3: merge([0], 0, [1], 1);
```

#### **🎲 Random Test Generator**

```typescript
// 🎰 Generate random test cases
function generateRandomTest(): void {
  const m = Math.floor(Math.random() * 5) + 1;
  const n = Math.floor(Math.random() * 5) + 1;

  const nums1_data = Array.from({ length: m }, () =>
    Math.floor(Math.random() * 10)
  ).sort((a, b) => a - b);
  const nums1 = [...nums1_data, ...Array(n).fill(0)];

  const nums2 = Array.from({ length: n }, () =>
    Math.floor(Math.random() * 10)
  ).sort((a, b) => a - b);

  console.log(`🎲 Random Test:`);
  console.log(`nums1 = [${nums1}], m = ${m}`);
  console.log(`nums2 = [${nums2}], n = ${n}`);
  console.log(
    `Try merge(${JSON.stringify(nums1)}, ${m}, ${JSON.stringify(nums2)}, ${n});`
  );
}

// generateRandomTest(); // Uncomment to try!
```

---

## 🎉 **Selamat!**

Kamu sudah berhasil memahami dan mengimplementasikan algoritma **Merge Sorted Array** dengan pendekatan optimal!

**💡 Key Takeaways:**

- **Analogi antrian:** Membantu memahami konsep dasar
- **3 pointer technique:** Solusi elegant untuk in-place merging
- **Right-to-left approach:** Menghindari overwriting data
- **O(m+n) time complexity:** Optimal solution

**🚀 Next Steps:**

- Coba implementasi sendiri tanpa melihat kode
- Test dengan edge cases (array kosong, elemen tunggal)
- Explore variasi problem lainnya (merge k sorted arrays)

Keep coding and happy learning! 🌟
