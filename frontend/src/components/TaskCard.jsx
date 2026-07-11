import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import CommentSection from "./CommentSection";

function TaskCard({
  task,
  onDelete,
  onUpdate,
}) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  const handleDelete = () => {
    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (confirmDelete) {
      onDelete(task._id);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: 3,
        border: isOverdue
          ? "3px solid red"
          : "1px solid #ddd",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
        >
          {task.title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {task.description}
        </Typography>

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <InputLabel>Status</InputLabel>

          <Select
            value={task.status}
            label="Status"
            onChange={(e) =>
              onUpdate(task._id, {
                ...task,
                status: e.target.value,
              })
            }
          >
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

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Chip
            label={task.priority}
            color={
              task.priority === "High"
                ? "error"
                : task.priority ===
                  "Medium"
                  ? "warning"
                  : "success"
            }
          />

          <Chip
            label={task.status}
            color={
              task.status === "Done"
                ? "success"
                : task.status ===
                  "In Progress"
                  ? "warning"
                  : "default"
            }
          />
        </Stack>

        {task.dueDate && (
          <Typography sx={{ mb: 2 }}>
            <strong>Due Date:</strong>{" "}
            {new Date(
              task.dueDate
            ).toLocaleDateString()}
          </Typography>
        )}

        {isOverdue && (
          <Typography
            color="error"
            sx={{ mb: 2 }}
          >
            ⚠ Overdue
          </Typography>
        )}

        {task.assignedTo && (
          <>
            <Typography sx={{ mb: 1 }}>
              <strong>
                Assigned To:
              </strong>{" "}
              {task.assignedTo.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {task.assignedTo.email}
            </Typography>
          </>
        )}

        {task.attachments?.length >
          0 && (
            <>
              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Attachments (
                {
                  task.attachments
                    .length
                }
                )
              </Typography>

              <Stack spacing={1}>
                {task.attachments.map(
                  (
                    attachment,
                    index
                  ) => (
                    <Button
                      key={
                        attachment._id ||
                        index
                      }
                      variant="outlined"
                      href={
                        attachment.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      📎{" "}
                      {attachment.originalName ||
                        `File ${index + 1
                        }`}
                    </Button>
                  )
                )}
              </Stack>
            </>
          )}

        <CommentSection
          taskId={task._id}
        />

        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 3 }}
          onClick={
            handleDelete
          }
        >
          Delete Task
        </Button>
      </CardContent>
    </Card>
  );
}

export default TaskCard;