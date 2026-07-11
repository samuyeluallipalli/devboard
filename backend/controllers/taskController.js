const Task = require("../models/Task");
const Notification = require("../models/Notification");
const { getIO } = require("../socket");
const Activity = require("../models/Activity");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    await Activity.create({
      user: req.user._id,
      project: task.project,
      action: `created task "${task.title}"`,
    });

    if (task.assignedTo) {
      getIO()
        .to(task.assignedTo.toString())
        .emit("notification", {
          message: "A task has been assigned to you",
        });
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.assignedTo = req.body.assignedTo || task.assignedTo;

    const updatedTask = await task.save();

    console.log("Assigned To:", updatedTask.assignedTo);


    if (updatedTask.status === "Done") {
      await Activity.create({
        user: req.user._id,
        project: updatedTask.project,
        action: `completed task "${updatedTask.title}"`,
      });

      const notification =
        await Notification.create({
          user: req.user._id,
          message: `${updatedTask.title} has been completed`,
        });

      getIO()
        .to(req.user._id.toString())
        .emit("notification", {
          _id: notification._id,
          message: notification.message,
          isRead: false,
        });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadFile = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const uploadedFiles = req.files.map(
      (file) => ({
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
      })
    );

    task.attachments.push(...uploadedFiles);

    await task.save();

    await Activity.create({
      user: req.user._id,
      project: task.project,
      action: `uploaded file to "${task.title}"`,
    });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  uploadFile,
};