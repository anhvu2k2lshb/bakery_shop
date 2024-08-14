const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary").v2;
const cors = require('cors');
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config(); 

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(cookieParser());

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// connect db
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

require('./route/userRoute')(app); 
require('./route/shopRoute')(app); 
require('./route/productRoute')(app); 
require('./route/orderRoute')(app); 
require('./route/eventRoute')(app); 
require('./route/couponRoute')(app); 

app.get("/test", (req, res) => {
  res.send("Hello world!");
});
// create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
