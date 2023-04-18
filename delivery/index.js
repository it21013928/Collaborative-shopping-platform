const express = require("express");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

const mongoose = require("mongoose");

const app = express();

app.use(cors());

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
const orderRoutes = require("./src/routes/deliveryRoutes");
app.use("/", orderRoutes);

/***************************For image uploading ***************************************/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/src/admin/components/delivery/shippingDetails");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/trackingBill", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});
/***************************For image uploading ***************************************/
