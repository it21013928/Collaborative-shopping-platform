const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    CustomerID:{type:String},
    Status: { type: String },
    Date:{type: Date, default: Date.now, $dateToString:{fromat:"%Y-%m-%d %H:%M"}},
    
    CustomerName: { type: String },
    ShipingAddress: { type: String },
    Phone : { type: String },
    
    
});


const Order = mongoose.model('order', orderSchema)
module.exports = Order;