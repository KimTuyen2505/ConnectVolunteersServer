const mongoose = require("mongoose");
const verifySchema = new mongoose.Schema({
  email: {
    type: String,
  },
  verifyCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180,
  },
});
module.exports = mongoose.model("verify", verifySchema);
