const router = require('express').Router()
let categories = require("../models/categoriesModel")
router.route('/').get((req,res)=>{
    categories.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));   
});

module.exports = router;