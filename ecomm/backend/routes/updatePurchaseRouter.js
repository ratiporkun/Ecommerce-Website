const router = require('express').Router()
let purchase = require("../models/checkoutModel")


router.route('/').put( async (req,res)=>{
    const id = req.body.id;
    const adress = req.body.adress;
    try {
        await purchase.findByIdAndUpdate(id, {adress:adress})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;