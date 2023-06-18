const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/product');

const Product = require('../models/product');

router.post('/', verifyToken ,async (req, res) => {
    var {code, sz39, sz40, sz41, sz42, sz43, price, priceStock } = req.body;
    if(!code)
    return res.status(400).json({
        success: false,
        message: "Code is require"
    })
    if(!priceStock)
    return res.status(400).json({
        success: false,
        message: "priceStock is require"
    })
    try {
        if(!sz39){
            sz39 = 0;
        }
        if(!sz40){
            sz40 = 0;
        }
        if(!sz41){
            sz41 = 0;
        }
        if(!sz42){
            sz42 = 0;
        }
        if(!sz43){
            sz43 = 0;
        }
        console.log(sz40);
        const newProduct = new Product({code, sz39, sz40, sz41, sz42, sz43, price, priceStock});
        await newProduct.save();
        res.status(200).json({
            code: 200,
            newProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error",
            error: error.keyValue
        })
    }
})
module.exports = router;