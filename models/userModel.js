const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
    default: "/default_avatar.png",
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  birthDate: {
    type: String,
  },
  job: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("user", userSchema);
