const Product = require("../models/productModel");

//CREATE a Product
const createProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      price,
      quantity,
      image,
      shortDescription,
      fullDescription,
      rating,
      category,
      newItem,
      date,
      userId,
    } = req.body;

    // Check name price quantity is empty
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        message: "Product id, name, price, quantity fields must be filled",
      });
    }

    // Check product already exists
    const id = await Product.findOne({ productId });
    if (id) {
      return res.status(401).json({ message: "Product already exists." });
    }

    // Create new user
    const product = new Product({
      productId,
      name,
      quantity,
      price,
      image,
      shortDescription,
      fullDescription,
      rating,
      category,
      newItem,
      date,
      userId,
    });
    await product.save();

    res.status(201).json({
      productId: productId,
      name: name,
      quantity: quantity,
      price: price,
    });
  } catch (err) {
    console.error(err);
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
    console.error("***Product got successfully***");
    return res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//GET Product by Name
const getProductByName = async (req, res) => {
  const productName = req.params.name;
  try {
    // Find product
    const product = await Product.findOne({ name: productName }).exec();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Get product
    console.error("***Product got successfully***");
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
////////////////////////////////////////////////////////////////DOES NOT WORK!////////////////////////////////

//GET all products
const getAllproducts = async (req, res) => {
  try {
    // Find product
    const product = await Product.find();

    if (!product) {
      res.status(404).send("Products not found");
      console.log("No products found");
    } else {
      res.send(product);
      console.log("***All products got successfully***");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      price,
      quantity,
      image,
      shortDescription,
      fullDescription,
      rating,
      category,
    } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    product.productId = productId || product.productId;
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.image = image || product.image;
    product.shortDescription = shortDescription || product.shortDescription;
    product.fullDescription = fullDescription || product.fullDescription;
    product.rating = rating || product.rating;
    product.category = category || product.category;

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
  getProductByName,
  getAllproducts,
  updateProduct,
  deleteProduct,
};
