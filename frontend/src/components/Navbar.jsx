import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useTheme as useMuiTheme } from "@mui/material/styles";

import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { logout, user } = useAuth();

  const { darkMode, toggleTheme } =
    useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const muiTheme = useMuiTheme();

  const isMobile = useMediaQuery(
    muiTheme.breakpoints.down("md")
  );

  const [anchorEl, setAnchorEl] =
    useState(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const navItems = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Kanban",
      path: "/kanban",
    },
    {
      label: "Notifications",
      path: "/notifications",
    },
  ];

  const handleLogout = () => {
    logout();

    localStorage.removeItem("user");

    setAnchorEl(null);

    navigate("/");
  };

  const handleMobileNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const getInitial = () => {
    if (user?.name) {
      return user.name
        .charAt(0)
        .toUpperCase();
    }

    return "U";
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "background.paper",

          color: "text.primary",

          borderBottom: 1,

          borderColor: "divider",

          backdropFilter: "blur(18px)",

          backgroundImage: "none",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px !important",

            maxWidth: "1500px",

            width: "100%",

            mx: "auto",

            px: {
              xs: 2,
              md: 4,
            },
          }}
        >
          {/* Logo */}

          <Box
            component={Link}
            to="/projects"
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1.2,

              textDecoration: "none",

              color: "inherit",

              mr: {
                md: 5,
              },
            }}
          >
            <Box
              sx={{
                width: 38,

                height: 38,

                borderRadius: "12px",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "#fff",

                fontWeight: 900,

                fontSize: "1.1rem",

                background:
                  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",

                boxShadow:
                  "0 8px 20px rgba(99, 102, 241, 0.3)",
              }}
            >
              D
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,

                  lineHeight: 1,

                  letterSpacing: "-0.03em",
                }}
              >
                DevBoard
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                Team Workspace
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}

          {!isMobile && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                flexGrow: 1,
              }}
            >
              {navItems.map((item) => {
                const active =
                  location.pathname.startsWith(
                    item.path
                  );

                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: active
                        ? "primary.main"
                        : "text.secondary",

                      bgcolor: active
                        ? "action.selected"
                        : "transparent",

                      px: 1.8,

                      "&:hover": {
                        bgcolor:
                          "action.hover",

                        color:
                          "primary.main",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          )}

          <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />

          {/* Right Actions */}

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Tooltip
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <IconButton
                onClick={toggleTheme}
                sx={{
                  width: 42,
                  height: 42,

                  bgcolor: "action.hover",

                  border: 1,

                  borderColor: "divider",
                }}
              >
                {darkMode ? "☀️" : "🌙"}
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton
                onClick={(event) =>
                  setAnchorEl(
                    event.currentTarget
                  )
                }
                sx={{
                  p: 0.4,
                }}
              >
                <Avatar
                  sx={{
                    width: 38,

                    height: 38,

                    bgcolor:
                      "primary.main",

                    fontWeight: 800,
                  }}
                >
                  {getInitial()}
                </Avatar>
              </IconButton>
            </Tooltip>

            {isMobile && (
              <IconButton
                onClick={() =>
                  setMobileOpen(true)
                }
                sx={{
                  ml: 0.5,
                }}
              >
                ☰
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() =>
          setAnchorEl(null)
        }
        PaperProps={{
          sx: {
            mt: 1.5,

            width: 230,

            borderRadius: "16px",

            border: 1,

            borderColor: "divider",

            boxShadow:
              "0 18px 50px rgba(15, 23, 42, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
          }}
        >
          <Typography
            fontWeight={800}
          >
            {user?.name || "DevBoard User"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {user?.email ||
              "Manage your workspace"}
          </Typography>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/profile");
          }}
        >
          My Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/notifications");
          }}
        >
          Notifications
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "error.main",
            fontWeight: 700,
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Navigation */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
        PaperProps={{
          sx: {
            width: 280,
            p: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            mb: 3,
            px: 1,
            py: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,

              borderRadius: "12px",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              color: "#fff",

              fontWeight: 900,

              background:
                "linear-gradient(135deg, #6366F1, #8B5CF6)",
            }}
          >
            D
          </Box>

          <Typography
            variant="h6"
            fontWeight={800}
          >
            DevBoard
          </Typography>
        </Box>

        <List>
          {navItems.map((item) => {
            const active =
              location.pathname.startsWith(
                item.path
              );

            return (
              <ListItemButton
                key={item.path}
                selected={active}
                onClick={() =>
                  handleMobileNavigate(
                    item.path
                  )
                }
                sx={{
                  borderRadius: "12px",

                  mb: 0.5,

                  "&.Mui-selected": {
                    color:
                      "primary.main",

                    bgcolor:
                      "action.selected",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active
                      ? 800
                      : 600,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <ListItemButton
          onClick={() =>
            handleMobileNavigate(
              "/profile"
            )
          }
          sx={{
            borderRadius: "12px",
          }}
        >
          <ListItemText
            primary="Profile"
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "12px",
            color: "error.main",
          }}
        >
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 700,
            }}
          />
        </ListItemButton>
      </Drawer>
    </>
  );
}

export default Navbar;