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

  await console.log("SMS sent to", to, message);

  await axios.post(smsURL, smsData);
  //const userId = req.userId;
  //   if (!mongoose.Types.ObjectId.isValid(userId)) {
  //     return res.status(404).json({ error: "User does not exsist" });
  //   }
  //   try {
  //     const user = await User.findById(userId).select("-password");
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Server error" });
  //   }
};

module.exports = sendSMS;
