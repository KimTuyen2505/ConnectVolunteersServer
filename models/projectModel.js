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
  supportersCount: {
    type: Number,
  },
  registers: {
    type: [
      {
        username: String,
        reason: String,
      },
    ],
    default: [],
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
  location: {
    type: String,
  },
  status: {
    type: String, // "inProgress", "finished"
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
