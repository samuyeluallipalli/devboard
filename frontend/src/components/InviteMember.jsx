import { useState } from "react";

import {
  Stack,
  TextField,
  Button,
} from "@mui/material";

import client from "../api/client";

function InviteMember({ projectId }) {
  const [email, setEmail] = useState("");

  const handleInvite = async () => {
    if (!email.trim()) {
      alert("Please enter an email");
      return;
    }

    try {
      const res = await client.post(
        `/projects/${projectId}/invite`,
        { email }
      );

      console.log("Invite Response:", res.data);

      alert("Member invited successfully");

      setEmail("");
    } catch (error) {
      console.log(
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Failed to invite member"
      );
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Member Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        fullWidth
      />

      <Button
        variant="contained"
        onClick={handleInvite}
      >
        Invite Member
      </Button>
    </Stack>
  );
}

export default InviteMember;