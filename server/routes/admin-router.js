const express = require("express");
const router = express.Router();
const {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/admin/product-controller");
const { upload } = require("../helper/cloudinary");

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
