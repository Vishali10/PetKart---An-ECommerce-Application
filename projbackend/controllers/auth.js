var express = require('express');
const { Mongoose } = require('mongoose');
const User=require('../models/user');
const { validationResult, cookie } = require("express-validator");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signUp=(req,res)=>
{

    const user= new User(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({ //422-database error
           error:errors.array()[0].msg,
            
    })
}
    user.save((err,user)=>{
        if(err)
        res.status(400).json(
            {
                err:"Unable to save to database"
            }
        )
        res.json({  
            name:user.name,
            lastname:user.lastname,
            email:user.email,
            id:user._id
        });
    });
}
exports.signIn=(req,res)=>
{
    const {email, password}= req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({ //422-database error
           error:errors.array()[0].msg,
         
    })
}
    User.findOne({email}, (err,user)=>
    {
        if(err || !user)
        {
            return res.status(400).json("User does not exist");
        }
        if(!user.authenticate(password))
        {
            return res.status(401).json("Incorrect Password")
        }
        //creating token
        var token = jwt.sign({ _id:user._id }, process.env.SECRET);
        //putting token in cookie
        res.cookie("token",token, {expire:new Date()+ 9999});
        //sending response to front end
        const {_id, name, email, role}=user;
        return res.json({token, user: { _id, name, email, role}})
    })
}
exports.signOut=(req,res)=>
{
    res.clearCookie("token");
    res.json({
        message: "User Signed Out Successfully"
    })
}
//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
  });


//custom middleware
exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker)
    {
        return res.status(403).json("ACCCESS DENIED"); //forbidden
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0)
    {
        return res.status(403).json("ADMIN ACCESS PRIVILIGES DENIED");
    }
    next();
}