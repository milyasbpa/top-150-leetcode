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

### Translate Intuisi → Kode

Sekarang setelah kita tau butuh 3 "mata", mari kita terjemahkan step-by-step intuisi kita menjadi kode:

#### 💭 **Pemikiran → Kode**

**🧠 Pemikiran:** "Kita isi dari kotak kosong paling kanan dulu"

```typescript
let k: number = m + n - 1; // Posisi paling kanan (kotak kosong terakhir)
```

**🧠 Pemikiran:** "Cari siapa yang paling besar dari kedua array"

```typescript
let i: number = m - 1; // Posisi angka terbesar di nums1
let j: number = n - 1; // Posisi angka terbesar di nums2
```

**🧠 Pemikiran:** "Terus ulang sampai selesai"

```typescript
while (i >= 0 && j >= 0) {
  // Selama masih ada angka di kedua array
  // Bandingkan siapa yang lebih besar
}
```

**🧠 Pemikiran:** "Siapa yang lebih besar berhak duduk paling belakang"

```typescript
if (nums1[i] > nums2[j]) {
  nums1[k] = nums1[i]; // nums1 menang, taruh di posisi k
  i--; // Pindah ke angka terbesar berikutnya di nums1
} else {
  nums1[k] = nums2[j]; // nums2 menang, taruh di posisi k
  j--; // Pindah ke angka terbesar berikutnya di nums2
}
k--; // Pindah ke kotak kosong berikutnya (ke kiri)
```

**🧠 Pemikiran:** "Kalau nums2 masih ada sisa, pindahkan semua"

```typescript
while (j >= 0) {
  nums1[k] = nums2[j];
  j--;
  k--;
}
// Catatan: nums1 sisa tidak perlu dipindah (sudah di tempat yang benar!)
```

#### 🔧 **Kode Lengkap: Gabungan Semua Pemikiran**

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // Setup: posisi awal untuk semua "pemain"
  let i: number = m - 1; // 👀 Lihat angka terbesar di nums1
  let j: number = n - 1; // 👀 Lihat angka terbesar di nums2
  let k: number = m + n - 1; // 📍 Posisi kotak kosong paling kanan

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

  // Cleanup: kalau nums2 masih ada sisa, pindahkan semua
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }

  // nums1 sisa? Tidak perlu dipindah, sudah di tempat yang benar! 🎉
}
```

#### 🎭 **Trace Kode dengan Contoh**

Mari kita lihat kode bekerja dengan contoh: `nums1 = [1,2,3,0,0,0]`, `nums2 = [2,5,6]`

```typescript
// Initial setup
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

// Loop berhenti karena j = -1
// nums1 sisa [1,2] sudah di tempat yang benar
// Final: [1,2,2,3,5,6] ✅
```

---

**💪 Selamat!**

Sekarang kamu sudah paham cara menggabungkan dua array terurut dengan cara yang optimal. Cobalah implementasi sendiri dan pastikan kamu mengerti intuisi di balik strategi "isi dari kanan ke kiri"! 🚀
