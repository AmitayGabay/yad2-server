const express = require("express");
const { authAdmin } = require("../../middlewares/autMiddleWare");
const productCtrl = require("../controllers/productControll");
const router = express.Router();

router.post("/", authAdmin, productCtrl.addProduct);
router.put("/", authAdmin, productCtrl.updateProduct);
router.delete("/", authAdmin, productCtrl.deleteProduct);
router.get("/", productCtrl.getProducts);


module.exports = router;
