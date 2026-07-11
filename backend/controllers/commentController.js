const Comment = require("../models/Comment");

const createComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.create({
        text: req.body.text,
        user: req.user._id,
        task: req.body.taskId,
      });

    const populatedComment =
      await Comment.findById(
        comment._id
      ).populate(
        "user",
        "name email"
      );

    res.status(201).json(
      populatedComment
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCommentsByTask =
  async (req, res) => {
    try {
      const comments =
        await Comment.find({
          task: req.params.taskId,
        })
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(comments);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createComment,
  getCommentsByTask,
};