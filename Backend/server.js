// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config'); // your config.js for DB

const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const productRouter = require('./Routes/productRouter');
const categoryRouter=require('./Routes/categoryRouter')
const cartRouter=require('./Routes/cartRouter')

const app = express();

// Environment port
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors());


app.get('/', (req, res) => {
  res.send('Server is running');
});

// routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/cart',cartRouter)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


