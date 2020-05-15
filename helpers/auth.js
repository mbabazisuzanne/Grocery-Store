//const JWT = require("jsonwebtoken");


module.exports = {
  authenticate: (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header) {
      return res
        .status(400)
        .json({ error: "Authorization header missing!" });
    }

    if (header.startsWith("Bearer ")) {
      const token = header.split(" ")[1];
      JWT.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json({ error: "Invalid Token!" });
        } else {
          req.id = decoded.id;
          next();
        }
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "Malformed auhthorization. Auth header was in bad format, JWT token missing!"
      });
    }
  },
  signToken: user => {
    const token = JWT.sign(
      {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.SECRET,
      {
        expiresIn: "30m"
      }
    );
    return token;
  }
}  