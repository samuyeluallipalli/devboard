const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const taskUpload = require("../middleware/taskUpload");

const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  uploadFile,
} = require("../controllers/taskController");

router.post("/", protect, createTask);

router.get(
  "/project/:projectId",
  protect,
  getTasksByProject
);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.post(
  "/:id/upload",
  protect,
  taskUpload.array("files"),
  uploadFile
);

module.exports = router;