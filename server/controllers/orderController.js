import { useInsertionEffect } from "react";
import Order from "../models/order.js";
import Product from "../models/Product.js";

const createOrder = async (req, res) => {
  try {
    //req.params                     e.g. { id: "68f3a2..." } — the whole object
    //const { id } = req.params;    {} here = "pull out the field called id"
    //const orderId = req.params;    NO {} = orderId now IS the whole object, not just the id!
    const userId = req.user._id;
    const { items, wilaya, phone } = req.body;
    
    let orderItems = [];
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

const getMyOrders = async (req,res) => {
  try {
    const userId = req.user._id;
    
    const userOrders = await Order.find({ user:userId })

    if(userOrders.length > 0){
      return res.status(200).json({success:true, data:userOrders, msg:"This is your current order"})
    }
    return res.status(404).json({success:false,msg:"You don't have any orders yes, Go to shop and buy some stuff to see it here!"})
  } catch (ozi) {
    return res.status(400).json({success: false, msg:ozi.message})
  }
}
const getOredersWithId = async (req,res) => {
  try {
    const {orderId} = req.params  
    if(!orderId){
      return res.status(404).json({success:false,msg:"User ID is inccorect"})
    }
    const userOrders = await Order.findById(orderId)

    if(userOrders){
      //only admin or matched users with thier orders id can view the requested order
      if(req.user._id.toString() !== userOrders.user.toString() && user.role !== "admin"){
        return res.status(401).json({success:false,msg:"You are not authorized to view this order"})
      }
      return res.status(200).json({success:true, data:userOrders, msg:"This is the current user order"})
    }
    return res.status(404).json({success:false,msg:"This user have no orders yet!"})
  } catch (ozi) {
    return res.status(400).json({success: false, msg:ozi.message})
  } 
}

export {createOrder,getMyOrders,getOredersWithId};