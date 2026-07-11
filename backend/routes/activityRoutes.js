const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/protect"
);

const {
  getProjectActivities,
} = require(
  "../controllers/activityController"
);

router.get(
  "/project/:projectId",
  protect,
  getProjectActivities
);

module.exports = router;