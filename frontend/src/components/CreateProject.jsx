import { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import client from "../api/client";

function CreateProject() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleOpen = () => {
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;

    setOpen(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await client.post("/projects", {
        name: name.trim(),
        description: description.trim(),
      });

      setName("");
      setDescription("");
      setOpen(false);

      window.location.reload();
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Create Project Banner */}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",

          display: "flex",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          justifyContent: "space-between",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          gap: 3,

          p: {
            xs: 3,
            md: 3.5,
          },

          borderRadius: "20px",

          bgcolor: "background.paper",

          border: "1px solid",

          borderColor: "divider",

          boxShadow:
            "0 10px 30px rgba(15, 23, 42, 0.05)",
        }}
      >
        {/* Decorative Circle */}

        <Box
          sx={{
            position: "absolute",

            width: 170,
            height: 170,

            borderRadius: "50%",

            right: -70,
            top: -100,

            bgcolor:
              "rgba(99, 102, 241, 0.08)",
          }}
        />

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,

              flexShrink: 0,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: "17px",

              fontSize: "1.8rem",

              color: "primary.main",

              bgcolor:
                "rgba(99, 102, 241, 0.12)",
            }}
          >
            +
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 0.4,
              }}
            >
              Start something new
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Create a workspace for your next
              idea and invite your team.
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            position: "relative",

            zIndex: 1,

            minWidth: {
              xs: "100%",
              sm: 170,
            },

            background:
              "linear-gradient(135deg, #6366F1, #7C3AED)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #4F46E5, #6D28D9)",
            },
          }}
        >
          + New Project
        </Button>
      </Box>

      {/* Create Project Dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <Box
          sx={{
            height: 5,

            background:
              "linear-gradient(90deg, #6366F1, #8B5CF6, #06B6D4)",
          }}
        />

        <DialogTitle
          sx={{
            pb: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h5">
                Create New Project
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Give your project a clear name
                and short description.
              </Typography>
            </Box>

            <IconButton
              onClick={handleClose}
              disabled={loading}
              size="small"
            >
              ✕
            </IconButton>
          </Stack>
        </DialogTitle>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <Stack spacing={2.5}>
              <TextField
                label="Project Name"
                placeholder="Example: DevBoard Redesign"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                fullWidth
                autoFocus
              />

              <TextField
                label="Description"
                placeholder="What is this project about?"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                multiline
                rows={4}
                fullWidth
              />

              {error && (
                <Box
                  sx={{
                    p: 1.5,

                    borderRadius: "10px",

                    color: "error.main",

                    bgcolor:
                      "rgba(244, 63, 94, 0.08)",
                  }}
                >
                  <Typography variant="body2">
                    {error}
                  </Typography>
                </Box>
              )}
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 3,
            }}
          >
            <Button
              onClick={handleClose}
              disabled={loading}
              color="inherit"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={
                loading || !name.trim()
              }
              sx={{
                minWidth: 150,

                background:
                  "linear-gradient(135deg, #6366F1, #7C3AED)",
              }}
            >
              {loading ? (
                <CircularProgress
                  size={22}
                  color="inherit"
                />
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default CreateProject;