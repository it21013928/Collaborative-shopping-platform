const express = require('express')
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


// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`Cart is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  //Routes
  const cartRoutes = require("./src/routes/cartRoutes.js")
  app.use("/", cartRoutes)