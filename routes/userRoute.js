const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/users", userController.getAll);
router.get("/user/:userId", userController.getUser);
router.post("/user", userController.addUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
