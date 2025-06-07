const {Router} = require("express")
const {body} = require("express-validator")

const router= Router();
const adminController = require("../controllers/admin")
const adminMiddleware = require("../middlewares/isAdmin")
const authMiddleware = require("../middlewares/auth")

//get all products
//GET /admin/products
router.get("/products",authMiddleware,adminMiddleware,adminController.getAllProducts)

//approve product
//POST /admin/product-approve/:id
router.post("/product-approve/:id",authMiddleware,adminMiddleware,adminController.approveProduct)

//reject product
//POST /admin/product-reject/:id
router.post("/product-reject/:id",authMiddleware,adminMiddleware,adminController.rejectProduct)

//rollback product
//POST /admin/product-rollback/:id
router.post("/product-rollback/:id",authMiddleware,adminMiddleware,adminController.rollbackProduct)

//get user list
//GET /admin/users
router.get("/users",authMiddleware,adminMiddleware,adminController.getUsers)

//ban user
//POST /admin/ban-user/:id
router.post("/ban-user/:id",authMiddleware,adminMiddleware,adminController.banUser)

//unban user
//POST /admin/unban-user/:id
router.post("/unban-user/:id",authMiddleware,adminMiddleware,adminController.unbanUser)

module.exports=router;
