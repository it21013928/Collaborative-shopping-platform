const Order = require("../models/order");
const mongoose = require("mongoose");

//Create a new order
const createOrder = async (req, res) => {
  const order = new Order({
    CustomerID: req.body.cus_id,
    Status: req.body.status,
    CustomerName: req.body.recieverName,
    ShipingAddress: req.body.address,
    Phone: req.body.phoneNumber,
  });

  await order.save();
  res.send(order);
};

//Get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.status(200).json(orders);
};

//Get Paid orders
const getPaidOrders = async (req, res) => {
  const orders = await Order.find({ Status: "Paid" });
  res.status(200).json(orders);
};

//Get order by order ID
const getOrderByOrderId = async (req, res) => {
  const order = await Order.find({ _id: req.params.orderId });
  res.status(200).json(order);
};

//Delete order by id
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  var email = req.params.email;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Order.findOneAndDelete({ _id: id });

  if (!order) {
    return res.status(400).json({ error: "No such order" });
  }

  res.status(200).json(order);
};

//Update an order
const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  //var email = req.params.email;
  //sendEmail("sahanpradeeptha@gmail.com", 'Your order has been updated', `Dear valued customer, Your order has been successfully delivered to you.`)

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.Status = "Completed";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  deleteOrder,
  updateOrder,
  getPaidOrders,
};
