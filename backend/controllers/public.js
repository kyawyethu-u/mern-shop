
const Product = require("../models/Product");

//filtered by category
exports.getProductCategories = async(req,res) =>{
    try{
        const productDocs = await Product.find({})
        return res.status(200).json({
            isSuccess: true,
            productDocs,
        })
    }catch(err){
        return res.status(422).json({
            isSuccess: false,
            message: err.message,
            }
        )
    }
}  


exports.getApprovedProducts = async(req,res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    try{
    const productDocs= await Product.find({status: "approve"}).sort({createdAt: -1}).skip((page - 1) * perPage).limit(perPage);
    const totalProducts = await Product.find({status: "approve"}).countDocuments();
    const totalPages = Math.ceil(totalProducts/perPage);
    return res.status(200).json({
        isSuccess: true,
        productDocs,
        totalPages,
        currentPage: page,
        totalProducts,
    })
    }catch(err){
    return res.status(422).json({
        isSuccess: false,
        message: err.message,
        })
    }}

//input box search
exports.getProductsByFilter = async(req,res) =>{
    try{
        const {searchKey,category} = req.query;
        const query ={};
        if(searchKey){
            query.name = {$regex: searchKey,$options: "i"}
        };
        if(category){
            query.category = category;
        };
        const productDocs = await Product.find({...query,status:"approve"});
        if(!productDocs || productDocs.length === 0){
            throw new Error("Product not found!")
        }
        return res.status(200).json({
            isSuccess: true,
            productDocs,
        })
        }catch(err){
        return res.status(404).json({
            isSuccess: false,
            message: err.message,
        })
    }
}
//detail page
exports.getProductById = async(req,res) =>{
    try{
        const productDoc = await Product.findById(req.params.id).populate("seller", "email name")
        if(!productDoc){
            throw new Error("Product not found")
        }
        return res.status(200).json({
            isSuccess: true,
            productDoc
        })
    }catch(err){
         return res.status(404).json({
                isSuccess: false,
                message: err.message
            })
    }
}