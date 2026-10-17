/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 7.1: TEBAK CODE (PERBAIKAN)
   ===========================================================
*/

console.log("=== 7.1 HASIL RUNNING POTONGAN A ===");

// 1.
// Tebakan: 9 ("Hai Kawan" = 8 karakter + 1 spasi tengah)
// Asli: 9
console.log("  Hai Kawan  ".trim().length);

// 2.
// Tebakan: "KOPI" (Mengubah kapital lalu potong indeks 0 sampai sebelum 4)
// Asli: "KOPI"
console.log("Kopi Susu".toUpperCase().slice(0, 4));

// 3.
// Tebakan: 3 (Dipecah jadi ['a', 'b', 'c'])
// Asli: 3
console.log("a,b,c".split(",").length);

// 4.
// Tebakan: "bonana" (Hanya mengganti huruf 'a' pertama)
// Asli: "bonana"
console.log("banana".replace("a", "o"));

// 5.
// Tebakan: "bonono" (Mengganti seluruh huruf 'a')
// Asli: "bonono"
console.log("banana".replaceAll("a", "o"));

// 6.
// Tebakan: 42 (Membaca sampai bertemu karakter non-angka)
// Asli: 42
console.log(parseInt("42px"));

// 7.
// Tebakan: NaN (Number bersifat ketat, ada 'px' dianggap bukan angka)
// Asli: NaN
console.log(Number("42px"));

// 8.
// Tebakan: 3 (Berhenti membaca saat bertemu titik desimal)
// Asli: 3
console.log(parseInt("3.99"));

// 9.
// Tebakan: "string" (toFixed mengembalikan string)
// Asli: "string"
console.log(typeof (3.14159).toFixed(2));

// 10.
// Tebakan: "0.30" (Akurasi floating point 0.30000000000000004 dibulatkan 2 desimal)
// Asli: "0.30"
console.log((0.1 + 0.2).toFixed(2));

// 11.
// Tebakan: "1010" (Perkalian 5 * 2 = 10 dijalankan dulu, lalu digabung dengan string "10")
// Asli: "1010"
console.log("10" + 5 * 2);

// 12.
// Tebakan: true (!0 jadi true, !"" jadi true, true && true = true)
// Asli: true
console.log(!0 && !"");


console.log("\n=== 7.1 HASIL RUNNING POTONGAN B ===");

// FIX AMAN: Array angka sudah terisi lengkap!
let angka = [ 10, 20, 30, 40 ]; 
let potongan = angka.slice(1, 3);
let hapus = angka.splice(1, 2);

// 13.
// Tebakan: [20, 30] (Mengambil indeks 1 dan 2)
// Asli: [20, 30]
console.log(potongan);

// 14.
// Tebakan: [20, 30] (Menghapus 2 elemen mulai dari indeks 1 dari array awal saat itu)
// Asli: [20, 30]
console.log(hapus);

// 15.
// Tebakan: [10, 40] (Elemen 20 dan 30 sudah terhapus permanen oleh splice)
// Asli: [10, 40]
console.log(angka);

function ganda(n) { return n * 2; }
function cetak(n) { console.log(n * 2); }

// 16.
// Tebakan: 10 (ganda(4) = 8, ganda(1) = 2. 8 + 2 = 10)
// Asli: 10
console.log(ganda(4) + ganda(1));

// 17.
// Tebakan: Cetak 8 di baris baru, lalu mencetak undefined (karena fungsi cetak tidak me-return apa pun)
// Asli: 8 dilanjutkan dengan undefined
console.log(cetak(4));

const toko = {
  nama: "Senja",
  stok: 5,
  jual(n) {
    this.stok -= n;
    return this.stok;
  },
};
toko.jual(2); // stok jadi 3

// 18.
// Tebakan: 2 (stok awal 3 dikurangi 1 = 2)
// Asli: 2
console.log(toko.jual(1));

// 19.
// Tebakan: true (kunci "stok" terdaftar di objek toko)
// Asli: true
console.log("stok" in toko);

// 20.
// Tebakan: Mencetak "nama", "stok", dan "jual" per baris
// Asli: nama, stok, jual (berurutan)
for (let k in toko) {
  console.log(k);
}


console.log("\n=== 7.1 HASIL RUNNING POTONGAN C ===");

// 21.
// Tebakan: "134" (i=2 dilewati via continue, i=5 menghentikan loop via break)
// Asli: "134"
let hasil = "";
for (let i = 1; i <= 6; i++) {
  if (i === 2) { continue; }
  if (i === 5) { break; }
  hasil += i;
}
console.log(hasil);

// 22.
// Tebakan: 6 (3 * 2 * 1)
// Asli: 6
let n = 3;
let kali = 1;
while (n > 0) {
  kali *= n;
  n--;
}
console.log(kali);

// 23.
// Tebakan: 5 (Dijalankan sekali di awal sebelum cek kondisi x < 3)
// Asli: 5
let x = 0;
do {
  x += 5;
} while (x < 3);
console.log(x);

// 24.
// Tebakan: "Aa", "Bb", "Cc" di masing-masing baris baru
// Asli: Aa, Bb, Cc (berurutan)
for (let huruf of "ABC") {
  console.log(huruf + huruf.toLowerCase());
}


/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 7.2: EKSPERIMEN BUKTI KODE
   ===========================================================
*/
console.log("\n=== 7.2 HASIL EKSPERIMEN PEMBUKTIAN ===");

