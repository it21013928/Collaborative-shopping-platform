require("dotenv").config();

const axios = require("axios");

const smsURL = process.env.SMS_API_URL;
const user_id = process.env.USER_ID;
const api_key = process.env.API_KEY;
const sender_id = process.env.SENDER_ID;

const sendSMS = async (to, message) => {
  const smsData = {
    user_id: user_id,
    api_key: api_key,
    sender_id: sender_id,
    to: to,
    message: message,
  };
  // console.log(user_id);
  // console.log(api_key);
  // console.log(sender_id);
  // console.log(to);
  console.log(smsData);
  console.log(smsURL);
  await console.log("SMS sent to", to, message);

  await axios.post(smsURL, smsData);
};

module.exports = sendSMS;
