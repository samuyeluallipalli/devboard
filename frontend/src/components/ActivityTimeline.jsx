import { useEffect } from "react";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

import { useActivities } from "../contexts/ActivityContext";

function ActivityTimeline({
  projectId,
}) {
  const {
    activities,
    getActivitiesByProject,
  } = useActivities();

  useEffect(() => {
    getActivitiesByProject(
      projectId
    );
  }, [projectId]);

  console.log("Activities State:", activities);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
        >
          Recent Activity
        </Typography>

        <Stack spacing={2}>
          {activities.length ===
          0 ? (
            <Typography
              color="text.secondary"
            >
              No activity yet
            </Typography>
          ) : (
            activities.map(
              (activity) => (
                <div
                  key={activity._id}
                >
                  <Typography>
                    <strong>
                      {
                        activity.user
                          ?.name
                      }
                    </strong>{" "}
                    {
                      activity.action
                    }
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </Typography>

                  <Divider
                    sx={{ mt: 1 }}
                  />
                </div>
              )
            )
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ActivityTimeline;