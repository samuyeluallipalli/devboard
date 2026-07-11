import { createContext, useContext, useState } from "react";
import client from "../api/client";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [summary, setSummary] = useState(null);
  const [priorityData, setPriorityData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const getSummary = async (projectId) => {
    try {
      const res = await client.get(
        `/dashboard/summary/${projectId}`
      );

      setSummary(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getPriorityDistribution = async (projectId) => {
    try {
      const res = await client.get(
        `/dashboard/priority/${projectId}`
      );

      setPriorityData(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getStatusDistribution = async (projectId) => {
    try {
      const res = await client.get(
        `/dashboard/status/${projectId}`
      );

      setStatusData(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        summary,
        priorityData,
        statusData,
        getSummary,
        getPriorityDistribution,
        getStatusDistribution,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};