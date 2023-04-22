const express = require("express");
const {
  create,
  viewByID,
} = require("../controllers/orderedProductsController");

const router = express.Router();

//creation
router.post("/create", create);
router.get("/view/:OrderID", viewByID);

module.exports = router;
