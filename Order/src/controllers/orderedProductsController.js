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

const getSellerOrderProduct = async (req, res) => {
  const productList = await orderedProducts.find({
    sellerID: req.params.sellerid,
    OrderID: req.params.orderid,
  });
  res.status(200).json(productList);
};

const getNRSellerProduct = async (req, res) => {
  const productList = await orderedProducts.find({
    sellerID: req.params.sellerid,
    Confirmation: "Not Recieved",
  });
  res.status(200).json(productList);
};
const getRSellerProduct = async (req, res) => {
  const productList = await orderedProducts.find({
    sellerID: req.params.sellerid,
    Confirmation: "received",
  });
  res.status(200).json(productList);
};

module.exports = {
  create,
  viewByID,
  updateOrderProduct,
  getNRSellerProduct,
  getSellerOrderProduct,
  getRSellerProduct,
};
