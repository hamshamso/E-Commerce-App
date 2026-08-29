import Order from "../models/order.js";
import Product from "../models/Product.js";

//70%

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
  } catch (ademozi) {
    return res.status(400).json({ success: false, msg: ademozi.message });

  }
};

const getMyOrders = async (req,res) => {
  try {
    const userId = req.user._id;
    
    const userOrders = await Order.find({ user:userId })

    if(userOrders){
      return res.status(200).json({success:true, data:userOrders, msg:"This is your current order"})
    }
    return res.status(404).json({success:false,msg:"You don't have any orders yes, Go to shop and buy some stuff to see it here!"})
  } catch (ademozi) {
    return res.status(400).json({success: false, msg:ademozi.message})
  }
}
const getOredersWithId = async (req,res) => {
  try {
    const {orderId} = req.params  
    if(!orderId){
      return res.status(404).json({success:false ,msg:"Please enter the Order ID"})
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
    const {orderId} = req.params
    const {sts} = req.body
    const validStatuses = ['pending','confirmed','shipped','delivred','cancelled']
    if(!orderId){
      return res.status(404).json({success:false ,msg:"Please enter the Order ID"})
    }
    const order = await Order.findById(orderId)
    if(!order){
      return res.status(404).json({success:false ,msg:"No order matches this ID!"})
    }
    if(!validStatuses.includes(sts)){
      return res.status(403).json({success:false, msg:`Please enter a valid status like :${validStatuses}`})
    }
    order.status = sts
    await order.save()
    //elso we can use Order.findById(id, {status:sts}, { new:true, runValidators:true }) 
    //runValidators:true so no need to validStatuses array 
    //I didn't use it cause of learning a new stuffs
    return res.status(200).json({success:true, data:order, msg:"Order status is updated successfully"})
  } catch (ademozi) {
      return res.status(400).json({success: false, msg:ademozi.message})
  }
}

export {createOrder,getMyOrders,getOredersWithId,updateOrderStatus,getAllOrders};