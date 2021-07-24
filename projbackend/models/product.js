const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const Schema=mongoose.Schema;
var productSchema= new Schema({
    name:
    {
        type:String,
        required:true,
        maxlength:50,
    },
    description:
    {
        type:String,
        required:true,
        maxlength:1000,
        trim:true
    },
    price:
    {
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },
    size:
    {
        type:String,
        required:false,
    },
    color:
    {
        type:String,
        required:false,
    },
    material:
    {
        type:String,
        required:false,
    },
    image:
    {
        data:Buffer,
        contentType:String,
        required:false
    },
    category:
    {
        type:ObjectId,
        ref:"Category",
        required:true,
    },
    stock:
    {
        type:Number,
        default:0
    },
    units_sold:
    {
        type:Number,
        default:0
    },
  
    rating:
    {
        type:Number,
        default:0,
        required:false,
        maxlength:1,
    },
    discount:
    {
        type:Number,
        required:false,
        default:0
    }
},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);