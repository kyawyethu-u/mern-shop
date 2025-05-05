const {Router} = require("express")
const {body} = require("express-validator")

const router = Router()

const productController = require("../controllers/product")
const authMiddleware = require("../middlewares/auth")

//add product
//POST /create-product
router.post("/create-product",authMiddleware,[
     body("product_name").trim().notEmpty().withMessage("Product name must have!"),
     body("product_description").trim().notEmpty().withMessage("Product description must have!"),
     body("product_price").trim().notEmpty().withMessage("Product price must have!"),
     body("product_category").trim().notEmpty().withMessage("Category must have!"),
     body("product_usedFor").trim().notEmpty().withMessage("Product usedFor must have!"),
     body("product_details").isArray().withMessage("Product details must array!"),
    ],productController.addNewProduct);

//get all products
// GET /products
router.get("/products",authMiddleware,productController.getAllProducts)


module.exports = router;