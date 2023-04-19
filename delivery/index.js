require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

const port = process.env.DELIVERY_PORT;
//Routes
const deliveryRoutes = require("./src/routes/deliveryRoutes");
app.use("/", deliveryRoutes);

/***************************For image uploading ***************************************/

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "../frontend/src/admin/components/delivery/shippingDetails/uploadedImages"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/trackingBill", multer(upload).single("image"), (req, res) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(req.file);
  res.send("Single file upload success");
});
/***************************For image uploading ***************************************/

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`Delivery is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
