const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require('body-parser');

//Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")


//DB Connection
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

//Middlewares
app.use(bodyParser.json());

//Routes middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute)
let port = 8000
app.listen(port, () => console.log(`Up and running in ${port}`));
