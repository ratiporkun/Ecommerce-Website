const router = require('express').Router()
let cart = require("../models/cartModel")


router.route('/').post((req,res)=>{
let cartItem = new cart({
    email:req.body.email,
    productId:req.body.productId,
    stock: req.body.stock,
    productName:req.body.productName,
    productDetails:req.body.productDetails,
    price:req.body.price,
    quantity:1,
    image:req.body.image
})
    try {
        cartItem.save()
        res.status(200).send("Ok");
    } catch (error) {
        console.log(error)
        res.status(404).send("Item Not Found");
    }
});


module.exports = router;