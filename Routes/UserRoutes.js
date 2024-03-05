const userRoutes = require("express").Router();
const UserController = require("../Controllers/UserController");
const { authorizeUser } = require("../Middlewares/Authorization");

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/profile", authorizeUser, UserController.profile);

module.exports = userRoutes;
