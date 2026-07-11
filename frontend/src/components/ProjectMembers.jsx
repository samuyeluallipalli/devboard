import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Button,
} from "@mui/material";

import client from "../api/client";

function ProjectMembers({
  members,
  owner,
  projectId,
  refreshProject,
}) {
  const handleRemove = async (
    memberId
  ) => {
    try {
      await client.delete(
        `/projects/${projectId}/member/${memberId}`
      );

      refreshProject();
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
        >
          Members
        </Typography>

        <Stack spacing={2}>
          {members.map((member) => (
            <Stack
              key={member._id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Avatar>
                  {member.name[0].toUpperCase()}
                </Avatar>

                <div>
                  <Typography>
                    {member.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {member.email}
                  </Typography>
                </div>
              </Stack>

              {owner._id !== member._id && (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() =>
                    handleRemove(
                      member._id
                    )
                  }
                >
                  Remove
                </Button>
              )}
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProjectMembers;