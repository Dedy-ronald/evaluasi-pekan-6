/* Nama : Muhammad Dedy
    Tanggal : 17 Oktober 2026
    Tujuan Program : Mengerjakan Evaluasi Pekan 6 Bagian 2, 3, 4
*/

const kedai = {
    nama: "Kopi Rindu",
    pemilik: "Dedy",
    kota: "Yogyakarta",
    tahunBerdiri: 2027,
    sedangBuka: true,
    nomorWhatsapp: "081234567890",
    website: null,
    jamOperasional: {
        buka: "08.00",
        tutup: "22.00"
    }
};

const menu = [
    { nama : "Kopi Cinta Latte", kategori : "Minuman", harga : 25000, stok : 20 },
    { nama : "Kopi Rindu Espresso", kategori : "Minuman", harga : 20000, stok : 15 },
    { nama : "Kopi Galau Americano", kategori : "Minuman", harga : 20000, stok : 10 },
    { nama : "Roti Gingsul Manis", kategori : "Makanan", harga : 15000, stok : 25 },
    { nama : "Kentang Goreng Lucu", kategori : "Makanan", harga : 20000, stok : 30 },
    { nama : "Calon Cireng Idaman", kategori : "Makanan", harga : 10000, stok : 0 }, // Stok Kosong
    { nama : "Croissant Amore", kategori : "Pastry", harga : 20000, stok : 20 },
    { nama : "Sweet Cinnamon Roll", kategori : "Pastry", harga : 20000, stok : 20 }
];

const transaksiMentah = [
    {
        kode: "TRX-001",
        pelanggan: "ahmad MAULANA",
        hari: "jumat",
        uangBayar: "50.000",
        voucher: "DISKON10",
        pesanan: [
            { menu : " kOpi GalaU AmeRICAno ", jumlah: "2"}
        ]
    },
    {
        kode: "TRX-002",
        pelanggan: "reynaldi ABDItio",
        hari: "sabtu",
        uangBayar: "100000",
        voucher: " ",
        pesanan: [
            { menu : "Kopi Cinta Latte", jumlah: "1"},
            { menu : "Kentang GORENG lucu", jumlah: "1"},
            { menu : "Sweet Cinnamon Roll", jumlah: "2"}
        ]
    },
    {
        kode: "TRX-003",
        pelanggan: " NizaR",
        hari: "SENIN",
        uangBayar: "25000",
        voucher: "DISKON10",
        pesanan: [
            { menu : "Kopi Rindu Espresso", jumlah: "1"}
        ]
    },
    {
        kode: "TRX-004",
        pelanggan: "Yazid Fernando",
        hari: "Minggu",
        uangBayar: "15000",
        voucher: " ",
        pesanan: [
            { menu : "Kopi Rindu Espresso", jumlah: "1"}
        ]
    },
    {
        kode: "TRX-005",
        pelanggan: " ",
        hari: "Minggu",
        uangBayar: "25000",
        voucher: " ",
        pesanan: []
    },
    {
        kode: "TRX-006",
        pelanggan: " Rafif",
        hari: "Rabu",
        uangBayar: "30000",
        voucher: "DISKON10",
        pesanan: [
            { menu : "Calon Cireng Idaman", jumlah: "2"},
            { menu : "Es Teh Manis", jumlah: "-1"}
        ]
    },
];

const NILAI_DISKON_10 = 0.1; // Potongan 10%

/** 
 * menjadi format Title Case (Huruf Awal Kapital)
 * Contoh : " kOpi GalaU AmeRICAno " -> "Kopi Galau Americano"
 */
function toTitleCase(teks) { // PERBAIKAN: Parameter disamakan menjadi 'teks' (huruf kecil)
    return teks 
    .trim()
    .toLowerCase() // PERBAIKAN: Diubah menjadi camelCase 'toLowerCase'
    .split(" ")
    .filter(kata => kata.length > 0)
    .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");
}

/**
 * Memproses array transaksi mentah menjadi nota siap cetak
 */
