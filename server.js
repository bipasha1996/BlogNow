const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//route import

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Mongodb connection

connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Port
const PORT = process.env.PORT || 8800;

//listen
app.listen(8800, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white
  );
});

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
