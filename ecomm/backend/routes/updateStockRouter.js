const router = require('express').Router()
let product = require("../models/productsModel")


router.route('/').put( async (req,res)=>{
    const id = req.body.id;
    const decrease = req.body.decrease;
    const stock = req.body.stock;
    try {
        await product.findByIdAndUpdate(id, {stock:stock-decrease})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;