const mongoose = require("mongoose");
const dotenv = require('dotenv'); 
 
dotenv.config(); 
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`mongod connected successfully with server: ${data.connection.host}`);
    })
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = connectDatabase;
