const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
  OrderID: { type: String },
  TrackingNo: { type: String },
  Status: { type: String },
  Date: {
    type: Date,
    default: Date.now,
    $dateToString: { fromat: "%Y-%m-%d %H:%M" },
  },
  fileName: {
    type: String,
  },
});

const Delivery = mongoose.model("delivery", deliverySchema);
module.exports = Delivery;
