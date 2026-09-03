import Order from "../models/order.js";
import Product from "../models/Product.js";

//70% 
const createOrder = async (req, res) => {
  try {
    //req.params                     e.g. { id: "68f3a2..." } — the whole object
    //const {id} = req.params;     {} here = "pull out the field called id"
    //const orderId = req.params;    NO {} = orderId now IS the whole object, not just the id!
    const userId = req.user._id;
    const { items, adress, phone } = req.body;
    
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
      product.quantity = product.quantity - item.quantity
      product.save()
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      total,
      adress,
      phone,
    });

    return res.status(201).json({ success: true, data: order });
  } catch (ademozi) {
    return res.status(400).json({ success: false, msg: ademozi.message });

  }
};

const getMyOrders = async (req,res) => {
  try {
    const userId = req.user._id;
    const order = await Order.find({user: userId}).populate("items.product");
    //No need to if(order) cause .find even if DB is empty it returns []
    if(order){
      return res.status(200).json({success:true, data:order, msg:"This is your current order"})
    }
    return res.status(404).json({msg:"You have no orders"})
  } catch (ademozi) {
    return res.status(400).json({success: false, msg:ademozi.message})
  }
}
const getAllOrders = async (req,res) => {
  try {
    const orders = await Order.find({})
    //No need to if(order) cause .find even if DB is empty it returns []
    return res.status(200).json({success:true, data:orders, msg:"This is all orders!"})
  } catch (ademozi) {
    return res.status(400).json({success: false, msg:ademozi.message})
  }
}

const updateOrderStatus = async(req,res) => {
  //Only admin can access this function
  try {
    const orderId = req.params.id
    const {status} = req.body
    const validStatuses = ['pending','confirmed','shipped','delivred','cancelled']
    if(!orderId){
      return res.status(404).json({success:false ,msg:"Please enter the Order ID"})
    }
    const order = await Order.findById(orderId)
    if(!order){
      return res.status(404).json({success:false ,msg:"No order matches this ID!"})
    }
    if(!validStatuses.includes(status)){
      return res.status(403).json({success:false, msg:`Please enter a valid status like :${validStatuses}`})
    }
    order.status = status
    await order.save()
    //elso we can use Order.findById(id, {status:status}, { new:true, runValidators:true }) 
    //runValidators:true so no need to validStatuses array 
    //I didn't use it cause of learning a new stuffs
    return res.status(200).json({success:true, data:order, msg:"Order status is updated successfully"})
  } catch (ademozi) {
      return res.status(400).json({success: false, msg:ademozi.message})
  }
}
const getProductsInfo = async(req,res) => {
  try{
    const userId = req.user?._id || req.user?.id || req.user;
    const orderId = req.params.id
    const order = await Order.findById(orderId).populate("items.product", "image category");

    if(order){
      if(order.user.toString() === userId.toString()){
        return res.status(200).json({success:true, data:order, msg:"Successfully get the product img and category"})
      }
      return res.status(401).json({success:false,msg:"You're unauthorized to view this order"})
    }
    return res.status(404).json({seccess:false, msg:"Order not found"})
  }catch(ademozi){
    res.status(400).json({ademozi})
  }
}
export {createOrder,getMyOrders,updateOrderStatus,getAllOrders,getProductsInfo};