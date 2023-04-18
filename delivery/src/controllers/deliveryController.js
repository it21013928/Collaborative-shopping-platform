const Delivery = require("../models/delivery");
const mongoose = require("mongoose");

//Create a new order
const createDelivery = async (req, res) => {
  const delivery = new Delivery({
    OrderID: req.body.orderId,
    TrackingNo: req.body.trackingNo,
    Status: req.body.status,
    fileName: req.body.file,
  });

  await delivery.save();
  res.send(delivery);
};

module.exports = {
  createDelivery,
};
