require("dotenv").config();

const port = process.env.PORT;
const user_port = process.env.USER_PORT;
const order_port = process.env.ORDER_PORT;
const product_port = process.env.PRODUCT_PORT;
const cart_port = process.env.CART_PORT;

const express = require("express");
const cors = require("cors");
const proxy = require('express-http-proxy');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Set up routes
app.use("/users", proxy(`http://localhost:${user_port}`));
app.use("/orders", proxy(`http://localhost:${order_port}`));
app.use("/products", proxy(`http://localhost:${product_port}`));
app.use("/cart", proxy(`http://localhost:${cart_port}`));

app.listen(port, () => {
  console.log(`Gateway is listening at http://localhost:${port}`);
});
