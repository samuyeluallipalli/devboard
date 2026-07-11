import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password);

    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%", p: 2 }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
            >
              Register
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Register;