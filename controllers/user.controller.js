let User = require("../models/user.model");
const { generateToken, deleteToken } = require("../utils/generateToken");

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user && (await user.matchPasswords(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Email sau parolă greșite");
    }
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("Utilizator deja existent");
    }

    const newUser = await User.create({ name, email, password });
    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Date invalide");
    }
  } catch (error) {
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    deleteToken(res);

    res.status(200).send("User logged out");
  } catch (error) {
    return next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    };
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      await user.save();

      res.status(200).json({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    } else {
      res.staus(404);
      throw new Error("Utilizator inexistent");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
