import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await client.get("/notifications");

      console.log("Notifications:", res.data);

      setNotifications(res.data);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await client.put(
        `/notifications/${id}`
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? res.data
            : notification
        )
      );
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getNotifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};