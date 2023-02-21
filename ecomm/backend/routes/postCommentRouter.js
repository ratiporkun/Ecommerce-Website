const router = require('express').Router()
let comments = require("../models/commentModel")




router.route('/').post(async (req,res)=>{
    const userName = req.body.userName
    const productName = req.body.productName
    const userComment = req.body.userComment
    const rate = req.body.rate

    let comment = new comments({
        userName: userName,
        productName: productName,
        comment: userComment,
        rate: rate,
        isVerified:false
    })

    comment.save((error) => {
        if (error) {
            throw error;
        }
    })
})


module.exports = router;