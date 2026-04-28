export type Shop = {
  id: string;
  name: string;
  hindiName: string;
  owner: string;
  avatar: string;
  banner: string;
  logo: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  distance: string;
  eta: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  plan: "starter" | "pro" | "elite";
  deliveryFee: number;
  minOrder: number;
  features: string[];
  description: string;
};

export type Product = {
  id: string;
  shopId: string;
  name: string;
  hindiName: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  unit: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  discount: number;
  isBestSeller: boolean;
  isNew: boolean;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  color: string;
};

export const CATEGORIES: Category[] = [
  { id: "groceries", name: "Groceries", hindiName: "किराना", emoji: "🛒", color: "#5D3FD3" },
  { id: "dairy", name: "Dairy & Eggs", hindiName: "दूध व अंडे", emoji: "🥛", color: "#3B82F6" },
  { id: "snacks", name: "Snacks & Biscuits", hindiName: "नाश्ता", emoji: "🍪", color: "#F59E0B" },
  { id: "beverages", name: "Beverages", hindiName: "पेय पदार्थ", emoji: "🥤", color: "#10B981" },
  { id: "household", name: "Household", hindiName: "घरेलू", emoji: "🧹", color: "#8B5CF6" },
  { id: "personal", name: "Personal Care", hindiName: "व्यक्तिगत देखभाल", emoji: "🧴", color: "#EC4899" },
  { id: "medicines", name: "Medicines", hindiName: "दवाइयाँ", emoji: "💊", color: "#EF4444" },
  { id: "vegetables", name: "Vegetables", hindiName: "सब्जियाँ", emoji: "🥦", color: "#22C55E" },
];

