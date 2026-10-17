/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 6: PERBAIKI KODE
   ===========================================================
*/

const TARIF_PAJAK = 0.11;
const harga = { kopi: 20000, teh: 7500, roti: 15000 };
let keranjang = ["kopi", "teh", "roti", "teh"];
let jumlahMember = "5";

const pelanggan = {
  nama: "rina",
  saldo: 100000,

  // Bayar belanja. Seharusnya bayar(30000) mengembalikan sisa saldo: 70000
  bayar(jumlah) {
    // FIX 1: Menggunakan 'this.saldo' agar merujuk ke properti objek milik 'pelanggan'
    this.saldo -= jumlah;
    return this.saldo;
  },
};

// Subtotal: jumlahkan harga semua isi keranjang. Seharusnya: 50000
let subtotal = 0;
// FIX 2: Mengubah operator logika loop menjadi kurang dari (<) agar indeks tidak melebihi panjang array
for (let i = 0; i < keranjang.length; i++) {
  subtotal += harga[keranjang[i]];
}

// Persen diskon: subtotal minimal 50000 → 10, minimal 25000 → 5, selain itu 0.
// Seharusnya diskon: 5000
let persen;
// FIX 3: Mengubah urutan pengecekan kondisi agar nominal terbesar (50000) diperiksa terlebih dahulu
if (subtotal >= 50000) {
  persen = 10;
} else if (subtotal >= 25000) {
  persen = 5;
} else {
  persen = 0;
}
let diskon = (subtotal * persen) / 100;

// Promo hari. "jumat" 3000, "sabtu" dan "minggu" 5000, lainnya 0.
// Hari ini "jumat". Seharusnya: 3000
let hari = "jumat";
let promo;
switch (hari) {
  case "jumat":
    promo = 3000;
    break; // FIX 4: Menambahkan kata kunci break agar tidak bocor ke case di bawahnya
  case "sabtu":
  case "minggu":
    promo = 5000;
    break;
  default:
    promo = 0;
}

// Pajak 11% dari (subtotal - diskon - promo). Seharusnya: 4620
// FIX 5: Menambahkan kurung tutup kelompok matematika agar perkalian TARIF_PAJAK dihitung di akhir kalkulasi
let pajak = (subtotal - diskon - promo) * TARIF_PAJAK;

// Total. Seharusnya: 46620
let total = subtotal - diskon - promo + pajak;

// Uang bayar dari formulir (teks "100.000"). Seharusnya: 100000, kembalian: 53380
let uangBayarTeks = "100.000";
// FIX 6: Menggunakan replace/replaceAll untuk membuang titik ribuan agar teks terbaca penuh oleh Number/parseInt
let uangBayar = parseInt(uangBayarTeks.replace(/\./g, ""));
let kembalian = uangBayar - total;

// Status. Uang bayar cukup. Seharusnya: "Lunas"
let status;
// FIX 7: Mengganti operator assignment (=) menjadi operator komparasi relasional (===)
if (uangBayar === total || uangBayar >= total) {
  status = "Lunas";
} else {
  status = "Kurang";
}

// Nama rapi. Seharusnya: "Rina"
// FIX 8: Mengubah slice(0) menjadi slice(1) agar potongan string mengambil huruf kedua hingga selesai
let namaRapi = pelanggan.nama.slice(0, 1).toUpperCase() + pelanggan.nama.slice(1);

// Keranjang: hapus "teh" pertama, lalu tambah "air" di akhir.
// Seharusnya: [ 'kopi', 'roti', 'teh', 'air' ]
// FIX 9: Mengganti method mutasi 'slice' menjadi 'splice' untuk menghapus item aktual dari array asal
keranjang.splice(1, 1);
// FIX 10: Mengganti method penyisipan 'unshift' (awal) menjadi method 'push' untuk menambah di akhir array
keranjang.push("air");

// Member bertambah 1. Seharusnya: 6
// FIX 11: Mengonversi variabel string 'jumlahMember' ke tipe data angka menggunakan wrapper Number()
let jumlahMemberBaru = Number(jumlahMember) + 1;

// Rata-rata per item (total dibagi 4) ditambah biaya kemasan 10. Seharusnya: 11665
let rataRata = (total / 4).toFixed(2);
// FIX 12: Mengonversi kembali string hasil toFixed ke tipe data angka menggunakan Number() sebelum operasi penjumlahan
let rataRataTotal = Number(rataRata) + 10;

// Format rupiah. Seharusnya formatRupiah(53380) = "Rp 53380"
function formatRupiah(angka) {
  // FIX 13: Menambahkan keyword 'return' agar fungsi mengembalikan string hasil konkatenasi
  return "Rp " + angka;
}

// CETAK OUTPUT UTAMA
console.log(subtotal, diskon, promo, pajak, total);
console.log(uangBayar, kembalian, status);
console.log(namaRapi);
console.log(keranjang);
console.log(jumlahMemberBaru);
console.log(rataRataTotal);
console.log(formatRupiah(kembalian));
console.log(pelanggan.bayar(30000));

