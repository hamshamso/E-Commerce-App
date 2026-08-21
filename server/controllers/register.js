import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const registeruser = async(req,res) => {
    try {
        const {name,email,password,phone} = req.body  || {} //protect from empty reqs
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success:false, msg:"email is already exist"})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const newuser = await User.create({
            name,
            email,
            password:hashedpassword,
            phone})
        const token = jwt.sign({
        //put the smallest you can in payload no user needed so in protect midelware we will check like this decoded.id instead of decoded.user.id
            id:newuser._id,     //save the newuser id in payload
        },process.env.JWT_SECRET,
        {expiresIn:"7d"}
        )
        res.status(201).json({success:true,msg:"User created successfully", data:{name,email},token})
    } catch (error) {
        console.error(error)
        res.status(400).json({success:false, msg:"Somthing went wrong"})
    }
}
export default registeruser