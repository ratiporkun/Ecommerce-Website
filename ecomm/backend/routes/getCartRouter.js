const router = require('express').Router()
let cart = require("../models/cartModel")

router.route('/').get((req,res)=>{
    cart.find()
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: ' + err));   
});

module.exports = router;