const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  images: {
    type: [String],
  },
  supporters: {
    type: [
      {
        userId: String,
        amount: Number,
        createdAt: String,
      },
    ],
  },
  target: {
    type: Number,
  },
  description: {
    type: String,
  },
  tagId: {
    type: String,
  },
  status: {
    type: String, // "inApproval", inProgress", "finished"
    default: "inProgress",
  },
  startAt: {
    type: String,
  },
  endAt: {
    type: String,
  },
});
module.exports = mongoose.model("project", projectSchema);
