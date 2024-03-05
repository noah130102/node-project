const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "kd83";
const saltRounds = 10;
const userModel = require("../Models/User");

const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);

  try {
    const userdoc = await userModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    res.json({ userInfo: userdoc });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userIf = await userModel.findOne({ username });

    if (!userIf) {
      return res.status(400).json("Wrong Username !!");
    }

    const passwordMatching = bcrypt.compareSync(password, userIf.password);
    if (passwordMatching === true) {
      jwt.sign(
        {
          id: userIf._id,
          role: userIf.role,
          username: username,
        },
        secret,
        {},
        (err, token) => {
          if (err) {
            return res.status(500).json({ error: "Failed to create token" });
          }
          return res.json({
            token: token,
            username: username,
          });
        }
      );
    } else {
      res.json({ message: "Wrong Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const profile = async (req, res) => {
  const userData = req.user;
  if (userData === "admin") {
    res.json({ role: "admin" });
  } else {
    res.json({ role: "user" });
  }
};
module.exports = { register, login, profile };
