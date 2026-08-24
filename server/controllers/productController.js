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
        const id = req.params.id
        const product = await Product.findOne({_id: id})//or Product.findById(id)
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
    const updateProduct = async(req,res) => {
        try {
            const id = req.params.id 
            const updatedfields = req.body
            if(id && updatedfields){                                        //new = return the updated products
                const newproduct = await Product.findByIdAndUpdate(id, updatedfields, {new:true, runValidators: true})
                return res.status(200).json({                                     //to Apply the shema rules
                    success:true,
                    data:newproduct,
                    msg:`Successfully created the product`})                                 
            }
            return res.status(404).json({uccess:false ,msg:`Id ${id} doesn't exist or no update data`})
        } catch (error) {
            return res.status(400).json({success:false,msg: error.message})
        }
    }
    const deleteProduct = async (req,res) => {
        try {
            const id = req.params.id
            if(id){
                await Product.findByIdAndDelete(id)
                return res.status(200).json({success:true, msg:"Product has been successfully deleted"})
            }
            return res.status(404).jsob({success:false ,msg:`Id ${id} doesn't exist`})
        } catch (error) {
            return res.status(400).json({success:false,msg: error.message})
        }
    }
    const getAllProductsWithCategory = async (req,res) => {
        try{
            const {category} = req.query
            if(category){
                const products = await Product.find({category})
                if(products.length > 0 ){
                     return res.status(200).json({success:true, data:products, msg:"Product has been successfully geted"})
                }
                return res.status(404).json({success:false , msg: `No products with category ${category}`})
            }
            if(!category){
                return res.status(404).json({success:false ,msg:"Please choose a category"})
            }
            return res.status(404).json({success:false ,msg:`Category ${category} doesn't exist`})
        }catch(e){
            return res.status(400).json({success:false,msg: error.message})
        }
    }
export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getAllProductsWithCategory};