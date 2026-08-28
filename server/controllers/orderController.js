import Order from "../models/order.js";
import Product from "../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, wilaya, phone } = req.body;
    
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ success: false, msg: `Product ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ success: false, msg: `Not enough stock for ${product.name}` });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
      total = total + product.price * item.quantity;

    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      total,
      wilaya,
      phone,
    });

    return res.status(201).json({ success: true, data: order });
  } catch (ozi) {
    return res.status(400).json({ success: false, msg: ozi.message });

  }
};
export {createOrder};