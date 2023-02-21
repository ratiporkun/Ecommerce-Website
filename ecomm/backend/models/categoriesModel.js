var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cSchema = new Schema({
    name:String
},{timestamps:true})

var categories = mongoose.model('categories',cSchema)   

module.exports = categories;