// FIX 14 & 15: Mengubah loop 'for...of' menjadi 'for...in' (atau Object.keys) karena target iterasi adalah objek properti ('harga')
for (let kunci in harga) {
  console.log(kunci + ": " + harga[kunci]);
}

/* 
   ===========================================================
   CATATAN BUG (ANALISIS 15 KESALAHAN KODE):
   ===========================================================
   1.  [Tidak Error - Hasil Salah]: Tidak memakai 'this.saldo'. Mengakibatkan sistem mencari variabel bebas 'saldo' yang tidak eksis di luar fungsi scope.
   2.  [Error - Menghentikan Program]: Kondisi i <= length membuat loop berputar ekstra 1 kali pada indeks di luar array, menghasilkan nilai undefined yang memicu NaN pada kalkulasi objek harga.
   3.  [Tidak Error - Hasil Salah]: Pengecekan kondisi subtotal >= 25000 dipasang di atas >= 50000. Karena 50000 lolos cek pertama, program langsung mengambil diskon 5% dan abai terhadap diskon 10%.
   4.  [Tidak Error - Hasil Salah]: Tidak ada statemen 'break' pada case "jumat". Nilai variabel promo merosot jatuh (fall-through) mengeksekusi case akhir "minggu" (5000).
   5.  [Tidak Error - Hasil Salah]: Tanpa tanda kurung, operasi perkalian matematika dikerjakan terlebih dahulu pada (promo * TARIF_PAJAK), bukan memotong subtotal.
   6.  [Tidak Error - Hasil Salah]: Fungsi parseInt langsung membaca titik sebagai tanda henti pembacaan karakter non-numerik, memotong angka 100.000 menjadi hanya senilai 100.
   7.  [Tidak Error - Hasil Salah]: Penggunaan operator '=' melakukan penugasan/timpa nilai variabel, bukan menguji kesamaan dua variabel.
   8.  [Tidak Error - Hasil Salah]: Ekspresi kedua 'slice(0)' menduplikasi seluruh nama kata asal ("rina"), menghasilkan output cacat: "Rrina".
   9.  [Tidak Error - Hasil Salah]: Method '.slice()' tidak merubah isi array asli. Harus memakai '.splice()' untuk memotong.
   10. [Tidak Error - Hasil Salah]: Method '.unshift()' menyisipkan item baru di bagian depan/awal array, bukan di akhir (push).
   11. [Tidak Error - Hasil Salah]: Menjumlahkan string "5" + 1 menghasilkan penggabungan teks (konkatenasi) menjadi kata "51".
   12. [Tidak Error - Hasil Salah]: Hasil '.toFixed(2)' bertipe data String ("11655.00"). Dijumlah dengan angka 10 menghasilkan teks cacat "11655.0010".
   13. [Tidak Error - Hasil Salah]: Fungsi formatRupiah memproses teks, namun karena tidak memiliki keyword 'return', fungsinya selalu menghasilkan nilai default 'undefined'.
   14. [Error - Menghentikan Program]: Operator perulangan 'for...of' tidak dapat digunakan untuk mengiterasi properti objek secara langsung (Objek bersifat Not Iterable).
   15. [Tidak Error - Hasil Salah]: Penggunaan nama properti dinamis di dalam pencetakan loop objek tidak tercetak dengan benar jika kerangka loop dasarnya sudah lumpuh total.

   ===========================================================
   JAWABAN EVALUASI PERTANYAAN 6
   ===========================================================
   1. Sintaks 'if (uangBayar = total)' tidak menimbulkan error karena operasi penugasan (assignment) 
      merupakan ekspresi yang valid di JavaScript. Yang terjadi adalah nilai dari variabel 'total' 
      (46620) disalin dan ditimpakan langsung untuk mengganti isi variabel 'uangBayar'. Ekspresi 
      tersebut kemudian menghasilkan nilai 46620, yang dievaluasi sebagai "Truthy", sehingga blok kode 
      kondisi pertama tetap dijalankan meskipun secara logika matematika salah.

   2. Fungsi 'parseInt("100.000")' menghasilkan angka 100 karena mekanisme kerja pembacaan dasar 
      dari fungsi 'parseInt' akan memindai string karakter demi karakter dari posisi paling depan, 
      dan akan langsung memutus proses pembacaan seketika saat ujung jari sistem menyentuh karakter 
      non-numerik pertama (dalam kasus ini adalah simbol tanda titik '.'). Oleh karena itu, semua sisa 
      digit karakter nol di belakang titik (".000") dibuang habis oleh mesin kompiler.
*/

/* Hasil Output:
50000 5000 3000 4620 46620
100000 53380 Lunas
Rina
[ 'kopi', 'roti', 'teh', 'air' ]
6
11665
Rp 53380
70000
kopi: 20000
teh: 7500
roti: 15000
*/
