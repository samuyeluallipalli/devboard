import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";

function Layout({ children }) {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/register";

  // Login and Register use their own full-page design
  if (isAuthPage) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Navigation */}
      <Navbar />

      {/* Main application content */}
      <Box
        component="main"
        sx={{
          minHeight: "100vh",

          pt: {
            xs: 9,
            md: 10,
          },

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          pb: 5,

          transition:
            "background-color 0.3s ease",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1500px",
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;