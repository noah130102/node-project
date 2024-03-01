const jwt = require("jsonwebtoken");
const secret = "kd83";

const authorizeUser = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, secret, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log("Token Verified!!");
        req.users_id = res.id;
        next();
      }
    });
  } else {
    console.log("Token is not even generated !!");
  }
};
