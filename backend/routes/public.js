const {Router} = require("express")
const publicController = require("../controllers/public")

const router = Router()

//Get product's categories
// // Get /api/categories
router.get("/categories",publicController.getProductCategories)

//get all product
//GET /api/products
router.get("/products",publicController.getApprovedProducts)

//get products by filters
//GET /api/products/filters
router.get("/products/filters",publicController.getProductsByFilter)


//get product by id
//GET /api/products/:id
router.get("/products/:id",publicController.getProductById)




module.exports = router;