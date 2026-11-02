# Paket Project: Pencatat Gizi Harian (opsi B)

## Cara memasang di Claude Project

1. Buat Project baru di claude.ai, misalnya bernama "Pencatat Gizi".
2. Salin isi `instruksi-project.md` (bagian di bawah garis) ke kolom **Instructions**, lalu isi **PROFIL PENGGUNA**.
3. Unggah semua file di folder `pengetahuan/` ke **Project knowledge**.
4. Sangat disarankan: unggah juga file resmi **PMK 28/2019 (AKG)** dan **TKPI** (Excel/PDF dari panganku.org). Instruksi sudah mengatur agar file resmi lebih diutamakan.
5. Buat satu file log di laptop atau HP, misalnya `log-gizi.csv`, berisi baris judul dari bagian FORMAT CATATAN. Tempelkan baris CSV dari Claude setiap selesai mencatat.
6. Setiap minggu atau bulan: unggah `log-gizi.csv` ke chat baru dalam Project, lalu ketik `/analisis`.

Format CSV ini sudah dirancang agar nanti bisa **diimpor langsung** ke aplikasi pencatat (opsi A).

## Isi folder

| File | Isi | Dipakai untuk |
|---|---|---|
| `instruksi-project.md` | Instruksi sistem Project | Peran, alur mencatat, format CSV, perintah, analisis, keselamatan |
| `pengetahuan/standar-akg-dv.csv` | Target 22 nutrisi: DV FDA dan AKG 2019 (L/P 19–29 th) | Target harian di bagian TARGET HARIAN dan ANALISIS |
| `pengetahuan/makanan-dasar-per100g.csv` | 18 makanan inti (telur, ikan kembung, tempe, tahu, sayur daun, wortel, ubi, jambu, pisang, alpukat, kacang, kuaci, teri, susu, nasi merah, dll.) × 24 nutrisi | Langkah 3 "Hitung nutrisinya" |
| `pengetahuan/ukuran-rumah-tangga.csv` | Konversi butir, potong, centong, mangkuk, sendok ke gram | Langkah 2 "Konversi porsi ke gram" |
| `pengetahuan/top-makanan-per-nutrisi.csv` | Top 50 makanan per 29 nutrisi (sudah dikoreksi, bertanda bumbu/olahan) | `/saran` dan rencana perbaikan |
| `pengetahuan/aturan-dan-prioritas.md` | 21 kebiasaan, 19 kartu nutrisi, 19 kombinasi "jangan bersamaan", 19 sinergi, 9 peringatan | Analisis pola kebiasaan, saran, aturan keselamatan |
| `latihan-soal.csv` | 88 soal esai dan jawabannya | **Tidak perlu** diunggah ke Project ini (untuk belajar) |
| `_data-mentah/top30-per-nutrisi.json` | Data mentah daftar makanan per nutrisi | Cadangan untuk membangun aplikasi (opsi A) |

## Peta aset dari sesi sebelumnya

| Aset | Berguna? | Masuk ke bagian |
|---|---|---|
| **Peta Prioritas Nutrisi** (artifact) | Sangat | Kartu nutrisi, kebiasaan, jangan bersamaan, sinergi, peringatan → `aturan-dan-prioritas.md`. Top 30 → `top-makanan-per-nutrisi.csv`. Tab Tinggi badan dan latihan soal tidak diperlukan untuk pencatat |
| **Piring Telur** (artifact) | Sangat | Rumus energi dan target protein → TARGET HARIAN. Data 18 makanan → `makanan-dasar-per100g.csv`. Ukuran rumah tangga → `ukuran-rumah-tangga.csv`. AKG/DV → `standar-akg-dv.csv`. Logika "cara menutup kekurangan" → perintah `/saran` |
| **Pola Pangan Padat Gizi** (artifact) | Sedang | Konsep makanan "generalis" dan pembagian nutrisi hewani/nabati → poin 5 ANALISIS |
| `dr-berg-analisis-pola.md` | Rendah | Hanya latar belakang. Klaim khas Dr. Berg sudah diberi label di `aturan-dan-prioritas.md` |
| File unggahan mentah (txt Dr. Berg, food synergy, high nutrisi, PDF nutrisi) | Jangan diunggah | Banyak angka keliru atau tidak terverifikasi. Versi yang sudah disaring ada di folder `pengetahuan/` |

## Batasan

- Nilai gizi di `makanan-dasar-per100g.csv` dan angka AKG di `standar-akg-dv.csv` disusun dari ingatan atas USDA dan PMK 28/2019, jadi **perlu dicocokkan** dengan dokumen resmi.
- Daftar top makanan berasal dari file "high nutrisi" (buatan AI). Angkanya baru dicek secara sampel, dan baris yang dikoreksi diberi keterangan di kolom `koreksi`.
