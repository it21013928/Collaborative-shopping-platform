const express = require("express");

const {
  createProduct,
  getProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router(); //

//CREATE a new product
router.post("/", createProduct);

//GET a product
router.get("/:id", getProduct);

//GET all products
router.get("/", getAllproducts);

// UPDATE a product
router.patch("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

module.exports = router;
