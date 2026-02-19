// ========================================
// CARA TAMBAH DATA
// ========================================
// 1. Copy-paste object baru di akhir array galleryData.
// 2. Ubah id menjadi id unik (selanjutnya dari id terakhir, misal id: 3).
// 3. Isi title, description, category, tags sesuai keinginan.
// 4. Untuk tags, gunakan array string seperti ["tag1", "tag2"].
// 5. views dan likes default 0, akan dihandle oleh localStorage.

// ========================================
// CARA GANTI GAMBAR
// ========================================
// 1. Upload file gambar baru ke folder /assets/images/.
// 2. Ubah nilai image menjadi "assets/images/nama-file-baru.jpg".
// 3. Pastikan format gambar JPG/PNG/WEBP.

// ========================================
// FORMAT WAJIB
// ========================================
// Setiap object harus punya: id (number), title (string), description (string),
// image (string path), category (string), tags (array string), views (number), likes (number).
// Jangan hapus atau ubah key ini, atau sistem akan rusak.
// Tambah kategori atau tag baru bebas, filter akan otomatis update.

// Sample Data (Hapus atau edit sesuai kebutuhan)
const galleryData = [
  {
    id: 1,
    title: "Futuristic UI Design",
    description: "A modern UI concept with glassmorphism and neon accents.",
    image: "assets/images/sample1.jpg",
    category: "UI Design",
    tags: ["modern", "dark", "glass"],
    views: 0,
    likes: 0
  },
  {
    id: 2,
    title: "Neon Dashboard",
    description: "Interactive dashboard with animations and micro-interactions.",
    image: "assets/images/sample2.jpg",
    category: "Dashboard",
    tags: ["neon", "interactive", "premium"],
    views: 0,
    likes: 0
  }
  // Tambah object baru di sini...
];
