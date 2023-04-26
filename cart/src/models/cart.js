const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    
customer_id:{type:String},
ProductID:{type:String},
Item_number:{type:String},  
quantity:{type:Number},
unitPrice:{type:Number},
sellerID:{type:String}

})


const CART = mongoose.model('carts',cartSchema)

module.exports = CART;



