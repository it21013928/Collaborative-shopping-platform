const mongoose = require("mongoose");

const orderedProducts = require("../models/orderedProducts");

//Create

const create = async (req, res) => {
  const orderedProduct = new orderedProducts({
    OrderID: req.body.orderId,
    ProductID: req.body.productId,
    Quantity: req.body.quantity,
    ProductName: req.body.productName,
    Confirmation: "Not Recieved",
    sellerID: req.body.sellerId,
  });

  await orderedProduct.save();
  res.send(orderedProduct);
};

const viewByID = async (req, res) => {
  const productList = await orderedProducts.find({
    OrderID: req.params.OrderID,
  });
  res.status(200).json(productList);
};

const updateOrderProduct = async (req, res) => {
  const orderedProductsCo = await orderedProducts.findById(req.params.id);

  if (orderedProductsCo) {
    orderedProductsCo.Confirmation = req.body.status;

    const updateOrderProduct = await orderedProductsCo.save();

    res.json(updateOrderProduct);
  } else {
    res.status(404);
    throw new Error("OrderProduct not found");
  }
};

module.exports = {
  create,
  viewByID,
  updateOrderProduct,
};
