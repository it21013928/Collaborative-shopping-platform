const axios = require("axios");
const { EMAIL_SERVICE_URL } = require("../../config/emailService");
const { SMS_SERVICE_URL } = require("../../config/smsService");

const sendEmail = async (to, subject, body) => {
  const emailURL = `${EMAIL_SERVICE_URL}sendEmail`;
  const emailData = {
    to: to,
    subject: subject,
    message: body,
  };
  try {
    const response = await axios.post(emailURL, emailData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const sendSMS = async (to, message) => {
  const smsURL = `${SMS_SERVICE_URL}sendSMS`;
  const smsData = {
    to: to,
    message: message,
  };
  try {
    const response = await axios.post(smsURL, smsData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendEmail,
  sendSMS
};
