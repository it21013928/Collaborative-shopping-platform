const EventEmitter = require('events');

// Create an EventEmitter instance
const emitter = new EventEmitter();

// Set the maximum number of listeners to 20
emitter.setMaxListeners(20);

const User = require('../../../user/src/models/userModel')
const mongoose = require('mongoose')

const CART = require('../models/cart');
const InventoryProducts = require('../../../product/src/models/productModel')

const createCart = async (req, res) => {
    const cart = new CART({
        customer_id: req.body.customer_id,
        Item_number : req.body.Item_number,
        quantity: req.body.quantity,
        unitPrice:req.body.unitPrice
    });

    await cart.save();
    res.send(cart);
};


const getCart = async (req, res) => {
    const cart = await CART.find({customer_id:req.params.cID });
    res.send(cart);
}

const getAllCart = async (req, res) => {
    const cart = await CART.find({customer_id:req.params.cID});
    var product = [];
    for (var i = 0; i < cart.length; i++) {
    product.push(await InventoryProducts.findById(cart[i].Item_number))
    }
    var final = [];
    console.log(product);
    for (let i = 0; i < cart.length; i++) {
        final.push({product_id:product[i]._id,product_name:product[i].product_name, unit_price:product[i].unit_price, quantity:cart[i].quantity})
    }
    res.send(final);

}

const updateCart= async (req, res) => {
    const cart = await CART.findOneAndUpdate(
        {Customer_id:req.params.customerID , Item_number:req.params.productID},
        {
            customer_id: req.body.customer_id,
            Item_number : req.body.Item_number,
            quantity: req.body.quantity
        },
        {new:true}
    );

    res.send(cart);
};

//Delete from cart
const deleteCart =async (req, res) => {
    const cart = await CART.findOneAndDelete({customer_id:req.params.customer_id, id:req.params.id})

    res.send(cart);
    console.log(req.params.customer_id)
    console.log(req.params.Item_number)
};

//Delete all cart from user
const deleteAllCartFromUser = async (req, res) => {
    try {
        await CART.deleteMany({ customer_id: req.params.customer_id });
        res.status(200).json({ message: "All items deleted from cart successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete items from cart." });
    }

}

module.exports = { 
 
    createCart,
    updateCart,
    getCart,
    getAllCart,
    deleteCart,
    deleteAllCartFromUser 
    
}