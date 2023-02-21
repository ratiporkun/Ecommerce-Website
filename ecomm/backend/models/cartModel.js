var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    email:String,
    productId: String,
    stock:Number,
    productName:String,
    productDetails:String,
    price:Number,
    quantity:Number,
    image:String
},{timestamps:true})

var cart = mongoose.model('cart',cartSchema)   

module.exports = cart;