/**
 * Centralized Location Registry for Zaim Rosli Real Estate Portal
 * Stores SEO and structured metadata for location-based landing pages.
 * Dynamic property listings are fetched and filtered directly from Cloudflare Worker KV.
 */

const LOCATIONS_CONFIG = {
  bangi: {
    slug: "bangi",
    name: "Bangi",
    state: "Selangor",
    seoTitle: "Ejen Hartanah Bangi & Rumah Dijual / Sewa di Bandar Baru Bangi — Zaim Rosli (REN39575)",
    seoDescription: "Cari rumah sewa, banglo, semi-d & ruang komersial untuk dijual di Bandar Baru Bangi & Bandar Seri Putra. Khidmat ejen hartanah berdaftar REN39575.",
    h1: "Hartanah di Bangi: Rumah Dijual & Sewa di Bandar Baru Bangi",
    introContent: "Bandar Baru Bangi dan perbandaran sekitarnya seperti Bandar Seri Putra dan Seksyen 1–16 merupakan hab kediaman dan komersial strategik di selatan Selangor. Portal Zaim Rosli (REN39575) membawakan senarai hartanah kediaman dan komersial yang telah disahkan dengan sokongan rundingan profesional dan semakan kelayakan pinjaman.",
    filterKeywords: [
      "bangi",
      "bandar baru bangi",
      "bandar seri putra",
      "bangi avenue",
      "gandaria",
      "kajang impian",
      "jenderam"
    ],
    subareas: [
      "Seksyen 4",
      "Seksyen 9 (Pusat Bandar)",
      "Bandar Seri Putra",
      "Taman Kajang Impian (Sempadan Sek 7)",
      "Bangi Avenue",
      "Southville City",
      "Jenderam Hulu"
    ],
    relatedBlogSlugs: [
      "panduan-lengkap-sewa-rumah-malaysia-deposit-tenancy-agreement",
      "pembangunan-berasaskan-transit-tod-mrt-lrt-kuala-lumpur",
      "freehold-vs-leasehold-pelaburan-hartanah-malaysia"
    ],
    faqs: [
      {
        question: "Apakah jenis hartanah yang terdapat di kawasan Bangi?",
        answer: "Kawasan Bangi menawarkan pelbagai jenis hartanah merangkumi rumah teres, semi-D, banglo sudut, ruang komersial pejabat/kedai, serta tanah status bangunan dan kediaman."
      },
      {
        question: "Berapakah anggaran julat harga hartanah di Bangi?",
        answer: "Kadar sewa rumah teres di Bangi bermula sekitar RM 2,000 hingga RM 2,500 sebulan, manakala harga jualan hartanah landed dan ruang komersial bermula dari RM 1.5 juta ke atas bergantung kepada saiz dan lokasi."
      },
      {
        question: "Bagaimanakah cara melantik Zaim Rosli untuk menjual atau menyewakan rumah di Bangi?",
        answer: "Anda boleh menghubungi Zaim Rosli (REN39575) secara terus melalui WhatsApp untuk mendapatkan khidmat semakan nilai pasaran percuma, sesi fotografi listing, dan pemasaran bersasar kepada pembeli dan penyewa berkelayakan."
      }
    ]
  },
  nilai: {
    slug: "nilai",
    name: "Nilai",
    state: "Negeri Sembilan",
    seoTitle: "Ejen Hartanah Nilai & Rumah / Kedai Dijual & Sewa di Nilai Impian & Bandar Baru Nilai — Zaim Rosli (REN39575)",
    seoDescription: "Cari rumah, kedai shoplot, tanah & kilang industri untuk dijual / sewa di Nilai, Bandar Baru Nilai & Nilai Impian. Khidmat ejen hartanah berdaftar REN39575.",
    h1: "Hartanah di Nilai: Rumah, Shoplot & Kilang Dijual / Sewa di Nilai",
    introContent: "Nilai merupakan koridor pertumbuhan pesat dan hab pendidikan serta logistik utama yang menghubungkan Lembah Klang dan Negeri Sembilan. Dilengkapi akses lebuhraya PLUS, ELITE, stesen KTM, serta kawasan matang seperti Nilai Impian, Bandar Baru Nilai, Desa Melati, dan Kawasan Perindustrian Nilai, pasaran hartanah di sini menawarkan potensi modal dan pulangan sewa yang sangat menarik. Portal Zaim Rosli (REN39575) membawakan senarai hartanah kediaman, komersial, dan perindustrian yang sahih dan terkini.",
    filterKeywords: [
      "nilai",
      "bandar baru nilai",
      "nilai impian",
      "desa melati",
      "desa cempaka",
      "nilai 3",
      "putra nilai",
      "bandar enstek",
      "labu"
    ],
    subareas: [
      "Bandar Baru Nilai",
      "Nilai Impian",
      "Taman Desa Melati",
      "Taman Desa Cempaka",
      "Kawasan Perindustrian Nilai",
      "Pusat Borong Nilai 3",
      "Bandar Enstek"
    ],
    relatedBlogSlugs: [
      "panduan-lengkap-sewa-rumah-malaysia-deposit-tenancy-agreement",
      "pembangunan-berasaskan-transit-tod-mrt-lrt-kuala-lumpur",
      "freehold-vs-leasehold-pelaburan-hartanah-malaysia"
    ],
    faqs: [
      {
        question: "Apakah potensi pelaburan hartanah di kawasan Nilai?",
        answer: "Nilai mempunyai permintaan sewa yang tinggi hasil daripada ekosistem universiti utama (USIM, Nilai University, Manipal, INTI) serta kawasan perindustrian aktif dan Pusat Borong Nilai 3."
      },
      {
        question: "Berapakah kadar sewa dan harga jualan hartanah di Nilai?",
        answer: "Kadar sewa kediaman dan apartment bermula sekitar RM 1,000 - RM 1,800 sebulan, manakala shoplot komersial dan kilang bermula dari RM 3,000 hingga puluhan ribu bergantung kepada lokasi dan saiz keluasan."
      },
      {
        question: "Bagaimanakah cara mendapatkan khidmat ejen hartanah di Nilai?",
        answer: "Anda boleh menghubungi Zaim Rosli (REN39575) melalui WhatsApp untuk semakan nilai pasaran percuma, pemasaran listing secara profesional, serta urusan sewaan atau jual beli hartanah anda di Nilai."
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.LOCATIONS_CONFIG = LOCATIONS_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LOCATIONS_CONFIG };
}
