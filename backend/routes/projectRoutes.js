const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  inviteMember,
  removeMember,
} = require("../controllers/projectController");

router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectById);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

router.post("/:id/invite", protect, inviteMember);

router.delete("/:id/member/:memberId", protect, removeMember);

module.exports = router;