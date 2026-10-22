/* DATA KONTEN. Edit berkas ini untuk menambah prestasi, agenda, galeri, berita.
   Nama siswa sengaja TIDAK ditampilkan (PRD 7.1). */
const PRESTASI = [
  {judul:"Juara 2 Grand Final Robotik ISTEC 2026",tingkat:"Internasional",bidang:"Sains dan Teknologi",tahun:2026,desk:"Grand Final robotik ISTEC 2026 di Bali.",sumber:"Perlu verifikasi tingkat dan sertifikat"},
  {judul:"Juara 3 Grand Final Robotik ISTEC 2026",tingkat:"Internasional",bidang:"Sains dan Teknologi",tahun:2026,desk:"Grand Final robotik ISTEC 2026 di Bali.",sumber:"Perlu verifikasi tingkat dan sertifikat"},
  {judul:"Juara Umum PORSENI Kabupaten Sukoharjo",tingkat:"Kabupaten",bidang:"Olahraga",tahun:2025,desk:"Juara umum Pekan Olahraga dan Seni tingkat kabupaten.",sumber:"Situs madrasah"},
  {judul:"Juara Umum KASM Kabupaten Sukoharjo",tingkat:"Kabupaten",bidang:"Akademik",tahun:2025,desk:"Juara umum KASM tingkat kabupaten.",sumber:"Situs madrasah"},
  {judul:"Allievo Futsal Champion (final 15 April 2026)",tingkat:"Regional",bidang:"Olahraga",tahun:2026,desk:"Futsal. Hasil akhir menunggu konfirmasi madrasah.",sumber:"Perlu konfirmasi hasil dan tingkat"}
];
const TINGKAT = ["Internasional","Nasional","Provinsi","Regional","Kabupaten"];
const BIDANG = ["Sains dan Teknologi","Akademik","Olahraga","Seni dan Keagamaan","Kelembagaan","Lainnya"];

const JENIS = {lomba:{n:"Lomba",c:"#E63946",s:"sq"},madrasah:{n:"Kegiatan madrasah",c:"#3AB0FF",s:"ci"},ppdb:{n:"PPDB",c:"#3BC45B",s:"tr"},nasional:{n:"Hari nasional",c:"#FFD60A",s:"di"}};
const AGENDA = [
  {j:"ISTEC 2026 (Bali), agenda beberapa hari",a:"2026-05-07",b:"2026-05-10",t:"lomba",k:"Tanggal perlu diverifikasi."},
  {j:"Final Allievo Futsal Champion",a:"2026-04-15",b:"2026-04-15",t:"lomba",k:"Hasil akhir menunggu konfirmasi."},
  {j:"Hari Pendidikan Nasional",a:"2026-05-02",b:"2026-05-02",t:"nasional",k:""},
  {j:"Hari Lahir Pancasila",a:"2026-06-01",b:"2026-06-01",t:"nasional",k:""},
  {j:"Hari Kemerdekaan RI",a:"2026-08-17",b:"2026-08-17",t:"nasional",k:""},
  {j:"Hari Santri",a:"2026-10-22",b:"2026-10-22",t:"nasional",k:""},
  {j:"Hari Sumpah Pemuda",a:"2026-10-28",b:"2026-10-28",t:"nasional",k:""},
  {j:"Hari Pahlawan",a:"2026-11-10",b:"2026-11-10",t:"nasional",k:""},
  {j:"Hari Lahir MTsN 2 Sukoharjo",a:"2026-11-25",b:"2026-11-25",t:"madrasah",k:"Berdiri 25 November 1995."},
  {j:"Hari Guru Nasional",a:"2026-11-25",b:"2026-11-25",t:"nasional",k:""},
  {j:"Cek jadwal PPDB tahun berjalan",a:"2026-11-02",b:"2026-11-02",t:"ppdb",k:"Tanggal resmi ada di ppdb.mtsn2skh.sch.id."}
];
const GALERI = [
  {src:"assets/img/kegiatan-fair2023.svg",cap:"Fair 2023",k:"Kegiatan"},
  {src:"assets/img/kegiatan-porseni2025.svg",cap:"PORSENI 2025",k:"Kegiatan"},
  {src:"assets/img/kegiatan-mabit.svg",cap:"Mabit",k:"Kegiatan"},
  {src:"assets/img/kegiatan-pelepasan9.svg",cap:"Pelepasan kelas IX",k:"Kegiatan"},
  {src:"assets/img/lomba-istec2026.svg",cap:"Robotik ISTEC 2026",k:"Lomba"},
  {src:"assets/img/lomba-futsal.svg",cap:"Futsal Allievo 2026",k:"Lomba"},
  {src:"assets/img/lomba-kasm.svg",cap:"KASM 2025",k:"Lomba"},
  {src:"assets/img/lomba-porseni.svg",cap:"Juara Umum PORSENI",k:"Lomba"}
];
const FASILITAS = [
  {n:"Laboratorium",d:"Ruang praktik untuk sains dan teknologi."},
  {n:"Perpustakaan",d:"Ruang baca dan pinjam buku."},
  {n:"Tempat ibadah",d:"Pusat kegiatan keagamaan harian."},
  {n:"Sarana olahraga",d:"Lapangan untuk futsal, voli, dan latihan."},
  {n:"Ruang robotika",d:"Tempat tim robotik berlatih."}
];
const BERITA = [
  {j:"Juara 2 dan 3 Grand Final Robotik ISTEC 2026 di Bali",c:"Prestasi",t:"2026"},
  {j:"MTsN 2 Sukoharjo Juara Umum PORSENI dan KASM Kabupaten",c:"Prestasi",t:"2025"},
  {j:"Pelepasan siswa kelas IX",c:"Kegiatan",t:"Arsip madrasah"}
];
