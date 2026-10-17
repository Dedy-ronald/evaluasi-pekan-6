# Tugas Evaluasi JavaScript Pekan 6 - Sistem Kasir & Algoritma Logika

Proyek ini merupakan kumpulan pengerjaan evaluasi pekan ke-6 yang mencakup pembersihan data transaksi mentah, pembuatan sistem mesin kasir kedai kopi, pelaporan otomatis, latihan fungsi algoritma fundamental, hingga perbaikan serta eksperimen fitur-fitur bawaan JavaScript (JS).

## Deskripsi Proyek
Proyek ini dibagi menjadi beberapa bagian modul terpisah:
1. **Pembersih Data & Data Bersih (Kedai Senja):** Melakukan standardisasi nama (*Title Case*), validasi angka, dan ekstraksi voucher diskon menggunakan berbagai struktur fungsi JS.
2. **Mesin Kasir:** Objek kasir modular yang mensimulasikan pemotongan stok barang aktual, perhitungan pajak 11%, alokasi promo hari, serta pemecahan lembaran uang kembalian tunai secara matematis.
3. **Laporan Harian:** Generator statistik otomatis untuk merekap total omzet lunas, melacak produk terlaris, dan mendeteksi persediaan barang gudang yang kritis (< 3).
4. **Latihan Logika:** Kumpulan fungsi algoritma murni seperti pengecekan bilangan prima, palindrom, faktorial, dan eliminasi duplikasi data tanpa merusak referensi memori asal.
5. **Perbaikan Kode & Eksperimen:** Dokumentasi analisis *bug* dan pembuktian sifat unik Javascript seperti *hoisting*, *immutability string*, evaluasi nilai *truthy/falsy*, serta efek samping pembulatan desimal.

##  Cara Menjalankan Program
Seluruh program dijalankan menggunakan peramban (*web browser*) lewat menu **Console Developer Tools (F12)**. 

| Halaman File | Lokasi Script | Deskripsi Tampilan |
| :--- | :--- | :--- |
| `index.html` | `script.js` | Menampilkan simulasi cetak struk belanja pelanggan dan ringkasan keuangan dompet kasir Kedai Senja. |
| `logika.html` | `logika.js` | Menampilkan hasil uji coba fungsi algoritma (Prima, Palindrom, Faktorial, Hapus Duplikat). |
| `perbaikan.html` | `perbaikan.js` | Menampilkan hasil pelacakan 15 perbaikan *syntax & logic error* yang sudah dinormalisasi. |
| `eksperimen.html` | `eksperimen.js` | Menampilkan demo interaktif tebakan keluaran kode dan pembuktian konsep data JS. |

*Langkah:* Cukup klik ganda (*double click*) pada masing-masing file `.html` di atas untuk membukanya di browser Anda, lalu tekan **F12** dan pilih tab **Console**.

## Teknologi yang Digunakan
* **HTML5:** Struktur dasar halaman *interface* pengujian.
* **JavaScript (ES6+):** Logika utama program (Array & Object Manipulation, Regex, String Methods, Control Flow Loops).

## Penulis
* **Nama:** Muhammad Dedy
* **Tanggal Pengerjaan:** 17 Oktober 2026
* **Status Proyek:** Selesai (Evaluasi Pekan 6 Bagian 2 - 8)

## Git Log History
Berikut adalah rekam jejak riwayat pengerjaan fitur yang terbagi secara rapi ke masing-masing cabang (*branch*) kerja sebelum disatukan:

```text
*   d8f9e2a (HEAD -> main, origin/main) Merge pull request #4 from docs/tebak-jelaskan
|\  
| * c7b6a5d (origin/docs/tebak-jelaskan, docs/tebak-jelaskan) feat: menambahkan latihan tebak kode dan eksperimen falsy truthy
|/  
*   e4d3c2b Merge pull request #3 from fix/perbaikan-kode
|\  
| * b5a4f3e (origin/fix/perbaikan-kode, fix/perbaikan-kode) fix: memperbaiki 15 kesalahan syntax dan logika operasi matematika
|/  
*   a2b1c0d Merge pull request #2 from feat/latihan-logika
|\  
| * f9e8d7c (origin/feat/latihan-logika, feat/latihan-logika) feat: membuat file logika terpisah untuk prima, palindrom, dan faktorial
|/  
*   9876543 Merge pull request #1 from feat/laporan-harian
|\  
| * 8765432 (origin/feat/laporan-harian, feat/laporan-harian) feat: mengimplementasikan pembuatan objek laporan keuangan harian kasir
|/  
* 7654321 feat: menyusun logika inti proses transaksi mesin kasir modular
* 6543210 feat: memformat string mentah transaksi menjadi array data bersih
* 5432109 feat: membuat utility function pembersih nama dan format rupiah
* 4321098 init: inisialisasi struktur data awal menu dan transaksi mentah toko
```

## Pertanyaan & Jawaban Evaluasi

### 1. Kenapa pekerjaan dibagi ke banyak branch, bukan semuanya di `main`?
Pekerjaan dibagi ke banyak branch (*feature branching*) bertujuan untuk mengisolasi pengerjaan kode agar tidak saling tabrakan (*conflict*) dan menjaga kestabilan kode utama di branch `main`. Dengan metode ini, setiap fitur dikembangkan di lingkungan yang aman. Jika terjadi kesalahan fatal saat eksperimen fitur baru, kode stabil di branch `main` tidak akan ikut rusak dan penelusuran riwayat bug menjadi jauh lebih mudah dianalisis.

### 2. Apa fungsi `.gitignore` dan apa yang kamu masukkan ke dalamnya?
Fungsi `.gitignore` adalah untuk memberi tahu Git daftar berkas atau direktori lokal mana saja yang harus diabaikan dan tidak boleh ikut diunggah (*commit/push*) ke repositori daring seperti GitHub.
Hal-hal yang biasanya dimasukkan ke dalam `.gitignore` meliputi:
* Folder dependensi pihak ketiga yang berukuran besar (contoh: `node_modules/`).
* File konfigurasi lokal atau kredensial rahasia (contoh: `.env`, file *password*, token API).
* Berkas sampah bawaan sistem operasi atau editor kode (contoh: `.DS_Store` pada Mac, folder `.vscode/`, atau `.idea/`).

### 3. Apa beda merge lokal dengan Pull Request di GitHub?
* **Merge Lokal:** Proses penggabungan antar cabang branch yang dilakukan langsung di dalam komputer kita sendiri melalui terminal/CLI (menggunakan perintah `git merge`). Proses ini instan dan tidak memerlukan koneksi internet ataupun persetujuan orang lain.
* **Pull Request (PR) di GitHub:** Sebuah mekanisme formal berbasis web di platform GitHub untuk memohon penggabungan kode dari branch fitur ke branch utama. PR menjadi wadah diskusi bagi tim untuk melakukan *code review* (peninjauan kode), mengecek tes otomatis (CI/CD), memastikan tidak ada error, sebelum kode tersebut di-merge secara resmi ke repositori utama.
