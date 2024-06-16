//import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
//app
const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTECTION ERROR", err));

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

//routes
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

//port
const port = process.env.PORT || 8008;
//listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
