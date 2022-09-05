const express = require("express");
const { authAdmin } = require("../../middlewares/autMiddleWare");
const categoryCtrl = require("../controllers/categoryControle");
const router = express.Router();

router.get("/", categoryCtrl.getAllCategories)
router.post("/", authAdmin, categoryCtrl.addCategory)
router.delete("/", authAdmin, categoryCtrl.deleteCategory)

module.exports = router;