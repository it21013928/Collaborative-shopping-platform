const express = require("express");
const {
  create,
  viewByID,
  updateOrderProduct,
  getNRSellerProduct,
  getSellerOrderProduct,
  getRSellerProduct,
} = require("../controllers/orderedProductsController");

const router = express.Router();

//creation
router.post("/create", create);
router.get("/view/:OrderID", viewByID);
router.patch("/updateStatus/:id", updateOrderProduct);
router.get("/getNRSellerProduct/:sellerid", getNRSellerProduct);
router.get("/getRSellerProduct/:sellerid", getRSellerProduct);
router.get("/getSellerOrderProduct/:sellerid/:orderid", getSellerOrderProduct);

module.exports = router;