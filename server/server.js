import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js';
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api',productRouter);  //then in productRouter use ('/products') and ('/products/:id')
app.use('/api',orderRouter);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();