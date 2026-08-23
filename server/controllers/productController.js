import Product from "../models/product"

export const getAllProducts = async (res,req) => {
    try{
        const allProducts = await Product.find(product)
        if(!allProducts){
        return res.status(404).json({success:false,msg:"No Products yet"})
        }
        return res.status(200).json({success:true,data:allProducts,msg:"Successfully get all products"})
    }catch(e){
        return res.statu(400).json({success:false,msg:"Somthing went wrong"})
    }
}

export const getProductById = async (res,req) => {
    try {
        const p = req.params
        const product = Product.findOne(p)
        if(!product){
           return res.status(404).json({success:false,msg:`Product ${product} not found`})
        }
        return res.status(200).json({success:true,data:product,msg:`Successfully getting the product ${product}`})
    } catch (error) {
        return res.statu(400).json({success:false,msg:"Somthing went wrong"})
    }
}