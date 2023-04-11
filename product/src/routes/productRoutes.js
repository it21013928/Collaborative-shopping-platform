const express = require("express");

const {
  createProduct,
  getProduct,
  getProductByName,
  getAllproducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router(); //

//CREATE a new product
router.post("/create", createProduct);

//GET a product by ID
router.get("/:id", getProduct);

//GET a product by name
router.get("/getProductByName/:name", getProductByName);

//GET all products
router.get("/", getAllproducts);

// UPDATE a product
router.patch("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

module.exports = router;
