const express = require("express");

const {
  createProduct,
  getProduct,
  getProductByName,
  getAllproducts,
  updateProduct,
  deleteProduct,
  getProductBySeller,
  updateProductQty,
  updateSellCount,
} = require("../controllers/productController");

const router = express.Router(); //

//CREATE a new product
router.post("/create", createProduct);

//GET a product by ID
router.get("/:id", getProduct);

//GET a product by seller ID
router.get("/productBySeller/:userId", getProductBySeller);

//GET a product by name
router.get("/getProductByName/:name", getProductByName);

//GET all products
router.get("/", getAllproducts);

//Update sell count
router.get("/updateSellCount/:id", updateSellCount);

//Update product quantity
router.get("/updateProductQty/:id", updateProductQty);

// UPDATE a product
router.patch("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

module.exports = router;
