const express = require("express");
const { authUser } = require("../../middlewares/autMiddleWare");
const userCtrl = require("../controllers/userControll");
const router = express.Router();

router.post("/", userCtrl.createUser);
router.post("/logIn", userCtrl.logIn);
router.patch("/apdateCart", authUser, userCtrl.apdateCart);

module.exports = router;