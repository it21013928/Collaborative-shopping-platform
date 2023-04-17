const mongoose = require('mongoose')

const orderedProductsSchema = mongoose.Schema({

    OrderID:{
        type:String
    },
    ProductID:{
        type:String
    },
    Quantity:{
        type:Number
    },
    ProductName:{
        type:String
    }
})

const OrderedProducts = mongoose.model('orderedProducts', orderedProductsSchema)

module.exports = OrderedProducts;