function prosesTransaksi(daftarTransaksi, daftarMenu) {
    return daftarTransaksi.map(trx => {
        // 1. Bersihkan data Besar pelanggan
        const namaBersih = trx.pelanggan.trim();
        const hariBersih = toTitleCase(trx.hari);
        const voucherBersih = trx.voucher.trim().toUpperCase();

        // Konversi uang bayar: hilangkan titik jika ada, Lalu ubah ke angka
        // PERBAIKAN: Mengganti spasi " " menjadi string kosong "" agar tidak menghasilkan NaN
        const uangBayarAngka = Number(trx.uangBayar.replace(/\./g, "")); 

        // Inisialisasi struktur nota nota hasil proses
        const nota = {
            kode: trx.kode,
            pelanggan: toTitleCase(namaBersih),
            hari: hariBersih,
            itemValid: [],
            itemTidakValid: [],
            totalBelanja: 0,
            potonganVoucher: 0, // PERBAIKAN: Typo dari 'potoganVoucher' menjadi 'potonganVoucher'
            totalAkhir: 0,
            uangBayar: uangBayarAngka,
            kembalian: 0,
            status: ""
        };

        //2. Validasi Aturan Awal (Nama pelanggan kosong DAN pesanan kosong)
        if (namaBersih === "" && trx.pesanan.length === 0 ) {
            nota.status = "Ditolak: Data Pelanggan dan Pesanan Kosong";
            return nota;
        }

        //3. Proses setiap item di dalam pesanan
        trx.pesanan.forEach(item => {
            const namaMenuBersih = toTitleCase(item.menu);
            const jumlahAngka = Number(item.jumlah);

            //Cari menu yang cocok di daftar menu toko
            const dataMenuAsli = daftarMenu.find(m => m.nama.toLowerCase() === namaMenuBersih.toLowerCase());

            //Validasi Item: Apakah menu terdaftar, jumlah positif, dan stok cukup?
            if (!dataMenuAsli) {
                nota.itemTidakValid.push({menu: namaMenuBersih, alasan: "Menu tidak terdaftar"});
            } else if (jumlahAngka <= 0) {
                // PERBAIKAN: Ditambahkan properti key 'menu: namaMenuBersih' agar strukturnya konsisten
                nota.itemTidakValid.push({ menu: namaMenuBersih, alasan: "Jumlah pesanan tidak valid"});
            } else if (dataMenuAsli.stok < jumlahAngka) {
                // PERBAIKAN: Mengubah tanda kutip tunggal (' ') menjadi backtick (` `) agar Template Literal berfungsi
                nota.itemTidakValid.push({ menu: namaMenuBersih, alasan: `Stok tidak cukup (Sisa: ${dataMenuAsli.stok})` });
            } else {
                // Jika Lolos semua cek, masukkan ke item valid
                const subTotal = dataMenuAsli.harga * jumlahAngka;
                nota.itemValid.push({
                    menu: dataMenuAsli.nama,
                    jumlah: jumlahAngka,
                    hargaSatuan: dataMenuAsli.harga,
                    subTotal: subTotal
                });
                nota.totalBelanja += subTotal;

                //Kurangi stok menu secara langsung (efek simulasi transaksi)
                dataMenuAsli.stok -= jumlahAngka;
            }
        });

        //4. Cek jika seluruh item ternyata tidak valid
        if (nota.itemValid.length === 0) {
            nota.status = "Ditolak: Tidak ada item belanja yang valid";
            return nota;
        }

        //5. Hitung Diskon Voucher
        if (voucherBersih === "DISKON10") {
            nota.potonganVoucher = nota.totalBelanja * NILAI_DISKON_10; // PERBAIKAN: Sinkronisasi nama properti typo
        }
        nota.totalAkhir = nota.totalBelanja - nota.potonganVoucher;

        //6. Tentukan Satus Pembayaran (Lunas / Kurang Uang)
        nota.kembalian = nota.uangBayar - nota.totalAkhir;
        if (nota.kembalian >= 0 ) {
            nota.status = "Lunas";
        } else {
            // PERBAIKAN: Mengubah tanda kutip tunggal (' ') menjadi backtick (` `) agar Template Literal berfungsi
            nota.status = `Ditolak: Uang kurang sebesar ${Math.abs(nota.kembalian)}`;
            //Kembalian stok karena transaksi gagal/kurang uang
            nota.itemValid.forEach(item => {
                const dataMenuAsli = daftarMenu.find(m => m.nama === item.menu);
                dataMenuAsli.stok += item.jumlah;
            });
        }

        return nota;
    });
}

// Fungsi pembantu toTitleCase digunakan untuk merapikan spasi liar dan menyamakan format huruf kapital pada nama serta menu.
// Logika utama pada prosesTransaksi bertugas memisahkan item valid dan tidak valid sekaligus memperhitungkan potongan harga dari voucher global.
// Pengurangan dan pengembalian stok diatur secara dinamis tergantung pada validits nominal uang bayar akhir yang diserahkan pelanggan.

// Mengeksekusi pemrosesan data transaksi mentah
const riwayatNota = prosesTransaksi(transaksiMentah, menu);

// Menampilkan hasil akhir pemrosesan dalam bentuk tabel di console
console.log("=== HASIL PEMROSESAN NOTA TRANSAKSI ===");
console.log(JSON.stringify(riwayatNota, null, 2));

// Menampilkan sisa stok menu terkini setelah transaksi diproses
console.log("\n=== SISA STOK MENU TERKINI ===");
console.table(menu);

