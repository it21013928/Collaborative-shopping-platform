require("dotenv").config();
var sendemail = require('../utils/sendEmail');

// get a single user
const sendEmail = async (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const message = req.body.message;
    console.log(to, subject, message);
    sendemail(to, subject, message);
    res.status(200).json({ message: "Ok" });
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
  sendEmail,
};
