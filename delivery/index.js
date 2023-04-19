const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;

const mongoose = require("mongoose");

const app = express();
const multer = require("multer");
// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

/***************************For image uploading ***************************************/

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(
//       null,
//       "../frontend/src/admin/components/delivery/shippingDetails/uploadedImages"
//     );
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

// app.post("/trackingBill", upload.single("image"), (req, res) => {
//   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//   res.send("Single file upload success");
// });
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

//Routes
const deliveryRoutes = require("./src/routes/deliveryRoutes");
app.use("/", deliveryRoutes);
