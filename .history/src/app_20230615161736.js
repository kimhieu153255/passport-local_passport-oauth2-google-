const express = require("express");
const env = require("dotenv");
const app = express();
env.config();

// Import Routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
