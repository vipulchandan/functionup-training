const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
const ProductController= require("../controllers/productController")
const OrderController= require("../controllers/orderController")

const commonMW = require ("../middlewares/commonMiddlewares")
const headerValidation = require("../middlewares/headerValidation");

router.post("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.abc, UserController.basicCode, commonMW.mid4)

router.post("/createProduct", ProductController.createProduct)
router.get("/getAllProducts", ProductController.getAllProducts)

router.post("/createUser", headerValidation.validateHeader, UserController.createUser);
router.get("/getAllUsers", UserController.getAllUsers);

router.post("/createOrder", headerValidation.validateHeader, OrderController.createOrder);
router.get("/getAllOrders", OrderController.getAllOrders);

module.exports = router;