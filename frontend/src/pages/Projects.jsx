import {
  Box,
  Typography,
  Grid,
  Stack,
  Chip,
} from "@mui/material";

import { useProjects } from "../contexts/ProjectContext";

import ProjectCard from "../components/ProjectCard";
import CreateProject from "../components/CreateProject";

function Projects() {
  const { projects } = useProjects();

  return (
    <Box>
      {/* Page Header */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
        sx={{
          mb: 4,
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              mb: 0.5,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
              }}
            >
              Projects
            </Typography>

            <Chip
              label={projects.length}
              size="small"
              color="primary"
              sx={{
                fontWeight: 800,
              }}
            />
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 550,
            }}
          >
            Organize your team's work, manage
            members, and keep every task moving
            forward.
          </Typography>
        </Box>
      </Stack>

      {/* Create Project Section */}

      <Box
        sx={{
          mb: 4,
        }}
      >
        <CreateProject />
      </Box>

      {/* Project Grid */}

      {projects.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            px: 3,
            borderRadius: "20px",
            border: "1px dashed",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "20px",
              bgcolor:
                "rgba(99, 102, 241, 0.12)",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              mx: "auto",
              mb: 2,
            }}
          >
            ◈
          </Box>

          <Typography
            variant="h5"
            sx={{
              mb: 1,
            }}
          >
            Your workspace is ready
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 450,
              mx: "auto",
            }}
          >
            Create your first project and start
            organizing tasks with your team.
          </Typography>
        </Box>
      ) : (
        <>
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
                Your Workspace
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Select a project to view its
                tasks and activity.
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid
                key={project._id}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 4,
                }}
              >
                <ProjectCard
                  project={project}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Projects;