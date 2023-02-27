const express = require("express");
const app = express();
const port = 3000;

// Set up routes
const routes = require("./src/routes/index");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
