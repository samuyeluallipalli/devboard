import { useEffect } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useAuth } from "../contexts/AuthContext";

import StatusChart from "../components/StatusChart";
import PriorityChart from "../components/PriorityChart";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Skeleton,
  Chip,
} from "@mui/material";

function Dashboard() {
  const {
    summary,
    priorityData,
    statusData,
    getSummary,
    getPriorityDistribution,
    getStatusDistribution,
  } = useDashboard();

  const { user } = useAuth();

  const projectId =
    "6a33cef5a381d79b3a654ba1";

  useEffect(() => {
    getSummary(projectId);
    getPriorityDistribution(projectId);
    getStatusDistribution(projectId);
  }, []);

  if (!summary) {
    return (
      <Box>
        <Skeleton
          variant="rounded"
          height={170}
          sx={{
            borderRadius: "24px",
            mb: 3,
          }}
        />

        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid
              key={item}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Skeleton
                variant="rounded"
                height={150}
                sx={{
                  borderRadius: "18px",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const totalTasks =
    Number(summary.totalTasks) || 0;

  const completedTasks =
    Number(summary.completedTasks) || 0;

  const pendingTasks =
    Number(summary.pendingTasks) || 0;

  const completionRate =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      symbol: "◈",
      description:
        "All tasks in this workspace",
      accent: "#6366F1",
      soft: "rgba(99, 102, 241, 0.12)",
    },
    {
      title: "Completed",
      value: completedTasks,
      symbol: "✓",
      description:
        `${completionRate}% completion rate`,
      accent: "#10B981",
      soft: "rgba(16, 185, 129, 0.12)",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      symbol: "◷",
      description:
        "Tasks requiring attention",
      accent: "#F59E0B",
      soft: "rgba(245, 158, 11, 0.12)",
    },
  ];

  return (
    <Box>
      {/* Welcome Header */}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "24px",
          mb: 4,
          p: {
            xs: 3,
            md: 4,
          },
          color: "#fff",
          background:
            "linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #2563EB 100%)",
          boxShadow:
            "0 20px 50px rgba(79, 70, 229, 0.22)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: "50%",
            bgcolor:
              "rgba(255,255,255,0.10)",
            top: -140,
            right: -40,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            bgcolor:
              "rgba(255,255,255,0.07)",
            bottom: -100,
            right: 180,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Chip
            label="Workspace Overview"
            sx={{
              mb: 2,
              color: "#fff",
              bgcolor:
                "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              fontWeight: 700,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
            }}
          >
            Welcome back
            {user?.name
              ? `, ${user.name}`
              : ""}
            👋
          </Typography>

          <Typography
            sx={{
              maxWidth: 620,
              opacity: 0.86,
              fontSize: {
                xs: "0.95rem",
                md: "1.05rem",
              },
            }}
          >
            Here's a clear overview of your
            team's task progress and current
            workload.
          </Typography>
        </Box>
      </Box>

      {/* Heading */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={1}
        sx={{
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="h5">
            Performance Overview
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Track your project task progress
            at a glance.
          </Typography>
        </Box>

        <Chip
          label={`${completionRate}% Complete`}
          color="success"
          variant="outlined"
        />
      </Stack>

      {/* Statistics */}

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4,
        }}
      >
        {stats.map((stat) => (
          <Grid
            key={stat.title}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              sx={{
                height: "100%",
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  "&:last-child": {
                    pb: 3,
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {stat.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        letterSpacing:
                          "-0.04em",
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "center",
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: stat.accent,
                      bgcolor: stat.soft,
                    }}
                  >
                    {stat.symbol}
                  </Box>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 2,
                  }}
                >
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Progress Section */}

      <Card
        sx={{
          mb: 4,
        }}
      >
        <CardContent
          sx={{
            p: 3,
            "&:last-child": {
              pb: 3,
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6">
                Overall Progress
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Based on completed tasks
              </Typography>
            </Box>

            <Typography
              variant="h5"
              color="primary.main"
              fontWeight={800}
            >
              {completionRate}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={completionRate}
            sx={{
              height: 12,
              borderRadius: "20px",

              bgcolor:
                "rgba(99, 102, 241, 0.10)",

              "& .MuiLinearProgress-bar": {
                borderRadius: "20px",

                background:
                  "linear-gradient(90deg, #6366F1, #8B5CF6)",
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Analytics */}

      <Box
        sx={{
          mb: 2.5,
        }}
      >
        <Typography variant="h5">
          Analytics
        </Typography>

        <Typography
          color="text.secondary"
          variant="body2"
        >
          Understand task distribution by
          status and priority.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 0.5,
                }}
              >
                Status Distribution
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                }}
              >
                Current task workflow status
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  minHeight: 320,
                }}
              >
                <StatusChart
                  data={statusData}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 0.5,
                }}
              >
                Priority Distribution
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                }}
              >
                Task workload grouped by
                priority
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  minHeight: 320,
                }}
              >
                <PriorityChart
                  data={priorityData}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;