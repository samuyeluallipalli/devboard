import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/projects");
    } catch (error) {
      alert("Login Failed");
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
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
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
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;