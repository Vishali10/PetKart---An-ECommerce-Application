const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { resolveAny } = require("dns");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category") //according to category
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product Not found in Database",
        });
      }

      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "File not supported",
      });
    }

    //destructure the fields
    const {
      name,
      description,
      size,
      price,
      rating,
      category,
      stock,
      discount,
      color,
      material
    } = fields;
    if (
      !name ||
      
      !description ||
      !price ||
      !category ||
      !stock 
    ) {
      return res.status(400).json({
        error: "Please Enter all the fields",
      });
    }
    //todo: restrictions on fields
    let product = new Product(fields);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }
    //saving image to db
    product.save((err, product) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error: "Saving Product to DB failed",
        });
      }
      res.json(product);
    });
  });
};


exports.getProduct=(req,res)=>
{
  req.product.image="undefined";//dont load the bulky data now
  return res.json(req.product)
}



//middleware to return the bulky photo
exports.getProductImage=(req,res,next)=>
{
  if(req.product.image.data)
  {
    res.set("Content-Type", req.product.image.contentType)
    return res.send(req.product.image.data);
  }
  next();
}

exports.updateProduct=(req, res)=>
{
  let updationform = new formidable.IncomingForm();
  updationform.keepExtensions = true;

  updationform.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "File not supported",
      });
    }
    
    //updation
    let updatedproduct = req.product;
    updatedproduct=_.extend(updatedproduct, fields)

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      updatedproduct.image.data = fs.readFileSync(file.image.path);
      updatedproduct.image.contentType = file.image.type;
    }
    //saving image to db
    updatedproduct.save((err, updatedproduct) => {
      if (err) {
        res.status(400).json({
          error: "Updation failed",
        });
      }
      res.json(updatedproduct);
    });
  });
}

exports.deleteProduct=(req,res)=>
{
  const product=req.product;
  product.remove((err,delproduct)=>
  {
  if(err)
  {
    return res.status(401).json({
      error:"Unable to delete this product"
    })
  }
  return res.json({
    message:"Product Successfully Deleted",
    delproduct
  })
  })
}


exports.getAllProducts=(req, res)=>
{
  let limit=req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy=req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
  .sort([[sortBy, "asc"]])
  .populate("category")
  .select("-image")
  .limit(limit)
  .exec((err, productList)=>
  {
  if(err)
  {
    res.status(400).json({
      error:"No products found"
    })
  }
  res.json(productList);
  })

}

exports.updateStock=(req, res, next)=>
{
  let myOps=req.body.order.product.map(prod=>{
    return {
      updateOne:
      {
        filter:{_id: prod.id},
        update:{$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
  })
  Product.bulkWrite(myOps, {}, (err, product)=>
  {
    if(err)
    {
      return res.status(401).json({
        error:"Bulk Operations Failed"
      })
    }
  })
  next();
}



exports.getUniqueCategories=(req, res)=>
{
  Product.distinct("category")
  .exec((err,categories)=>
  {
    if(err)
    {
      res.status(400).json({
        error:"No unique category found"
      })

    }
    res.json(categories);
  })
}