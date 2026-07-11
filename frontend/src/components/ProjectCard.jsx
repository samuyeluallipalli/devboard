import { Link } from "react-router-dom";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function ProjectCard({ project }) {
  const members = project?.members || [];

  const getInitial = (name) => {
    return name
      ? name.charAt(0).toUpperCase()
      : "U";
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Accent Line */}

      <Box
        sx={{
          height: 5,
          background:
            "linear-gradient(90deg, #6366F1, #8B5CF6, #06B6D4)",
        }}
      />

      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,

          "&:last-child": {
            pb: 3,
          },
        }}
      >
        {/* Top Section */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              flexShrink: 0,
              borderRadius: "16px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "1.4rem",
              fontWeight: 900,

              color: "primary.main",
              bgcolor:
                "rgba(99, 102, 241, 0.12)",
            }}
          >
            {getInitial(project?.name)}
          </Box>

          <Chip
            label="Active"
            size="small"
            color="success"
            variant="outlined"
          />
        </Stack>

        {/* Project Name */}

        <Typography
          variant="h5"
          sx={{
            mb: 1,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {project?.name}
        </Typography>

        {/* Description */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            minHeight: 48,
            mb: 3,

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project?.description ||
            "No project description has been added yet."}
        </Typography>

        <Divider sx={{ mb: 2.5 }} />

        {/* Team Information */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mb: 0.7,
                fontWeight: 700,
              }}
            >
              TEAM MEMBERS
            </Typography>

            {members.length > 0 ? (
              <AvatarGroup
                max={4}
                sx={{
                  justifyContent: "flex-end",

                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    borderWidth: 2,
                  },
                }}
              >
                {members.map((member) => (
                  <Avatar
                    key={member._id}
                    alt={member.name}
                    title={member.name}
                    src={member.avatar || ""}
                    sx={{
                      bgcolor: "primary.main",
                    }}
                  >
                    {getInitial(member.name)}
                  </Avatar>
                ))}
              </AvatarGroup>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                No members
              </Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mb: 0.5,
                fontWeight: 700,
              }}
            >
              OWNER
            </Typography>

            <Typography
              variant="body2"
              fontWeight={700}
              noWrap
            >
              {project?.owner?.name ||
                "Project Owner"}
            </Typography>
          </Box>
        </Stack>

        {/* Button */}

        <Button
          component={Link}
          to={`/projects/${project._id}`}
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,

            background:
              "linear-gradient(135deg, #6366F1, #7C3AED)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #4F46E5, #6D28D9)",
            },
          }}
        >
          Open Project →
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;