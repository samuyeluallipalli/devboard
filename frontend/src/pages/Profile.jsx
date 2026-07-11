import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Chip,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

import client from "../api/client";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { user, setUser } = useAuth();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [name, setName] = useState(
    user?.name || ""
  );

  const [email, setEmail] = useState(
    user?.email || ""
  );

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [
    updatingProfile,
    setUpdatingProfile,
  ] = useState(false);

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // Update form when user becomes available

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Clean preview URL

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Select Avatar

  const handleFileChange = (e) => {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (
      !selectedFile.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image file"
      );

      return;
    }

    setError("");
    setMessage("");

    setFile(selectedFile);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl =
      URL.createObjectURL(selectedFile);

    setPreview(previewUrl);
  };

  // Upload Avatar

  const handleUpload = async () => {
    if (!file) {
      setError(
        "Please choose an image first"
      );

      return;
    }

    try {
      setUploading(true);

      setError("");
      setMessage("");

      const formData = new FormData();

      formData.append("avatar", file);

      const res = await client.post(
        "/users/avatar",
        formData
      );

      console.log(
        "Avatar upload response:",
        res.data
      );

      const avatarUrl =
        res.data.avatar ||
        res.data.user?.avatar;

      const returnedUser =
        res.data.user || res.data;

      const updatedUser = {
        ...user,
        ...returnedUser,

        avatar: avatarUrl
          ? `${avatarUrl}${avatarUrl.includes("?")
            ? "&"
            : "?"
          }v=${Date.now()}`
          : user.avatar,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setFile(null);
      setPreview("");

      setMessage(
        "Profile picture uploaded successfully"
      );
    } catch (error) {
      console.error(
        "Avatar Upload Error:",
        error
      );

      console.error(
        "Backend Response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Profile picture upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // Update Profile

  const handleUpdateProfile =
    async () => {
      try {
        setUpdatingProfile(true);

        setError("");
        setMessage("");

        const res = await client.put(
          "/users/profile",
          {
            name,
            email,
          }
        );

        const updatedUser = {
          ...user,
          ...res.data,
        };

        setUser(updatedUser);

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setMessage(
          "Profile updated successfully"
        );
      } catch (error) {
        console.error(
          "Profile Update Error:",
          error.response?.data ||
          error.message
        );

        setError(
          error.response?.data?.message ||
          "Profile update failed"
        );
      } finally {
        setUpdatingProfile(false);
      }
    };

  // Change Password

  const handleChangePassword =
    async () => {
      if (
        !currentPassword ||
        !newPassword
      ) {
        setError(
          "Please enter both current and new passwords"
        );

        return;
      }

      try {
        setChangingPassword(true);

        setError("");
        setMessage("");

        await client.put(
          "/users/password",
          {
            currentPassword,
            newPassword,
          }
        );

        setCurrentPassword("");
        setNewPassword("");

        setMessage(
          "Password updated successfully"
        );
      } catch (error) {
        console.error(
          "Password Error:",
          error.response?.data ||
          error.message
        );

        setError(
          error.response?.data?.message ||
          "Password update failed"
        );
      } finally {
        setChangingPassword(false);
      }
    };

  return (
    <Box
      sx={{
        maxWidth: 850,
        mx: "auto",
      }}
    >
      {/* Page Heading */}

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">
          My Profile
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Manage your account and preferences.
        </Typography>
      </Box>

      {/* Messages */}

      {message && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {/* Profile Card */}

      <Card>
        <CardContent
          sx={{
            p: {
              xs: 2.5,
              sm: 4,
            },

            "&:last-child": {
              pb: {
                xs: 2.5,
                sm: 4,
              },
            },
          }}
        >
          {/* Avatar Section */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              src={
                preview ||
                user.avatar ||
                ""
              }
              sx={{
                width: 130,
                height: 130,

                fontSize: "2.8rem",
                fontWeight: 800,

                bgcolor: "primary.main",

                border: "4px solid",

                borderColor:
                  "primary.main",

                boxShadow:
                  "0 12px 30px rgba(99, 102, 241, 0.25)",
              }}
            >
              {!preview &&
                !user.avatar &&
                user.name
                  ?.charAt(0)
                  .toUpperCase()}
            </Avatar>

            <Box
              sx={{
                textAlign: {
                  xs: "center",
                  sm: "left",
                },

                flexGrow: 1,
              }}
            >
              <Typography variant="h5">
                {user.name}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {user.email}
              </Typography>

              <Chip
                label={
                  user.role || "Member"
                }
                color="primary"
                size="small"
                sx={{
                  mt: 1.5,
                  textTransform:
                    "capitalize",
                }}
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={1.5}
                sx={{ mt: 2.5 }}
              >
                <Button
                  variant="outlined"
                  component="label"
                >
                  Choose Picture

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={
                      handleFileChange
                    }
                  />
                </Button>

                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={
                    !file || uploading
                  }
                >
                  {uploading ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />

                      Uploading...
                    </>
                  ) : (
                    "Upload Picture"
                  )}
                </Button>
              </Stack>

              {file && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mt: 1.5,
                  }}
                >
                  Selected: {file.name}
                </Typography>
              )}
            </Box>
          </Stack>

          <Divider sx={{ my: 4 }} />

          {/* Edit Profile */}

          <Box>
            <Typography
              variant="h5"
              sx={{ mb: 0.5 }}
            >
              Personal Information
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Update your name and email
              address.
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <Box>
                <Button
                  variant="contained"
                  onClick={
                    handleUpdateProfile
                  }
                  disabled={
                    updatingProfile
                  }
                >
                  {updatingProfile ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />

                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Password Section */}

          <Box>
            <Typography
              variant="h5"
              sx={{ mb: 0.5 }}
            >
              Security
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Change your account password.
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={
                    handleChangePassword
                  }
                  disabled={
                    changingPassword
                  }
                >
                  {changingPassword ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />

                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;