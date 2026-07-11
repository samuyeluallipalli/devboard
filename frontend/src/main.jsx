import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import { TaskProvider } from "./contexts/TaskContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { CommentProvider } from "./contexts/CommentContext";
import { ActivityProvider } from "./contexts/ActivityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <CommentProvider>
            <ActivityProvider>
              <DashboardProvider>
                <NotificationProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </NotificationProvider>
              </DashboardProvider>
            </ActivityProvider>
          </CommentProvider>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  </ThemeProvider>
);