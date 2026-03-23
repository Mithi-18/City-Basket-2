const products = [
  // 🍎 Fruits
  { id: 1, name: "Royal Gala Apples", price: 3.49, category: "Fruits", image: "🍎", unit: "kg", inStock: true, description: "Crisp and sweet premium apples, perfect for snacking" },
  { id: 2, name: "Cavendish Bananas", price: 1.99, category: "Fruits", image: "🍌", unit: "bunch", inStock: true, description: "Naturally ripened yellow bananas, rich in potassium" },
  { id: 3, name: "Fresh Strawberries", price: 4.99, category: "Fruits", image: "🍓", unit: "pack", inStock: true, description: "Sweet and juicy strawberries, hand-picked daily" },
  { id: 4, name: "Navel Oranges", price: 2.99, category: "Fruits", image: "🍊", unit: "kg", inStock: true, description: "Seedless navel oranges bursting with vitamin C" },
  { id: 5, name: "Green Grapes", price: 5.49, category: "Fruits", image: "🍇", unit: "kg", inStock: true, description: "Crisp seedless green grapes, perfect for salads" },
  { id: 6, name: "Ripe Mangoes", price: 2.49, category: "Fruits", image: "🥭", unit: "each", inStock: true, description: "Sweet Alphonso mangoes, tropical and aromatic" },

  // 🥦 Vegetables
  { id: 7, name: "Organic Broccoli", price: 2.99, category: "Vegetables", image: "🥦", unit: "head", inStock: true, description: "Fresh organic broccoli crowns, nutrient-packed superfood" },
  { id: 8, name: "Roma Tomatoes", price: 3.29, category: "Vegetables", image: "🍅", unit: "kg", inStock: true, description: "Vine-ripened Roma tomatoes, ideal for cooking and salads" },
  { id: 9, name: "Baby Spinach", price: 3.49, category: "Vegetables", image: "🥬", unit: "bag", inStock: true, description: "Tender baby spinach leaves, triple-washed and ready to eat" },
  { id: 10, name: "Sweet Bell Peppers", price: 4.99, category: "Vegetables", image: "🫑", unit: "pack", inStock: true, description: "Colorful mix of red, yellow, and green bell peppers" },
  { id: 11, name: "Fresh Carrots", price: 1.79, category: "Vegetables", image: "🥕", unit: "kg", inStock: true, description: "Crunchy organic carrots, farm-fresh and naturally sweet" },
  { id: 12, name: "Red Onions", price: 1.49, category: "Vegetables", image: "🧅", unit: "kg", inStock: true, description: "Premium red onions with mild sweet flavor" },

  // 🥛 Dairy
  { id: 13, name: "Whole Milk", price: 3.99, category: "Dairy", image: "🥛", unit: "gallon", inStock: true, description: "Farm-fresh whole milk, pasteurized and homogenized" },
  { id: 14, name: "Greek Yogurt", price: 5.49, category: "Dairy", image: "🍶", unit: "tub", inStock: true, description: "Thick and creamy Greek yogurt, high protein, plain flavor" },
  { id: 15, name: "Sharp Cheddar", price: 6.99, category: "Dairy", image: "🧀", unit: "block", inStock: true, description: "Aged sharp cheddar cheese, rich and tangy" },
  { id: 16, name: "Salted Butter", price: 4.49, category: "Dairy", image: "🧈", unit: "pack", inStock: true, description: "European-style salted butter, perfect for baking" },
  { id: 17, name: "Free-Range Eggs", price: 5.99, category: "Dairy", image: "🥚", unit: "dozen", inStock: true, description: "Cage-free, free-range large brown eggs" },

  // 🍞 Bakery
  { id: 18, name: "Sourdough Loaf", price: 4.99, category: "Bakery", image: "🍞", unit: "loaf", inStock: true, description: "Artisan sourdough bread, naturally leavened with crispy crust" },
  { id: 19, name: "Croissants", price: 6.49, category: "Bakery", image: "🥐", unit: "pack of 4", inStock: true, description: "Buttery French croissants, golden and flaky" },
  { id: 20, name: "Whole Wheat Bagels", price: 3.99, category: "Bakery", image: "🥯", unit: "pack of 6", inStock: true, description: "Hearty whole wheat bagels, perfect for breakfast" },
  { id: 21, name: "Chocolate Muffins", price: 5.49, category: "Bakery", image: "🧁", unit: "pack of 4", inStock: true, description: "Double chocolate muffins with chocolate chips" },
  { id: 22, name: "Flatbread Wraps", price: 3.29, category: "Bakery", image: "🫓", unit: "pack of 6", inStock: true, description: "Soft and flexible flatbread wraps for sandwiches" },

  // 🥤 Beverages
  { id: 23, name: "Orange Juice", price: 4.49, category: "Beverages", image: "🧃", unit: "carton", inStock: true, description: "Freshly squeezed orange juice, not from concentrate" },
  { id: 24, name: "Sparkling Water", price: 1.29, category: "Beverages", image: "💧", unit: "bottle", inStock: true, description: "Natural sparkling mineral water, zero calories" },
  { id: 25, name: "Green Tea", price: 3.99, category: "Beverages", image: "🍵", unit: "box of 20", inStock: true, description: "Organic Japanese green tea bags, antioxidant-rich" },
  { id: 26, name: "Cold Brew Coffee", price: 5.99, category: "Beverages", image: "☕", unit: "bottle", inStock: true, description: "Smooth cold brew coffee, 12-hour steeped, low acidity" },
  { id: 27, name: "Almond Milk", price: 3.49, category: "Beverages", image: "🥛", unit: "carton", inStock: true, description: "Unsweetened vanilla almond milk, dairy-free" },

  // 🍿 Snacks
  { id: 28, name: "Trail Mix", price: 7.99, category: "Snacks", image: "🥜", unit: "bag", inStock: true, description: "Premium mix of nuts, dried fruits, and dark chocolate" },
  { id: 29, name: "Sea Salt Chips", price: 3.49, category: "Snacks", image: "🍿", unit: "bag", inStock: true, description: "Kettle-cooked sea salt potato chips, extra crunchy" },
  { id: 30, name: "Dark Chocolate Bar", price: 4.99, category: "Snacks", image: "🍫", unit: "bar", inStock: true, description: "72% cacao dark chocolate, smooth and bittersweet" },
  { id: 31, name: "Granola Bars", price: 4.49, category: "Snacks", image: "🍪", unit: "box of 6", inStock: true, description: "Oat and honey granola bars with nuts and seeds" },
  { id: 32, name: "Dried Mangoes", price: 5.99, category: "Snacks", image: "🥭", unit: "bag", inStock: true, description: "Naturally dried mango slices, no sugar added" },
];

module.exports = products;
