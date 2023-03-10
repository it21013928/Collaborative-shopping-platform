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
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
    required: true,
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
  offerEnd: {
    type: Date,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
