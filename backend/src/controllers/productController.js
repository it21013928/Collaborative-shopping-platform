const Product = require("../models/productModel");

//CREATE a Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      image,
      shortDescription,
      fullDescription,
      tag,
      rating,
      category,
      newItem,
      discount,
    } = req.body;

    //Check if the product name, price, quantiry, description is empty
    if (!name || !quantity || !price || !shortDescription) {
      return res.status(400).json({
        message: "name, quantity, price or short description fields are empty",
      });
    }

    // Check if product name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({ message: "Product name already exists" });
    }

    //Create the new product
    const product = new Product({
      name,
      quantity,
      price,
      image,
      shortDescription,
      fullDescription,
      tag,
      rating,
      category,
      newItem,
      discount,
    });
    await product.save();

    res.status(201).json({
      productID: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//GET Product by ID
const getProduct = async (req, res) => {
  try {
    // Find product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Get product
    res.send(product);
    res.json({ message: "Product got successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//GET all products
const getAllproducts = async (req, res) => {
  try {
    // Find product
    const product = await Product.find();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.send(product);

    res.json({ message: "All products got successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      image,
      shortDescription,
      fullDescription,
      tag,
      rating,
      category,
      saleCount,
      newItem,
      offerDate,
      discount,
    } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.image = image || product.image;
    product.shortDescription = shortDescription || product.shortDescription;
    product.fullDescription = fullDescription || product.fullDescription;
    product.tag = tag || product.tag;
    product.rating = rating || product.rating;
    product.category = category || product.category;
    product.saleCount = saleCount || product.saleCount;
    product.newItem = newItem || product.newItem;
    product.offerDate = offerDate || product.offerDate;
    product.discount = discount || product.discount;

    await product.save();
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a product
const deleteProduct = async (req, res) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete product
    await product.remove();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
};
