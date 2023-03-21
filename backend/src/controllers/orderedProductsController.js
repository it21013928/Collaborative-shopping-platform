const mongoose = require('mongoose')

const orderedProducts = require('../models/orderedProducts');

//Create

const create = async(req, res) => {
    const orderedProduct = new orderedProducts({
        OrderID: req.body.orderId,
        ProductID: req.body.productId,
        Quantity: req.body.quantity,
        ProductName: req.body.productName

    });

    await orderedProduct.save();
    res.send(orderedProduct);
}


module.exports = {
    create
}