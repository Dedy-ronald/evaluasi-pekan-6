/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 5: LATIHAN LOGIKA
   ===========================================================
*/

// 1. Fungsi Hitung Faktorial (n!)
function hitungFaktorial(n) {
    if (n < 0) return null;
    if (n === 0 || n === 1) return 1;
    
    let hasil = 1;
    for (let i = 2; i <= n; i++) {
        hasil *= i;
    }
    return hasil;
}

// 2. Fungsi Cek Palindrom (Tanpa .reverse())
function cekPalindrom(teks) {
    if (!teks || teks.trim() === "") return false;
    
    const teksBersih = teks.trim().toLowerCase();
    const panjang = teksBersih.length;
    
    for (let i = 0; i < panjang / 2; i++) {
        if (teksBersih[i] !== teksBersih[panjang - 1 - i]) {
            return false;
        }
    }
    return true;
}

// 3. Fungsi Hitung Huruf Vokal
function hitungVokal(teks) {
    const vokal = "aiueoAIUEO";
    let jumlah = 0;
    
    for (const karakter of teks) {
        if (vokal.includes(karakter)) {
            jumlah++;
        }
    }
    return jumlah;
}

// 4. Fungsi Cari Nilai dan Indeks Terbesar (Tanpa Math.max)
function cariTerbesar(daftar) {
    if (!daftar || daftar.length === 0) return null;
    
    let nilaiTerbesar = daftar[0];
    let indeksTerbesar = 0;
    
    for (let i = 1; i < daftar.length; i++) {
        if (daftar[i] > nilaiTerbesar) {
            nilaiTerbesar = daftar[i];
            indeksTerbesar = i;
        }
    }
    return { nilai: nilaiTerbesar, indeks: indeksTerbesar };
}

// 5. Fungsi Hapus Elemen Duplikat (Imutabel / Array Asli Tetap)
function hapusDuplikat(daftar) {
    const arrayBaru = [];
    for (const elemen of daftar) {
        if (!arrayBaru.includes(elemen)) {
            arrayBaru.push(elemen);
        }
    }
    return arrayBaru;
}

// 6. Fungsi Cek Bilangan Prima
function cekBilanganPrima(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false; // Berfungsi sebagai break implisit dan keluar fungsi
        }
    }
    return true;
}

// ===========================================================
// EKSEKUSI DAN PENCETAKAN HASIL UJI COBA
// ===========================================================

console.log("=== HASIL UJI COBA LATIHAN LOGIKA ===\n");

console.log("--- 1. Pengujian hitungFaktorial ---");
console.log(`5 -> ${hitungFaktorial(5)}`);
console.log(`0 -> ${hitungFaktorial(0)}`);
console.log(`1 -> ${hitungFaktorial(1)}`);
console.log(`-3 -> ${hitungFaktorial(-3)}`);

console.log("\n--- 2. Pengujian cekPalindrom ---");
console.log(`"Katak"   -> ${cekPalindrom("Katak")}`);
console.log(`" Malam " -> ${cekPalindrom(" Malam ")}`);
console.log(`"Kopi"    -> ${cekPalindrom("Kopi")}`);
console.log(`""        -> ${cekPalindrom("")}`);

console.log("\n--- 3. Pengujian hitungVokal ---");
console.log(`"Kedai Senja" -> ${hitungVokal("Kedai Senja")}`);
console.log(`"RHYTHM"      -> ${hitungVokal("RHYTHM")}`);
console.log(`"Aiueo"       -> ${hitungVokal("Aiueo")}`);

console.log("\n--- 4. Pengujian cariTerbesar ---");
console.log(`[12, 45, 7, 45, 30] ->`, cariTerbesar([12, 45, 7, 45, 30]));
console.log(`[3]                 ->`, cariTerbesar([3]));
console.log(`[]                  ->`, cariTerbesar([]));

console.log("\n--- 5. Pengujian hapusDuplikat ---");
const arrayAngka = [1, 2, 2, 3, 1]; // PERBAIKAN: Angka array sudah diisi utuh
const arrayHuruf = ["a", "b", "a"];
const arrayKosong = [];

