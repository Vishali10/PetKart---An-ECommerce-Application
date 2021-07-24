const express=require('express');
const router= express.Router();
const {isSignedIn, isAuthenticated, isAdmin}=require('../controllers/auth')
const {getUserById, pushOrdertoPurchaseList}=require('../controllers/user');
const {updateStock} =require('../controllers/product');
const {getOrderById, createOrder, getAllOrders, updateOrderStatus, getOrderStatus } = require('../controllers/order');


router.param("userId",getUserById)
router.param("orderId", getOrderById)

router.post('/orders/createOrder/:userId',isSignedIn, isAuthenticated, pushOrdertoPurchaseList ,updateStock, createOrder )

router.get('/orders/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders)

router.get('/orders/status/:userId',isSignedIn, isAuthenticated,getOrderStatus)
router.get('/orders/status/:userId',isSignedIn, isAuthenticated,isAdmin, getOrderStatus)
router.put('/orders/:orderId/status/:userId', isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)
module.exports=router;