const projectModel = require("../models/projectModel");

exports.getAll = (req, res) => {
  projectModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataProjects: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.getProject = async (req, res) => {
  projectModel
    .findById(req.params.projectId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
      return res.status(200).json({
        success: true,
        dataProjects: data,
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

exports.addProject = async (req, res) => {
  const { title, author, images, supporters, target, description, tagId } =
    req.body;
  const project = new projectModel({
    title,
    author,
    images,
    supporters,
    target,
    description,
    tagId,
  });
  return project
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created project successfully",
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

exports.updateProject = (req, res) => {
  const {
    title,
    author,
    images,
    supporters,
    target,
    description,
    tagId,
    status,
  } = req.body;
  const data = {};
  if (title) data["title"] = title;
  if (author) data["author"] = author;
  if (images) data["images"] = images;
  if (supporters) data["supporters"] = supporters;
  if (target) data["target"] = target;
  if (description) data["description"] = description;
  if (tagId) data["tagId"] = tagId;
  if (status) data["status"] = status;

  projectModel
    .findByIdAndUpdate(req.params.projectId, data)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Update project successfully",
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

exports.deleteProject = (req, res) => {
  projectModel
    .findByIdAndDelete(req.params.projectId, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete project successfully",
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
