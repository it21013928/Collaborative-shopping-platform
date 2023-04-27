const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  fullDescription: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  saleCount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  newItem: {
    type: Boolean,
    required: false,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
    $dateToString: { fromat: "%Y-%m-%d %H:%M" },
  },
});

module.exports = mongoose.model("Product", productSchema);
