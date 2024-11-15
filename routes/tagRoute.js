const express = require("express");
const tagController = require("../controllers/tagController");
const router = express.Router();

router.get("/tags", tagController.getAll);
router.get("/tag/:tagId", tagController.getTag);
router.post("/tag", tagController.addTag);
router.put("/tag/:tagId", tagController.updateTag);
router.delete("/tag/:tagId", tagController.deleteTag);

module.exports = router;
