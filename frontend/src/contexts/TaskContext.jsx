import {
  createContext,
  useContext,
  useState,
} from "react";

import client from "../api/client";

const TaskContext = createContext();

export const TaskProvider = ({
  children,
}) => {
  const [tasks, setTasks] = useState([]);

  const getTasksByProject = async (
    projectId
  ) => {
    try {
      const res = await client.get(
        `/tasks/project/${projectId}`
      );

      setTasks(res.data);

      return res.data;
    } catch (error) {
      console.log(
        "Get Tasks Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  const createTask = async (
    taskData
  ) => {
    try {
      const res = await client.post(
        "/tasks",
        taskData
      );

      setTasks((prev) => [
        ...prev,
        res.data,
      ]);

      return res.data;
    } catch (error) {
      console.log(
        "Create Task Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  const updateTask = async (
    id,
    taskData
  ) => {
    try {
      const res = await client.put(
        `/tasks/${id}`,
        taskData
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? res.data
            : task
        )
      );

      return res.data;
    } catch (error) {
      console.log(
        "Update Task Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await client.delete(
        `/tasks/${id}`
      );

      setTasks((prev) =>
        prev.filter(
          (task) =>
            task._id !== id
        )
      );
    } catch (error) {
      console.log(
        "Delete Task Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  const uploadTaskFiles = async (
    taskId,
    files
  ) => {
    try {
      const formData = new FormData();

      for (let file of files) {
        formData.append(
          "files",
          file
        );
      }

      const res = await client.post(
        `/tasks/${taskId}/upload`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? res.data
            : task
        )
      );

      return res.data;
    } catch (error) {
      console.log(
        "Upload Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasksByProject,
        createTask,
        updateTask,
        deleteTask,
        uploadTaskFiles,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};