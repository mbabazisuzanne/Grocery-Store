const JWT = require("jsonwebtoken");
require('dotenv').config();


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
      JWT.verify(token, process.env.SECRET, (err, authData) => {
        if (err) {
          return res
            .status(403)
            .json({ Error: "Invalid Token >> Please Enter Valid Token!" });
        } else {
          //req.id = authData.id;
          //res.status(200).json(authData)
          next();
        }
      });
    } else {
      return res.status(400).json({
        error:
          "Auth header was in bad format, JWT token missing!"
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
        expiresIn: "15m"
      }
    );
    return token;
  }
}  