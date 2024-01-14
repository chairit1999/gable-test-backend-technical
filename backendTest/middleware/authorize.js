const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY || "MY_KEY";

const authorization = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  } else {
    jwt.verify(token, key, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      } else {
        req.headers["user"] = { id: decode.id };
        next();
      }
    });
  }
};
module.exports = authorization;
