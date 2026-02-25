export interface Ingredient {
  id: string;
  name: string;
  sanskritName?: string;
  description: string;
  benefits: string[];
  traditionalUse: string;
  image: string;
}

export const ingredients: Ingredient[] = [
  {
    id: "amla",
    name: "Amla (Indian Gooseberry)",
    sanskritName: "Amalaki",
    description:
      "Amla, also known as Indian Gooseberry, is one of the most important fruits in Ayurveda. It is considered a powerful Rasayana (rejuvenator) and is exceptionally rich in Vitamin C. Amla balances all three doshas — Vata, Pitta, and Kapha — making it a rare and versatile herb.",
    benefits: [
      "Extremely rich in natural Vitamin C and antioxidants",
      "Strengthens immunity and fights infections",
      "Promotes healthy hair growth and prevents greying",
      "Improves digestion and metabolism",
      "Supports eye health and vision",
      "Nourishes skin for a natural glow",
    ],
    traditionalUse:
      "Used for over 3,000 years in Ayurveda as a key ingredient in Chyawanprash and Triphala. Ancient texts describe it as the best among rejuvenating herbs.",
    image: "🫒",
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    sanskritName: "Withania Somnifera",
    description:
      "Ashwagandha is one of the most powerful adaptogenic herbs in Ayurveda. Known as 'Indian Ginseng', it helps the body manage stress, boosts energy, and improves concentration. It is classified as a Rasayana and is revered for its restorative and rejuvenating properties.",
    benefits: [
      "Reduces stress and anxiety naturally",
      "Boosts energy and stamina",
      "Supports muscle strength and recovery",
      "Improves sleep quality",
      "Enhances memory and cognitive function",
      "Supports reproductive health",
    ],
    traditionalUse:
      "Mentioned in the Charaka Samhita as a premier strength-promoting herb. Traditionally used to nourish the body, calm the mind, and promote longevity.",
    image: "🌿",
  },
  {
    id: "shatavari",
    name: "Shatavari",
    sanskritName: "Asparagus Racemosus",
    description:
      "Shatavari, meaning 'she who possesses a hundred husbands', is a premier women's health tonic in Ayurveda. It is a cooling, nourishing herb that supports hormonal balance, digestive health, and overall vitality for both men and women.",
    benefits: [
      "Supports women's reproductive health",
      "Balances hormones naturally",
      "Improves digestive health",
      "Boosts immunity",
      "Acts as a natural anti-inflammatory",
      "Nourishes and hydrates tissues",
    ],
    traditionalUse:
      "Described in ancient Ayurvedic texts as the queen of herbs for women. Used extensively in formulations for vitality and nourishment.",
    image: "🌱",
  },
  {
    id: "pippali",
    name: "Pippali",
    sanskritName: "Piper Longum",
    description:
      "Pippali, or Long Pepper, is a potent Ayurvedic spice known for its bioavailability-enhancing properties. It improves digestion, enhances nutrient absorption, and supports respiratory health. It is a key ingredient in the classical Trikatu formulation.",
    benefits: [
      "Enhances bioavailability of nutrients",
      "Supports respiratory health",
      "Improves digestion and appetite",
      "Boosts metabolism",
      "Acts as a natural detoxifier",
      "Supports liver function",
    ],
    traditionalUse:
      "Used in Ayurveda for thousands of years in digestive and respiratory formulations. A key component of Trikatu and many classical preparations.",
    image: "🌶️",
  },
  {
    id: "giloy",
    name: "Giloy",
    sanskritName: "Tinospora Cordifolia",
    description:
      "Giloy, known as 'Amrita' or the root of immortality, is a powerful immunomodulatory herb. It strengthens the immune system, purifies blood, and helps the body fight various infections. It is one of the three Amrit plants in Ayurveda.",
    benefits: [
      "Powerful immunity booster",
      "Purifies blood and removes toxins",
      "Manages chronic fever",
      "Improves digestion",
      "Reduces stress and anxiety",
      "Supports joint health",
    ],
    traditionalUse:
      "Called 'Amrita' (nectar of immortality) in ancient texts. Extensively used in fever management and immune support formulations.",
    image: "🍃",
  },
  {
    id: "brahmi",
    name: "Brahmi",
    sanskritName: "Bacopa Monnieri",
    description:
      "Brahmi is the foremost brain tonic in Ayurveda, named after Brahma, the creator god. It enhances memory, concentration, and cognitive function. It is a cooling herb that calms the mind and supports the nervous system.",
    benefits: [
      "Enhances memory and learning ability",
      "Improves concentration and focus",
      "Calms the mind and reduces anxiety",
      "Supports nervous system health",
      "Promotes healthy sleep",
      "Acts as a natural antioxidant for the brain",
    ],
    traditionalUse:
      "Vedic scholars used Brahmi to memorize lengthy sacred texts. It is a key Medhya Rasayana (brain rejuvenator) in classical Ayurveda.",
    image: "🧠",
  },
  {
    id: "neem",
    name: "Neem",
    sanskritName: "Azadirachta Indica",
    description:
      "Neem is called 'Sarva Roga Nivarini' — the curer of all ailments. Every part of the neem tree has medicinal value. It is renowned for its antibacterial, antifungal, and blood-purifying properties in Ayurveda.",
    benefits: [
      "Powerful antibacterial and antifungal",
      "Purifies blood and detoxifies",
      "Supports healthy, clear skin",
      "Promotes oral and dental health",
      "Boosts immunity",
      "Supports liver health",
    ],
    traditionalUse:
      "Revered as a divine tree in Indian tradition. Used for centuries in skin care, dental hygiene, and as a natural pesticide.",
    image: "🌳",
  },
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    sanskritName: "Ocimum Sanctum",
    description:
      "Tulsi, or Holy Basil, is revered as 'The Queen of Herbs' and is considered sacred in Indian culture. It is a powerful adaptogen that helps the body cope with stress, supports respiratory health, and has strong antimicrobial properties.",
    benefits: [
      "Powerful adaptogen for stress relief",
      "Supports respiratory health",
      "Strong antimicrobial properties",
      "Boosts immunity naturally",
      "Purifies blood",
      "Supports cardiovascular health",
    ],
    traditionalUse:
      "Worshipped in Indian households for thousands of years. Used in daily rituals and as a first-line remedy for colds, coughs, and fevers.",
    image: "🪴",
  },
  {
    id: "shikakai",
    name: "Shikakai",
    sanskritName: "Acacia Concinna",
    description:
      "Shikakai, meaning 'fruit for hair', is a traditional Ayurvedic hair cleanser. Rich in natural saponins, it gently cleanses the scalp without stripping natural oils, promoting strong, lustrous hair.",
    benefits: [
      "Natural hair cleanser with mild saponins",
      "Strengthens hair roots",
      "Prevents dandruff and scalp infections",
      "Promotes hair growth",
      "Adds natural shine to hair",
      "Detangles hair naturally",
    ],
    traditionalUse:
      "Used for centuries as a natural shampoo in India. Women traditionally prepared Shikakai paste for hair washing rituals.",
    image: "💇",
  },
  {
    id: "reetha",
    name: "Reetha",
    sanskritName: "Sapindus Mukorossi",
    description:
      "Reetha, or Soapnut, is a natural cleanser rich in saponins. It produces a gentle lather that cleanses hair and skin without chemicals. It is eco-friendly and has been used in Ayurveda for both cosmetic and medicinal purposes.",
    benefits: [
      "100% natural and chemical-free cleanser",
      "Rich in natural saponins",
      "Gentle on sensitive skin and scalp",
      "Adds volume and shine to hair",
      "Eco-friendly and biodegradable",
      "Anti-inflammatory properties",
    ],
    traditionalUse:
      "Used as a natural soap and shampoo for centuries across South Asia. Also used in traditional laundry and cleaning.",
    image: "🧴",
  },
  {
    id: "bhringraj",
    name: "Bhringraj",
    sanskritName: "Eclipta Alba",
    description:
      "Bhringraj, known as the 'King of Hair', is the most celebrated herb for hair health in Ayurveda. It promotes hair growth, prevents premature greying, and nourishes the scalp deeply.",
    benefits: [
      "Promotes strong hair growth",
      "Prevents premature greying",
      "Nourishes scalp and hair follicles",
      "Reduces hair fall",
      "Supports liver health",
      "Calms the mind and promotes sleep",
    ],
    traditionalUse:
      "Called 'Kesharaja' (King of Hair) in Ayurveda. Used in hair oils and formulations for centuries to maintain thick, dark, healthy hair.",
    image: "👑",
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    sanskritName: "Kumari",
    description:
      "Aloe Vera, known as Kumari in Ayurveda, is a succulent plant prized for its soothing, hydrating, and healing properties. Its gel is rich in vitamins, minerals, and amino acids that nourish the skin and support digestive health.",
    benefits: [
      "Deeply moisturizes and hydrates skin",
      "Soothes burns and skin irritation",
      "Supports digestive health",
      "Rich in vitamins and minerals",
      "Promotes wound healing",
      "Anti-aging properties",
    ],
    traditionalUse:
      "Known as the 'plant of immortality' in ancient cultures. Used in Ayurveda for skin care, digestive support, and as a cooling agent.",
    image: "🪷",
  },
  {
    id: "palash",
    name: "Palash (Kesuda) Flower",
    sanskritName: "Butea Monosperma",
    description:
      "Palash, also known as the Flame of the Forest, produces vibrant orange-red flowers used in traditional Ayurvedic medicine. The flowers have natural antiseptic, anti-inflammatory, and skin-purifying properties.",
    benefits: [
      "Natural antiseptic properties",
      "Purifies and brightens skin",
      "Anti-inflammatory benefits",
      "Supports wound healing",
      "Natural dye with skin benefits",
      "Balances skin pH",
    ],
    traditionalUse:
      "Sacred in Hindu tradition and used during Holi festival. Ayurveda uses its flowers, bark, and seeds for skin conditions and purification rituals.",
    image: "🌺",
  },
];

// Helper to find ingredient by name (fuzzy match)
export function findIngredientByName(name: string): Ingredient | undefined {
  const lower = name.toLowerCase();
  return ingredients.find(
    (ing) =>
      lower.includes(ing.id) ||
      ing.name.toLowerCase().includes(lower) ||
      lower.includes(ing.name.split(" ")[0].toLowerCase())
  );
}
