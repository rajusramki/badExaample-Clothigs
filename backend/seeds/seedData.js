const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

// Sample data
const categories = [
  {
    name: "Men's Fashion",
    slug: 'mens',
    description: 'Stylish clothing for men',
    status: 'active',
    featured: true
  },
  {
    name: "Women's Fashion",
    slug: 'womens',
    description: 'Elegant clothing for women',
    status: 'active',
    featured: true
  },
  {
    name: "Kids Fashion",
    slug: 'kids',
    description: 'Comfortable clothing for children',
    status: 'active',
    featured: true
  }
];

const sampleProducts = [
  {
    name: "Classic Black T-Shirt",
    description: "Premium cotton t-shirt perfect for everyday wear. Comfortable fit with excellent durability.",
    shortDescription: "Premium cotton t-shirt for everyday wear",
    brand: "Bad Example",
    sku: "BE-TS-001",
    price: {
      original: 29.99,
      sale: 24.99
    },
    inventory: {
      stock: 50,
      trackStock: true,
      allowBackorder: false
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        alt: "Classic Black T-Shirt",
        isMain: true
      }
    ],
    specifications: [
      { name: "Material", value: "100% Cotton" },
      { name: "Fit", value: "Regular" },
      { name: "Care", value: "Machine washable" }
    ],
    status: 'active',
    featured: true,
    tags: ['casual', 'cotton', 'basic']
  },
  {
    name: "Denim Jacket",
    description: "Vintage-style denim jacket with modern comfort. Perfect for layering in any season.",
    shortDescription: "Vintage-style denim jacket",
    brand: "Bad Example",
    sku: "BE-DJ-002",
    price: {
      original: 89.99,
      sale: 69.99
    },
    inventory: {
      stock: 30,
      trackStock: true,
      allowBackorder: false
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500",
        alt: "Denim Jacket",
        isMain: true
      }
    ],
    specifications: [
      { name: "Material", value: "100% Denim" },
      { name: "Fit", value: "Regular" },
      { name: "Style", value: "Vintage" }
    ],
    status: 'active',
    featured: true,
    tags: ['denim', 'jacket', 'vintage']
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress perfect for warm weather. Elegant design with comfortable fabric.",
    shortDescription: "Light and breezy summer dress",
    brand: "Bad Example",
    sku: "BE-SD-003",
    price: {
      original: 79.99
    },
    inventory: {
      stock: 25,
      trackStock: true,
      allowBackorder: false
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
        alt: "Summer Dress",
        isMain: true
      }
    ],
    specifications: [
      { name: "Material", value: "Cotton Blend" },
      { name: "Length", value: "Midi" },
      { name: "Occasion", value: "Casual" }
    ],
    status: 'active',
    featured: true,
    tags: ['dress', 'summer', 'casual']
  },
  {
    name: "Kids Hoodie",
    description: "Cozy hoodie for kids with fun design. Soft fabric and comfortable fit for active children.",
    shortDescription: "Cozy hoodie for kids",
    brand: "Bad Example",
    sku: "BE-KH-004",
    price: {
      original: 39.99,
      sale: 29.99
    },
    inventory: {
      stock: 40,
      trackStock: true,
      allowBackorder: false
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500",
        alt: "Kids Hoodie",
        isMain: true
      }
    ],
    specifications: [
      { name: "Material", value: "Cotton Fleece" },
      { name: "Fit", value: "Comfortable" },
      { name: "Features", value: "Kangaroo Pocket" }
    ],
    status: 'active',
    featured: true,
    tags: ['kids', 'hoodie', 'comfort']
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created:', createdCategories.length);

    // Create admin user
    const adminUser = await User.findOne({ email: 'admin@badexample.com' });
    let userId;
    
    if (!adminUser) {
      const newAdmin = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@badexample.com',
        password: 'admin123',
        role: 'admin'
      });
      userId = newAdmin._id;
      console.log('Admin user created');
    } else {
      userId = adminUser._id;
      console.log('Using existing admin user');
    }

    // Add category references and creator to products
    const productsWithCategories = sampleProducts.map((product, index) => {
      const categoryIndex = index % createdCategories.length;
      return {
        ...product,
        category: createdCategories[categoryIndex]._id,
        createdBy: userId
      };
    });

    // Create products
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log('Products created:', createdProducts.length);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedData();