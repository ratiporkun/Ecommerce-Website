const router = require('express').Router()
const mailgun = require("mailgun-js");
let checkout = require("../models/checkoutModel")
const DOMAIN = 'sandboxf327dc2ec07440dc8e5fc089bf635a58.mailgun.org';
const api_key = "4ea461c42d265660683a51b36e94f20f-c50a0e68-9c3391bf";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

router.route('/').post((req,res)=>{
let checkoutItem = new checkout({
    id:req.body.id,
    email:req.body.email,
    adress:req.body.adress,
    country:req.body.country,
    state:req.body.state,
    zip:req.body.zip,
    nameonCard:req.body.nameonCard,
    creditcard:req.body.creditcard,
    expDate:req.body.expDate,
    cvv:req.body.cvv,
    items:req.body.items,
    subTotal:req.body.subTotal,
    status:req.body.status,
})

checkoutItem.save((error)=>{
        if(error){
            throw error;
        }
    })
    var text = ""
    var totalprice = 0
    const arr = req.body.items
    arr.forEach(element => {
        text = text + element.productName + 'x' + element.productQuantity + ' $' + element.productPrice + ' each <br>'
    });
    arr.forEach(element => {
        totalprice += element.productPrice*element.productQuantity
    });
    const data = {
        from: 'noreply@webosmans.com',
        to: req.body.email,
        subject: 'Invoice for your purchase at Akelyos.com',
        html: ` <h2>Akelyos</h2>
                <p>Shipping Adress: ${req.body.adress} </p>
                <p>Items Purchased:</p>
                <p>${text}</p>
                <h3>Total Price: $${totalprice}</h3>
                <p>Payment Method: Credit Card</p>`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            return res.json({
                messages: error.message
            })
        }
        return res.json({message: 'E-mail has been sent, kindly activate your account.'})
    });
});

module.exports = router;