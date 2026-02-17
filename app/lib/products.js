// Complete plant lists from the image
const plantLists = {
  outdoor: {
    flowering: [
      "Jadhi Malli",
      "Parijadham", 
      "Nandhiyavatta",
      "Kakkata",
      "Gundu Malli",
      "Aduku Malli",
      "Nithya Malli",
      "Kupiya",
      "Hibiscus",
      "Ikora",
      "Jatropha",
      "Rose"
    ],
    medicinal: [
      "Karpooravalli",
      "Thulasi",
      "Lemon Grass",
      "Betel",
      "Marudhani",
      "Thiruneetru Pachilai"
    ],
    fruit: [
      "Amla",
      "Pomegranate",
      "Guava",
      "Gooseberry",
      "Ooty Apple",
      "Custard Apple"
    ],
    others: [
      "Gold Dust Crotons",
      "Patani Crotons", 
      "Lilly Put Crotons",
      "Indina Lilly",
      "Money Plant",
      "Golden Pothos",
      "Colourful Codiacum",
    ]
  },
  indoor: {
    succulent: [
      "Echeveria Mclaco",      
      "Perle Von Nurnberg",   
      "Lakshmi Kamal",        
      "Echeveria Elegans",
      "Echeveria Allegra",
      "Haworthia Retusa",
      "Jade Plant",
      "Echeveria Lilacina",    
      "Haworthia Coopcrri",    
      "Crassula Jade",         
      "Echeveria Minima",
      "Haworthia Cymbiformis",
      "Elephant Bush Jade",
      "Echeveria Apus",        
      "Haworthia Cooperi",   
      "Gollum Jade",           
      "Echeveria Lola",
      "Haworthia Reinwardtii",
      "Moonstone",
      "Haworthia Fasciata",
      "Fechveria Allcgra",     
      "Haworthia Limifolia",
      "Baby Sunrose"
    ]
  },
  seeds: {
    spinach: [
      "Arai Keerai Seed",
      "Palak Keerai Seed",
      "Siru Keerai Seed",
      "Pulicha Keerai Seed",
      "Mulai Keerai Seed"
    ],
    vegetable: [
      "Coriander Seed",
      "Fenugreek Seed",
      "Broad Beans Seed",
      "Lady Finger Seed",
      "Radish Seed",
      "Karamani Seed"
    ]
  }
};

function getAllPlantsForCategory(category) {
  switch(category) {
    case 'outdoor':
      return [
        ...plantLists.outdoor.flowering,
        ...plantLists.outdoor.medicinal,
        ...plantLists.outdoor.fruit,
        ...plantLists.outdoor.others
      ];
      
    case 'indoor':
      return [
        ...plantLists.indoor.succulent
      ];
      
    case 'seeds':
      return [
        ...plantLists.seeds.spinach,
        ...plantLists.seeds.vegetable
      ];
      
    default:
      return [];
  }
}

