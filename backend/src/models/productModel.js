const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: float,
    required: true,
  },
  quantity: {
    type: number,
    required: true,
  },
  decription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  rating: {
    type: number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
