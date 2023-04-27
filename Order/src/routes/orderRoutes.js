const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  deleteOrder,
  updateOrder,
  getOrdersByStatus,
  updateShippedOrder,
  updateProductCount,
  getShippedOrders,
  updateTrackingOrder,
  getOrdersByCusID,
} = require("../controllers/orderController");

const router = express.Router();

//Post a new order
router.post("/", createOrder);

//Get all orders
router.get("/", getAllOrders);

//Get  orders by status
router.get("/getOrdersByStatus/:status", getOrdersByStatus);

router.get("/getShippedOrders", getShippedOrders);

//Get order by order ID
router.get("/getorderbyorderid/:orderId", getOrderByOrderId);

router.get("/getOrdersByCusID/:customerID", getOrdersByCusID);

//Delete order by id
router.delete("/:id", deleteOrder);

//Update a new order
router.patch("/:id", updateOrder);
router.patch("/update/:id", updateShippedOrder);
router.patch("/updateCount/:id", updateProductCount);
router.patch("/updateTrackingOrder/:id", updateTrackingOrder);

module.exports = router;
