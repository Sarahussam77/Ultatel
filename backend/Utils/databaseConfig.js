const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// database connection
const DB_URL = process.env.MONGO_URI;
let connectionInstance = null;
function connectToDatabase() {
  if (connectionInstance) {
    return connectionInstance;
  }
  mongoose.connect(DB_URL, { 
    useNewUrlParser: true,
  useUnifiedTopology: true
});
  connectionInstance = mongoose.connection;

  connectionInstance.on("error", console.error.bind(console, "MongoDB connection error:"));

  return connectionInstance;
}

module.exports = connectToDatabase;