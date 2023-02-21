const router = require('express').Router()
let comment = require("../models/commentModel")

router.route('/productmanager').get((req,res)=>{
    comment.find({isVerified:false})
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/productcomment').get((req,res)=>{
    comment.find()
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));   
});
module.exports = router;