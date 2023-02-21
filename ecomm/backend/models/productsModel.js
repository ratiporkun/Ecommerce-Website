var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pSchema = new Schema({
    cName: String,
    name:String,
    description:String,
    price:Number,
    gender:String,
    brand:String,
    stock:Number,
    rating:Number,
    image1:String,
    image2:String,
    discountRate:Number
},{timestamps:true})

var Products = mongoose.model('Products',pSchema)   

module.exports = Products;