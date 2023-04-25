require("dotenv").config();

// get a single user
const sendEmail = async (req, res) => {
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
