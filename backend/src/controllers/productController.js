
const Product = require("..models/productModel");

const addProduct = async(req, res) => {
    try {
        const {name, price, quantity, description } = req.body;
    
        //Check if the product name, price, quantiry, description is empty
        if(!name || !quantity || !price || !description) {
            return res.status(400).json({ message: "name, quantity, price or description fields are empty" });
        }

        // Check if product name already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
        return res.status(409).json({ message: "Product name already exists" });
        }

        
    } catch (error) {
        
    }
};

module.exports = {
    addProduct,
}