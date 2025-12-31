import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config.js';
import Product from './Model/product.js';
import Category from './Model/category.js';
import User from './Model/user.js';
import Cart from './Model/cart.js';
import bcrypt from 'bcrypt';

// Ensure DB URL is present
if (!process.env.DB_URL) {
  console.error('DB_URL not set in .env. Aborting.');
  process.exit(1);
}

await connectDB();

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return Number(val.toFixed(decimals));
}

const categorySeed = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1510557880182-3f8a1f3a0f29?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1520975698516-96a9f4f2b2b7?auto=format&fit=crop&w=800&q=80' },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1509415109805-8cccb2a3b1f5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sports & Outdoors', image: 'https://images.unsplash.com/photo-1526403224743-2d4b5a1b0128?auto=format&fit=crop&w=800&q=80' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80' },
  { name: 'Toys & Games', image: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Groceries', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' }
];

const imagePool = [
  'https://images.unsplash.com/photo-1513708928670-48f0a3b2f2ab?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539883375381-8b61d7dd4f1c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534751516642-a1af1ef875cc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1478810810369-070b6f29595a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542291036-1ec7a52d75ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512303452022-1fce4804e9f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515165562835-c1b3b2f9a936?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1545235617-9465d84f8b61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=800&q=80'
];

const adjectives = ['Classic', 'Modern', 'Premium', 'Compact', 'Portable', 'Deluxe', 'Eco', 'Smart', 'Advanced', 'Basic', 'Limited', 'Wireless'];
const items = ['Headphones', 'Sneakers', 'Blender', 'Lipstick', 'T-Shirt', 'Backpack', 'Smartwatch', 'Sofa', 'Running Shoes', 'Novel', 'Action Figure', 'Coffee Beans', 'Water Bottle', 'Yoga Mat', 'Desk Lamp'];

async function seedData() {
  try {
    console.log('Clearing existing data...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    console.log('Seeding categories...');
    const createdCategories = await Category.insertMany(categorySeed);

    console.log('Seeding products...');
    const productsToInsert = [];

    for (const cat of createdCategories) {
      const count = randomInt(8, 14); // per category
      for (let i = 0; i < count; i++) {
        const title = `${adjectives[randomInt(0, adjectives.length - 1)]} ${items[randomInt(0, items.length - 1)]}`;
        const price = randomFloat(5, 1200, 2);
        const discount = randomInt(0, 50);
        const rating = randomFloat(2, 5, 1);
        const reviews = randomInt(0, 5000);
        const image = imagePool[randomInt(0, imagePool.length - 1)];

        productsToInsert.push({
          title: `${title} - ${cat.name}`,
          description: `High-quality ${title.toLowerCase()} perfect for ${cat.name.toLowerCase()}. Designed for performance and durability.`,
          price,
          discount,
          rating,
          reviews,
          image,
          category: cat.name,
          isFeatured: Math.random() < 0.08
        });
      }
    }

    const createdProducts = await Product.insertMany(productsToInsert);

    console.log(`Inserted ${createdCategories.length} categories and ${createdProducts.length} products.`);

    console.log('Seeding users...');
    const rawUsers = [
      { name: 'Alice Tester', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob Developer', email: 'bob@example.com', password: 'password123' },
      { name: 'Charlie Shopper', email: 'charlie@example.com', password: 'password123' }
    ];

    const usersToInsert = [];
    for (const u of rawUsers) {
      const hashed = await bcrypt.hash(u.password, 10);
      usersToInsert.push({ name: u.name, email: u.email, password: hashed });
    }

    const createdUsers = await User.insertMany(usersToInsert);

    console.log('Seeding carts...');
    // Create a sample cart for Alice using 3 random products
    const alice = createdUsers[0];
    const sampleProducts = createdProducts.slice(0, 12);
    const cartItems = [
      {
        productId: sampleProducts[0]._id,
        title: sampleProducts[0].title,
        price: sampleProducts[0].price,
        image: sampleProducts[0].image,
        quantity: randomInt(1, 3)
      },
      {
        productId: sampleProducts[3]._id,
        title: sampleProducts[3].title,
        price: sampleProducts[3].price,
        image: sampleProducts[3].image,
        quantity: randomInt(1, 2)
      },
      {
        productId: sampleProducts[7]._id,
        title: sampleProducts[7].title,
        price: sampleProducts[7].price,
        image: sampleProducts[7].image,
        quantity: 1
      }
    ];

    await Cart.create({ userId: alice._id, items: cartItems });

    console.log('Seeding completed successfully ✅');
    console.log(`Users: ${createdUsers.length}, Cart sample for: ${alice.email}`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedData();
