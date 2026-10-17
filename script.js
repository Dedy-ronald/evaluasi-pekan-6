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

/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 3: MESIN KASIR (PERBAIKAN)
   ===========================================================
*/

const kasir = {
    menu: menu, // Mengambil data array menu dari bagian sebelumnya
    saldoKas: 0,
    riwayat: [],
    pecahan: [50000, 20000, 10000, 5000, 2000, 1000], // PERBAIKAN: Array pecahan sudah diisi penuh

    // 1. Method mencari menu menggunakan for...of
    cariMenu(nama) {
        for (const itemMenu of this.menu) {
            if (itemMenu.nama.toLowerCase() === nama.toLowerCase()) {
                return itemMenu;
            }
        }
        return null;
    },

    // 2. Method menghitung subtotal dan memilah item valid/tidak valid
    hitungSubtotal(pesanan) {
        let subtotal = 0;
        const itemValid = [];
        const itemTidakValid = [];

        for (const item of pesanan) {
            const dataMenu = this.cariMenu(item.menu);

            if (!dataMenu) {
                itemTidakValid.push({ menu: item.menu, alasan: "Menu tidak terdaftar" });
                continue;
            }
            if (item.jumlah <= 0) {
                itemTidakValid.push({ menu: item.menu, alasan: "Jumlah pesanan tidak valid" });
                continue;
            }
            if (dataMenu.stok < item.jumlah) {
                itemTidakValid.push({ menu: item.menu, alasan: `Stok tidak cukup (Sisa: ${dataMenu.stok})` });
                continue;
            }

            const hargaItem = dataMenu.harga;
            const subTotalItem = hargaItem * item.jumlah;

            itemValid.push({
                menu: dataMenu.nama,
                jumlah: item.jumlah,
                harga: hargaItem
            });

            subtotal += subTotalItem;
        }

        return { subtotal, itemValid, itemTidakValid };
    },

    // 3. Method menghitung potongan promo hari menggunakan switch
    hitungPromoHari(hari) {
        switch (hari.toLowerCase()) {
            case "jumat":
                return 3000;
            case "sabtu":
            case "minggu":
                return 5000; // Menggabungkan case sabtu dan minggu tanpa break di antaranya
            default:
                return 0;
        }
    },

    // 4. Method menghitung diskon berdasarkan subtotal global vs voucher
    hitungDiskon(subtotal, persenVoucher) {
        let persenSubtotal = 0;

        if (subtotal >= 100000) {
            persenSubtotal = 15;
        } else if (subtotal >= 50000) {
            persenSubtotal = 10;
        } else if (subtotal >= 25000) {
            persenSubtotal = 5;
        } else {
            persenSubtotal = 0;
        }

        const persenFinal = Math.max(persenSubtotal, persenVoucher) / 100;
        return Math.round(subtotal * persenFinal);
    },

    // 5. Method menghitung pajak 11%
    hitungPajak(nilai, tarif = 0.11) {
        return Math.round(nilai * tarif);
    },

    // 6. Method memecah kembalian menjadi pecahan lembaran uang tunai
    hitungKembalianPecahan(kembalian) {
        if (kembalian < 0) return null;

        const hasilPecahan = {};
        let sisaUang = kembalian;

        for (const lembarPecahan of this.pecahan) {
            let jumlahLembar = 0;
            while (sisaUang >= lembarPecahan) {
                jumlahLembar++;
                sisaUang -= lembarPecahan;
            }
            if (jumlahLembar > 0) {
                hasilPecahan[String(lembarPecahan)] = jumlahLembar; // Bracket notation
            }
        }

        hasilPecahan.sisa = sisaUang;
        return hasilPecahan;
    },

    // 7. Logika utama pemrosesan satu transaksi lengkap
    prosesTransaksi(trx) {
        // Aturan 1: Validasi awal berbasis Truthy/Falsy
        if (!trx.pelanggan || trx.pelanggan.trim() === "") {
            const rejected = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Nama pelanggan kosong" };
            this.riwayat.push(rejected);
            return rejected;
        }
        if (!trx.pesanan || !trx.pesanan.length) {
            const rejected = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Pesanan kosong" };
            this.riwayat.push(rejected);
            return rejected;
        }

        // Jalankan perhitungan subtotal item
        const kalkulasiItem = this.hitungSubtotal(trx.pesanan);

        if (kalkulasiItem.itemValid.length === 0) {
            const rejected = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Tidak ada item valid" };
            this.riwayat.push(rejected);
            return rejected;
        }

        // Aturan 2: Perhitungan matematis nominal belanja
        const subtotal = kalkulasiItem.subtotal;
        const promoHari = this.hitungPromoHari(trx.hari);
        const diskon = this.hitungDiskon(subtotal, trx.persenVoucher);
        
        let nilaiSetelahDiskon = subtotal - diskon - promoHari;
        if (nilaiSetelahDiskon < 0) nilaiSetelahDiskon = 0; // Tidak boleh di bawah 0

        const pajak = this.hitungPajak(nilaiSetelahDiskon);
        const total = nilaiSetelahDiskon + pajak;
        const kembalian = trx.uangBayar - total;

        // Aturan 3: Penentuan status pembayaran
        const status = kembalian >= 0 ? "LUNAS" : "KURANG";
        let pecahanKembalian = null;

        // Aturan 4: Jika LUNAS, kurangi persediaan toko dan tambah kas masuk
        if (status === "LUNAS") {
            this.saldoKas += total;
            pecahanKembalian = this.hitungKembalianPecahan(kembalian);

            // Pengurangan stok aktual menu terjual
            for (const item of kalkulasiItem.itemValid) {
                const menuAsli = this.cariMenu(item.menu);
                if (menuAsli) menuAsli.stok -= item.jumlah;
            }
        }

        // Aturan 5: Susun nota akhir lengkap dan simpan ke riwayat
        const notaLengkap = {
            kode: trx.kode,
            pelanggan: trx.pelanggan,
            status,
            subtotal,
            promoHari,
            diskon,
            pajak,
            total,
            uangBayar: trx.uangBayar,
            kembalian,
            pecahanKembalian,
            itemValid: kalkulasiItem.itemValid,
            itemTidakValid: kalkulasiItem.itemTidakValid
        };

        this.riwayat.push(notaLengkap);
        return notaLengkap;
    },

    // 8. Method pencetakan visual struk belanja ke console
    cetakStruk(hasil) {
        console.log("\n==========================================");
        console.log(`         STRUK BELANJA - ${hasil.kode}        `);
        console.log("==========================================");
        console.log(`Pelanggan : ${hasil.pelanggan}`);
        
        if (hasil.status === "DITOLAK") {
            console.log(`STATUS    : DITOLAK ❌`);
            console.log(`Alasan    : ${hasil.alasan}`);
            console.log("==========================================\n");
            return;
        }

        console.log(`Status    : ${hasil.status} ✅`);
        console.log("------------------------------------------");
        console.log("Item Belanja Valid:");
        hasil.itemValid.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item.menu} x${item.jumlah} (${formatRupiah(item.harga)})`);
        });

        if (hasil.itemTidakValid && hasil.itemTidakValid.length > 0) {
            console.log("------------------------------------------");
            console.log("Item Tidak Valid (Gagal Diproses):");
            hasil.itemTidakValid.forEach(item => {
                console.log(`  • ${item.menu} (${item.alasan})`);
            });
        }

        console.log("------------------------------------------");
        console.log(`Subtotal          : ${formatRupiah(hasil.subtotal)}`);
        console.log(`Promo Hari        : -${formatRupiah(hasil.promoHari)}`);
        console.log(`Diskon Anggota/Vrc: -${formatRupiah(hasil.diskon)}`);
        console.log(`Pajak (11%)       : ${formatRupiah(hasil.pajak)}`);
        console.log("------------------------------------------");
        console.log(`TOTAL TAGIHAN     : ${formatRupiah(hasil.total)}`);
        console.log(`Uang Dibayarkan   : ${formatRupiah(hasil.uangBayar)}`);
        console.log(`Kembalian Uang    : ${formatRupiah(Math.max(0, hasil.kembalian))}`);
        
        if (hasil.status === "KURANG") {
            console.log(`Kekurangan Uang   : ${formatRupiah(Math.abs(hasil.kembalian))}`);
        }

        if (hasil.pecahanKembalian && hasil.status === "LUNAS") {
            console.log("------------------------------------------");
            console.log("Rincian Pecahan Uang Kembalian:");
            for (const [key, value] of Object.entries(hasil.pecahanKembalian)) {
                if (key === "sisa") {
                    console.log(`  Uang Koin Logam/Sisa: ${formatRupiah(value)}`);
                } else {
                    console.log(`  Lembar ${formatRupiah(Number(key))} : ${value} lembar`);
                }
            }
        }
        console.log("==========================================\n");
    }
};

// ===========================================================
// EKSEKUSI PEMROSESAN SELURUH DAFTAR TRANSAKSI
// ===========================================================

// Pengaturan Target Kas (Sesuai Aturan: Kembalikan ke nilai besar agar semua terproses)
const TARGET_KAS = 1000000; 

console.log("=== MEMULAI PROSES MESIN KASIR ===");
for (const trx of transaksiBersih) { // PERBAIKAN: Mengganti kata 'dari' menjadi keyword valid 'of'
    const hasilNota = kasir.prosesTransaksi(trx);
    kasir.cetakStruk(hasilNota);

    if (kasir.saldoKas >= TARGET_KAS) {
        console.log(`>>> Target kas sebesar ${formatRupiah(TARGET_KAS)} tercapai! <<<`);
        break;
    }
}

console.log("--- SALDO KAS AKHIR TOKO ---");
console.log(`Total Saldo di Dompet Kasir: ${formatRupiah(kasir.saldoKas)}`);

/* 

===========================================================
JAWABAN EVALUASI PERTANYAAN 3

1. REFENSI KEYWORD 'THIS'
Di dalam method object, kita menulis 'this.menu' (bukan langsung 'menu') agar Javascript
tahu bahwa kita ingin mengambil properti 'menu' yang terikat di dalam ruang lingkup (scope)
objek 'kasir' itu sendiri. Keyword 'this' di sini merujuk langsung ke objek penampungnya,
yaitu instansiasi variabel 'kasir'.
2. EFEKTIVITAS SWITCH CASE PADA PROMO HARI
Fungsi 'hitungPromoHari' lebih cocok memakai 'switch' karena melakukan pencocokan nilai
tunggal string yang bersifat pasti secara vertikal (evaluasi nilai pasti variabel 'hari').
Sengaja tidak ditulis 'break' di antara case "sabtu" dan case "minggu" memanfaatkan fitur
"fall-through". Hasilnya tetap benar karena jika hari bernilai "sabtu", kode akan langsung
merosot ke bawah mengeksekusi baris 'return 5000' milik "minggu".
3. EVALUASI TRUTHY/FALSY PADA ARRAY
Kondisi '!trx.pesanan.length' dapat digunakan karena jika array kosong, properti '.length'
bernilai angka '0' (yang secara bawaan bernilai Falsy). Menggunakan negasi tanda seru '!0'
akan mengubahnya menjadi boolean 'true', sehingga blok kode 'if' dijalankan.
3 Nilai lain yang dianggap Falsy di JavaScript: 'false', 'null', 'undefined', '""' (string kosong), dan 'NaN'.
4. PERBEDAAN BREAK DAN CONTINUE
	• 'continue' (Digunakan pada 'hitungSubtotal'): Menghentikan sisa eksekusi iterasi saat ini
dan langsung melompat maju ke putaran perulangan item berikutnya di dalam loop.
	• 'break' (Digunakan pada perulangan TARGET_KAS): Menghentikan seluruh proses perulangan
secara paksa saat itu juga keluar dari kurung kurawal block loop.
5. RETURN MULTI-ATTRIBUTE OBJECT PADA SUBTOTAL
Fungsi 'hitungSubtotal' mengembalikan objek kompleks karena mesin kasir membutuhkan informasi
yang jauh lebih kaya daripada sekadar angka nominal uang (seperti memisahkan daftar nama makanan
yang lolos validasi untuk dicetak di nota, beserta teks penolakan error untuk dilaporkan ke pembeli).
6. METODE PECAHAN KEMBALIAN (WHILE VS MATEMATIKA)
Penggunaan 'while' di dalam 'for...of' bertujuan untuk mensimulasikan pengurangan lembaran fisik
secara berulang.
Logika ini BISA diganti dengan operasi pembagian '/' (untuk mendapat lembar menggunakan Math.floor)
dan modulus '%' (untuk mendapat sisa uang).
Formulasi alternatif:
jumlahLembar = Math.floor(sisaUang / lembarPecahan);
sisaUang = sisaUang % lembarPecahan;
Pendekatan matematika pembagian ini jauh lebih efisien secara performa komputasi dibanding loop while.

===========================================================
PERCOBAAN JALAN KEDUA DENGAN TARGET_KAS KECIL (CATATAN DOKUMENTASI):

• Saat dicoba dengan TARGET_KAS kecil (misal: Rp50.000), perulangan langsung berhenti
setelah transaksi kedua (TRX-002) karena saldoKas terakumulasi melewati target.
• Transaksi TERAKHIR yang sempat diproses penuh pada percobaan kedua tersebut adalah: TRX-002.
===========================================================
*/

/* 
   ===========================================================
   EVALUASI PEKAN 6 - BAGIAN 4: LAPORAN HARIAN
   ===========================================================
*/

// Menghitung komponen data laporan harian
let totalPendapatan = 0;
let totalLunas = 0;
let totalKurang = 0;
let totalDitolak = 0;
let maxTotal = 0;
let trxTerbesar = null;
const penjualanPerMenu = {};
const daftarDitolak = [];
const kodeLunas = [];

for (const trx of kasir.riwayat) {
    if (trx.status === "LUNAS") {
        totalLunas++;
        totalPendapatan += trx.total;
        kodeLunas.push(trx.kode);

        // Cari transaksi terbesar
        if (trx.total > maxTotal) {
            maxTotal = trx.total;
            trxTerbesar = trx;
        }

        // Hitung penjualan per menu menggunakan bracket notation dan operator 'in'
        for (const item of trx.itemValid) {
            if (item.menu in penjualanPerMenu) {
                penjualanPerMenu[item.menu] += item.jumlah;
            } else {
                penjualanPerMenu[item.menu] = item.jumlah;
            }
        }
    } else if (trx.status === "KURANG") {
        totalKurang++;
    } else if (trx.status === "DITOLAK") {
        totalDitolak++;
        daftarDitolak.push({
            kode: trx.kode,
            alasan: trx.alasan
        });
    }
}

// Menghitung menu terlaris
let menuTerlaris = "";
let maxTerjual = 0;
for (const menuName in penjualanPerMenu) {
    if (penjualanPerMenu[menuName] > maxTerjual) {
        maxTerjual = penjualanPerMenu[menuName];
        menuTerlaris = menuName;
    }
}

// Membuat ringkasan kode menggunakan perulangan dan +=
let ringkasanKode = "";
for (let i = 0; i < kodeLunas.length; i++) {
    ringkasanKode += kodeLunas[i];
    if (i !== kodeLunas.length - 1) {
        ringkasanKode += ", ";
    }
}

// Mencari menu yang stoknya menipis (< 3)
const menuStokMenipis = [];
for (const itemMenu of kasir.menu) {
    if (itemMenu.stok < 3) {
        menuStokMenipis.push(itemMenu.nama);
    }
}

// Menyusun Master Object Laporan
const laporan = {
    jumlahTransaksi: kasir.riwayat.length,
    jumlahLunas: totalLunas,
    jumlahKurang: totalKurang,
    jumlahDitolak: totalDitolak,
    pendapatan: totalPendapatan,
    rataRata: totalLunas > 0 ? Math.round(totalPendapatan / totalLunas) : 0,
    transaksiTerbesar: trxTerbesar,
    penjualanPerMenu: penjualanPerMenu,
    menuTerlaris: menuTerlaris,
    daftarDitolak: daftarDitolak,
    kodeLunas: kodeLunas,
    ringkasanKode: ringkasanKode,
    menuStokMenipis: menuStokMenipis
};

// ===========================================================
// PENCETAKAN LAPORAN KE CONSOLE
// ===========================================================

// 1. Judul menggunakan kapitalisasi dinamis kedai.nama
const namaKedaiKapital = kedai.nama.toUpperCase();
console.log("==========================================");
console.log(`       LAPORAN HARIAN ${namaKedaiKapital}       `);
console.log("==========================================");
console.log(`Total Semua Transaksi : ${laporan.jumlahTransaksi}`);
console.log(`  • Status Lunas      : ${laporan.jumlahLunas}`);
console.log(`  • Status Kurang     : ${laporan.jumlahKurang}`);
console.log(`  • Status Ditolak    : ${laporan.jumlahDitolak}`);
console.log("------------------------------------------");
console.log(`TOTAL PENDAPATAN      : ${formatRupiah(laporan.pendapatan)}`);
console.log(`Rata-rata Per Lunas   : ${formatRupiah(laporan.rataRata)}`);
console.log(`Menu Terlaris         : ${laporan.menuTerlaris}`);
console.log(`Transaksi Terbesar    : ${laporan.transaksiTerbesar ? laporan.transaksiTerbesar.kode + " (" + formatRupiah(laporan.transaksiTerbesar.total) + ")" : "-"}`);
console.log(`Menu Stok Menipis (<3): [${laporan.menuStokMenipis.join(", ")}]`);
console.log("------------------------------------------");

// 2. Isi penjualanPerMenu dicetak memakai for...in
console.log("Rincian Kuantitas Penjualan Menu:");
for (const keyMenu in laporan.penjualanPerMenu) {
    console.log(`  • ${keyMenu}: ${laporan.penjualanPerMenu[keyMenu]} item`);
}
console.log("------------------------------------------");

// 3. Hasil Object.keys dan Object.values dari penjualanPerMenu
console.log("Daftar Nama Menu (Object.keys):", Object.keys(laporan.penjualanPerMenu));
console.log("Daftar Angka Terjual (Object.values):", Object.values(laporan.penjualanPerMenu));
console.log("------------------------------------------");

// 4. Periksa kecocokan panjang ringkasanKode dengan jumlahLunas
const panjangSplitKode = laporan.ringkasanKode.split(", ").length;
const isCocok = panjangSplitKode === laporan.jumlahLunas;
console.log(`Pengecekan Split Ringkasan Kode: ${panjangSplitKode} vs Jumlah Lunas: ${laporan.jumlahLunas}`);
console.log(`Hasil Cocok? -> ${isCocok}`);
console.log("------------------------------------------");

// 5. Demo Array Method pada kodeLunas
console.log("DEMO ARRAY METHOD:");
const contohKodeCari = "TRX-001";
console.log(`• includes("${contohKodeCari}") : ${laporan.kodeLunas.includes(contohKodeCari)}`);
console.log(`• indexOf("${contohKodeCari}")  : Posisi indeks ke-${laporan.kodeLunas.indexOf(contohKodeCari)}`);
console.log(`• slice(0, 2)          : [${laporan.kodeLunas.slice(0, 2).join(", ")}]`);

// Membuat salinan dan mendemokan splice (mutasi)
const salinanKodeLunas = laporan.kodeLunas.slice();
const itemTerhapus = salinanKodeLunas.splice(0, 1);
console.log(`• splice(0, 1) Salinan : Menghapus [${itemTerhapus}], Sisa salinan -> [${salinanKodeLunas.join(", ")}]`);
console.log(`• Verifikasi Asli      : [${laporan.kodeLunas.join(", ")}] (Tidak Berubah)`);
console.log("==========================================\n");


/* 
   ===========================================================
   JAWABAN EVALUASI PERTANYAAN 4
   ===========================================================

   1. PEMILIHAN STRUKTUR DATA PENJUALANPERMENU
      'penjualanPerMenu' dibuat sebagai object (bukan array) karena kita memerlukan pemetaan berbasis 
      pasangan Kunci-Nilai (Key-Value) yang unik untuk mempermudah pencarian langsung nama menu. 
      Penggunaan bracket notation 'penjualanPerMenu[item.menu]' wajib digunakan karena nama menu 
      memiliki karakter spasi liar (seperti "Kopi Cinta Latte"). Jika kita memaksa memakai dot notation 
      ('obj.Kopi Cinta Latte'), program akan memicu runtime syntax error.

   2. PERBEDAAN OBJECT.KEYS DAN OBJECT.VALUES
      - 'Object.keys': Mengembalikan array berupa kumpulan nama properti/kunci dari sebuah objek. 
        Contoh di konsol: ["Kopi Galau Americano", "Kopi Cinta Latte", "Kentang Goreng Lucu", "Sweet Cinnamon Roll", "Kopi Rindu Espresso"]
      - 'Object.values': Mengembalikan array berupa kumpulan isi/nilai properti dari objek tersebut.
        Contoh di konsol: [2, 1, 1, 2, 1]

   3. MUTABILITAS DAN EFEK SAMPING METHOD ARRAY
      - Method yang MERUBAH (memutasi) array asli: 'splice()'.
      - Method yang TIDAK MERUBAH array asli: 'includes()', 'indexOf()', dan 'slice()'.
      Bukti di console menunjukkan bahwa array 'laporan.kodeLunas' tetap mempertahankan panjang 
      dan elemen aslinya utuh secara konstan meskipun array 'salinanKodeLunas' telah terpotong 
      setelah dikenakan perintah '.splice(0, 1)'.

   4. KONSEKUENSI PENGGUNAAN TOFIXED PADA RATARATA
      Fungsi '.toFixed()' secara inheren mengembalikan tipe data String. Jika kita tidak mengubahnya 
      kembali menjadi Number (atau menggunakan Math.round seperti di atas), nilai tersebut akan berupa teks. 
      Jika nilai rata-rata ini digunakan kembali dalam komputasi keuangan berikutnya, alih-alih menjumlah, 
      JavaScript akan melakukan penggabungan string (konkatenasi) yang merusak akurasi perhitungan matematis.

   5. ANALISIS HASIL PENGECEKAN SPLIT RINGKASAN KODE
      Hasil pengecekan bernilai 'true'. Hal ini terjadi karena manipulasi pemisahan tanda koma dan 
      spasi (", ") menggunakan fungsi '.split(", ")' memecah string tunggal tersebut kembali menjadi 
      sebuah array baru yang berisi elemen kode transaksi terpisah. Karena setiap kode transaksi lunas 
      dimasukkan satu kali secara konsisten, maka ukuran panjang array baru hasil pecahan tersebut akan 
      selalu bernilai sama persis dengan angka properti total 'jumlahLunas'.
*/
