const express = require("express");
const verifyController = require("../controllers/verifyController");
const router = express.Router();

router.get("/verifies", verifyController.getAll);
router.get("/verify/:email", verifyController.getVerify);
router.post("/verify", verifyController.addVerify);
router.delete("/verify/:email", verifyController.deleteVerify);

module.exports = router;
