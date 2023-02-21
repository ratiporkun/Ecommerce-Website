const router = require('express').Router()
let user = require("../models/userModel")


router.route('/').put( async (req,res)=>{
    const id = req.body.id;
    const newPassword = req.body.password
    try {
        await user.findByIdAndUpdate(id, {password:newPassword})
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;