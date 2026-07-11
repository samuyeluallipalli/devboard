const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    req.user.avatar = req.file.path;

    const updatedUser = await req.user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;

    const updatedUser = await req.user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user._id
    ).select("+password");

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  uploadAvatar,
  updateProfile,
  changePassword,
};