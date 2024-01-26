const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const postRoute = require("./routes/post");
const cors = require("cors");

dotenv.config();

//conect to DB

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
    // Your code after successful connection
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    // Handle the error
  });

//Middleware

app.use(express.json());
app.use(cors());
// import routes

app.use("/api/user", authRouter);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
