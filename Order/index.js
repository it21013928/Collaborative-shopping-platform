const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

/*app.use('/', (req, res, next) => {

  return res.status(200).json({"msg": "Hello from order"})   
})*/

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`Order is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
const orderRoutes = require("./src/routes/orderRoutes");
app.use("/", orderRoutes);
