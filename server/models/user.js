import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    name:{
        type:mongoose.SchemaType.ObjectId,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});