export const SHOPS: Shop[] = [
  {
    id: "rajesh-kirana",
    name: "Rajesh General Store",
    hindiName: "राजेश जनरल स्टोर",
    owner: "Rajesh Gupta",
    avatar: "https://ui-avatars.com/api/?name=Rajesh+Gupta&background=5D3FD3&color=fff&size=100",
    banner: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    logo: "https://ui-avatars.com/api/?name=RG&background=5D3FD3&color=fff&size=80&bold=true",
    category: "General Store",
    tags: ["Groceries", "Dairy", "Snacks", "Household"],
    rating: 4.7,
    reviewCount: 248,
    distance: "0.3 km",
    eta: "12 min",
    area: "Aminabad",
    city: "Lucknow",
    address: "Shop 14, Aminabad Market, Lucknow - 226018",
    phone: "+91 98765 43210",
    whatsapp: "+919876543210",
    isOpen: true,
    openTime: "7:00 AM",
    closeTime: "10:00 PM",
    plan: "pro",
    deliveryFee: 0,
    minOrder: 99,
    features: ["Free Delivery", "Udhaar Available", "WhatsApp Orders"],
    description: "Serving Aminabad for 22 years. Fresh stock daily. Trusted by 500+ families.",
  },
  {
    id: "sharma-medical",
    name: "Sharma Medical & General",
    hindiName: "शर्मा मेडिकल एवं जनरल",
    owner: "Suresh Sharma",
    avatar: "https://ui-avatars.com/api/?name=Suresh+Sharma&background=6B46C1&color=fff&size=100",
    banner: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    logo: "https://ui-avatars.com/api/?name=SS&background=6B46C1&color=fff&size=80&bold=true",
    category: "Medical + General",
    tags: ["Medicines", "Groceries", "Personal Care"],
    rating: 4.8,
    reviewCount: 412,
    distance: "0.5 km",
    eta: "15 min",
    area: "Gomti Nagar",
    city: "Lucknow",
    address: "Plot 7B, Vipin Khand, Gomti Nagar, Lucknow - 226010",
    phone: "+91 99887 76655",
    whatsapp: "+919988776655",
    isOpen: true,
    openTime: "8:00 AM",
    closeTime: "9:30 PM",
    plan: "elite",
    deliveryFee: 0,
    minOrder: 149,
    features: ["Free Delivery", "Prescription Medicines", "WhatsApp Orders", "24hr Emergency"],
    description: "Your trusted neighborhood medical + grocery store. Licensed pharmacist on duty.",
  },
  {
    id: "devi-dairy",
    name: "Devi Fresh Dairy",
    hindiName: "देवी फ्रेश डेयरी",
    owner: "Meena Devi",
    avatar: "https://ui-avatars.com/api/?name=Meena+Devi&background=3B82F6&color=fff&size=100",
    banner: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80",
    logo: "https://ui-avatars.com/api/?name=DD&background=3B82F6&color=fff&size=80&bold=true",
    category: "Dairy",
    tags: ["Dairy", "Eggs", "Paneer", "Curd"],
    rating: 4.9,
    reviewCount: 189,
    distance: "0.2 km",
    eta: "10 min",
    area: "Hazratganj",
    city: "Lucknow",
    address: "Near Hazratganj Chowk, Lucknow - 226001",
    phone: "+91 97654 32109",
    whatsapp: "+919765432109",
    isOpen: true,
    openTime: "6:00 AM",
    closeTime: "8:00 PM",
    plan: "starter",
    deliveryFee: 0,
    minOrder: 79,
    features: ["Free Delivery", "Fresh Daily", "WhatsApp Orders"],
    description: "Fresh milk, paneer, curd & more. Sourced directly from local farms every morning.",
  },
  {
    id: "anand-grocery",
    name: "Anand Grocery & Provisions",
    hindiName: "आनंद किराना भंडार",
    owner: "Anand Verma",
    avatar: "https://ui-avatars.com/api/?name=Anand+Verma&background=10B981&color=fff&size=100",
    banner: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    logo: "https://ui-avatars.com/api/?name=AV&background=10B981&color=fff&size=80&bold=true",
    category: "General Store",
    tags: ["Groceries", "Snacks", "Beverages", "Household"],
    rating: 4.5,
    reviewCount: 156,
    distance: "0.7 km",
    eta: "18 min",
    area: "Aminabad",
    city: "Lucknow",
    address: "Chowk Bazaar, Aminabad, Lucknow - 226018",
    phone: "+91 96543 21098",
    whatsapp: "+919654321098",
    isOpen: true,
    openTime: "7:30 AM",
    closeTime: "9:00 PM",
    plan: "pro",
    deliveryFee: 0,
    minOrder: 99,
    features: ["Free Delivery", "Bulk Orders", "WhatsApp Orders"],
    description: "Wholesale and retail groceries. Best prices guaranteed. Bulk orders welcome.",
  },
  {
    id: "krishna-vegetables",
    name: "Krishna Fresh Vegetables",
    hindiName: "कृष्णा फ्रेश सब्जी",
    owner: "Krishna Yadav",
    avatar: "https://ui-avatars.com/api/?name=Krishna+Yadav&background=22C55E&color=fff&size=100",
    banner: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&q=80",
    logo: "https://ui-avatars.com/api/?name=KY&background=22C55E&color=fff&size=80&bold=true",
    category: "Vegetables",
    tags: ["Vegetables", "Fruits", "Fresh Produce"],
    rating: 4.6,
    reviewCount: 203,
    distance: "0.4 km",
    eta: "13 min",
    area: "Gomti Nagar",
    city: "Lucknow",
    address: "Sector 7, Gomti Nagar, Lucknow - 226010",
    phone: "+91 95432 10987",
    whatsapp: "+919543210987",
    isOpen: true,
    openTime: "6:30 AM",
    closeTime: "7:00 PM",
    plan: "starter",
    deliveryFee: 0,
    minOrder: 59,
    features: ["Free Delivery", "Farm Fresh", "WhatsApp Orders"],
    description: "Farm-fresh vegetables and seasonal fruits. Sourced fresh every morning.",
  },
  {
    id: "lucky-biscuit",
    name: "Lucky Snacks & Beverages",
    hindiName: "लकी स्नैक्स एवं पेय",
    owner: "Rakesh Jain",
    avatar: "https://ui-avatars.com/api/?name=Rakesh+Jain&background=F59E0B&color=fff&size=100",
    banner: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    logo: "https://ui-avatars.com/api/?name=RJ&background=F59E0B&color=fff&size=80&bold=true",
    category: "Snacks & Beverages",
    tags: ["Snacks", "Beverages", "Chips", "Cold Drinks"],
    rating: 4.3,
    reviewCount: 98,
    distance: "0.6 km",
    eta: "16 min",
    area: "Hazratganj",
    city: "Lucknow",
    address: "MG Road, Hazratganj, Lucknow - 226001",
    phone: "+91 93210 98765",
    whatsapp: "+919321098765",
    isOpen: false,
    openTime: "9:00 AM",
    closeTime: "11:00 PM",
    plan: "starter",
    deliveryFee: 0,
    minOrder: 79,
    features: ["Free Delivery", "WhatsApp Orders"],
    description: "All your favourite snacks, beverages and chips. Party supplies available.",
  },
];

