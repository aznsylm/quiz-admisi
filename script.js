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
let shuffledOptions = []; // Menyimpan urutan pilihan yang sudah diacak

const formSection = document.getElementById("form-section");
const quizSection = document.getElementById("quiz-section");
const hasilSection = document.getElementById("hasil-section");

const pTanya = document.getElementById("pertanyaan");
const pilihanDiv = document.getElementById("pilihan");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// ------------------- BACKGROUND MUSIC ----------------------
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let isMuted = false;

// Unmute and start music on first user interaction
function startMusic() {
  bgMusic.muted = false;
  bgMusic.volume = 0.3;
  bgMusic.play();
}

// Music toggle functionality
musicToggle.addEventListener("click", function () {
  if (isMuted) {
    bgMusic.muted = false;
    bgMusic.play();
    musicToggle.innerHTML = "🔊 Musik";
    musicToggle.classList.remove("muted");
    isMuted = false;
  } else {
    bgMusic.pause();
    musicToggle.innerHTML = "🔇 Musik";
    musicToggle.classList.add("muted");
    isMuted = true;
  }
});

// Auto-start music on first interaction
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

// ------------------- VALIDASI NOMOR HP ----------------------
document.getElementById('nohp').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, ''); // Hanya angka
  
  if (value.length >= 2) {
    value = '08' + value.substring(2); // Force 08 prefix
  }
  
  if (value.length > 15) {
    value = value.substring(0, 15); // Max 15 digit
  }
  
  e.target.value = value;
});

// Pastikan selalu dimulai dengan 08
document.getElementById('nohp').addEventListener('focus', function(e) {
  if (e.target.value === '') {
    e.target.value = '08';
  }
});

