const mongoose = require("mongoose");
const CharityProject = mongoose.model('CharityProject', {
    name: String,
    description: String,
    goal: Number,
    raised: Number,
    latitude: Number,
    longitude: Number
});
module.exports = mongoose.model("CharityProject", CharityProject);
