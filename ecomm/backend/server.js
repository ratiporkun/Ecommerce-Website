const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json())

var mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Orkun:12345@cluster0.momyv.mongodb.net/Ecommerce?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true } 
,(error)=>{
  if(!error)
    console.log('connected')
})

const categoriesRouter = require("./routes/categoriesRouter")
const productsRouter = require("./routes/productsRouter")
const registerRouter = require("./routes/registerRouter")
const signinRouter = require("./routes/signinRouter")
const getCartRouter = require("./routes/getCartRouter")
const setCartRouter = require("./routes/setCartRouter")
const updateCartRouter = require("./routes/updateCartRouter")
const removeCartRouter = require("./routes/removeCartRouter")
const updatePassRouter = require("./routes/updatePassRouter")
const updateEmailRouter = require("./routes/updateEmailRouter")
const postPurchaseRouter = require("./routes/postPurchaseRouter")
const getPurchaseRouter = require("./routes/getPurchaseRouter")
const afterCheckoutRouter = require("./routes/afterCheckoutRouter")
const updateStockRouter = require("./routes/updateStockRouter")
const productManagerRouter = require("./routes/productManagerRouter")
const postCommentRouter = require("./routes/postCommentRouter")
const getCommentRouter = require("./routes/getCommentRouter")
const verifyCommentRouter = require("./routes/verifyCommentRouter")
const deleteCommentRouter = require("./routes/deleteCommentRouter")
const updateStatusRouter = require("./routes/updateStatusRouter")
const updateDiscountRouter = require("./routes/updateDiscountRouter")
const deletePurchaseRouter = require("./routes/deletePurchaseRouter")
const updatePurchaseRouter = require("./routes/updatePurchaseRouter")

app.listen(8080, () => {
  console.log('server is running at: 8080')
})

app.use("/updatediscount", updateDiscountRouter)
app.use("/updatestatus", updateStatusRouter)
app.use("/productmanager", productManagerRouter)
app.use("/getpurchase", getPurchaseRouter)
app.use("/postpurchase", postPurchaseRouter)
app.use("/updatemail", updateEmailRouter)
app.use("/updatepass", updatePassRouter)
app.use("/removecart", removeCartRouter)
app.use("/updatecart", updateCartRouter)
app.use("/getcart", getCartRouter)
app.use("/setcart", setCartRouter)
app.use("/signin", signinRouter)
app.use("/register", registerRouter)
app.use("/getCategories",categoriesRouter)
app.use("/getProducts",productsRouter)
app.use("/afterCheckout",afterCheckoutRouter)
app.use("/updateStock",updateStockRouter)
app.use("/addcomment",postCommentRouter)
app.use("/getcomment",getCommentRouter)
app.use("/verifycomment",verifyCommentRouter)
app.use("/deletecomment",deleteCommentRouter)
app.use("/deletepurchase",deletePurchaseRouter)
app.use("/updatepurchase", updatePurchaseRouter)