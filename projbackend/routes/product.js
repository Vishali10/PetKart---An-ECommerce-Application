const express=require('express');
const router= express.Router();
const {getProductById, createProduct, deleteProduct, getProduct, getProductImage, updateProduct, getAllProducts, getUniqueCategories}=require('../controllers/product')
const {isSignedIn, isAuthenticated, isAdmin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')

//params
router.param('userId',getUserById);
router.param('productId',getProductById);



//actual routes
router.post("/product/createProduct/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct)

router.get('/products/:productId', getProduct);
router.get('/products/photo/:productId', getProductImage);


router.put('/products/:productId/:userId',isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.delete('/products/:productId/:userId',isSignedIn, isAuthenticated, isAdmin,deleteProduct);

//listing
router.get('/products',getAllProducts);

//get Categories - unique
router.get('/product/categories', getUniqueCategories)
module.exports=router;