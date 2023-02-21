const router = require('express').Router()
let purchase = require("../models/checkoutModel")


router.route('/').put(async (req,res)=>{
    const id = req.body.id;
    try {
       await purchase.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
   
});

module.exports = router;