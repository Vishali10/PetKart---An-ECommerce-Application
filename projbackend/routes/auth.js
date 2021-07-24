const express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signUp, signOut, signIn, isSignedIn } = require("../controllers/auth");
router.post(
  "/signup",
  check("name").isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
  check("email").isEmail().withMessage("Invalid Email"),
  check("password").isLength({ min: 7 }).withMessage("Password length must be greater than 7"),
  signUp
);
router.post(
  "/signin",
  check("email").isEmail().withMessage("Invalid Email"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
  signIn
);
router.get("/test",isSignedIn,(req,res)=>
{
  res.send(req.auth)
});
router.get("/signout", signOut);
module.exports = router;
