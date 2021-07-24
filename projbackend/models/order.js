const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
var orderSchema= new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
      },
    transaction_id: {
        cod:Boolean
    },
    delivery_charges:{
        type:Number,
        default:0
    },
    amount:{
        type:Number
    },
    address:
    {
        type:String,
        maxlength:2000,

    },
    updated:Date,
    user:
    {
        type:ObjectId,
        ref:"User"
    },
    status:
    {
        type: String,
        default: "Ordered",
        enum:["Ordered", "Processing" ,"Shipped", "Dispatched", "Out for Delivered", "Cancelled", "Delivered"]
    }
},{timestamps:true});
module.exports=mongoose.model("Order",orderSchema);