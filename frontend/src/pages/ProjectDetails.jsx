import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Chip,
  Skeleton,
} from "@mui/material";

import client from "../api/client";
import { useTasks } from "../contexts/TaskContext";

import InviteMember from "../components/InviteMember";
import ProjectMembers from "../components/ProjectMembers";
import CreateTask from "../components/CreateTask";
import TaskCard from "../components/TaskCard";
import ActivityTimeline from "../components/ActivityTimeline";

function ProjectDetails() {
  const { id } = useParams();

  const {
    tasks,
    getTasksByProject,
    deleteTask,
    updateTask,
  } = useTasks();

  const [project, setProject] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  useEffect(() => {
    getTasksByProject(id);
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await client.get(
        `/projects/${id}`
      );

      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  if (!project) {
    return (
      <Box>
        <Skeleton
          variant="rounded"
          height={200}
          sx={{
            borderRadius: "24px",
            mb: 3,
          }}
        />

        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid
              key={item}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Skeleton
                variant="rounded"
                height={150}
                sx={{
                  borderRadius: "18px",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* Project Header */}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",

          p: {
            xs: 3,
            md: 4,
          },

          mb: 4,

          borderRadius: "24px",

          color: "#fff",

          background:
            "linear-gradient(135deg, #4338CA 0%, #7C3AED 55%, #2563EB 100%)",

          boxShadow:
            "0 20px 50px rgba(79, 70, 229, 0.22)",
        }}
      >
        <Box
          sx={{
            position: "absolute",

            width: 250,
            height: 250,

            borderRadius: "50%",

            bgcolor:
              "rgba(255,255,255,0.08)",

            right: -80,
            top: -150,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Chip
            label="Active Project"
            sx={{
              mb: 2,

              color: "#fff",

              bgcolor:
                "rgba(255,255,255,0.15)",

              backdropFilter: "blur(10px)",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
            }}
          >
            {project.name}
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              opacity: 0.85,
              lineHeight: 1.7,
            }}
          >
            {project.description ||
              "Manage tasks, collaborate with your team, and track project progress."}
          </Typography>
        </Box>
      </Box>

      {/* Statistics */}

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4,
        }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Total Tasks"
            value={tasks.length}
            symbol="◈"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Completed"
            value={completedTasks}
            symbol="✓"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="In Progress"
            value={inProgressTasks}
            symbol="◷"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatCard
            title="Team Members"
            value={
              project.members?.length || 0
            }
            symbol="♙"
          />
        </Grid>
      </Grid>

      {/* Team Management */}

      <SectionHeader
        title="Team Workspace"
        description="Manage project members and invite new collaborators."
      />

      <Grid
        container
        spacing={3}
        sx={{
          mb: 5,
        }}
      >
        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <ProjectMembers
            members={project.members}
            owner={project.owner}
            projectId={id}
            refreshProject={fetchProject}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <InviteMember projectId={id} />
        </Grid>
      </Grid>

      {/* Activity */}

      <SectionHeader
        title="Recent Activity"
        description="Follow the latest changes happening in this project."
      />

      <Box sx={{ mb: 5 }}>
        <ActivityTimeline projectId={id} />
      </Box>

      {/* Create Task */}

      <SectionHeader
        title="Task Management"
        description="Create, search, filter, and manage project tasks."
      />

      <Box sx={{ mb: 4 }}>
        <CreateTask
          projectId={id}
          members={project.members || []}
        />
      </Box>

      {/* Task Filters */}

      <Card
        sx={{
          mb: 3,
        }}
      >
        <CardContent
          sx={{
            p: 2.5,

            "&:last-child": {
              pb: 2.5,
            },
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
          >
            <TextField
              label="Search Tasks"
              placeholder="Search by task title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              fullWidth
            />

            <FormControl
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 190,
                },
              }}
            >
              <InputLabel>
                Status
              </InputLabel>

              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <MenuItem value="All">
                  All Statuses
                </MenuItem>

                <MenuItem value="To Do">
                  To Do
                </MenuItem>

                <MenuItem value="In Progress">
                  In Progress
                </MenuItem>

                <MenuItem value="Done">
                  Done
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 190,
                },
              }}
            >
              <InputLabel>
                Priority
              </InputLabel>

              <Select
                value={priorityFilter}
                label="Priority"
                onChange={(e) =>
                  setPriorityFilter(
                    e.target.value
                  )
                }
              >
                <MenuItem value="All">
                  All Priorities
                </MenuItem>

                <MenuItem value="Low">
                  Low
                </MenuItem>

                <MenuItem value="Medium">
                  Medium
                </MenuItem>

                <MenuItem value="High">
                  High
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* Task Heading */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="h5">
            Project Tasks
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Showing {filteredTasks.length} of{" "}
            {tasks.length} tasks
          </Typography>
        </Box>

        <Chip
          label={`${filteredTasks.length} Tasks`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* Tasks */}

      {filteredTasks.length === 0 ? (
        <Box
          sx={{
            py: 8,
            px: 3,

            textAlign: "center",

            borderRadius: "20px",

            bgcolor: "background.paper",

            border: "1px dashed",

            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            No tasks found
          </Typography>

          <Typography
            color="text.secondary"
          >
            Try changing the search or filter
            options.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid
              key={task._id}
              size={{
                xs: 12,
                md: 6,
                xl: 4,
              }}
            >
              <TaskCard
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}


/* Reusable Statistics Card */

function StatCard({
  title,
  value,
  symbol,
}) {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Box
            sx={{
              width: 48,
              height: 48,

              flexShrink: 0,

              borderRadius: "14px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontSize: "1.3rem",

              fontWeight: 900,

              color: "primary.main",

              bgcolor:
                "rgba(99, 102, 241, 0.12)",
            }}
          >
            {symbol}
          </Box>

          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}


/* Reusable Section Header */

function SectionHeader({
  title,
  description,
}) {
  return (
    <Box
      sx={{
        mb: 2.5,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        {description}
      </Typography>
    </Box>
  );
}

export default ProjectDetails;