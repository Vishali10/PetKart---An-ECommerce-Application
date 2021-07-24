const express=require('express');
const app=express();
const port = 3000;
const admin=(req,res)=>
{
    return res.send("this is admin");
}
const isAdmin=(req,res,next)=>
{
    console.log("isAdmin is Running");
    next();
}
const isLoggedIn=(req,res,next)=>
{
    console.log("isLoggedIn is Running");
    next();
}
app.use(isLoggedIn);
app.get('/',(req,res)=>res.send("This is the Home page"));
app.get('/Login',(req,res)=>res.send("This is the login page"));
app.get('/Admin',isLoggedIn,isAdmin,admin);
app.get('/Signup',(req,res)=>res.send("Register here"));
app.get('/Signout',(req,res)=>res.send("You are signed out"));
app.listen(port,()=>console.log("Listening on port",port));