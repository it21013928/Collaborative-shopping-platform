const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  productId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
