const Delivery = require("../models/delivery");
const mongoose = require("mongoose");
const { sendEmail } = require("../services/deliveryServices");
const { sendSMS } = require("../services/deliveryServices");

//Create a new order
const createDelivery = async (req, res) => {
  const delivery = new Delivery({
    OrderID: req.body.orderId,
    TrackingNo: req.body.trackingNo,
    serviceName: req.body.serviceName,
    expectedDate: req.body.expectedDate,
    status: req.body.status,
    fileName: req.body.file,
  });

  await sendEmail(
    "shehangunasekara2019@gmail.com",
    "Order shipped",
    "Your order is shipped"
  );
  // await sendSMS("94764103928", "testing API");
  await delivery.save();
  res.send(delivery);
};

const getDelivery = async (req, res) => {
  const order = await Delivery.find({ OrderID: req.params.orderId });
  res.status(200).json(order);
};

module.exports = {
  createDelivery,
  getDelivery,
};
