const router = require('express').Router()
let Users = require("../models/userModel")
router.route('/').get((req,res)=>{
    Users.find()
        .then(Users => res.json(Users))
        .catch(err => res.status(400).json('Error: ' + err));   
});

module.exports = router;