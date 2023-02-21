var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cSchema = new Schema({
    id: String,
    email:String,
    adress:String,
    country:String,
    state:String,
    zip:Number,
    nameonCard:String,
    creditcard:Number,
    expDate:Number,
    cvv:Number,
    items:[{productName:String, productQuantity:Number, productPrice:Number}],
    subTotal:Number,
    status:String,
},{timestamps:true})

var Purchases = mongoose.model('Purchases',cSchema)   

module.exports = Purchases;