const express = require("express");
const router = express.Router();

const productControlller = require("../controller/productController");
router.get("/", productControlller.index);
router.post("/store", productControlller.store);
router.post("/show", productControlller.show);
router.post("/update", productControlller.update);
router.post("/delete", productControlller.destroy);

module.exports = router;
