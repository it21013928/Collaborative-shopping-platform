const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
  OrderID: { type: String },
  TrackingNo: { type: String },
  Date: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  serviceName: { type: String },
  expectedDate: { type: String },
  status: { type: String },

  cusemail: {
    type: String,
  },
  cusPhone: {
    type: String,
  },
});

const Delivery = mongoose.model("delivery", deliverySchema);
module.exports = Delivery;
