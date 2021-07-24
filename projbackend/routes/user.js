const express=require('express');
const router= express.Router();
const {getUserById, getUser, updateUser, userOrders} = require('../controllers/user')
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const { route } = require('./auth');

router.param('userId',getUserById);


router.get('/users/:userId',isSignedIn, isAuthenticated, getUser)

router.put('/users/:userId',isSignedIn, isAuthenticated, updateUser)
router.get('/users/:userId/orders',isSignedIn, isAuthenticated, userOrders)

module.exports=router;
