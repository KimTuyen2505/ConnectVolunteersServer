const userModel = require("../models/userModel");

exports.getAll = (req, res) => {
  userModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataUsers: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.getUser = async (req, res) => {
  const query = {
    $or: [{ username: req.params.userId }, { email: req.params.userId }],
  };
  userModel
    .findOne(query)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        dataUser: data,
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

exports.addUser = async (req, res) => {
  const { username, password, email, fullName, birthDate } = req.body;
  const user = new userModel({
    username,
    password,
    email,
    fullName,
    birthDate,
  });
  return user
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created user successfully",
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

exports.updateUser = (req, res) => {
  const {
    avatar,
    fullName,
    email,
    phone,
    address,
    birthDate,
    job,
    description,
  } = req.body;
  const data = {};
  if (avatar) data["avatar"] = avatar;
  if (fullName) data["fullName"] = fullName;
  if (email) data["email"] = email;
  if (phone) data["phone"] = phone;
  if (address) data["address"] = address;
  if (birthDate) data["birthDate"] = birthDate;
  if (job) data["job"] = job;
  if (description) data["description"] = description;

  userModel
    .findOneAndUpdate({ username: req.params.id }, data)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Update user successfully",
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

exports.deleteUser = (req, res) => {
  userModel
    .findOneAndDelete({ username: req.params.id }, {})
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Delete user successfully",
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
