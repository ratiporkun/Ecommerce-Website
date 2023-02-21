const router = require('express').Router()
let cart = require("../models/cartModel")


router.route('/').put( async (req,res)=>{
    const id = req.body.id;
    const quantity = req.body.quantity
    try {
        await cart.findByIdAndUpdate(id, {quantity:quantity+1})
        res.status(200).send("Ok");
    } catch (error) {
        console.log(error)
        res.status(404).send("Item Not Found");
    }
});

module.exports = router;