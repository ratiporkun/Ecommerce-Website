const router = require('express').Router()
let comment = require("../models/commentModel")


router.route('/').put( async (req,res)=>{
    const id = req.body.id;
    try {
        await comment.findByIdAndUpdate(id, {isVerified:true})
        res.status(200).send("Ok");
    } catch (error) {
        console.log(error)
        res.status(404).send("Item Not Found");
    }
});

module.exports = router;