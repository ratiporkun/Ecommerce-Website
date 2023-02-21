const router = require('express').Router()
let cart = require("../models/cartModel")


router.route('/').put(async (req,res)=>{
    const id = req.body.id;
    try {
       await cart.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
   
});

module.exports = router;