// Eksperimen 1: Hoisting Function Declaration vs Expression
console.log(fungsiDeklarasi()); // Berhasil dipanggil
function fungsiDeklarasi() { return "Deklarasi Berhasil"; }

// Coba panggil fungsi ekspresi sebelum diinisialisasi (Uncomment baris di bawah untuk melihat error)
// console.log(fungsiEkspresi()); 
// PESAN ERROR JIKA DIAKTIFKAN: ReferenceError: Cannot access 'fungsiEkspresi' before initialization
const fungsiEkspresi = function() { return "Ekspresi"; };

// Eksperimen 2: Mutabilitas slice vs splice
// FIX: Mengisi array arrAsli yang terpotong sebelumnya
let arrAsli = [ 10, 20, 30, 40 ]; 
arrAsli.slice(0, 2);
console.log("Bukti slice tidak merubah:", arrAsli); // Output tetap utuh: [10, 20, 30, 40]
arrAsli.splice(0, 2);
console.log("Bukti splice merubah:", arrAsli); // Output terpotong: [30, 40]

// Eksperimen 3: for...in vs for...of pada Array
let dataArr = ["A", "B"];
for (let key in dataArr) { console.log(`for...in (Tipe: ${typeof key}):`, key); } // "0", "1" (string)
for (let val of dataArr) { console.log("for...of:", val); } // "A", "B"

// Eksperimen 4: Efek samping toFixed
let hitungTeks = (5).toFixed(1) + 1;
console.log(`Hasil (5).toFixed(1) + 1 : "${hitungTeks}" (Tipe: ${typeof hitungTeks})`); // "5.01"

// Eksperimen 5: Evaluasi Falsy & Truthy di dalam Blok IF
const cekFalsy = [false, 0, "", null, undefined, NaN];
cekFalsy.forEach(v => {
    if (v) { console.log("Ini tidak akan pernah tercetak"); }
});

if ("0") { console.log('"0" adalah TRUTHY'); }
if ([])  { console.log('[] adalah TRUTHY'); }
if ({})  { console.log('{} adalah TRUTHY'); }

/* 
   ===========================================================
   JAWABAN EVALUASI PERTANYAAN 7.3
   ===========================================================

   1. URUTAN PRESEDENSI OPERATOR KASUS "10" + 5 * 2
      JavaScript mendahulukan operator perkalian '*' karena tingkat presedensinya lebih tinggi daripada 
      operator penjumlahan '+'. Langkah kalkulasinya: 5 * 2 = 10. 
      Setelah itu, string "10" dijumlahkan dengan angka 10. Karena salah satu operan bertipe string, 
      JavaScript secara otomatis melakukan konversi paksa (coercion) menjadi operasi penggabungan teks 
      (konkatenasi), menghasilkan string baru "1010".

   2. MEKANISME REFERENSI MEMORI SLICE VS SPLICE PADA ARRAY ANGKA
      Nilai isi variabel 'potongan' dan 'hapus' bisa bernilai sama karena keduanya kebetulan mengekstrak 
      rentang elemen yang identik dari indeks ke-1 sebanyak 2 item. Namun, efeknya pada 'angka' berbeda 
      karena '.slice()' bekerja secara imutabel (hanya menyalin duplikat tanpa menyentuh array asal), 
      sedangkan '.splice()' bekerja secara mutabel dengan memotong dan membuang elemen asli dari 
      alamat memori fisik array 'angka' tersebut.

   3. ASAL USUL LOG UNDEFINED PADA METHOD CETAK
      Dua baris log muncul karena ada dua lapis pemanggilan perintah cetak:
      - Baris Pertama (Angka 8): Muncul ketika fungsi `cetak(4)` dieksekusi, menjalankan baris internal 
        `console.log(4 * 2)`.
      - Baris Kedua (undefined): Muncul karena `console.log(cetak(4))` mencoba mencetak nilai kembalian 
        (*return value*) dari fungsi `cetak`. Karena fungsi `cetak` tidak memiliki keyword `return`, 
        secara otomatis fungsi tersebut mengembalikan nilai default bawaan JavaScript, yaitu `undefined`.

   4. ALUR TRACING PERULANGAN i HINGGA MENGHASILKAN "134"
      - Putaran i = 1: Lolos cek, masuk ke blok `hasil += 1`. Variabel hasil = "1".
      - Putaran i = 2: Memicu `if (i === 2) { continue; }`. Sisa perintah di bawah dilewati, langsung lompat ke putaran berikutnya.
      - Putaran i = 3: Lolos cek, masuk ke blok `hasil += 3`. Variabel hasil = "13".
      - Putaran i = 4: Lolos cek, masuk ke blok `hasil += 4`. Variabel hasil = "134".
      - Putaran i = 5: Memicu `if (i === 5) { break; }`. Perulangan dihentikan paksa dan langsung keluar dari blok loop.
      Sehingga nilai akhir variabel hasil yang dicetak adalah "134".

   5. KARAKTERISTIK STRUKTUR PERULANGAN DO...WHILE
      Struktur perulangan 'do...while' memiliki karakteristik yang bersifat "eksekusi dahulu, evaluasi belakangan". 
      Blok kode di dalam kurung kurawal 'do' dijamin akan selalu dijalankan minimal satu kali di awal 
      tanpa mempedulikan status kebenaran kondisi terminasinya. Pemeriksaan kondisi logika `x < 3` baru 
      akan dievaluasi di akhir setelah perintah `x += 5` selesai diproses pertama kali.
*/