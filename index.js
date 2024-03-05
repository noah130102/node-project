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
const { authorizeUser } = require("./Middlewares/Authorization");
const { authRole } = require("./Middlewares/AuthRole");

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
app.use("", userRoutes);

// EJS logic
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/user", (req, res) => {
  res.render("user");
});
app.get("/navbar", (req, res) => {
  res.render("navbar");
});
app.get("/adminportal", (req, res) => {
  res.render("adminportal");
});
app.set("view engine", "ejs");

// Port
app.listen(port, () => {
  console.log(`working on port no ${port}`);
});
