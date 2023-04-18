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
router.post("/product/create", createProduct);

//GET a product by ID
router.get("/product/:id", getProduct);

//GET a product by name
router.get("/product/getProductByName/:name", getProductByName);

//GET all products
router.get("/product/", getAllproducts);

// UPDATE a product
router.patch("/product/:id", updateProduct);

// DELETE a product
router.delete("/product/:id", deleteProduct);

module.exports = router;
