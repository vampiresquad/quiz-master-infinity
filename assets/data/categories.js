/* ===============================
   CATEGORY DEFINITIONS
   Quiz Master ∞
================================
   Purpose:
   - Central category registry
   - Used by questions, adaptive engine,
     analytics, UI badges, story logic
================================ */

export const categories = {
  bangladesh: {
    id: "bangladesh",
    name: "বাংলাদেশ",
    icon: "🇧🇩",
    color: "#2ecc71",
    description: "বাংলাদেশের ইতিহাস, সংস্কৃতি ও জাতীয় বিষয়াবলি"
  },

  science: {
    id: "science",
    name: "বিজ্ঞান",
    icon: "🔬",
    color: "#3498db",
    description: "বিজ্ঞান, প্রকৃতি ও মানবদেহ সম্পর্কিত প্রশ্ন"
  },

  technology: {
    id: "technology",
    name: "প্রযুক্তি",
    icon: "💻",
    color: "#9b59b6",
    description: "কম্পিউটার, ইন্টারনেট ও আধুনিক প্রযুক্তি"
  },

  religion: {
    id: "religion",
    name: "ধর্ম",
    icon: "🕌",
    color: "#f1c40f",
    description: "ইসলাম ও ধর্মীয় সাধারণ জ্ঞান"
  },

  sports: {
    id: "sports",
    name: "খেলাধুলা",
    icon: "🏏",
    color: "#e67e22",
    description: "ক্রিকেট, ফুটবল ও অন্যান্য খেলাধুলা"
  },

  general: {
    id: "general",
    name: "সাধারণ জ্ঞান",
    icon: "🌍",
    color: "#95a5a6",
    description: "বিশ্ব, মানুষ ও বিবিধ সাধারণ জ্ঞান"
  }
};

/* ===============================
   Utility Helpers
================================ */

/* Get category safely */
export function getCategory(key) {
  return categories[key] || categories.general;
}

/* Get all category ids */
export function getCategoryKeys() {
  return Object.keys(categories);
}

/* Get all categories as array */
export function getAllCategories() {
  return Object.values(categories);
}
