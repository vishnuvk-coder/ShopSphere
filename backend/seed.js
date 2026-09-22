const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.5,
    description:
      "Premium wireless headphones with clear sound, comfortable ear cushions and long battery life.",
    emoji: "🎧"
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 3999,
    rating: 4.7,
    description:
      "A modern smartwatch designed to help you track daily activities and stay connected.",
    emoji: "⌚"
  },
  {
    name: "Travel Backpack",
    category: "Fashion",
    price: 1299,
    rating: 4.4,
    description:
      "A lightweight and spacious backpack suitable for college, work and everyday travel.",
    emoji: "🎒"
  },
  {
    name: "Running Shoes",
    category: "Fashion",
    price: 2999,
    rating: 4.6,
    description:
      "Comfortable running shoes designed for daily workouts and active lifestyles.",
    emoji: "👟"
  },
  {
    name: "Desk Lamp",
    category: "Home",
    price: 899,
    rating: 4.3,
    description:
      "A stylish desk lamp perfect for study tables, offices and bedrooms.",
    emoji: "💡"
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1799,
    rating: 4.5,
    description:
      "Portable Bluetooth speaker with clear audio and powerful sound for everyday entertainment.",
    emoji: "🔊"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("Products added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

seedDatabase();