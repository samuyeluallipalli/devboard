const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

require("./cron/reminderJob");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const connectDB = require("./config/db");
const { initializeSocket } = require("./socket");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const activityRoutes = require("./routes/activityRoutes");



connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("DevBoard API Running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/activities", activityRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});