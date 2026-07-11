const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");

const {
  getSummary,
  getPriorityDistribution,
  getStatusDistribution,
} = require("../controllers/dashboardController");

router.get(
  "/summary/:projectId",
  protect,
  getSummary
);

router.get(
  "/priority/:projectId",
  protect,
  getPriorityDistribution
);

router.get(
  "/status/:projectId",
  protect,
  getStatusDistribution
);

module.exports = router;