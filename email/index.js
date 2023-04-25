require("dotenv").config();

const port = process.env.PORT;

const express = require("express");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

// Set up routes
const userRoutes = require("./src/routes/emailRoutes");
app.use("/", emailRoutes);

app.listen(port, () => {
  console.log(`User is listening at http://localhost:${port}`);
});
