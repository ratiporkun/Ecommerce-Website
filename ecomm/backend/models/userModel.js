var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    token:String,
    isVerified:Boolean,
    isSalesManager:Boolean,
    isProductManager:Boolean,
},{timestamps:true})

var users = mongoose.model('users',userSchema)   

module.exports = users;