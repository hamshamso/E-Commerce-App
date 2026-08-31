import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,
    },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    total:{type:Number,required:true},
    adress:{type:String,required:true},
    phone:{type:Number,required:true},
    status:{type:String,enum:['pending','confirmed','shipped','delivered','cancelled'],required:true,default:'pending',}
},{timestamps:true});

const order = mongoose.model('Order',orderschema)
export default order