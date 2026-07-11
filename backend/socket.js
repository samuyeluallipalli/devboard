let io;

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};