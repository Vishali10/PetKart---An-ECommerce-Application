const express = require("express");
const router = express.Router();
const { getCategoryById, createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routes
//create Category
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
  );

//get One or All Categories
router.get(
    "/category/:categoryId",
    getCategory
  );

router.get(
    "/category/",
    getAllCategories
  );
  
//update Category Name
router.put("/category/:categoryId/:userId", isSignedIn,
isAuthenticated,
isAdmin,
updateCategory);


//Delete Category
router.delete("/category/:categoryId/:userId", isSignedIn,
isAuthenticated,
isAdmin,
deleteCategory);

module.exports = router;