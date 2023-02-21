const register = require('express').Router()
let users = require("../models/userModel")
const jwt = require('jsonwebtoken')
const mailgun = require("mailgun-js");
const { restart } = require('nodemon');
const DOMAIN = 'sandboxf327dc2ec07440dc8e5fc089bf635a58.mailgun.org';
const api_key = "4ea461c42d265660683a51b36e94f20f-c50a0e68-9c3391bf";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
const JWT_KEY = "verysecretkey9696"
const client_url = "http://localhost:3000"
register.route('/').post((req, res) => {
    

    const {name, email, password} = req.body;
    const token = jwt.sign({name, email, password}, JWT_KEY, {expiresIn : '20m'});
    let user = new users({
        name: name,
        email: email,
        password: password,
        token: token,
        isVerified: false,
        isSalesManager:false,
        isProductManager:false,
    })

    const link = "localhost:8080/register/auth?token=${token}"
    const data = {
        from: 'noreply@webosmans.com',
        to: email,
        subject: 'Account Activation Link',
        html: ` <h2>Please click on link to activate your account</h2>
                <a href="http://${req.headers.host}/register/auth?token=${token}"> Activate your account </a>`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            return res.json({
                messages: error.message
            })
        }
        return res.json({message: 'E-mail has been sent, kindly activate your account.'})
    });

    user.save((error) => {
        if (error) {
            throw error;
        }
    })
});

register.get('/auth', async(req, res, next) => {
    try {
        const user = await users.findOne({token : req.query.token});
        if(!user){
            return res.redirect('/');
        }
        user.token = null;
        user.isVerified = true; 
        await user.save();
        return res.redirect('http://localhost:3000/signin/');

    } catch (error) {
        console.log(error)
    }
})

module.exports = register;