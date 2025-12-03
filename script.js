// ------------------- DATA PERTANYAAN ----------------------
const soal = [
  {
    t: "Menurut kamu, kalau lagi nongkrong yang paling seru ngobrolin soal apa?",
    a: [
      "Harga tiket konser atau soal inflasi",
      "Cara belajar yang asyik, tips & tricks biar guru suka sama kelas kita",
      "Bocoran smartphone atau game baru, gimana robot AI bisa bikin gambar",
      "Berita virus, review produk skincare yang aman, atau cara mencegah sakit",
    ],
    k: ["A", "B", "C", "D"],
  },
  {
    t: "Kalau lagi penasaran banget sama sesuatu, kamu tim yang ngapain?",
    a: [
      "Langsung bikin hitung-hitungan biar tahu untung ruginya",
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
    t: "Kalau kamu lagi kerja kelompok atau bikin proyek, peran dan hal apa yang akan paling kamu utamakan?",
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
    A: [
      "Bestie, kamu tuh tipe yang suka banget sama angka dan strategi! Dari jawaban kamu, keliatan banget kalau kamu punya jiwa entrepreneur dan suka mikir tentang duit (dalam artian positif ya!). Kamu cocok banget di bidang bisnis karena kamu tipe yang analitis dan suka challenge. Plus, zaman sekarang kan semua serba digital, jadi peluang di fintech, e-commerce, sama startup tuh unlimited banget!",
      "Bestie, kamu tuh tipe analitis yang suka banget sama angka dan strategi! Kamu punya jiwa entrepreneur yang kuat dan berorientasi pada hasil dan profit. Kamu cocok di bidang bisnis karena kamu analitis dan punya mindset investasi. Peluang di sektor Finansial dan Manajemen tuh unlimited banget! Semangat ya!",
      "Vibes-mu tuh Raja Angka banget! Kamu punya bakat buat ngatur finansial dan melihat alur keuntungan. Otakmu encer buat analisis data dan strategi bisnis yang profitable. Goal-mu pasti kemandirian finansial. Jurusan Akuntansi/Ekonomi auto cocok! Ayo, jadi investor kelas kakap!",
      "Clearly, kamu punya pola pikir strategis dan nyaman dengan isu-isu makro ekonomi. Kamu itu pemikir jangka panjang yang selalu mempertimbangkan untung-rugi. Kamu punya kemampuan analisis tajam di bidang finansial. Tunjukkan strategi killer-mu di dunia bisnis!",
      "Kamu adalah tipe pemimpin yang fokus pada manajemen anggaran dan memastikan kelancaran operasional. Jiwa Bendahara/Manajer kamu kuat. Ini modal utama buat jadi pemimpin perusahaan yang sukses dan inovatif. Jangan ragu gasss ke Manajemen atau Bisnis!",
      "Kamu nyaman banget sama pelajaran yang melibatkan data keuangan dan pencatatan transaksi. Minatmu kelihatan banget di Akuntansi dan Ekonomi. Kamu adalah tipe yang teliti, detail, dan berorientasi pada profit. Ciptakan startup yang cuan abis!",
      "Kamu tipe yang punya urge buat menghitung risiko dan keuntungan sebelum bertindak. Sign ini menunjukkan kamu punya kemampuan analisis bisnis yang kuat. Ekonomi Terapan atau Manajemen Bisnis bakal boost skill alami kamu. Lanjutkan fokus pada analisis dan peluang!",
      "Minatmu emang di mengatur alokasi dana dan membuat keputusan finansial yang menguntungkan. Vibes-mu cocok banget jadi Direktur Keuangan atau Konsultan Investasi. Kamu punya sense kuat di bidang pasar modal. Kejar impian jadi ahli investasi!",
      "Kamu punya jiwa wirausaha yang kuat dan fokus pada bagaimana memastikan hasil dari sebuah proyek. Ini sign kamu cocok di dunia Bisnis dan Pemasaran. Kamu punya potensi besar jadi entrepreneur yang handal. Jadilah entrepreneur yang sukses!"
    ],
    B: [
      "OMG, kamu tuh born to be educator! Dari pilihan kamu, keliatan banget kalau kamu punya passion buat sharing knowledge dan helping others grow. Kamu tipe yang sabar, empathetic, dan suka banget liat orang lain berkembang. Di era digital ini, educator tuh nggak cuma jadi guru loh, bisa jadi content creator edukatif, instructional designer, atau bahkan bikin startup edtech. Your impact bakal huge!",
      "Bestie, kamu tuh punya vibe jadi mentor sejati! Jawaban kamu menunjukkan passion untuk berbagi ilmu dan membantu orang lain berkembang. Kamu cocok di bidang Pendidikan karena kamu punya kemampuan komunikasi dan empati yang tinggi. Kamu bisa jadi guru atau edukator masa kini! Ayo, sebarkan ilmu terbaikmu!",
      "Wih, kamu punya bakat buat menjelaskan hal-hal kompleks dengan cara yang mudah dipahami! Ini basic skill banget buat jadi pendidik yang keren. Kamu nyaman di lingkungan sosial dan suka jadi Fasilitator di tim. Jurusan Pendidikan auto cocok! Saatnya jadi guru/mentor idola!",
      "Kamu tertarik pada interaksi sosial dan suka membantu semua anggota tim belajar bersama. Basically, kamu itu Pembimbing alami. Kamu cocok banget di bidang yang melibatkan pelatihan dan pengembangan sumber daya manusia. Kembangkan potensi orang lain!",
      "Kamu punya ide bisnis yang berfokus pada edukasi atau lembaga belajar. Passion-mu itu emang ada di dunia pendidikan dan sharing knowledge! Kamu punya skill untuk menciptakan metode belajar yang efektif dan menyenangkan. Jadilah pendiri platform edukasi online!",
      "Kamu suka ngobrolin tentang cara belajar dan strategi sosial. Itu nunjukin kamu peduli pada dinamika kelompok dan knowledge transfer. Jurusan yang berkaitan dengan Ilmu Pendidikan atau Sosiologi bakal boost skill sosialmu. Jadilah social butterfly yang cerdas!",
      "Kamu tim yang fokus pada efektivitas penyampaian materi agar orang lain mengerti. Vibes kamu kuat banget buat jadi Trainer/Coach Profesional. Kamu cocok di jurusan yang fokus pada pengajaran dan pelatihan. Tingkatkan skill mentoring-mu!",
      "Pilihanmu mengarah ke peran Fasilitator yang membantu tim belajar dan membimbing. Ini menunjukkan kamu punya mindset pemimpin dan pendidik sejati. Kamu punya bakat untuk mengajar dan menginspirasi orang lain. Ayo, kejar impian jadi Dosen muda yang inovatif!",
      "Kamu tertarik banget sama metode belajar yang asyik dan lembaga bimbingan berbasis digital. Ini sign kalau kamu punya passion di dunia edukasi dengan sentuhan teknologi. Kamu punya potensi besar di Teknologi Pendidikan. Ciptakan metode belajar masa depan!"
    ],
    C: [
      "Wah, kamu tuh typical problem solver yang suka banget sama teknologi! Dari jawaban kamu, obvious banget kalau kamu enjoy banget sama logical thinking dan creating something from scratch. Perfect timing sih, karena sekarang tuh era digital transformation, jadi demand untuk tech people tuh crazy high! Kamu bisa jadi software engineer, data scientist, atau bahkan bikin app yang next big thing!",
      "Fix banget, kamu tuh anak Tech Enthusiast! Pola pikirmu itu Teknik banget, suka menciptakan sistem, dan membuat program. Kamu cocok di bidang ini karena punya logika yang kuat dan update soal inovasi teknologi. Peluang jadi engineer atau developer itu unlimited banget! Saatnya menciptakan teknologi masa depan!",
      "Kamu tim yang suka membongkar dan menganalisis cara kerja sistem secara teknis. Udah jelas, otakmu itu Informatika banget, fokus pada logika dan algoritma. Jurusan Teknik Informatika bakal jadi playground yang seru buatmu! Tunjukkan skill coding terbaikmu!",
      "Kamu suka Matematika Terapan dan tertarik pada perancangan alat atau robot. Kamu punya mindset seorang inventor yang suka menciptakan hal-hal fisik. Teknik Elektro atau Mekatronika is calling! Ayo, rakit inovasi fisik impianmu!",
      "Kamu ingin berperan sebagai Teknisi yang merancang sistem digital atau program. Ini sign kuat kalau passion-mu di Teknik Informatika atau Sistem Informasi. Kamu punya bakat merancang hardware dan software! Jadilah engineer sistem jempolan!",
      "Kamu tertarik banget sama perkembangan teknologi dan inovasi seperti AI. Kamu jago ngelogika sistem dan punya passion di bidang digital. Ilmu Komputer atau Teknik cocok buatmu. Kejar karier di Tech Industry yang lagi naik daun!",
      "Ide bisnismu merakit alat dan mendesain sistem yang belum ada. Kamu punya mindset seorang engineer sejati! Kamu butuh platform yang fokus pada perancangan dan konstruksi, yaitu jurusan Teknik (Apapun cabangnya). Desainlah alat yang mengubah cara kerja dunia!",
      "Kamu tertarik banget sama logika matematika dan membuat program komputer. Ini menunjukkan kamu punya modal logic yang kuat. Jurusan Teknik Komputer atau Matematika yang fokus pada coding cocok banget buatmu. Jadilah master logika dan algoritma!",
      "Pilihanmu konsisten di area bikin program dan merancang sistem yang terstruktur. Kamu nyaman banget sama dunia software development. Sistem Informasi adalah tempat yang tepat buat skill merancangmu. Rancang sistem yang efisien dan andal!"
    ],
    D: [
      "Kamu tuh caring banget dan passionate sama well-being orang lain! Dari pilihan kamu, keliatan kalau kamu tipe yang detail-oriented dan genuinely care about helping people. Healthcare industry tuh always needed dan terus berkembang, apalagi setelah pandemi kemarin. Kamu bisa explore jadi dokter, researcher, atau bahkan bikin health-tech startup. Your contribution bakal meaningful banget!",
      "Gak salah lagi, kamu punya concern tinggi sama kesejahteraan dan tubuh manusia! Jawaban kamu menunjukkan passion untuk meneliti dampak pada kesehatan. Kamu cocok di bidang Kesehatan karena punya sense of care dan empati yang kuat. Karier kamu bisa jadi dokter, perawat, atau peneliti! Jadilah pahlawan kesehatan masa depan!",
      "Kamu tim yang suka mencari tahu penyebab dan dampak fenomena pada tubuh secara ilmiah. Ini mindset dokter dan peneliti medis sejati! Kamu tertarik sama Biologi dan Kimia yang mendalam. Jurusan Kedokteran atau Biomedis cocok buatmu. Lanjutkan riset ilmiahmu di bidang medis!",
      "Kamu paling concern sama pencegahan penyakit dan kesehatan kolektif/komunitas. Vibes kamu kuat banget di Kesehatan Masyarakat atau Gizi. Kamu punya sense of duty yang tinggi dan peduli pada wellness orang banyak. Sebarkan mindset hidup sehat pada komunitas!",
      "Kamu tertarik banget sama Kimia, Biologi, dan bagaimana zat bereaksi dalam tubuh. Ide bisnismu mendirikan fasilitas kesehatan? Kamu punya passion menemukan solusi medis. Jurusan Farmasi bakal support minat risetmu! Ayo, temukan dan kembangkan obat masa depan!",
      "Peran utamamu di tim adalah menjaga kesejahteraan dan memastikan kondisi fisik teman-teman aman. Ini menunjukkan kamu punya skill perhatian dan empati yang tinggi. Kamu cocok jadi Perawat atau Tenaga Medis lainnya. Berikan pelayanan dan perhatian medis terbaik!",
      "Kamu suka concern pada aspek-aspek kesehatan pribadi dan kesehatan jangka panjang. Ini nunjukin kamu punya perhatian ke detail kesehatan. Ilmu Gizi atau Kesehatan Lingkungan bisa jadi pilihan keren! Jadilah ahli wellness yang up-to-date!",
      "Ide bisnismu aplikasi konsultasi atau solusi kesehatan digital. Kamu ngeliat peluang di bidang Kesehatan dengan sentuhan teknologi. Kamu punya mindset yang ingin mempermudah akses kesehatan. Ciptakan aplikasi kesehatan yang membantu banyak orang!",
      "Pilihanmu mengarah ke semua hal yang berhubungan dengan tubuh dan penelitian ilmiah mendalam. Ini sign kuat kamu nyaman dengan ilmu Biologi yang detail. Biologi atau Ilmu Forensik adalah platform yang tepat. Selami detail ilmu hayati dan tubuh manusia!"
    ]
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
      if (response === "duplicate") {
        document.getElementById("hasilText").innerText =
          "Email sudah pernah digunakan! Setiap email hanya bisa mengisi sekali.";
      } else {
        let explanation = "";
        if (topCategories.length === 1) {
          const randomIndex = Math.floor(Math.random() * categoryExplanations[topCategories[0]].length);
          explanation = categoryExplanations[topCategories[0]][randomIndex];
        } else {
          explanation =
            "Wah, kamu tuh multi-talented banget! Hasil kamu menunjukkan minat yang seimbang di beberapa bidang. Ini actually advantage loh, karena kamu bisa explore interdisciplinary programs atau double major. Fleksibilitas kamu bakal jadi kekuatan di masa depan!";
        }
        document.getElementById(
          "hasilText"
        ).innerHTML = `<strong>${hasilText}</strong><br><br>${explanation}<br><br>Semangat ya! `;

        // Setup share functionality
        setupShareButtons(hasilText, explanation);
      }
    })
    .catch(() => {
      document.getElementById("hasilText").innerText =
        hasilText + "\n Gagal menyimpan data";
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
  document.getElementById("shareWA").onclick = function () {
    const text = `Halo! Aku baru aja ikutan quiz minat jurusan nih! 🎓\n\nHasilku: ${hasil} 🎯\n\nTernyata aku cocok banget di bidang ini! Kamu juga coba yuk, cuma 5 menit kok: ${window.location.href}`;

    // Try to open WhatsApp app first, fallback to web
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // Mobile: Try WhatsApp app first
      window.location.href = `whatsapp://send?text=${encodeURIComponent(text)}`;

      // Fallback to web WhatsApp after 2 seconds if app doesn't open
      setTimeout(() => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      }, 2000);
    } else {
      // Desktop: Open WhatsApp Web
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  // Instagram Share - Direct to Instagram
  document.getElementById("copyIG").onclick = function () {
    const text = `Quiz minat jurusan done! ✅\nHasilku: ${hasil} \n\nTernyata aku cocok banget di bidang ini! 🚀\nKamu juga coba yuk, link di bio!\n\n#QuizJurusan #KuliahDimana #GenZ #PilihJurusan #Mahasiswa`;

    // Copy to clipboard first
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const isMobile =
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );

        if (isMobile) {
          // Try to open Instagram app
          window.location.href = "instagram://camera";

          // Show instruction
          setTimeout(() => {
            alert(
              "Text sudah di-copy! Instagram akan terbuka, tinggal paste di Stories ya!"
            );
          }, 1000);
        } else {
          // Desktop: Open Instagram web and show instruction
          window.open("https://www.instagram.com/", "_blank");
          alert(
            "Text sudah di-copy! Instagram web akan terbuka, paste di Stories ya!"
          );
        }
      })
      .catch(() => {
        alert("Gagal copy text. Coba lagi ya!");
      });
  };

  // TikTok Share - Direct to TikTok
  document.getElementById("copyTikTok").onclick = function () {
    const text = `POV: Baru aja ikutan quiz minat jurusan 🎓\n\nHasilku: ${hasil} \n\nUnexpected banget tapi ternyata cocok! Kalian juga coba yuk 🚀\n\n#QuizJurusan #KuliahDimana #GenZ #PilihJurusan #CollegeLife #StudentLife #Viral`;

    // Copy to clipboard first
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const isMobile =
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );

        if (isMobile) {
          // Try to open TikTok app
          window.location.href = "tiktok://camera";

          // Show instruction
          setTimeout(() => {
            alert(
              "Caption sudah di-copy! TikTok akan terbuka, tinggal paste ya!"
            );
          }, 1000);
        } else {
          // Desktop: Open TikTok web and show instruction
          window.open("https://www.tiktok.com/upload", "_blank");
          alert(
            "Caption sudah di-copy! TikTok web akan terbuka, paste di caption ya!"
          );
        }
      })
      .catch(() => {
        alert("Gagal copy caption. Coba lagi ya!");
      });
  };
}

// ------------------- KIRIM KE SPREADSHEET ----------------------
function kirimKeSpreadsheet(data) {
  return new Promise((resolve, reject) => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwhxWEiTCGf77wQSYAukpiRGm0BMFNY-6sY-8tSOjszQXneaADJpORNppvpwDf1ZPk79A/exec";

    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      resolve('success');
    })
    .catch((error) => {
      reject(error);
    });
  });
}
