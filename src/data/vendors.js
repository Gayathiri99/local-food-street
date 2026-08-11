// src/data/vendors.js
//
// Shared vendor list used across modules (Listing, Vendor Details).
// Source of truth: the shop list Gayathiri built in
// src/modules/3-map/components/InteractiveMap.jsx (the `baseShops` array).
// Keeping the same id/name/timing/crowded/pickup values here means a shop
// clicked on the Listing page and a shop clicked on the Map both lead to
// the same vendor info instead of two different fake datasets.
//
// NOTE for whoever owns 3-map next: InteractiveMap.jsx still keeps its own
// local copy of this data (with extra map-only fields like x/y and
// lat/lngOffset). A future cleanup could have it import from here instead.

export const VENDORS = [
  {
    id: "spicy-tiffin",
    name: "Spicy Tiffin Corner",
    category: "South Indian",
    foodType: "veg",
    timing: "6:00 AM - 6:00 PM",
    crowded: "Moderate",
    pickup: true,
    note: "Fast breakfast and tea",
    price: "₹0-200",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    parking: { available: true, spotsLeft: 5 },
    special: {
      name: "Filter Coffee & Idli Combo",
      price: 40,
      ingredients: ["rice", "urad dal", "coffee", "milk"],
    },
  },
  {
    id: "street-bites",
    name: "Street Bites Hub",
    category: "Fast Food",
    foodType: "veg",
    timing: "11:00 AM - 11:00 PM",
    crowded: "Busy",
    pickup: true,
    note: "North Indian wraps and juices",
    price: "₹200-500",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    parking: { available: false, spotsLeft: 0 },
    special: {
      name: "Paneer Wrap Combo",
      price: 90,
      ingredients: ["paneer", "wheat wrap", "onion", "mint chutney"],
    },
  },
  {
    id: "night-market",
    name: "Night Market Grill",
    category: "Fast Food",
    foodType: "nonveg",
    timing: "Closed for the day",
    crowded: "Low",
    pickup: false,
    note: "Tandoor snacks and grills",
    price: "₹200-500",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    parking: { available: true, spotsLeft: 2 },
    special: {
      name: "Tandoori Platter",
      price: 150,
      ingredients: ["chicken", "yogurt marinade", "spices"],
    },
  },
  {
    id: "family-bites",
    name: "Family Bites Kitchen",
    category: "South Indian",
    foodType: "veg",
    timing: "10:00 AM - 10:00 PM",
    crowded: "Moderate",
    pickup: true,
    note: "South Indian meals and sweets",
    price: "₹200-500",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    parking: { available: true, spotsLeft: 8 },
    special: {
      name: "Full Meals Thali",
      price: 120,
      ingredients: ["rice", "sambar", "rasam", "poriyal", "payasam"],
    },
  },
  {
    id: "tiffin-stop",
    name: "Tiffin Stop",
    category: "South Indian",
    foodType: "veg",
    timing: "7:00 AM - 9:00 PM",
    crowded: "Low",
    pickup: true,
    note: "Quick breakfast and coffee",
    price: "₹0-200",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
    parking: { available: true, spotsLeft: 4 },
    special: {
      name: "Pongal & Vada",
      price: 35,
      ingredients: ["rice", "moong dal", "pepper", "ghee"],
    },
  },
  {
    id: "samosa-hub",
    name: "Samosa Hub",
    category: "Fast Food",
    foodType: "veg",
    timing: "8:00 AM - 11:00 PM",
    crowded: "Busy",
    pickup: true,
    note: "Street snacks and juices",
    price: "₹0-200",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    parking: { available: false, spotsLeft: 0 },
    special: {
      name: "Samosa Chaat",
      price: 50,
      ingredients: ["potato", "chickpeas", "tamarind chutney", "yogurt"],
    },
  },
  // Added so every Home page category (Healthy Food, Desserts, Drinks)
  // has at least one real shop to show on the Listing page.
  {
    id: "green-leaf",
    name: "Green Leaf Salads",
    category: "Healthy Food",
    foodType: "veg",
    timing: "9:00 AM - 8:00 PM",
    crowded: "Low",
    pickup: true,
    note: "Fresh salads and smoothie bowls",
    price: "₹200-500",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    parking: { available: true, spotsLeft: 6 },
    special: {
      name: "Quinoa Power Bowl",
      price: 110,
      ingredients: ["quinoa", "chickpeas", "greens", "lemon dressing"],
    },
  },
  {
    id: "sweet-treats",
    name: "Sweet Treats Corner",
    category: "Desserts",
    foodType: "veg",
    timing: "12:00 PM - 10:00 PM",
    crowded: "Moderate",
    pickup: true,
    note: "Traditional sweets and ice cream",
    price: "₹0-200",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    parking: { available: true, spotsLeft: 3 },
    special: {
      name: "Gulab Jamun & Kulfi",
      price: 60,
      ingredients: ["milk solids", "sugar syrup", "cardamom", "pistachio"],
    },
  },
  {
    id: "cool-sips",
    name: "Cool Sips Juice Bar",
    category: "Drinks",
    foodType: "veg",
    timing: "8:00 AM - 11:00 PM",
    crowded: "Busy",
    pickup: true,
    note: "Fresh juices, lassi and shakes",
    price: "₹0-200",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    parking: { available: false, spotsLeft: 0 },
    special: {
      name: "Mango Lassi",
      price: 45,
      ingredients: ["mango", "yogurt", "sugar", "cardamom"],
    },
  },
];

export function getVendorById(id) {
  return VENDORS.find((vendor) => vendor.id === id) || null;
}

// Same open/closed parsing approach used in 4-vendor/components/VendorHeader.jsx,
// kept in one place so Listing and Vendor Details always agree on whether a
// shop is open right now.
export function isVendorOpenNow(timing) {
  if (!timing || timing.toLowerCase().includes("closed")) {
    return false;
  }

  const [startStr, endStr] = timing.split(" - ");

  const parseTime = (timeStr) => {
    const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;

    let [, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const now = new Date();
  const startTime = parseTime(startStr);
  const endTime = parseTime(endStr);

  if (!startTime || !endTime) return false;

  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
    if (now < startTime) now.setDate(now.getDate() + 1);
  }

  return now >= startTime && now <= endTime;
}

// Reshapes a VENDORS entry into the { id, name, category, food, rating,
// price, status, description, image } shape VendorCardList.jsx expects,
// so Anand's card UI can keep working unchanged with real shared data.
export function toListingCard(vendor) {
  const open = isVendorOpenNow(vendor.timing);
  const status = !open ? "closed" : vendor.crowded === "Busy" ? "busy" : "open";

  return {
    id: vendor.id,
    name: vendor.name,
    category: vendor.category,
    food: vendor.special?.name || vendor.category,
    foodType: vendor.foodType,
    rating: vendor.rating,
    price: vendor.price,
    status,
    description: vendor.note,
    image: vendor.image,
  };
}
