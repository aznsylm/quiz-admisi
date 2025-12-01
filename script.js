// ------------------- DATA PERTANYAAN ----------------------
const soal = [
  {
    t: "Coba bayangin, topik obrolan yang paling seru di timeline atau tongkrongan menurut kamu apa?",
    a: [
      "Harga tiket konser naik/turun, inflasi",
      "Cara belajar yang asyik, tips & tricks biar guru suka sama kelas kita",
      "Bocoran smartphone atau game baru, gimana robot AI bisa bikin gambar",
      "Berita virus, review produk skincare yang aman, atau cara mencegah sakit",
    ],
    k: ["A", "B", "C", "D"],
  },
  {
    t: "Kalau lagi penasaran banget sama sesuatu, kamu tim yang ngapain?",
    a: [
      "Langsung bikin spreadsheet atau hitung-hitungan biar tahu untung ruginya",
      "Mencari cara paling efektif buat jelasin hal itu ke teman yang belum paham",
      "Membongkar sistem atau coding untuk melihat cara kerjanya secara teknis",
      "Mencari artikel ilmiah untuk tahu penyebab dan dampaknya pada tubuh manusia",
    ],
    k: ["A", "B", "C", "D"],
  },
  {
    t: "Mata pelajaran di sekolah atau bidang ilmu yang bikin kamu bilang, 'Wah, ini gue banget!' adalah...",
    a: [
      "Akuntansi, Ekonomi, atau pelajaran yang bikin kamu bisa analisis data uang",
      "Sosiologi/Antropologi, PKN, atau pelajaran yang bikin kamu bisa jadi mentor",
      "Fisika, Matematika Terapan, dan tentang bikin program komputer",
      "Biologi, Kimia, dan semua hal yang berhubungan dengan tubuh manusia",
    ],
    k: ["A", "B", "C", "D"],
  },
  {
    t: "Dalam kerja kelompok atau bikin proyek, peran dan hal apa yang paling kamu utamakan?",
    a: [
      "Jadi Bendahara atau Manajer yang memastikan anggaran dan keuntungan aman",
      "Jadi Fasilitator yang membantu semua anggota tim belajar",
      "Jadi Teknisi yang merancang website, program, atau alat yang dibutuhkan",
      "Jadi yang memastikan semua teman dalam tim sehat dan nyaman",
    ],
    k: ["A", "B", "C", "D"],
  },
  {
    t: "Andai kamu punya modal 100 juta, ide bisnis/proyek apa yang langsung kamu garap?",
    a: [
      "Bikin startup kecil-kecilan di bidang Financial Technology",
      "Membuka lembaga bimbingan belajar online",
      "Merakit robot, bikin aplikasi, atau mendesain alat",
      "Membangun klinik mini/apotek, atau membuat aplikasi konsultasi kesehatan",
    ],
    k: ["A", "B", "C", "D"],
  },
];

// ------------------- VARIABEL GLOBAL ----------------------
let nomor = 0;
let jawaban = [];
let selectedAnswer = null;

const formSection = document.getElementById("form-section");
const quizSection = document.getElementById("quiz-section");
const hasilSection = document.getElementById("hasil-section");

const pTanya = document.getElementById("pertanyaan");
const pilihanDiv = document.getElementById("pilihan");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");


// ------------------- FORM SUBMIT ----------------------
document
  .getElementById("formIdentitas")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    formSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    tampilSoal();
  });

// ------------------- TAMPIL SOAL ----------------------
function tampilSoal() {
  document.getElementById("noSoal").innerText = nomor + 1;
  pTanya.innerText = soal[nomor].t;

  pilihanDiv.innerHTML = "";
  nextBtn.classList.add("hidden");
  selectedAnswer = null;

  soal[nomor].a.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "pilihan-btn";
    btn.innerText = item;
    btn.onclick = () => pilihJawaban(soal[nomor].k[index], btn);
    pilihanDiv.appendChild(btn);
  });

  // Restore previous answer if exists
  if (jawaban[nomor]) {
    selectedAnswer = jawaban[nomor];
    const buttons = document.querySelectorAll(".pilihan-btn");
    buttons.forEach((btn, index) => {
      if (soal[nomor].k[index] === selectedAnswer) {
        btn.classList.add("selected");
        nextBtn.classList.remove("hidden");
      }
    });
  }

  // Always show back button
  backBtn.classList.remove("hidden");
}

