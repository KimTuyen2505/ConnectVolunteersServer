const tagModel = require("../models/tagModel");

exports.getAll = (req, res) => {
  tagModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataTags: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.getTag = async (req, res) => {
  tagModel
    .findById(req.params.tagId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Tag not found",
        });
      }
      return res.status(200).json({
        success: true,
        dataTags: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.addTag = async (req, res) => {
  const { tagName } = req.body;
  const tag = new tagModel({
    tagName: tagName,
  });
  return tag
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created tag successfully",
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.updateTag = (req, res) => {
  const { tagName } = req.body;
  const data = {};
  if (tagName) data["tagName"] = tagName;

  tagModel
    .findByIdAndUpdate(req.params.tagId, data)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Update tag successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.deleteTag = (req, res) => {
  tagModel
    .findByIdAndDelete(req.params.tagId, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete tag successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
