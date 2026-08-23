import Product from "../models/Product.js" //add .js because of ES Module

 const getAllProducts = async (req,res) => {
    try{
        const allProducts = await Product.find() 
        if(!allProducts){
        return res.status(404).json({success:false,msg:"No Products yet"})
        }
        return res.status(200).json({success:true,data:allProducts,msg:"Successfully get all products"})
    }catch(e){
        return res.status(400).json({success:false,msg:"Somthing went wrong"})
    }
}
 const getProductById = async (req,res) => {
    try {
        const p = req.params.id
        const product = await Product.findOne({_id: p})
        if(!product){
           return res.status(404).json({success:false,msg:`Product isn't found`})
        }
        return res.status(200).json({success:true,data:product,msg:`Successfully getting the product ${product.name}`})
    } catch (error) {
        return res.status(400).json({success:false,msg: error.message})
    }
}

 const createProduct = async (req,res) => {
    try {
        const {name,price,quantity,category,image} = req.body
        if(!name|| !price || !quantity || !category || !image){
            return res.status(405).json({success:false,msg:`Please complete all fields`})
        }
        const product = await Product.create({name,price,quantity,category,image})
        return res.status(201).json({
                success:true,
                data:{name,price,quantity,category,image},
                msg:`Successfully created product ${product.name}`})
    } catch (error) {
        return res.status(400).json({success:false,msg: error.message})
    }
}
export { getAllProducts, getProductById, createProduct };