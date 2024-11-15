const express = require("express");
const projectController = require("../controllers/projectController");
const router = express.Router();

router.get("/projects", projectController.getAll);
router.get("/project/:projectId", projectController.getProject);
router.post("/project", projectController.addProject);
router.put("/project/:projectId", projectController.updateProject);
router.delete("/project/:projectId", projectController.deleteProject);

module.exports = router;
