const User = require('../models/userModel')
const momgoose = require('mongoose')

const Cart = require('../models/cart')
const Products = require('../models/productModel')

const createCart = async (req, res) => {

    const cart = new Cart({

        CustomerId: req.body.CustomerId,
        ItemNumber: req.body.ItemNumber,
        Quantity: req.body.Quantity
    });

    await cart.save();
    res.send(cart);
}