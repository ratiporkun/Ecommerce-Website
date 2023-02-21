var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    userName:String,
    productName:String,
    comment:String,
    rate:Number,
    isVerified: Boolean

},{timestamps:true})

var comments = mongoose.model('comment',commentSchema)   

module.exports = comments;