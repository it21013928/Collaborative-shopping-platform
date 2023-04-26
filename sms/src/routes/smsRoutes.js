const express = require("express");

const {
  sendSMS,
} = require("../controllers/smsController");

const router = express.Router();

// Send email
router.post("/sendSMS", sendSMS);

module.exports = router;
