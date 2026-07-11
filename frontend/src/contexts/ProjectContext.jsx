import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import client from "../api/client";

const ProjectContext = createContext();

export const ProjectProvider = ({
  children,
}) => {
  const [projects, setProjects] =
    useState([]);

  const [currentProject, setCurrentProject] =
    useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await client.get(
        "/projects"
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectById = async (
    id
  ) => {
    try {
      const res = await client.get(
        `/projects/${id}`
      );

      setCurrentProject(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () =>
  useContext(ProjectContext);