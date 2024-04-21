const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    console.log("Token is empty");
    res.status(401).send({ error: "You hacker!?, Token is invalid" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    console.log({ error });
    res.status(401).send({ error: "You hacker!?, Token is invalid" });
  }
};

module.exports = fetchUser;