// Variabel riwayatNota menampung seluruh array objek transaksi yang telah dibersihkan datanya dan dihitung secara matematis.
// Pemanggilan console.log memaparkan struktur nota lengkap secara mendalam untuk memvalidasi status kelulusan pembayaran masing-masing pelanggan.
// Perintah console.table digunakan di akhir untuk melacak perubahan sisa persediaan produk di gudang setelah terpotong pesanan yang valid.

/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 2.2: FUNCTION PEMBERSIH DATA
   ===========================================================
*/

// 1. Function Declaration: bersihkanNama
// Membersihkan spasi liar di awal/akhir, merapikan spasi ganda, dan mengubah ke Title Case
function bersihkanNama(teks) {
    if (!teks || teks.trim() === "") return "";
    return teks
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(kata => kata.length > 0) // Menghilangkan spasi ganda di antara kata
        .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1))
        .join(" ");
}

// 2. Function Expression: ubahKeAngka
// Menghapus titik pemisah ribuan/spasi, lalu mengubah menjadi angka valid atau 0
const ubahKeAngka = function(teks) {
    if (typeof teks !== "string") return 0;
    const angkaBersih = Number(teks.replace(/[\.\s]/g, ""));
    return isNaN(angkaBersih) ? 0 : angkaBersih;
};

// 3. Arrow Function: ambilPersenVoucher
// Mengecek awalan "DISKON", mengambil angka di belakangnya, mengembalikan 0 jika tidak valid
const ambilPersenVoucher = (kode) => {
    if (!kode) return 0;
    const kodeBersih = kode.trim().toUpperCase();
    
    if (kodeBersih.startsWith("DISKON")) {
        const angkaTeks = kodeBersih.replace("DISKON", "");
        const angka = Number(angkaTeks);
        return isNaN(angka) || angkaTeks === "" ? 0 : angka;
    }
    return 0;
};

// 4. Arrow Function: formatRupiah
// Memformat angka menjadi format mata uang dengan titik tanpa toLocaleString
const formatRupiah = (angka) => {
    const angkaString = String(Math.floor(Math.abs(angka)));
    let hasilSisa = "";
    let hitung = 0;

    // Loop terbalik untuk menyisipkan titik setiap 3 digit
    for (let i = angkaString.length - 1; i >= 0; i--) {
        hitung++;
        hasilSisa = angkaString[i] + hasilSisa;
        if (hitung % 3 === 0 && i !== 0) {
            hasilSisa = "." + hasilSisa;
        }
    }
    return `Rp ${hasilSisa}`;
};

// ===========================================================
// UJI COBA KASUS (MINIMAL 3 KASUS PER FUNCTION)
// ===========================================================

console.log("=== UJI COBA FUNCTION PEMBERSIH DATA ===\n");

console.log("--- Pengujian bersihkanNama ---");
console.log(`"  rina   WULANDARI " -> "${bersihkanNama("  rina   WULANDARI ")}"`);
console.log(`"    muhammad    dedy  " -> "${bersihkanNama("    muhammad    dedy  ")}"`);
console.log(`""                      -> "${bersihkanNama("")}"`);

console.log("\n--- Pengujian ubahKeAngka ---");
console.log(`"150.000" -> ${ubahKeAngka("150.000")}`);
console.log(`"75000"   -> ${ubahKeAngka("75000")}`);
console.log(`"abc"     -> ${ubahKeAngka("abc")}`);

console.log("\n--- Pengujian ambilPersenVoucher ---");
console.log(`" diskon10 " -> ${ambilPersenVoucher(" diskon10 ")}`);
console.log(`"PROMO5"     -> ${ambilPersenVoucher("PROMO5")}`);
console.log(`""           -> ${ambilPersenVoucher("")}`);

console.log("\n--- Pengujian formatRupiah ---");
console.log(`1250000 -> "${formatRupiah(1250000)}"`);
console.log(`500     -> "${formatRupiah(500)}"`);
console.log(`0       -> "${formatRupiah(0)}"`);

/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 2.3: DATA BERSIH
   ===========================================================
*/

// Array transaksiBersih yang menampung data hasil pembersihan
const transaksiBersih = [];

// Proses pembersihan data mentah menggunakan perulangan for...of dan push
for (const trx of transaksiMentah) {
    const pesananBersih = [];
    
    // Iterasi untuk membersihkan item di dalam pesanan
    for (const item of trx.pesanan) {
        pesananBersih.push({
            menu: bersihkanNama(item.menu),
            jumlah: Number(item.jumlah)
        });
    }

    // Memasukkan objek transaksi yang sudah bersih ke array utama
    transaksiBersih.push({
        kode: trx.kode.trim().toUpperCase(),
        pelanggan: bersihkanNama(trx.pelanggan),
        hari: trx.hari.trim().toLowerCase(),
        uangBayar: ubahKeAngka(trx.uangBayar),
        persenVoucher: ambilPersenVoucher(trx.voucher),
        pesanan: pesananBersih
    });
}

