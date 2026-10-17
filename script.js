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