console.log(`[1, 2, 2, 3, 1] -> [${hapusDuplikat(arrayAngka).join(", ")}]`);
console.log(`  Bukti Array Asli Tidak Berubah: [${arrayAngka.join(", ")}]`);

console.log(`["a", "b", "a"] -> [${hapusDuplikat(arrayHuruf).map(h => `"\${h}"`).join(", ")}]`);
console.log(`  Bukti Array Asli Tidak Berubah: [${arrayHuruf.map(h => `"\${h}"`).join(", ")}]`);

console.log(`[]              -> [${hapusDuplikat(arrayKosong).join(", ")}]`);

console.log("\n--- 6. Pengujian cekBilanganPrima ---");
console.log(`2  -> ${cekBilanganPrima(2)}`);
console.log(`17 -> ${cekBilanganPrima(17)}`);
console.log(`15 -> ${cekBilanganPrima(15)}`);
console.log(`1  -> ${cekBilanganPrima(1)}`);
console.log(`0  -> ${cekBilanganPrima(0)}`);


/* 
   ===========================================================
   JAWABAN EVALUASI PERTANYAAN 5
   ===========================================================

   1. TRACING LANGKAH DEMI LANGKAH (Fungsi 'hitungFaktorial(5)'):
      - Inisialisasi awal variabel hasil = 1. Perulangan berjalan dari i = 2 sampai i = 5.
      - Putaran 1 (i = 2): hasil = 1 * 2 = 2
      - Putaran 2 (i = 3): hasil = 2 * 3 = 6
      - Putaran 3 (i = 4): hasil = 6 * 4 = 24
      - Putaran 4 (i = 5): hasil = 24 * 5 = 120
      - Loop berhenti karena i naik jadi 6. Fungsi mengembalikan nilai akhir: 120.

   2. ANALISIS IMUTABILITAS PADA 'HAPUSDUPLIKAT':
      Array asli tidak ikut berubah karena di awal fungsi kita membuat wadah array baru yang 
      kosong ('const arrayBaru = []'). Elemen dari array lama diperiksa satu per satu lalu dimasukkan 
      ke array baru tersebut, sehingga operasi ini tidak memodifikasi data pada referensi memori asli.
      Method '.includes()' dipilih karena sintaksnya yang sangat deskriptif dan efisien untuk memeriksa 
      keberadaan suatu elemen di dalam array baru sebelum memutuskan melakukan '.push()'.

   3. PENGGUNAAN BREAK PADA 'CEKBILANGANPRIMA':
      Fungsi ini tidak menggunakan kata kunci 'break' secara tersurat, melainkan langsung menggunakan 
      statemen 'return false'. Statemen ini memiliki efek yang lebih kuat dari 'break' karena langsung 
      menghentikan seluruh proses perulangan sekaligus keluar dari eksekusi fungsi saat itu juga.
      Jika baris 'return false' ini dihapus atau diabaikan, hasilnya akan SALAH untuk angka bukan prima 
      (seperti 15 akan tetap dianggap true) karena program akan terus berjalan sampai loop habis dan 
      mengeklik instruksi paling bawah ('return true').

   4. ALASAN RETURN NULL PADA ARRAY KOSONG:
      'cariTerbesar([])' mengembalikan 'null' (bukan 0) karena angka 0 merupakan bagian dari entitas nilai 
      matematika yang valid (bisa jadi input array berisi kumpulan angka negatif, sehingga 0 adalah angka terbesar). 
      'null' digunakan secara sengaja untuk merepresentasikan kondisi ketiadaan data (*absence of value*) 
      yang menegaskan bahwa pencarian tidak bisa dilakukan pada himpunan kosong.

   5. PERBEDAAN STRUKTUR LOOP YANG DIGUNAKAN:
      - Fungsi 'hitungFaktorial' (Menggunakan Perulangan 'for' konvensional berbasis indeks / i):
        Dipilih karena kita membutuhkan variabel pencacah matematika angka terurut yang naik secara berkala 
        ('i++') untuk dikalikan ke variabel akumulator.
      - Fungsi 'hitungVokal' (Menggunakan Perulangan 'for...of'):
        Dipilih karena kita hanya perlu mengekstrak isi tiap karakter string dari depan sampai akhir 
        secara sekuensial tanpa memperdulikan urutan posisi indeks numerik karakternya.
*/