// Mencetak hasil array transaksiBersih ke console
console.log("=== HASIL ARRAY TRANSAKSI BERSIH ===");
console.log(JSON.stringify(transaksiBersih, null, 2));


/* 
   ===========================================================
   JAWABAN EVALUASI PERTANYAAN 2.3
   ===========================================================

   1. PERBEDAAN PARSEINT, PARSEFLOAT, DAN NUMBER
      - 'parseInt': Mengonversi string menjadi bilangan bulat (integer). Berhenti membaca 
        karakter begitu menemukan karakter non-angka (seperti titik atau huruf).
      - 'parseFloat': Mengonversi string menjadi bilangan desimal (floating-point). 
        Mengizinkan satu tanda titik sebagai penanda desimal.
      - 'Number': Mengonversi seluruh isi string secara ketat menjadi angka. Jika ada satu saja 
        karakter non-angka yang tidak valid (selain titik desimal yang sah), hasilnya 'NaN'.
      
      Kenapa 'ubahKeAngka' harus menghapus titik terlebih dahulu?
      Karena dalam standar internasional JavaScript, tanda titik '.' dianggap sebagai pembatas desimal, 
      bukan pemisah ribuan. Jika titik ribuan tidak dihapus, 'Number' atau 'parseInt' akan salah membaca nilai.
      
      Apa hasil 'parseInt("150.000")'?
      Hasilnya adalah 150. Karena 'parseInt' berhenti membaca string tepat saat menemui karakter 
      titik pertama, sehingga karakter ".000" di belakangnya dibuang.

   2. ANALISIS TOFIXED
      Fungsi 'toFixed' mengembalikan tipe data STRING (teks), bukan angka.
      
      Bukti dengan typeof:
      console.log(typeof (15000).toFixed(2)); // Output: "string"
      
      Akibat jika hasil 'toFixed' langsung dijumlahkan dengan angka:
      Akan terjadi operasi konkatenasi (penggabungan teks), bukan penjumlahan matematika.
      Contoh: Jika (50).toFixed(0) yang menghasilkan "50" dijumlahkan dengan angka 5 (+ 5), 
      hasil akhirnya adalah string "505", bukan angka 55.

   3. PERBEDAAN REPLACE DAN REPLACEALL
      - 'replace': Hanya mengganti satu karakter atau kecocokan pertama yang ditemukan di dalam string.
      - 'replaceAll': Mengganti seluruh karakter atau kecocokan yang ditemukan di sepanjang string tanpa sisa.
      
      Tempat yang memerlukan di dalam kode:
      Di dalam fungsi 'ubahKeAngka', jika input berupa "1.500.000" (memiliki dua buah titik), 
      penggunaan 'replace(/\./g, "")' dengan regex global atau 'replaceAll(".", "")' sangat diperlukan 
      agar semua titik pemisah ribuan terhapus sepenuhnya. Jika hanya menggunakan teks biasa di 'replace(".", "")', 
      maka hanya titik pertama yang hilang dan menghasilkan "1500.000" (masih menyisakan titik kedua).

   4. IMMUTABILITY STRING (KODE.TOUPPERCASE())
      Isi variabel 'kode' yang asli tidak berubah karena tipe data String di JavaScript bersifat 
      'immutable' (tidak dapat diubah nilainya setelah dibuat). 
      Metode '.toUpperCase()' tidak memodifikasi string asli di tempatnya, melainkan memproses 
      dan mengembalikan sebuah string baru. Oleh karena itu, kita harus menampung hasilnya ke 
      variabel baru atau langsung memasukkannya ke properti objek.

   5. PENJELASAN PILIHAN BENTUK STRUKTUR FUNGSI DI DALAM KODE
      - Function Declaration ('bersihkanNama'):
        Dipilih karena memiliki sifat 'hoisting' (dapat dipanggil di baris kode mana pun sebelum 
        fungsi itu ditulis). Bentuk ini sangat ideal untuk fungsi utilitas umum.
      - Function Expression ('ubahKeAngka'):
        Dipilih untuk memastikan fungsi diperlakukan sebagai variabel konstan ('const') agar 
        logikanya aman dan tidak sengaja tertimpa oleh kode lain di bawahnya selama program berjalan.
      - Arrow Function ('ambilPersenVoucher' / 'formatRupiah'):
        Dipilih karena sintaksisnya yang sangat pendek, ringkas, dan modern. Sangat cocok untuk 
        fungsi spesifik yang langsung mengembalikan nilai secara cepat (*return* langsung).
*/
