const express = require("express");
const {
  create,
  viewByID,
  updateOrderProduct,
} = require("../controllers/orderedProductsController");

const router = express.Router();

//creation
router.post("/create", create);
router.get("/view/:OrderID", viewByID);
router.patch("/updateStatus/:id", updateOrderProduct);

module.exports = router;
