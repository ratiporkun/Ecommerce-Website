const router = require('express').Router()
const mailgun = require("mailgun-js");
let checkout = require("../models/checkoutModel")
const DOMAIN = 'sandboxf327dc2ec07440dc8e5fc089bf635a58.mailgun.org';
const api_key = "4ea461c42d265660683a51b36e94f20f-c50a0e68-9c3391bf";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
router.route('/').put(async (req, res) => {
    const status = req.body.status;
    const id = req.body.id;
    try {
        await checkout.findByIdAndUpdate(id, { status: status })
    } catch (error) {
        console.log(error)
    }
    
    const email = req.body.email
    
    if (status == "On Delivery") {
        const data = {
            from: 'noreply@webosmans.com',
            to: email,
            subject: 'Akelyos.com - Order status changed',
            html: `<h3>Order Id: ${id}</h3> 
            <h2>Your order has been shipped. It will arrive in 1-3 business days on average.</h2>`
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                return res.json({
                    messages: error.message
                })
            }
            return res.json({ message: 'E-mail has been sent, kindly activate your account.' })
        });
    } else if (status == "Delivered") {
        const data = {
            from: 'noreply@webosmans.com',
            to: email,
            subject: 'Akelyos.com - Order status changed',
            html: ` <h3>Your order has been delivered. Please share your feedback with us and the community by rating your products.</h3>`
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                return res.json({
                    messages: error.message
                })
            }
            return res.json({ message: 'E-mail has been sent, kindly activate your account.' })
        });
    }

});

module.exports = router;