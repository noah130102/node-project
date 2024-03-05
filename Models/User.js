const { default: mongoose, mongo } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
