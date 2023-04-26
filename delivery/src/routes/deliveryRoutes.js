const express = require("express");
const {
  createDelivery,
  getDelivery,
} = require("../controllers/deliveryController");

const router = express.Router();

//Post a new order
router.post("/", createDelivery);
router.get("/getDelivery/:orderId", getDelivery);

module.exports = router;
