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
    cusemail: req.body.cusemail,
    cusPhone: req.body.cusPhone,
  });
  const email = req.body.cusemail;
  const phone = req.body.cusPhone;
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(email);
  await sendEmail(
    email,
    "Order shipped",
    "Your order is shipped , track your order via our website"
  );
  await sendSMS(
    phone,
    "Your order is shipped , track your order via our website"
  );
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
