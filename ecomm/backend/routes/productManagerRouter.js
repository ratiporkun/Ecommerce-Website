const router = require('express').Router()
let products = require("../models/productsModel")


router.route('/updateproduct').put( async (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const stock = req.body.stock
    const description = req.body.description
    try {
        await products.findByIdAndUpdate(id, {name:name,price:price,stock:stock,description:description})
    } catch (error) {
        console.log(error)
    }
});

router.route('/deleteproduct').put( async (req,res)=>{
    const id = req.body.id
    try {
        await products.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
});

router.route('/addproduct').post(async (req,res)=>{
    const cname = req.body.cName
    const name = req.body.name
    const price = req.body.price
    const stock = req.body.stock
    const rating = req.body.rating
    const image1 = req.body.image1
    const image2 = req.body.image2
    const description = req.body.description
    const gender = req.body.gender
    const brand = req.body.brand

    let product = new products({
        cName: cname,
        name: name,
        price: price,
        stock: stock,
        rating: rating,
        image1: image1,
        image2: image2,
        description: description,
        gender: gender,
        brand: brand,
        discountRate: 0
    })

    product.save((error) => {
        if (error) {
            throw error;
        }
    })
})

// router.route('/deleteproduct').put(async (req,res)=>{
//     const id = req.body.id;
//     try {
//        await products.findByIdAndRemove(id)
//     } catch (error) {
//         console.log(error)
//     }
   
// });

module.exports = router;