const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {objectId}=mongoose.Schema;
var CartProductSchema=Schema.new({
    product:
    {
        type:ObjectID,
        ref:"Product"
    },
    name: String,
    quantity: Number,
    price:Number,
    size:
    {
        type:String,
        required:false,
    }
},{timestamps:true});
module.exports=mongoose.model("CartProduct",CartProductSchema)