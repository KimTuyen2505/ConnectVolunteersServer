const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  background: {
    type: String,
  },
});
module.exports = mongoose.model("project", projectSchema);
