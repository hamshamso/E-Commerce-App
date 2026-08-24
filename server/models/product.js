import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Bags', 'Watches', 'Clothes', 'Accessories','Parfum','Phones','Cars','Other','Tools'],
    message: '{VALUE} is not a supported category' },
  image: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;