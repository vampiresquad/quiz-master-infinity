/* ===============================
   QUESTION DATABASE
   Quiz Master ∞
================================
   Total Questions: 50
   Difficulty: easy | medium | hard
================================ */

export const questions = [
  /* ===== Bangladesh ===== */
  {
    id: 1,
    category: "bangladesh",
    difficulty: "easy",
    q: "বাংলাদেশের জাতীয় দিবস কোনটি?",
    o: ["২১শে ফেব্রুয়ারি", "২৬শে মার্চ", "১৬ই ডিসেম্বর", "১৪ই এপ্রিল"],
    a: 1
  },
  {
    id: 2,
    category: "bangladesh",
    difficulty: "easy",
    q: "বাংলাদেশের জাতীয় ফুল কোনটি?",
    o: ["শাপলা", "গোলাপ", "শিউলি", "পদ্ম"],
    a: 0
  },
  {
    id: 3,
    category: "bangladesh",
    difficulty: "medium",
    q: "বাংলাদেশের প্রথম প্রধানমন্ত্রী কে ছিলেন?",
    o: ["বঙ্গবন্ধু শেখ মুজিবুর রহমান", "তাজউদ্দীন আহমদ", "সৈয়দ নজরুল ইসলাম", "জিয়াউর রহমান"],
    a: 1
  },
  {
    id: 4,
    category: "bangladesh",
    difficulty: "hard",
    q: "বাংলাদেশের দীর্ঘতম নদী কোনটি?",
    o: ["পদ্মা", "মেঘনা", "যমুনা", "সুরমা"],
    a: 1
  },

  /* ===== Science ===== */
  {
    id: 5,
    category: "science",
    difficulty: "easy",
    q: "পানির রাসায়নিক সংকেত কী?",
    o: ["CO2", "H2O", "O2", "NaCl"],
    a: 1
  },
  {
    id: 6,
    category: "science",
    difficulty: "easy",
    q: "সূর্য কোন ধরনের জ্যোতিষ্ক?",
    o: ["গ্রহ", "নক্ষত্র", "উপগ্রহ", "ধূমকেতু"],
    a: 1
  },
  {
    id: 7,
    category: "science",
    difficulty: "medium",
    q: "মানুষের শরীরে হাড়ের সংখ্যা কত?",
    o: ["২০৬", "২০৮", "৩০৬", "১০০"],
    a: 0
  },
  {
    id: 8,
    category: "science",
    difficulty: "hard",
    q: "সবচেয়ে হালকা গ্যাস কোনটি?",
    o: ["অক্সিজেন", "হিলিয়াম", "হাইড্রোজেন", "নাইট্রোজেন"],
    a: 2
  },

  /* ===== Technology ===== */
  {
    id: 9,
    category: "technology",
    difficulty: "easy",
    q: "কম্পিউটারের মস্তিষ্ক বলা হয় কোনটিকে?",
    o: ["RAM", "CPU", "হার্ডডিস্ক", "মনিটর"],
    a: 1
  },
  {
    id: 10,
    category: "technology",
    difficulty: "easy",
    q: "ChatGPT এর নির্মাতা প্রতিষ্ঠান কোনটি?",
    o: ["Google", "Microsoft", "OpenAI", "Meta"],
    a: 2
  },
  {
    id: 11,
    category: "technology",
    difficulty: "medium",
    q: "ইন্টারনেটের জনক হিসেবে কাকে বলা হয়?",
    o: ["টিম বার্নার্স-লি", "ভিন্ট সার্ফ", "বিল গেটস", "স্টিভ জবস"],
    a: 1
  },
  {
    id: 12,
    category: "technology",
    difficulty: "hard",
    q: "HTML এর পূর্ণরূপ কী?",
    o: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Logic",
      "Home Tool Markup Language"
    ],
    a: 0
  },

  /* ===== Religion ===== */
  {
    id: 13,
    category: "religion",
    difficulty: "easy",
    q: "ইসলামের প্রথম খলিফা কে ছিলেন?",
    o: [
      "হযরত উমর (রা.)",
      "হযরত আলী (রা.)",
      "হযরত আবু বকর (রা.)",
      "হযরত উসমান (রা.)"
    ],
    a: 2
  },
  {
    id: 14,
    category: "religion",
    difficulty: "easy",
    q: "পবিত্র কুরআনে মোট কয়টি সূরা আছে?",
    o: ["১১০", "১১৪", "১২০", "১১৩"],
    a: 1
  },
  {
    id: 15,
    category: "religion",
    difficulty: "medium",
    q: "ঈদুল ফিতর কোন মাসে পালিত হয়?",
    o: ["রমজান", "শাওয়াল", "জিলহজ্জ", "মুহাররম"],
    a: 1
  },
  {
    id: 16,
    category: "religion",
    difficulty: "hard",
    q: "কুরআনের প্রথম নাযিল হওয়া সূরা কোনটি?",
    o: ["সূরা ফাতিহা", "সূরা আলাক", "সূরা বাকারা", "সূরা ইখলাস"],
    a: 1
  },

  /* ===== Sports ===== */
  {
    id: 17,
    category: "sports",
    difficulty: "easy",
    q: "ফুটবল খেলায় প্রতি দলে কয়জন খেলোয়াড় থাকে?",
    o: ["১০", "১১", "১২", "৯"],
    a: 1
  },
  {
    id: 18,
    category: "sports",
    difficulty: "easy",
    q: "ক্রিকেটে এক ওভারে কয়টি বল থাকে?",
    o: ["৪", "৫", "৬", "৮"],
    a: 2
  },
  {
    id: 19,
    category: "sports",
    difficulty: "medium",
    q: "মেসি কোন দেশের খেলোয়াড়?",
    o: ["ব্রাজিল", "আর্জেন্টিনা", "পর্তুগাল", "ফ্রান্স"],
    a: 1
  },
  {
    id: 20,
    category: "sports",
    difficulty: "hard",
    q: "ফিফা বিশ্বকাপ প্রথম অনুষ্ঠিত হয় কোন সালে?",
    o: ["১৯২৬", "১৯৩০", "১৯৩৪", "১৯৪২"],
    a: 1
  },

  /* ===== General Knowledge ===== */
  {
    id: 21,
    category: "general",
    difficulty: "easy",
    q: "পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ কোনটি?",
    o: ["মঙ্গল", "চাঁদ", "সূর্য", "শনি"],
    a: 1
  },
  {
    id: 22,
    category: "general",
    difficulty: "easy",
    q: "বিশ্বের সবচেয়ে বড় মহাসাগর কোনটি?",
    o: ["আটলান্টিক", "ভারত", "প্রশান্ত", "আর্কটিক"],
    a: 2
  },
  {
    id: 23,
    category: "general",
    difficulty: "medium",
    q: "বিশ্বের সবচেয়ে ছোট দেশ কোনটি?",
    o: ["মালদ্বীপ", "ভ্যাটিকান সিটি", "নেপাল", "সিঙ্গাপুর"],
    a: 1
  },
  {
    id: 24,
    category: "general",
    difficulty: "hard",
    q: "মানবদেহের সবচেয়ে বড় অঙ্গ কোনটি?",
    o: ["যকৃত", "ফুসফুস", "চামড়া", "হৃদপিণ্ড"],
    a: 2
  },

  /* ===== Mixed Expansion ===== */
  {
    id: 25,
    category: "science",
    difficulty: "medium",
    q: "আলোর গতি প্রায় কত?",
    o: ["৩ লক্ষ কিমি/সেকেন্ড", "১ লক্ষ", "৫ লক্ষ", "১০ লক্ষ"],
    a: 0
  },
  {
    id: 26,
    category: "technology",
    difficulty: "medium",
    q: "অপারেটিং সিস্টেমের কাজ কী?",
    o: [
      "হার্ডওয়্যার চালানো",
      "ইন্টারনেট দেওয়া",
      "গেম খেলা",
      "ডাটা বিক্রি"
    ],
    a: 0
  },
  {
    id: 27,
    category: "bangladesh",
    difficulty: "medium",
    q: "বাংলাদেশের জাতীয় খেলা কোনটি?",
    o: ["ফুটবল", "ক্রিকেট", "কাবাডি", "হকি"],
    a: 2
  },
  {
    id: 28,
    category: "general",
    difficulty: "medium",
    q: "পৃথিবীর ফুসফুস বলা হয় কোন বনকে?",
    o: ["সুন্দরবন", "আমাজন", "সাহারা", "হিমালয়"],
    a: 1
  },
  {
    id: 29,
    category: "science",
    difficulty: "hard",
    q: "DNA এর পূর্ণরূপ কী?",
    o: [
      "Deoxyribonucleic Acid",
      "Dynamic Network Array",
      "Digital Numeric Axis",
      "None of these"
    ],
    a: 0
  },
  {
    id: 30,
    category: "technology",
    difficulty: "hard",
    q: "JavaScript মূলত কী?",
    o: ["Markup Language", "Programming Language", "Database", "OS"],
    a: 1
  },

  /* ===== Final Set ===== */
  {
    id: 31,
    category: "religion",
    difficulty: "medium",
    q: "হজ কোন মাসে পালন করা হয়?",
    o: ["রমজান", "শাওয়াল", "জিলহজ্জ", "মুহাররম"],
    a: 2
  },
  {
    id: 32,
    category: "sports",
    difficulty: "medium",
    q: "অলিম্পিক গেমস কত বছর পরপর হয়?",
    o: ["২", "৩", "৪", "৫"],
    a: 2
  },
  {
    id: 33,
    category: "general",
    difficulty: "hard",
    q: "বিশ্বের সবচেয়ে উঁচু পর্বত কোনটি?",
    o: ["এভারেস্ট", "কে-টু", "কাঞ্চনজঙ্ঘা", "আল্পস"],
    a: 0
  },
  {
    id: 34,
    category: "bangladesh",
    difficulty: "hard",
    q: "শহীদ বুদ্ধিজীবী দিবস কবে?",
    o: ["২১ ফেব্রুয়ারি", "১৪ ডিসেম্বর", "১৬ ডিসেম্বর", "২৬ মার্চ"],
    a: 1
  },
  {
    id: 35,
    category: "science",
    difficulty: "easy",
    q: "মানুষ কোন গ্যাস শ্বাস নেয়?",
    o: ["কার্বন ডাই অক্সাইড", "অক্সিজেন", "নাইট্রোজেন", "হাইড্রোজেন"],
    a: 1
  },
  {
    id: 36,
    category: "technology",
    difficulty: "easy",
    q: "মোবাইল ফোন প্রথম কোন কাজে ব্যবহৃত হয়?",
    o: ["গেম", "কল", "ইন্টারনেট", "ক্যামেরা"],
    a: 1
  },
  {
    id: 37,
    category: "religion",
    difficulty: "hard",
    q: "ইসলামের পঞ্চম স্তম্ভ কোনটি?",
    o: ["নামাজ", "রোজা", "যাকাত", "হজ"],
    a: 3
  },
  {
    id: 38,
    category: "sports",
    difficulty: "hard",
    q: "ক্রিকেটে হ্যাটট্রিক বলতে কী বোঝায়?",
    o: [
      "৩টি ছক্কা",
      "৩টি চার",
      "৩ বলে ৩ উইকেট",
      "৩ ওভার"
    ],
    a: 2
  },
  {
    id: 39,
    category: "general",
    difficulty: "easy",
    q: "পৃথিবীর সবচেয়ে কাছের নক্ষত্র কোনটি?",
    o: ["সিরিয়াস", "সূর্য", "আলফা সেন্টরি", "ভেগা"],
    a: 1
  },
  {
    id: 40,
    category: "bangladesh",
    difficulty: "easy",
    q: "বাংলাদেশের রাজধানী কোথায়?",
    o: ["চট্টগ্রাম", "খুলনা", "ঢাকা", "রাজশাহী"],
    a: 2
  },

  /* ===== Extra ===== */
  {
    id: 41,
    category: "science",
    difficulty: "medium",
    q: "উদ্ভিদের খাদ্য তৈরির প্রক্রিয়াকে কী বলে?",
    o: ["শ্বাসক্রিয়া", "প্রকাশন", "সালোকসংশ্লেষ", "বাষ্পীভবন"],
    a: 2
  },
  {
    id: 42,
    category: "technology",
    difficulty: "medium",
    q: "AI এর পূর্ণরূপ কী?",
    o: [
      "Automated Intelligence",
      "Artificial Intelligence",
      "Advanced Internet",
      "Applied Interface"
    ],
    a: 1
  },
  {
    id: 43,
    category: "sports",
    difficulty: "easy",
    q: "ব্যাডমিন্টনে কয়টি খেলোয়াড় থাকে?",
    o: ["১ বা ২", "৫", "১১", "৯"],
    a: 0
  },
  {
    id: 44,
    category: "religion",
    difficulty: "easy",
    q: "ইসলামের প্রথম স্তম্ভ কোনটি?",
    o: ["নামাজ", "কালিমা", "রোজা", "যাকাত"],
    a: 1
  },
  {
    id: 45,
    category: "general",
    difficulty: "medium",
    q: "পৃথিবীর সবচেয়ে বড় মরুভূমি কোনটি?",
    o: ["সাহারা", "গোবি", "আরব", "অ্যান্টার্কটিকা"],
    a: 3
  },
  {
    id: 46,
    category: "bangladesh",
    difficulty: "medium",
    q: "বাংলাদেশের জাতীয় সংগীতের রচয়িতা কে?",
    o: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীমউদ্দীন", "সুকান্ত"],
    a: 1
  },
  {
    id: 47,
    category: "science",
    difficulty: "hard",
    q: "পৃথিবীর অভিকর্ষ বল আবিষ্কার করেন কে?",
    o: ["আইনস্টাইন", "নিউটন", "গ্যালিলিও", "ডারউইন"],
    a: 1
  },
  {
    id: 48,
    category: "technology",
    difficulty: "hard",
    q: "Blockchain মূলত কী?",
    o: ["ডাটাবেস", "নেটওয়ার্ক", "ক্রিপ্টোকারেন্সি", "সার্ভার"],
    a: 0
  },
  {
    id: 49,
    category: "sports",
    difficulty: "medium",
    q: "ক্রিকেট বিশ্বকাপে প্রথম চ্যাম্পিয়ন কে?",
    o: ["অস্ট্রেলিয়া", "ইংল্যান্ড", "ওয়েস্ট ইন্ডিজ", "ভারত"],
    a: 2
  },
  {
    id: 50,
    category: "general",
    difficulty: "hard",
    q: "মানুষের শরীরে সবচেয়ে ছোট হাড় কোনটি?",
    o: ["স্টেপিস", "ফিমার", "রিব", "ক্ল্যাভিকল"],
    a: 0
  }
];
