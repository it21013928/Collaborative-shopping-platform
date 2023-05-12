require("dotenv").config();
var sendsms = require("../utils/sendSMS");

// get a single user
const sendSMS = async (req, res) => {
  const to = req.body.to;
  const message = req.body.message;
  sendsms(to, message);
  res.status(200).json({ message: "SMS Ok" });
};

module.exports = {
  sendSMS,
};
