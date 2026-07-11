const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/protect"
);

const {
  createComment,
  getCommentsByTask,
} = require(
  "../controllers/commentController"
);

router.post(
  "/",
  protect,
  createComment
);

router.get(
  "/task/:taskId",
  protect,
  getCommentsByTask
);

module.exports = router;