const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(
  require("express-session")
);
//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
//create mongodb session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
//handle mongodb session store errors
store.on("error", function (error) {
  console.log(error);
});
//export session store
module.exports = store;
