import { useEffect } from "react";
import socket from "../socket";

function RealtimeNotification() {
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user?._id) {
      console.log("Joining room:", user._id);

      socket.emit("joinRoom", user._id);
    }

    socket.on("notification", (data) => {
      console.log("Received notification:", data);

      alert(data.message);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return null;
}

export default RealtimeNotification;