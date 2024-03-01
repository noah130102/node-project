const port = 4000;
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


// Routes
const crudRoute = require("./Routes/CRUDRoute");
const userRoutes = require("./Routes/UserRoutes");

mongoose.connect("mongodb://localhost:27017/cssoft", {});
mongoose.connection.on("connected", () => {
  console.log("MongoDb is successfully Connected!!");
});
mongoose.connection.on("error", (err) => {
  console.log(`mongoDb not connected due to error ${err}`);
});

// CRUD route
app.use("", crudRoute);

// User Route
app.use("",userRoutes);


// Port
app.listen(port, () => {
  console.log(`working on port no ${port}`);
});
