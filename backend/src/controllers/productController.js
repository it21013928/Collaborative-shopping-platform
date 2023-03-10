const Product = require("..models/productModel");

//CREATE a Product
const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    //Check if the product name, price, quantiry, description is empty
    if (!name || !quantity || !price || !description) {
      return res.status(400).json({
        message: "name, quantity, price or description fields are empty",
      });
    }

    // Check if product name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({ message: "Product name already exists" });
    }
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
    const { name, price, quantity, decription, image, rating, category } =
      req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.decription = decription;
    product.image = image;
    product.rating = rating;
    product.category = category;

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
