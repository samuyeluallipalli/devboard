const Task = require("../models/Task");

const getSummary = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const tasks = await Task.find({
      project: projectId,
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Done"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const todoTasks = tasks.filter(
      (task) => task.status === "To Do"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status !== "Done"
    ).length;

    const overdueTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate < new Date() &&
        task.status !== "Done"
    ).length;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      todoTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPriorityDistribution = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const result = await Task.aggregate([
      {
        $match: {
          project: Task.db.base.Types.ObjectId.createFromHexString(
            projectId
          ),
        },
      },
      {
        $group: {
          _id: "$priority",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStatusDistribution = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const result = await Task.aggregate([
      {
        $match: {
          project: Task.db.base.Types.ObjectId.createFromHexString(
            projectId
          ),
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
  getPriorityDistribution,
  getStatusDistribution,
};