const router = require('express').Router()
let checkout = require("../models/checkoutModel")

router.route('/vieworders').get((req,res)=>{
    checkout.find()
        .then(checkout => res.json(checkout))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    checkout.find({id:id})
        .then(checkout => res.json(checkout))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;