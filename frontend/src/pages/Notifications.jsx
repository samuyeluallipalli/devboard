import { useNotifications } from "../contexts/NotificationContext";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from "@mui/material";

function Notifications() {
  const {
    notifications,
    markAsRead,
  } = useNotifications();

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
      >
        Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Typography variant="h6">
          No notifications
        </Typography>
      ) : (
        notifications.map((notification) => (
          <Card
            key={notification._id}
            sx={{
              mb: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                {notification.message}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Chip
                  label={
                    notification.isRead
                      ? "Read"
                      : "Unread"
                  }
                  color={
                    notification.isRead
                      ? "success"
                      : "warning"
                  }
                />

                {!notification.isRead && (
                  <Button
                    variant="contained"
                    onClick={() =>
                      markAsRead(
                        notification._id
                      )
                    }
                  >
                    Mark as Read
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Notifications;