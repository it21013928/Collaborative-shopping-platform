const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    type: [String],
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
    type: [String],
    required: false,
  },
  saleCount: {
    type: Number,
    required: false,
  },
  newItem: {
    type: Boolean,
    required: false,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
