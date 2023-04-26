const axios = require("axios");
const { EMAIL_SERVICE_URL } = require("../../config/emailService");

const sendEmail = async (to, subject, body) => {
  const url = `${EMAIL_SERVICE_URL}sendEmail`;
  const emailData = {
    to: to,
    subject: subject,
    message: body,
  };
  try {
    const response = await axios.post(url, emailData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendEmail,
};