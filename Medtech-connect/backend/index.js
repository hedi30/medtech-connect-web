const express = require("express");
const userRoute = require("./Routes/userRoute");
const connectDb = require('./Configuration/connectDb');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

// ✅ Connect to MongoDB
connectDb();

// ✅ Enable CORS (allows frontend to access the backend)
app.use(cors());

// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Define all routes under /api
app.use("/api", userRoute);

// ✅ Start the server
app.listen(port, (error) => {
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`🚀 Server Started on port ${port}`);
  }
});
