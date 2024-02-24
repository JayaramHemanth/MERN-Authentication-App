const jwt = require("jsonwebtoken");

exports.verifiedToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    jwt.verify(String(token), "SecretKey", (err, decode) => {
      if (err) {
        res.json({ error: "user not found" });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