// ------------------- PILIH JAWABAN ----------------------
function pilihJawaban(kat, btnElement) {
  // Remove previous selection
  document.querySelectorAll(".pilihan-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Add selection to clicked button
  btnElement.classList.add("selected");

  selectedAnswer = kat;
  nextBtn.classList.remove("hidden");
}

// ------------------- NEXT BUTTON ----------------------
nextBtn.addEventListener("click", function () {
  if (selectedAnswer) {
    jawaban[nomor] = selectedAnswer;
    nomor++;
    if (nomor < soal.length) {
      tampilSoal();
    } else {
      hitungHasil();
    }
  }
});

// ------------------- BACK BUTTONS ----------------------
backBtn.addEventListener("click", function () {
  if (nomor > 0) {
    nomor--;
    tampilSoal();
  } else {
    quizSection.classList.add("hidden");
    formSection.classList.remove("hidden");
    nomor = 0;
    jawaban = [];
  }
});

// ------------------- HITUNG HASIL ----------------------
function hitungHasil() {
  quizSection.classList.add("hidden");
  hasilSection.classList.remove("hidden");

  let count = { A: 0, B: 0, C: 0, D: 0 };
  jawaban.forEach((j) => count[j]++);

  let maxScore = Math.max(...Object.values(count));
  let topCategories = Object.keys(count).filter(
    (key) => count[key] === maxScore
  );

  const categoryNames = {
    A: "Ekonomi, Bisnis, dan Akuntansi",
    B: "Ilmu Pendidikan",
    C: "Teknik & Informatika",
    D: "Kesehatan & Kedokteran",
  };

  const categoryExplanations = {
    A: "Bestie, kamu tuh tipe yang suka banget sama angka dan strategi! Dari jawaban kamu, keliatan banget kalau kamu punya jiwa entrepreneur dan suka mikir tentang duit (dalam artian positif ya!). Kamu cocok banget di bidang bisnis karena kamu tipe yang analitis dan suka challenge. Plus, zaman sekarang kan semua serba digital, jadi peluang di fintech, e-commerce, sama startup tuh unlimited banget!",
    B: "OMG, kamu tuh born to be educator! Dari pilihan kamu, keliatan banget kalau kamu punya passion buat sharing knowledge dan helping others grow. Kamu tipe yang sabar, empathetic, dan suka banget liat orang lain berkembang. Di era digital ini, educator tuh nggak cuma jadi guru loh, bisa jadi content creator edukatif, instructional designer, atau bahkan bikin startup edtech. Your impact bakal huge!",
    C: "Wah, kamu tuh typical problem solver yang suka banget sama teknologi! Dari jawaban kamu, obvious banget kalau kamu enjoy banget sama logical thinking dan creating something from scratch. Perfect timing sih, karena sekarang tuh era digital transformation, jadi demand untuk tech people tuh crazy high! Kamu bisa jadi software engineer, data scientist, atau bahkan bikin app yang next big thing!",
    D: "Kamu tuh caring banget dan passionate sama well-being orang lain! Dari pilihan kamu, keliatan kalau kamu tipe yang detail-oriented dan genuinely care about helping people. Healthcare industry tuh always needed dan terus berkembang, apalagi setelah pandemi kemarin. Kamu bisa explore jadi dokter, researcher, atau bahkan bikin health-tech startup. Your contribution bakal meaningful banget!"
  };

  let hasil = topCategories.map((cat) => categoryNames[cat]);

  // --- SIMPAN KE SPREADSHEET ---
  const dataKirim = {
    nama: document.getElementById("nama").value,
    asal: document.getElementById("asal").value,
    email: document.getElementById("email").value,
    cita: document.getElementById("cita").value,
    A: count.A,
    B: count.B,
    C: count.C,
    D: count.D,
    hasil: hasil.join(", "),
  };

  document.getElementById("hasilText").innerText = "Tunggu sebentar ya... ";
  
  kirimKeSpreadsheet(dataKirim)
    .then((response) => {
      if (response === 'duplicate') {
        document.getElementById("hasilText").innerText = "Email sudah pernah digunakan! Setiap email hanya bisa mengisi sekali.";
      } else {
        let explanation = "";
        if (topCategories.length === 1) {
          explanation = categoryExplanations[topCategories[0]];
        } else {
          explanation = "Wah, kamu tuh multi-talented banget! Hasil kamu menunjukkan minat yang seimbang di beberapa bidang. Ini actually advantage loh, karena kamu bisa explore interdisciplinary programs atau double major. Fleksibilitas kamu bakal jadi kekuatan di masa depan!";
        }
        document.getElementById("hasilText").innerHTML = `<strong>${hasilText}</strong><br><br>${explanation}<br><br>Semangat ya! `;
        
        // Setup share functionality
        setupShareButtons(hasilText, explanation);
      }
    })
    .catch(() => {
      document.getElementById("hasilText").innerText = hasilText + "\n Gagal menyimpan data";
    });
  // -------------------------------

  let hasilText =
    hasil.length === 1
      ? `Kategori minat kamu adalah: ${hasil[0]}`
      : `Kategori minat kamu adalah: ${hasil.join(" dan ")}`;
}

// ------------------- SHARE FUNCTIONS ----------------------
function setupShareButtons(hasil, explanation) {
  const nama = document.getElementById("nama").value;
  
  // WhatsApp Share - Direct to WhatsApp
  document.getElementById("shareWA").onclick = function() {
    const text = `Halo! Aku baru aja ikutan quiz minat jurusan nih! 🎓\n\nHasilku: ${hasil} 🎯\n\nTernyata aku cocok banget di bidang ini! Kamu juga coba yuk, cuma 5 menit kok: ${window.location.href}`;
    
    // Try to open WhatsApp app first, fallback to web
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: Try WhatsApp app first
      window.location.href = `whatsapp://send?text=${encodeURIComponent(text)}`;
      
      // Fallback to web WhatsApp after 2 seconds if app doesn't open
      setTimeout(() => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      }, 2000);
    } else {
      // Desktop: Open WhatsApp Web
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };
  
  // Instagram Share - Direct to Instagram
  document.getElementById("copyIG").onclick = function() {
    const text = `Quiz minat jurusan done! ✅\nHasilku: ${hasil} 🎯\n\nTernyata aku cocok banget di bidang ini! 🚀\nKamu juga coba yuk, link di bio!\n\n#QuizJurusan #KuliahDimana #GenZ #PilihJurusan #Mahasiswa`;
    
    // Copy to clipboard first
    navigator.clipboard.writeText(text).then(() => {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Try to open Instagram app
        window.location.href = 'instagram://camera';
        
        // Show instruction
        setTimeout(() => {
          alert('📱 Text sudah di-copy! Instagram akan terbuka, tinggal paste di Stories ya!');
        }, 1000);
      } else {
        // Desktop: Open Instagram web and show instruction
        window.open('https://www.instagram.com/', '_blank');
        alert('💻 Text sudah di-copy! Instagram web akan terbuka, paste di Stories ya!');
      }
    }).catch(() => {
      alert('❌ Gagal copy text. Coba lagi ya!');
    });
  };
  
  // TikTok Share - Direct to TikTok
  document.getElementById("copyTikTok").onclick = function() {
    const text = `POV: Baru aja ikutan quiz minat jurusan 🎓\n\nHasilku: ${hasil} 🎯\n\nUnexpected banget tapi ternyata cocok! Kalian juga coba yuk 🚀\n\n#QuizJurusan #KuliahDimana #GenZ #PilihJurusan #CollegeLife #StudentLife #Viral`;
    
    // Copy to clipboard first
    navigator.clipboard.writeText(text).then(() => {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Try to open TikTok app
        window.location.href = 'tiktok://camera';
        
        // Show instruction
        setTimeout(() => {
          alert('📱 Caption sudah di-copy! TikTok akan terbuka, tinggal paste ya!');
        }, 1000);
      } else {
        // Desktop: Open TikTok web and show instruction
        window.open('https://www.tiktok.com/upload', '_blank');
        alert('💻 Caption sudah di-copy! TikTok web akan terbuka, paste di caption ya!');
      }
    }).catch(() => {
      alert('❌ Gagal copy caption. Coba lagi ya!');
    });
  };
}

// ------------------- KIRIM KE SPREADSHEET ----------------------
function kirimKeSpreadsheet(data) {
  return new Promise((resolve, reject) => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxlum5xWPqMP7m1LWX0Z3pB38M10XqN9QBHPMjMTdmesunhHgy8LK1wVQIlxzp8nXbg/exec";
    
    // Create unique callback name
    const callbackName = 'callback_' + Date.now();
    
    // Create callback function
    window[callbackName] = function(response) {
      delete window[callbackName];
      document.head.removeChild(script);
      resolve(response);
    };
    
    // Create script element for JSONP
    const script = document.createElement('script');
    const params = new URLSearchParams(data);
    params.append('callback', callbackName);
    script.src = scriptURL + '?' + params.toString();
    
    script.onerror = function() {
      delete window[callbackName];
      document.head.removeChild(script);
      reject(new Error('Gagal mengirim data'));
    };
    
    document.head.appendChild(script);
  });
}
