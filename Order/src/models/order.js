const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  CustomerID: { type: String },
  Status: { type: String },
  Date: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  ProductCount: { type: Number },
  CustomerName: { type: String },
  ShipingAddress: { type: String },
  Phone: { type: String },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;