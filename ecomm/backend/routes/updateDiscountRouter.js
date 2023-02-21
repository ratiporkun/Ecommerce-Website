const router = require('express').Router()
let product = require("../models/productsModel")


router.route('/').put( async (req,res)=>{
    const id = req.body.id;
    const discountRate = req.body.discountRate;
    console.log(discountRate)
    try {
        await product.findByIdAndUpdate(id, {discountRate:discountRate})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;