const express = require("express");
const { createDelivery } = require("../controllers/deliveryController");

const router = express.Router();

//Post a new order
router.post("/", createDelivery);

module.exports = router;
