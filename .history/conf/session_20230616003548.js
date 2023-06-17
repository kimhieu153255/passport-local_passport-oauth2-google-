const mongoose = require("mongoose");
//connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
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
