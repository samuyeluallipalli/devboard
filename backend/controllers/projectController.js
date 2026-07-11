const Project = require("../models/Project");
const User = require("../models/User");
const Activity = require("../models/Activity");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id],
    });

    await Activity.create({
      user: req.user._id,
      project: project._id,
      action: `created project "${project.name}"`,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    })
      .populate("owner", "name email")
      .populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.name = req.body.name || project.name;
    project.description =
      req.body.description || project.description;

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const inviteMember = async (req, res) => {
  try {
    const { email } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyMember = project.members.some(
      (member) =>
        member.toString() === user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: "User already added",
      });
    }

    project.members.push(user._id);

    await project.save();

    await Activity.create({
      user: req.user._id,
      project: project._id,
      action: `invited ${user.name} to the project`,
    });

    const updatedProject =
      await Project.findById(project._id)
        .populate("owner", "name email")
        .populate("members", "name email");

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (
      project.owner.toString() ===
      req.params.memberId
    ) {
      return res.status(400).json({
        message: "Owner cannot be removed",
      });
    }

    project.members = project.members.filter(
      (member) =>
        member.toString() !== req.params.memberId
    );

    await project.save();

    const updatedProject =
      await Project.findById(project._id)
        .populate("owner", "name email")
        .populate("members", "name email");

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  inviteMember,
  removeMember,
};