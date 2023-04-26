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
const smsRoutes = require("./src/routes/smsRoutes");
app.use("/", smsRoutes);

app.listen(port, () => {
  console.log(`SMS is listening at http://localhost:${port}`);
});
