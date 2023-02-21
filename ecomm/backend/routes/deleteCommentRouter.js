const router = require('express').Router()
let comment = require("../models/commentModel")


router.route('/').put(async (req,res)=>{
    const id = req.body.id;
    try {
       await comment.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
   
});

module.exports = router;