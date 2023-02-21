const router = require('express').Router()
let Products = require("../models/productsModel")
router.route('/').get((req,res)=>{
    Products.find()
        .then(Products => res.json(Products))
        .catch(err => res.status(400).json('Error: ' + err));   
});

module.exports = router;