const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

router.get("/", protect, getNotifications);

router.put("/:id", protect, markAsRead);

module.exports = router;