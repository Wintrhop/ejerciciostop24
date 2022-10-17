const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Session expired");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Session Expired");
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = id;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "something went wrong with token", data: err.message });
  }
};
