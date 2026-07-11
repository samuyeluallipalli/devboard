import { useEffect, useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

function KanbanBoard() {
  const { tasks, getTasksByProject, updateTask } =
    useTasks();

  const projectId = "6a33cef5a381d79b3a654ba1";

  const [boardTasks, setBoardTasks] = useState([]);

  useEffect(() => {
    getTasksByProject(projectId);
  }, []);

  useEffect(() => {
    setBoardTasks(tasks);
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    setBoardTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    updateTask(taskId, {
      status: newStatus,
    });
  };

  const columns = {
    "To Do": boardTasks.filter(
      (task) => task.status === "To Do"
    ),
    "In Progress": boardTasks.filter(
      (task) => task.status === "In Progress"
    ),
    Done: boardTasks.filter(
      (task) => task.status === "Done"
    ),
  };

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        gutterBottom
      >
        Kanban Board
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {Object.entries(columns).map(
            ([status, tasks]) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={status}
              >
                <Droppable droppableId={status}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      elevation={4}
                      sx={{
                        minHeight: 600,
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                      >
                        {status}
                      </Typography>

                      {tasks.map(
                        (task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={
                              task._id
                            }
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={
                                  provided.innerRef
                                }
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  mb: 2,
                                  cursor: "grab",
                                }}
                                style={
                                  provided
                                    .draggableProps
                                    .style
                                }
                              >
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                  >
                                    {
                                      task.title
                                    }
                                  </Typography>

                                  <Typography
                                    color="text.secondary"
                                    sx={{
                                      mb: 2,
                                    }}
                                  >
                                    {
                                      task.description
                                    }
                                  </Typography>

                                  <Chip
                                    label={
                                      task.priority
                                    }
                                    color={
                                      task.priority ===
                                      "High"
                                        ? "error"
                                        : task.priority ===
                                          "Medium"
                                        ? "warning"
                                        : "success"
                                    }
                                  />
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        )
                      )}

                      {provided.placeholder}
                    </Paper>
                  )}
                </Droppable>
              </Grid>
            )
          )}
        </Grid>
      </DragDropContext>
    </Container>
  );
}

export default KanbanBoard;