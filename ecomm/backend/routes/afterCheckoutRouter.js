const router = require('express').Router()
let cart = require("../models/cartModel")


router.route('/').put(async (req,res)=>{
    const email = req.body.email
    try {
       await cart.remove({email:email})
    } catch (error) {
        console.log(error)
    }
   
});

module.exports = router;