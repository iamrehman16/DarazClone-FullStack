// server.js
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import connectDB from "./config.js"

import cors from "cors"
import authRouter from "./Routes/authRouter.js"
import productRouter from './Routes/productRouter.js';
import categoryRouter from'./Routes/categoryRouter.js'
import cartRouter from './Routes/cartRouter.js'

const app = express();

// Environment port
const PORT = process.env.PORT || 8080;

// Connect to database
await connectDB();

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


