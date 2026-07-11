import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

function CreateTask({ projectId, members, }) {
  const {
    createTask,
    uploadTaskFiles,
  } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("Medium");
  const [dueDate, setDueDate] =
    useState("");
  const [assignedTo, setAssignedTo] =
    useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = await createTask({
        title,
        description,
        status: "To Do",
        priority,
        dueDate,
        assignedTo,
        project: projectId,
      });

      if (
        newTask &&
        files.length > 0
      ) {
        await uploadTaskFiles(
          newTask._id,
          files
        );
      }

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setAssignedTo("");
      setFiles([]);

      alert("Task created successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to create task");
    }
  };

  return (
    <Card sx={{ mb: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
        >
          Create Task
        </Typography>

        <Stack
          spacing={3}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            fullWidth
            required
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>
              Priority
            </InputLabel>

            <Select
              value={priority}
              label="Priority"
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
            >
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

          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>
              Assign To
            </InputLabel>

            <Select
              value={assignedTo}
              label="Assign To"
              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }
            >
              <MenuItem value="">
                Unassigned
              </MenuItem>

              {members.map((member) => (
                <MenuItem
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
          >

            Choose Files

            <input
              hidden
              multiple
              type="file"
              onChange={(e) =>
                setFiles(
                  [...e.target.files]
                )
              }
            />
          </Button>

          {files.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {files.length} file(s)
              selected
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Create Task
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CreateTask;