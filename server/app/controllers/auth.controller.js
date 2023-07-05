const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const RefreshToken = db.refreshToken;

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    console.log(req.body);

    if (req.body.role) {
      const role = await Role.findOne({ name: req.body.role });
      user.role = role._id;
    }

    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    const refreshToken = await RefreshToken.createToken(user);

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign(
      { id: refreshToken.user._id },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.checkProfile = async (req, res) => {
  const user = await User.findById(req.userId).populate("role");
  console.log(user);
  if (!user) {
    return res.status(404).send({ message: "User not found!" });
  }
  return res.status(200).send({
    name: user.username,
    user: user._id,
    role: user.role.name,
  });
};
