const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
//DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTION SUCCESS!");
  });
const app = express();


//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//MY ROUTES
app.use("/eBuyapi", authRoutes);
app.use("/eBuyapi", userRoutes);
app.use("/eBuyapi", categoryRoutes);
app.use("/eBuyapi", productRoutes);
app.use("/eBuyapi", orderRoutes);
app.use("/eBuyapi", stripeRoutes);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Listening on port", port));
