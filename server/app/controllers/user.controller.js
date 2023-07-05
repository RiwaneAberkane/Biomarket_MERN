const User = require("../models/user.model");

exports.userLogout = (req, res) => {
  console.log("Hello My Logout Page");
  res.clearCookie("JWTPRIVATEKEY", { path: "/" });
  res.status(200).send("User Logout");
};

// GET ALL -----------------------

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};