const PRODUCTS_RAJESH: Product[] = [
  // Groceries
  { id: "p1", shopId: "rajesh-kirana", name: "Aashirvaad Atta 5kg", hindiName: "आशीर्वाद आटा 5 किलो", brand: "Aashirvaad", category: "Groceries", subcategory: "Flour & Atta", price: 255, mrp: 280, unit: "5kg", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80", inStock: true, stockCount: 45, discount: 9, isBestSeller: true, isNew: false, description: "Chakki fresh atta for soft rotis" },
  { id: "p2", shopId: "rajesh-kirana", name: "India Gate Basmati Rice 1kg", hindiName: "इंडिया गेट बासमती चावल", brand: "India Gate", category: "Groceries", subcategory: "Rice & Grains", price: 89, mrp: 99, unit: "1kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80", inStock: true, stockCount: 30, discount: 10, isBestSeller: true, isNew: false, description: "Premium basmati rice, long grain" },
  { id: "p3", shopId: "rajesh-kirana", name: "Tata Dal Arhar 500g", hindiName: "टाटा अरहर दाल", brand: "Tata", category: "Groceries", subcategory: "Pulses & Dals", price: 75, mrp: 85, unit: "500g", image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=300&q=80", inStock: true, stockCount: 22, discount: 12, isBestSeller: false, isNew: false, description: "Premium arhar dal, polished" },
  { id: "p4", shopId: "rajesh-kirana", name: "Fortune Sunflower Oil 1L", hindiName: "फॉर्च्यून सनफ्लावर तेल", brand: "Fortune", category: "Groceries", subcategory: "Oil & Ghee", price: 138, mrp: 155, unit: "1L", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80", inStock: true, stockCount: 18, discount: 11, isBestSeller: false, isNew: false, description: "Light & healthy sunflower oil" },
  { id: "p5", shopId: "rajesh-kirana", name: "Amul Ghee 500ml", hindiName: "अमूल घी", brand: "Amul", category: "Groceries", subcategory: "Oil & Ghee", price: 285, mrp: 310, unit: "500ml", image: "https://images.unsplash.com/photo-1531230698329-b6cb5d55e17e?w=300&q=80", inStock: true, stockCount: 12, discount: 8, isBestSeller: true, isNew: false, description: "Pure cow ghee, rich aroma" },
  // Dairy
  { id: "p6", shopId: "rajesh-kirana", name: "Amul Taza Milk 1L", hindiName: "अमूल ताज़ा दूध", brand: "Amul", category: "Dairy & Eggs", subcategory: "Milk", price: 62, mrp: 62, unit: "1L", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80", inStock: true, stockCount: 40, discount: 0, isBestSeller: true, isNew: false, description: "Fresh toned milk" },
  { id: "p7", shopId: "rajesh-kirana", name: "Amul Butter 100g", hindiName: "अमूल बटर", brand: "Amul", category: "Dairy & Eggs", subcategory: "Butter & Cheese", price: 56, mrp: 60, unit: "100g", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80", inStock: true, stockCount: 25, discount: 7, isBestSeller: true, isNew: false, description: "Pasteurised salted butter" },
  { id: "p8", shopId: "rajesh-kirana", name: "Eggs (Local Farm) 6pc", hindiName: "अंडे (फार्म फ्रेश)", brand: "Local Farm", category: "Dairy & Eggs", subcategory: "Eggs", price: 60, mrp: 66, unit: "6 pcs", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=300&q=80", inStock: true, stockCount: 60, discount: 9, isBestSeller: false, isNew: false, description: "Farm fresh brown eggs" },
  // Snacks
  { id: "p9", shopId: "rajesh-kirana", name: "Parle-G Biscuits 250g", hindiName: "पारले-जी बिस्किट", brand: "Parle", category: "Snacks & Biscuits", subcategory: "Biscuits", price: 25, mrp: 25, unit: "250g", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80", inStock: true, stockCount: 80, discount: 0, isBestSeller: true, isNew: false, description: "Glucose biscuits, nation's favourite" },
  { id: "p10", shopId: "rajesh-kirana", name: "Lays Classic Salted 52g", hindiName: "लेज़ क्लासिक चिप्स", brand: "Lays", category: "Snacks & Biscuits", subcategory: "Chips", price: 20, mrp: 20, unit: "52g", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80", inStock: true, stockCount: 55, discount: 0, isBestSeller: false, isNew: false, description: "Crispy potato chips, lightly salted" },
  { id: "p11", shopId: "rajesh-kirana", name: "Kurkure Masala Munch 70g", hindiName: "कुरकुरे मसाला", brand: "Kurkure", category: "Snacks & Biscuits", subcategory: "Chips", price: 20, mrp: 20, unit: "70g", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&q=80", inStock: true, stockCount: 48, discount: 0, isBestSeller: true, isNew: false, description: "Masala flavoured crunchy snack" },
  // Beverages
  { id: "p12", shopId: "rajesh-kirana", name: "Tata Tea Premium 250g", hindiName: "टाटा टी प्रीमियम", brand: "Tata Tea", category: "Beverages", subcategory: "Tea & Coffee", price: 105, mrp: 115, unit: "250g", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", inStock: true, stockCount: 28, discount: 9, isBestSeller: true, isNew: false, description: "Strong flavourful tea" },
  { id: "p13", shopId: "rajesh-kirana", name: "Nescafe Classic 50g", hindiName: "नेस्काफे क्लासिक", brand: "Nescafe", category: "Beverages", subcategory: "Tea & Coffee", price: 215, mrp: 235, unit: "50g", image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=300&q=80", inStock: true, stockCount: 15, discount: 9, isBestSeller: false, isNew: false, description: "Rich instant coffee" },
  { id: "p14", shopId: "rajesh-kirana", name: "Pepsi 2L Bottle", hindiName: "पेप्सी 2 लीटर", brand: "Pepsi", category: "Beverages", subcategory: "Cold Drinks", price: 95, mrp: 110, unit: "2L", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&q=80", inStock: false, stockCount: 0, discount: 14, isBestSeller: false, isNew: false, description: "Chilled pepsi for the family" },
  // Household
  { id: "p15", shopId: "rajesh-kirana", name: "Surf Excel Easy Wash 500g", hindiName: "सर्फ एक्सेल", brand: "Surf Excel", category: "Household", subcategory: "Detergent", price: 85, mrp: 95, unit: "500g", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80", inStock: true, stockCount: 33, discount: 11, isBestSeller: false, isNew: false, description: "Removes tough stains easily" },
  { id: "p16", shopId: "rajesh-kirana", name: "Vim Dishwash Bar 200g", hindiName: "विम बार", brand: "Vim", category: "Household", subcategory: "Kitchen Clean", price: 22, mrp: 25, unit: "200g", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&q=80", inStock: true, stockCount: 50, discount: 12, isBestSeller: true, isNew: false, description: "Lemon dishwash bar" },
  // Personal Care
  { id: "p17", shopId: "rajesh-kirana", name: "Colgate Strong Teeth 200g", hindiName: "कोलगेट टूथपेस्ट", brand: "Colgate", category: "Personal Care", subcategory: "Oral Care", price: 85, mrp: 95, unit: "200g", image: "https://images.unsplash.com/photo-1559591937-abc56565a8ac?w=300&q=80", inStock: true, stockCount: 40, discount: 11, isBestSeller: false, isNew: false, description: "Cavity protection toothpaste" },
  { id: "p18", shopId: "rajesh-kirana", name: "Lifebuoy Hand Soap 100g", hindiName: "लाइफबॉय साबुन", brand: "Lifebuoy", category: "Personal Care", subcategory: "Soap & Hygiene", price: 35, mrp: 38, unit: "100g", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&q=80", inStock: true, stockCount: 65, discount: 8, isBestSeller: true, isNew: true, description: "Germ protection soap" },
];

const PRODUCTS_SHARMA: Product[] = [
  { id: "s1", shopId: "sharma-medical", name: "Paracetamol 500mg (10 tabs)", hindiName: "पैरासिटामोल", brand: "Calpol", category: "Medicines", subcategory: "Pain Relief", price: 22, mrp: 25, unit: "10 tabs", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", inStock: true, stockCount: 100, discount: 12, isBestSeller: true, isNew: false, description: "Fever & pain relief" },
  { id: "s2", shopId: "sharma-medical", name: "Dettol Antiseptic 100ml", hindiName: "डेटॉल एंटीसेप्टिक", brand: "Dettol", category: "Medicines", subcategory: "First Aid", price: 62, mrp: 70, unit: "100ml", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", inStock: true, stockCount: 35, discount: 11, isBestSeller: false, isNew: false, description: "Antiseptic liquid for wounds" },
  { id: "s3", shopId: "sharma-medical", name: "BP Check (Free at shop)", hindiName: "ब्लड प्रेशर जाँच", brand: "Service", category: "Medicines", subcategory: "Health Services", price: 0, mrp: 50, unit: "per visit", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80", inStock: true, stockCount: 999, discount: 100, isBestSeller: false, isNew: true, description: "Free BP check every morning 8-10AM" },
  { id: "s4", shopId: "sharma-medical", name: "Amul Taza Milk 1L", hindiName: "अमूल ताज़ा दूध", brand: "Amul", category: "Groceries", subcategory: "Milk", price: 62, mrp: 62, unit: "1L", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80", inStock: true, stockCount: 20, discount: 0, isBestSeller: false, isNew: false, description: "Fresh toned milk" },
  { id: "s5", shopId: "sharma-medical", name: "Savlon Handwash 200ml", hindiName: "सेवलॉन हैंडवाश", brand: "Savlon", category: "Personal Care", subcategory: "Soap & Hygiene", price: 75, mrp: 85, unit: "200ml", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&q=80", inStock: true, stockCount: 40, discount: 12, isBestSeller: true, isNew: false, description: "Germ protection handwash" },
];

const ALL_PRODUCTS: Record<string, Product[]> = {
  "rajesh-kirana": PRODUCTS_RAJESH,
  "sharma-medical": PRODUCTS_SHARMA,
  "devi-dairy": [
    { id: "d1", shopId: "devi-dairy", name: "Full Cream Milk 1L", hindiName: "फुल क्रीम दूध", brand: "Local Farm", category: "Dairy & Eggs", subcategory: "Milk", price: 70, mrp: 75, unit: "1L", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80", inStock: true, stockCount: 80, discount: 7, isBestSeller: true, isNew: false, description: "Fresh full cream milk" },
    { id: "d2", shopId: "devi-dairy", name: "Paneer 200g", hindiName: "पनीर", brand: "Fresh Daily", category: "Dairy & Eggs", subcategory: "Paneer & Curd", price: 80, mrp: 90, unit: "200g", image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=300&q=80", inStock: true, stockCount: 30, discount: 11, isBestSeller: true, isNew: false, description: "Soft fresh paneer made daily" },
    { id: "d3", shopId: "devi-dairy", name: "Dahi (Curd) 400g", hindiName: "दही", brand: "Fresh Daily", category: "Dairy & Eggs", subcategory: "Paneer & Curd", price: 45, mrp: 50, unit: "400g", image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=300&q=80", inStock: true, stockCount: 50, discount: 10, isBestSeller: false, isNew: false, description: "Thick natural curd" },
    { id: "d4", shopId: "devi-dairy", name: "Eggs (Farm Fresh) 12pc", hindiName: "अंडे 12 पीस", brand: "Local Farm", category: "Dairy & Eggs", subcategory: "Eggs", price: 120, mrp: 132, unit: "12 pcs", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=300&q=80", inStock: true, stockCount: 100, discount: 9, isBestSeller: false, isNew: false, description: "Farm fresh eggs, rich in protein" },
  ],
};

export function getShops(): Shop[] {
  return SHOPS;
}

export function getShopById(id: string): Shop | undefined {
  return SHOPS.find((s) => s.id === id);
}

export function getProductsByShop(shopId: string): Product[] {
  return ALL_PRODUCTS[shopId] || [];
}

export function getProductCategories(shopId: string): string[] {
  const products = getProductsByShop(shopId);
  const cats = [...new Set(products.map((p) => p.category))];
  return cats;
}

export const TESTIMONIALS = [
  {
    name: "Priya Mishra",
    role: "Working Professional",
    area: "Gomti Nagar",
    text: "I used to pay ₹200 monthly in delivery fees on Blinkit. Now I order from Rajesh bhai's shop on Whoosh — same speed, zero delivery fee. It's been 3 months and I haven't opened Blinkit once.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Priya+Mishra&background=5D3FD3&color=fff",
  },
  {
    name: "Rajesh Gupta",
    role: "Shop Owner, Aminabad",
    area: "22 years in business",
    text: "Muneem helps me manage stock and sends WhatsApp promos to customers. My monthly orders went up 40% in just 6 weeks. Ab dukaan digital bhi hai, rishtaa bhi hai.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Rajesh+Gupta&background=6B46C1&color=fff",
  },
  {
    name: "Sunita Agarwal",
    role: "Homemaker",
    area: "Hazratganj",
    text: "Sahayak reminded me that my BP medicine was running out before I even noticed. It ordered from the nearby medical store — delivered in 12 minutes. This feels like magic.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sunita+Agarwal&background=10B981&color=fff",
  },
];

export const STATS = [
  { value: "12M+", label: "Kirana Shops in India", hindiLabel: "किराना दुकानें" },
  { value: "535M", label: "WhatsApp Users", hindiLabel: "व्हाट्सएप उपयोगकर्ता" },
  { value: "₹0", label: "Delivery Fee", hindiLabel: "डिलीवरी शुल्क" },
  { value: "88%", label: "Retail is Unorganized", hindiLabel: "खुदरा असंगठित क्षेत्र" },
];
