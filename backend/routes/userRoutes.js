const express = require("express");

const {
  getProfile,
  uploadAvatar,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const protect = require("../middleware/protect");
const upload = require("../middleware/upload");

const router = express.Router();

router.get(
  "/profile",
  protect,
  getProfile
);

router.post(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.put(
  "/password",
  protect,
  changePassword
);

module.exports = router;