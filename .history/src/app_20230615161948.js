const express = require("express");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const 
env.config();
const port = process.env.PORT || 3000;

// Import Routes

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
