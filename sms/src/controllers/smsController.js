require("dotenv").config();
var sendsms = require('../utils/sendSMS');

// get a single user
const sendSMS = async (req, res) => {
    const to = req.body.to;
    const message = req.body.message;
    sendsms(to, message);
    res.status(200).json({ message: "SMS Ok" });
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

module.exports = {
  sendSMS,
};
