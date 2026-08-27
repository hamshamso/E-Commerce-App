import Product from "../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, wilaya, phone } = req.body;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      console.log(product); // just to see it's working, for now
    }

  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
export {createOrder};