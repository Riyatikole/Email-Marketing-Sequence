const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports.auth = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password or Email" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in Succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const decodeToken = (req, res, next) => {
  // Get the token from the request header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Decode the token to extract user information
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Unauthorized: Token expired" });
      } else {
        return res.status(403).send({ message: "Forbidden: Invalid token" });
      }
    }

    // Attach user information to the request object
    req.user = decoded;

    next();
  });
};

module.exports.decodeToken = decodeToken;
