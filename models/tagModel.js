const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
  },
});
module.exports = mongoose.model("tag", tagSchema);
