const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  deleteOrder,
  updateOrder,
  getPaidOrders,
} = require("../controllers/orderController");

const router = express.Router();

//Post a new order
router.post("/", createOrder);

//Get all orders
router.get("/", getAllOrders);

//Get paid orders
router.get("/paidOrders", getPaidOrders);

//Get order by order ID
router.get("/getorderbyorderid/:orderId", getOrderByOrderId);

//Delete order by id
router.delete("/:id", deleteOrder);

//Update a new order
router.patch("/:id", updateOrder);

module.exports = router;
