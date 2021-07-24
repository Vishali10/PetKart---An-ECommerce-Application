const express=require('express');
const { isAuthenticated, isSignedIn } = require('../controllers/auth');
const router= express.Router();
const {makeStripePayment}=require('../controllers/stripepayment')
router.post('/stripepayment', makeStripePayment)

module.exports=router;