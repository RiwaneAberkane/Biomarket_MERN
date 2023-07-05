const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(404).send({ message: "Role not found." });
    }
    // console.log(role);
    const isAdmin = role.name == "admin";
    if (!isAdmin) {
      return res.status(403).send({ message: "Require Admin Role!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isManagerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(404).send({ message: "Role not found." });
    }

    const isManagerOrAdmin = role.name == "manager" || role.name == "admin";
    if (!isManagerOrAdmin) {
      return res
        .status(403)
        .send({ message: "Require Manager or Admin Role!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isEmployees = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(404).send({ message: "Role not found." });
    }

    const isEmployees = role.name == "employees";
    if (!isEmployees) {
      return res.status(403).send({ message: "Require Employees Role!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isManagerOrAdmin,
  isEmployees,
};

module.exports = authJwt;