// ------------------- SCROLL DOWN BUTTON ----------------------
document.getElementById("scrollDownBtn").addEventListener("click", function () {
  // Check which section is currently visible and scroll to the appropriate target
  if (!formSection.classList.contains("hidden")) {
    // If form is visible, scroll to it
    document.getElementById("form-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (!quizSection.classList.contains("hidden")) {
    // If quiz is visible, scroll to it
    document.getElementById("quiz-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (!hasilSection.classList.contains("hidden")) {
    // If result is visible, scroll to it
    document.getElementById("hasil-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

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

  // Buat array dengan jawaban dan kategori
  const options = soal[nomor].a.map((answer, index) => ({
    text: answer,
    category: soal[nomor].k[index]
  }));

  // Acak urutan pilihan jika belum ada atau soal baru
  if (!shuffledOptions[nomor]) {
    shuffledOptions[nomor] = shuffleArray(options);
  }

  // Tampilkan pilihan yang sudah diacak
  shuffledOptions[nomor].forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "pilihan-btn";
    btn.innerText = option.text;
    btn.onclick = () => pilihJawaban(option.category, btn);
    pilihanDiv.appendChild(btn);
  });

  // Restore previous answer if exists
  if (jawaban[nomor]) {
    selectedAnswer = jawaban[nomor];
    const buttons = document.querySelectorAll(".pilihan-btn");
    buttons.forEach((btn) => {
      // Cari kategori dari button yang diklik
      const buttonText = btn.innerText;
      const matchedOption = shuffledOptions[nomor].find(opt => opt.text === buttonText);
      if (matchedOption && matchedOption.category === selectedAnswer) {
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

  // Cari kategori pertama yang >=40% (2 dari 5 jawaban)
  let topCategory = ['A', 'B', 'C', 'D'].find(cat => count[cat] >= 2) || 'A';

  const categoryNames = {
    A: "Ekonomi & Bisnis",
    B: "Ilmu Pendidikan",
    C: "Teknologi & Teknik",
    D: "Kedokteran & Kesehatan",
  };

  const categoryExplanations = {
    A: [
      "Nakama, kamu punya jiwa Nami banget! Kayak navigator Straw Hat yang jago ngatur keuangan crew, kamu juga punya bakat alami buat strategi bisnis dan analisis finansial. Kamu tipe yang bisa bikin 'treasure map' menuju kesuksesan ekonomi. Siap jadi 'Cat Burglar' di dunia bisnis?",
      "Wah, kamu mirip Doflamingo dalam hal bisnis nih! Punya kemampuan analitis yang tajam dan mindset strategis buat ngatur 'kingdom' finansial. Kamu cocok jadi 'Joker' di dunia ekonomi yang bisa manipulasi pasar dengan cerdas. Time to rule the business world!",
      "Kamu tuh kayak Crocodile yang punya ambisi besar! Selalu mikir jangka panjang dan punya rencana matang buat ngebangun 'Baroque Works' versi bisnis. Kemampuan analisis data dan strategi investasimu bakal bikin kamu jadi 'Warlord' di dunia finansial!",
      "Vibes kamu mirip Buggy yang jadi Emperor! Dari yang kecil-kecilan tapi punya jiwa entrepreneur sejati. Kamu punya bakat buat ngelihat peluang bisnis dan bikin 'Buggy Delivery' versi startup. Siap jadi Captain di lautan ekonomi digital?",
      "Kamu punya karakter Iceberg yang jadi mayor Water 7! Jago banget ngatur operasional dan manajemen keuangan. Kemampuan leadership dan business planning-mu bakal bikin kamu sukses jadi 'Galley-La Company' owner di dunia nyata!",
      "Nakama, kamu mirip Tom yang bikin kapal impian! Teliti, detail, dan selalu fokus pada kualitas hasil. Kamu cocok jadi 'shipwright' di dunia akuntansi yang bisa bikin 'financial ship' yang kuat dan tahan badai ekonomi!",
      "Kamu kayak Spandam yang jago strategi (tapi versi baik)! Selalu hitung untung-rugi sebelum bertindak dan punya kemampuan analisis risiko yang tajam. Perfect buat jadi 'CP9 agent' di dunia manajemen bisnis!",
      "Vibes kamu mirip Gild Tesoro yang menguasai dunia entertainment! Punya sense kuat di bidang investasi dan pasar modal. Kamu bisa jadi 'Golden Emperor' yang ngatur alokasi dana dengan bijak. Time to make it rain gold!",
      "Kamu punya jiwa Whitebeard dalam memimpin 'family business'! Fokus pada hasil dan kesejahteraan crew, plus punya kemampuan entrepreneurship yang kuat. Siap jadi 'Yonko' di dunia startup yang powerful dan berpengaruh!",
    ],
    B: [
      "Wah, kamu mirip Robin banget! Kayak archaeologist Straw Hat yang suka sharing knowledge tentang sejarah, kamu juga punya passion buat ngajarin dan ngembangin orang lain. Kamu bisa jadi 'Devil Child' yang nyebarin ilmu ke seluruh dunia. Ready to decode the mysteries of education?",
      "Kamu punya vibes Rayleigh yang jadi mentor Luffy! Sabar, wise, dan punya kemampuan komunikasi yang luar biasa. Kamu cocok jadi 'Dark King' di dunia pendidikan yang bisa guide generasi muda menuju impian mereka. Time to train the next Pirate King!",
      "Nakama, kamu kayak Coby yang selalu eager belajar dan ngajarin! Punya bakat buat menjelaskan hal kompleks dengan cara yang mudah dipahami. Kamu bisa jadi 'Marine Captain' di dunia edukasi yang inspiring dan motivating!",
      "Kamu mirip Shanks yang jadi role model! Punya charisma natural buat jadi pembimbing dan mentor. Kemampuan leadership dan empati-mu bakal bikin kamu jadi 'Yonko' di dunia pengembangan SDM. Lead your crew to success!",
      "Vibes kamu kayak Dr. Kureha yang wise dan knowledgeable! Punya passion buat sharing wisdom dan menciptakan metode pembelajaran yang efektif. Kamu bisa jadi 'Witch Doctor' di dunia edtech yang revolutionary!",
      "Kamu punya karakter Jinbe yang jadi bridge antar komunitas! Suka ngobrolin strategi sosial dan peduli sama dinamika kelompok. Perfect buat jadi 'Knight of the Sea' di bidang sosiologi pendidikan!",
      "Nakama, kamu mirip Sengoku yang jadi strategist handal! Fokus pada efektivitas training dan punya skill mentoring yang kuat. Kamu cocok jadi 'Fleet Admiral' di dunia coaching profesional!",
      "Kamu kayak Vegapunk yang genius dan innovative! Punya mindset futuristik buat menciptakan revolusi di dunia pendidikan. Siap jadi 'World's Greatest Scientist' di bidang teknologi pembelajaran?",
      "Vibes kamu mirip Brook yang bisa 'revive' semangat belajar orang! Punya passion di edukasi digital dan metode pembelajaran yang engaging. Time to be the 'Soul King' of modern education!",
    ],
    C: [
      "SUUUPER! Kamu punya vibe Franky yang kuat! Kayak shipwright genius yang bikin Thousand Sunny, kamu juga suka banget bikin dan merancang sesuatu dari nol. Kamu cocok jadi 'Cyborg' di dunia teknologi. Time to build your dream ship of innovation!",
      "Nakama, kamu mirip Vegapunk banget! Punya mindset scientist yang suka menciptakan teknologi revolusioner. Kemampuan logical thinking dan innovation-mu bakal bikin kamu jadi 'World's Greatest Scientist' di era digital transformation!",
      "Kamu kayak Usopp yang jadi 'God' of engineering! Suka membongkar sistem dan bikin gadget keren dari bahan sederhana. Otakmu itu perfect buat jadi 'Sniper King' di dunia coding dan algoritma!",
      "Vibes kamu mirip Caesar Clown dalam hal innovation (tapi versi baik)! Punya passion buat merancang dan menciptakan teknologi fisik yang amazing. Siap jadi 'Master of Science' di bidang robotika dan mekatronika?",
      "Kamu punya karakter Enel yang menguasai teknologi canggih! Jago banget merancang sistem digital dan punya vision futuristik. Perfect buat jadi 'God of Lightning' di dunia sistem informasi!",
      "Nakama, kamu kayak Judge yang bikin Germa 66 technology! Tertarik sama AI dan inovasi cutting-edge. Kemampuan analisis sistem-mu bakal bikin kamu jadi 'Vinsmoke' di tech industry!",
      "Kamu mirip Tom yang bikin Sea Train! Punya mindset engineer sejati yang suka design sistem transportation dan infrastructure. Time to build the 'Puffing Tom' of modern technology!",
      "Vibes kamu kayak Kizaru yang menguasai light technology! Jago banget sama logika matematika dan programming. Siap jadi 'Admiral' di dunia komputer yang bisa move at the speed of light?",
      "Kamu punya jiwa Smoker yang systematic dan terstruktur! Nyaman banget sama software development dan system architecture. Perfect buat jadi 'White Hunter' yang hunt bugs dan create efficient systems!",
    ],
    D: [
      "Kamu tuh Chopper banget, nakama! Kayak doctor Straw Hat yang selalu peduli sama kesehatan crew, kamu juga punya jiwa caring dan detail-oriented. Kamu bisa jadi 'Monster Point' di dunia medis. Siap jadi dokter yang bisa nyembuhin semua penyakit?",
      "Nakama, kamu mirip Law yang jadi 'Surgeon of Death'! Punya passion buat meneliti dan concern tinggi sama well-being manusia. Kemampuan analisis medis-mu bakal bikin kamu jadi dokter atau researcher yang handal. Time to perform the ultimate operation!",
      "Kamu kayak Crocus yang jadi ship doctor Roger! Suka mencari tahu penyebab penyakit secara ilmiah dan punya mindset researcher sejati. Perfect buat jadi 'Twin Cape Doctor' di dunia biomedis yang revolutionary!",
      "Vibes kamu mirip Ivankov yang peduli sama kesehatan komunitas! Concern banget sama pencegahan penyakit dan wellness orang banyak. Siap jadi 'Miracle Person' di bidang kesehatan masyarakat?",
      "Kamu punya karakter Hiluluk yang passionate sama medical innovation! Tertarik banget sama kimia dan biologi, plus punya vision buat bikin 'cherry blossom medicine' yang bisa heal everyone. Time to create miracle drugs!",
      "Nakama, kamu kayak Kureha yang jadi guardian of health! Peran utamamu selalu jaga kesejahteraan orang lain dengan skill empati yang tinggi. Perfect buat jadi 'Witch Doctor' yang caring dan professional!",
      "Kamu mirip Marco yang punya 'Phoenix' healing power! Concern banget sama kesehatan jangka panjang dan detail wellness. Siap jadi ahli gizi atau kesehatan lingkungan yang bisa regenerate community health?",
      "Vibes kamu kayak Vegapunk yang bikin medical technology! Punya vision buat menciptakan health-tech solution yang bisa help banyak orang. Time to be the 'World's Greatest Medical Scientist'!",
      "Kamu punya jiwa Zeff yang protective terhadap 'family'! Selalu concern sama detail kesehatan dan safety orang-orang terdekat. Perfect buat explore biologi atau forensik yang bisa protect and serve justice!",
    ],
  };

  let hasil = categoryNames[topCategory];
  let hasilText = `Minatmu adalah: ${hasil}`;

  // --- SIMPAN KE SPREADSHEET ---
  const dataKirim = {
    nama: document.getElementById("nama").value,
    asal: document.getElementById("asal").value,
    nohp: document.getElementById("nohp").value,
    A: count.A,
    B: count.B,
    C: count.C,
    D: count.D,
    hasil: hasil,
  };

  document.getElementById("hasilText").innerText = "Tunggu sebentar ya... ";

  kirimKeSpreadsheet(dataKirim)
    .then(() => {
      const randomIndex = Math.floor(
        Math.random() * categoryExplanations[topCategory].length
      );
      let explanation = categoryExplanations[topCategory][randomIndex];
      
      document.getElementById(
        "hasilText"
      ).innerHTML = `<h4>${hasilText}</h4><br>${explanation}<br><br>Semangat ya! `;

      // Setup share functionality
      setupShareButtons(hasilText, explanation);
    })
    .catch(() => {
      // Tetap tampilkan hasil meskipun ada error karena data sudah tersimpan
      const randomIndex = Math.floor(
        Math.random() * categoryExplanations[topCategory].length
      );
      let explanation = categoryExplanations[topCategory][randomIndex];
      
      document.getElementById(
        "hasilText"
      ).innerHTML = `<h4>${hasilText}</h4><br>${explanation}<br><br>Semangat ya! `;

      // Setup share functionality
      setupShareButtons(hasilText, explanation);
    });
}

// ------------------- UTILITY FUNCTIONS ----------------------
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Fungsi untuk mengacak array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ------------------- IMAGE LOADING OPTIMIZATION ----------------------
// Preload background image
const bgImage = new Image();
bgImage.src = 'assets/image/BG-WEB-QUIZ.png';
bgImage.onload = function() {
  document.body.style.backgroundImage = `url('${bgImage.src}')`;
};

document.addEventListener("DOMContentLoaded", function () {
  const karakterImage = document.querySelector(".karakter-image");

  if (karakterImage) {
    // Check if image is already loaded
    if (karakterImage.complete && karakterImage.naturalHeight !== 0) {
      // Image already loaded
      karakterImage.classList.remove("loading");
    } else {
      // Add loading class for skeleton effect
      karakterImage.classList.add("loading");

      // Remove skeleton when image loads
      karakterImage.addEventListener("load", function () {
        karakterImage.classList.remove("loading");
      });

      // Handle error case
      karakterImage.addEventListener("error", function () {
        karakterImage.classList.remove("loading");
      });

      // Fallback timeout to ensure skeleton is removed
      setTimeout(() => {
        karakterImage.classList.remove("loading");
      }, 3000);
    }
  }
});

// ------------------- KIRIM KE SPREADSHEET ----------------------
function kirimKeSpreadsheet(data) {
  return new Promise((resolve, reject) => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbygi2oo-W9721x48PhWYisOp0wPzzoRMGJrvlExptj7iNs8Bs73veU0y5sUs_WRcwMpqw/exec";

    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        resolve("success");
      })
      .catch((error) => {
        reject(error);
      });
  });
}
