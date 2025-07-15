const {Router} = require("express")
const {body} = require("express-validator")

const router = Router()

const productController = require("../controllers/product")
const bidController = require("../controllers/bid")
const notificationController = require("../controllers/notification")
const authMiddleware = require("../middlewares/auth")

//add product
//POST /create-product
router.post("/create-product",authMiddleware,[
     body("product_name").trim().notEmpty().withMessage("Product name must have!"),
     body("product_description").trim().notEmpty().withMessage("Product description must have!"),
     body("product_price").trim().notEmpty().withMessage("Product price must have!"),
     body("product_category").trim().notEmpty().withMessage("Category must have!"),
     body("product_used_for").trim().notEmpty().withMessage("Product usedFor must have!"),
     body("product_details").isArray().withMessage("Product details must array!"),
    ],productController.addNewProduct);

//get all products
// GET /products
router.get("/products",authMiddleware,productController.getAllProducts)

//get old product(get single product for edit mode)
//GET /products/:id
router.get("/products/:id",authMiddleware,productController.getOldProduct)

//update product
//POST /update-product
router.post("/update-product",authMiddleware,[
    body("product_name").trim().notEmpty().withMessage("Product name must have!"),
    body("product_description").trim().notEmpty().withMessage("Product description must have!"),
    body("product_price").trim().notEmpty().withMessage("Product price must have!"),
    body("product_category").trim().notEmpty().withMessage("Category must have!"),
    body("product_used_for").trim().notEmpty().withMessage("Product usedFor must have!"),
    body("product_details").isArray().withMessage("Product details must array!"),
   ],productController.updateProduct)

//delete products
//DELETE /products/:id
router.delete("/products/:id",authMiddleware,productController.deleteProduct)

//upload product images
//POST /upload
router.post("/upload",authMiddleware,productController.uploadProductImages)

//get saved product images
//get /product-images/:id
router.get("/product-images/:id",authMiddleware,productController.getSavedImages)

//delete product images
//DELETE /product/images/destroy/:productId/:imgToDelete
router.delete("/product/images/destroy/:productId/:imgToDelete",authMiddleware,productController.deleteProductImages)

//save product
//POST /saved-products/:id
router.post("/saved-products/:id",authMiddleware,productController.savedProduct)

//get saved product
//GET /saved-products
router.get("/saved-products",authMiddleware,productController.getSavedProducts)

//delete saved product
//DELETE /unsaved-products/:id
router.delete("/unsaved-products/:id",authMiddleware,productController.unSavedProduct)

//save new bid
//POST /add-bid
router.post("/add-bid",[
     body("message").trim().notEmpty().withMessage("Message must have!"),
     body("phone").trim().notEmpty().withMessage("Phone number must have!"),
    ],authMiddleware,bidController.savedNewBid)

//get all bids
//GET /bids/:product_id
router.get("/bids/:product_id",bidController.getAllBids)  

//push noti
//POST /notify
router.post("/notify",authMiddleware,notificationController.pushNotification)

//get all notifications
router.get("/notifications",authMiddleware,notificationController.getNotifications)

module.exports = router;
