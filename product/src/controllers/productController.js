const { sendEmail } = require("../../../user/src/services/userServices");
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
      saleCount,
      email,
      uName,
    } = req.body;

    // Check name price quantity is empty
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        message: "Product id, name, price, quantity fields must be filled",
      });
    }

    //check if quantity is a positive integer
    if (quantity < 0) {
      return res.status(401).json({ message: "Product quantity less than 0." });
    }

    //check if price is graeter than 0.
    if (price < 0) {
      return res.status(401).json({ message: "Product price is less than 0." });
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
      saleCount,
    });
    await product.save();

    console.error(email);
    console.error(uName);

    sendEmail(
      email,
      "Product Added Successfully",
      `Hey ${uName}, You have added the product to the list successfully.`
    );

    res.status(201).json({
      productId: productId,
      name: name,
      quantity: quantity,
      price: price,
      saleCount: saleCount,
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

//GET Product by seller ID
const getProductBySeller = async (req, res) => {
  try {
    // Find product
    const product = await Product.find({ userId: req.params.userId });
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

    // Check name price quantity is empty
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        message: "Product id, name, price, quantity fields must be filled",
      });
    }

    //check if quantity is a positive integer
    if (quantity < 0) {
      return res.status(401).json({ message: "Product quantity less than 0." });
    }

    //check if price is graeter than 0.
    if (price < 0) {
      return res.status(401).json({ message: "Product price is less than 0." });
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

//Update a product quantity
const updateProductQty = async (req, res) => {
  try {
    const { soldQty } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product quantity
    //product.quantity = quantity || product.quantity;
    await product.findOneAndUpdate({ $inc: { quantity: -soldQty } });

    await product.save();
    res.json({ message: "Product quantity updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update sell count
const updateSellCount = async (req, res) => {
  try {
    const { sellCount } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product quantity
    //product.quantity = quantity || product.quantity;
    await product.findOneAndUpdate({ $inc: { saleCount: sellCount } });

    await product.save();
    res.json({ message: "Product quantity updated successfully" });
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
  getProductBySeller,
  updateSellCount,
  updateProductQty,
};