// Products in EXACT order as they appear in the PDF catalog
const originalProducts = [
  {
    id: 1,
    name: "Hexagone Hamper",
    price: 55,
    originalPrice: null,
    image: "/assets/images/products/outdoor-hexogon.webp",
    category: "outdoor",
    slug: "hexagon-hamper",
    rating: 5,
    description: "This budget-friendly hamper is thoughtfully designed with a hexagon wrap featuring an inner lamination to protect the plant's roots and prevent mud and water from spilling. Customers can choose to customize it with or without a pot, depending on their preference.",
    minOrderQty: 25,
    customization: ["With Pot (₹20 extra)", "Without Pot (No Extra Cost)"],
    plantTypes: ["Flower Plants", "Saplings", "Herbal Plants", "Money Plants", "Growtens"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 2,
    name: "Plant with paper bag",
    price: 45,
    originalPrice: 50,
    image: "/assets/images/products/outdoor-bag.webp",
    category: "outdoor",
    slug: "plant-with-paper-bag",
    rating: 5,
    description: "This budget-friendly hamper is thoughtfully designed with an inside-laminated paper bag, ensuring that guests can carry the plant without any spillage or mess. You can also personalize the hamper with a custom wish note, adding a special and thoughtful touch to make the gift even more meaningful.",
    minOrderQty: 25,
    customization: ["With Pot (₹20 extra)", "Without Pot (No Extra Cost)"],
    plantTypes: ["Flower Plants", "Saplings", "Herbal Plants", "Money Plants", "Growtens"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 3,
    name: "Flower Pot Hamper",
    price: 79,
    originalPrice: null,
    image: "/assets/images/products/outdoor-flower.jpg",
    category: "outdoor",
    slug: "flower-pot-hamper",
    rating: 5,
    description: "This hamper is specially designed to make carrying plants easier and more convenient. It offers a cost-effective packaging solution, ideal for outdoor plants in 4\" pots",
    minOrderQty: 25,
    customization: ["Light Color Hamper", "Dark Color Hamper"],
    plantTypes: ["Flower Plants", "Saplings", "Herbal Plants", "Money Plants", "Growtens"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 4,
    name: "Succulent Hamper",
    price: 129,
    originalPrice: null,
    image: "/assets/images/products/indoor-succ-hamp.webp",
    category: "indoor",
    slug: "succulent-hamper-gift",
    rating: 5,
    description: "This premium hamper is thoughtfully designed for indoor and table plants, making it convenient and easy to carry. It also comes with a personalized wish note to make your gift even more special.",
    minOrderQty: 25,
    customization: ["With Bow (₹5 extra)", "Without Bow (No Extra Cost)"],
    plantTypes: ["Succulents", "Cactus", "Semi-Shade Indoor Plant", "Oxigen Plants"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 5,
    name: "Jute Wrap Hamper",
    price: 159,
    originalPrice: null,
    image: "/assets/images/products/indoor-jute.webp",
    category: "indoor",
    slug: "jute-wrap-hamper",
    rating: 5,
    description: "This hamper is elegantly wrapped in laminated jute and features succulents in a ceramic-finished plastic pot. It comes with a personalized thank-you card, which can be pinned for a thoughtful touch.",
    minOrderQty: 25,
    customization: ["Pinned", "Stick Mount"],
    plantTypes: ["Succulents", "Cactus", "Semi-Shade Indoor Plant", "Oxigen Plants"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 6,
    name: "Sinamay Bag Hamper",
    price: 299,
    originalPrice: 500,
    image: "/assets/images/products/indoor-sinamay.webp",
    category: "indoor",
    slug: "sinamay-bag-hamper",
    rating: 5,
    description: "This exclusive hamper is crafted using fully eco-friendly materials. It features a sinamay bag imported from the Netherlands and handmade terracotta pots from Thanjavur.",
    minOrderQty: 10,
    customization: ["Teracotta (No Extra Cost)", "Ceramic (₹15 extra)"],
    plantTypes: ["Succulents", "Cactus", "Semi-Shade Indoor Plant", "Oxigen Plants"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 7,
    name: "Abaca Bag Hamper",
    price: 279,
    originalPrice: 450,
    image: "/assets/images/products/indoor-abaca.webp",
    category: "indoor",
    slug: "abaca-bag-hamper",
    rating: 5,
    description: "This exclusive hamper is crafted using fully eco-friendly materials. It features a Abaca Natural fiber bag imported from the Netherlands and handmade terracotta pots from Thanjavur.",
    minOrderQty: 10,
    customization: ["Teracotta (No Extra Cost)", "Ceramic (₹15 extra)"],
    plantTypes: ["Succulents", "Cactus", "Semi-Shade Indoor Plant", "Oxigen Plants"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 8,
    name: "Hand Drawn Terracotta",
    price: 399,
    originalPrice: null,
    image: "/assets/images/products/indoor-terracotta.webp",
    category: "indoor",
    slug: "hand-drawn-terracotta",
    rating: 5,
    description: "Beautifully crafted with fully hand-drawn artwork on handmade terracotta pots, this hamper features vibrant indoor plants, combining artistry and nature in a perfect gift.",
    minOrderQty: 10,
    customization: [],
    plantTypes: ["Succulents", "Cactus", "Semi-Shade Indoor Plant", "Oxigen Plants"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 9,
    name: "Seed Pen/Pencil",
    price: 30,
    originalPrice: null,
    image: "/assets/images/products/seed-pencil.webp",
    category: "seeds",
    slug: "seed-pen-pencil",
    rating: 5,
    description: "Affordable seed-based return gifts under ₹50, thoughtfully curated to promote sustainability. These eco-friendly gifts are perfect for spreading the joy of greenery at any event.",
    minOrderQty: 10,
    customization: [],
    plantTypes: ["Spinach Seeds", "Vegetable Seeds"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 10,
    name: "Seed Balls",
    price: 35,
    originalPrice: 55,
    image: "/assets/images/products/seed-balls.webp",
    category: "seeds",
    slug: "seed-balls",
    rating: 5,
    description: "Affordable seed-based return gifts under ₹50, thoughtfully curated to promote sustainability. These eco-friendly gifts are perfect for spreading the joy of greenery at any event.",
    minOrderQty: 10,
    customization: [],
    plantTypes: ["Spinach Seeds", "Vegetable Seeds"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 11,
    name: "Seed Bottle",
    price: 40,
    originalPrice: null,
    image: "/assets/images/products/seed-bottle.webp",
    category: "seeds",
    slug: "seed-bottle",
    rating: 5,
    description: "Affordable seed-based return gifts under ₹50, thoughtfully curated to promote sustainability. These eco-friendly gifts are perfect for spreading the joy of greenery at any event.",
    minOrderQty: 10,
    customization: [],
    plantTypes: ["Spinach Seeds", "Vegetable Seeds"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
  {
    id: 12,
    name: "Jute Square",
    price: 45,
    originalPrice: null,
    image: "/assets/images/products/indoor-sqr-jute.webp",
    category: "indoor",
    slug: "seed-bottle-card",
    rating: 5,
    description: "Affordable seed-based return gifts under ₹50, thoughtfully curated to promote sustainability. These eco-friendly gifts are perfect for spreading the joy of greenery at any event.",
    minOrderQty: 10,
    customization: [],
    plantTypes: ["Spinach Seeds", "Vegetable Seeds"],
    applicablePlants: [],
    specialApplicablePlants: [
      { name: "Areca Palm", extraCost: 15 },
    ],
  },
];

// Function to update products with applicable plants from the plant lists
function updateProductsWithApplicablePlants(products) {
  return products.map(product => {
    // Create a copy of the product
    const updatedProduct = { ...product };
    
    // Get all plants for this product's category
    const categoryPlants = getAllPlantsForCategory(product.category);
    
    // Update the applicablePlants array
    updatedProduct.applicablePlants = categoryPlants;
    
    return updatedProduct;
  });
}

// Update the products
const products = updateProductsWithApplicablePlants(originalProducts);

// Additional helper functions
function getProductById(id) {
  return products.find(product => product.id === id);
}

function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}

function searchPlants(searchTerm) {
  const results = [];
  
  products.forEach(product => {
    const matchingPlants = product.applicablePlants.filter(plant => 
      plant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (matchingPlants.length > 0) {
      results.push({
        productId: product.id,
        productName: product.name,
        plants: matchingPlants
      });
    }
  });
  
  return results;
}

// Export the updated products array
export { products, plantLists, getProductById, getProductsByCategory, searchPlants };