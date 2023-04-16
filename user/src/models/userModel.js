const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  zipCode: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["client", "seller", "admin"],
    default: "client",
  },
});

// Add toJSON method to remove underscore from id field
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("User", UserSchema);
