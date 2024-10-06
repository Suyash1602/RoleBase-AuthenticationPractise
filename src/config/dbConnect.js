const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
const options = {
  dbName: "RoleBaseAuth",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to mongoDB", err));
