const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require('body-parser');

//Import routes
const authRoute = require("./routes/auth");


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

app.listen(3000, () => console.log("Up and running in 3000"));
