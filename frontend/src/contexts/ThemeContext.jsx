import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("devboard-theme");

    if (savedTheme !== null) {
      return savedTheme === "dark";
    }

    return false;
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem(
      "devboard-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",

          primary: {
            main: "#6366F1",
            light: "#818CF8",
            dark: "#4F46E5",
          },

          secondary: {
            main: "#06B6D4",
          },

          success: {
            main: "#10B981",
          },

          warning: {
            main: "#F59E0B",
          },

          error: {
            main: "#F43F5E",
          },

          background: darkMode
            ? {
                default: "#0B1120",
                paper: "#111827",
              }
            : {
                default: "#F6F7FB",
                paper: "#FFFFFF",
              },

          text: darkMode
            ? {
                primary: "#F8FAFC",
                secondary: "#94A3B8",
              }
            : {
                primary: "#172033",
                secondary: "#64748B",
              },

          divider: darkMode
            ? "rgba(148, 163, 184, 0.15)"
            : "rgba(15, 23, 42, 0.08)",
        },

        shape: {
          borderRadius: 14,
        },

        typography: {
          fontFamily:
            '"Inter", "Segoe UI", "Roboto", sans-serif',

          h1: {
            fontWeight: 800,
          },

          h2: {
            fontWeight: 800,
          },

          h3: {
            fontWeight: 800,
          },

          h4: {
            fontWeight: 750,
            letterSpacing: "-0.03em",
          },

          h5: {
            fontWeight: 700,
          },

          h6: {
            fontWeight: 700,
          },

          button: {
            textTransform: "none",
            fontWeight: 700,
          },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              "*": {
                boxSizing: "border-box",
              },

              body: {
                margin: 0,
                minHeight: "100vh",
              },

              "#root": {
                minHeight: "100vh",
              },

              "*::-webkit-scrollbar": {
                width: "7px",
                height: "7px",
              },

              "*::-webkit-scrollbar-thumb": {
                backgroundColor: darkMode
                  ? "#334155"
                  : "#CBD5E1",
                borderRadius: "10px",
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "18px",

                border: darkMode
                  ? "1px solid rgba(148, 163, 184, 0.12)"
                  : "1px solid rgba(15, 23, 42, 0.06)",

                boxShadow: darkMode
                  ? "0 12px 32px rgba(0, 0, 0, 0.20)"
                  : "0 10px 30px rgba(15, 23, 42, 0.06)",

                backgroundImage: "none",

                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                  transform: "translateY(-2px)",

                  boxShadow: darkMode
                    ? "0 18px 40px rgba(0, 0, 0, 0.28)"
                    : "0 16px 38px rgba(15, 23, 42, 0.10)",
                },
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "12px",
                minHeight: "42px",
                paddingLeft: "18px",
                paddingRight: "18px",
              },

              containedPrimary: {
                boxShadow:
                  "0 8px 20px rgba(99, 102, 241, 0.25)",

                "&:hover": {
                  boxShadow:
                    "0 12px 26px rgba(99, 102, 241, 0.35)",
                },
              },
            },
          },

          MuiTextField: {
            defaultProps: {
              variant: "outlined",
            },
          },

          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: "12px",
              },
            },
          },

          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: "9px",
                fontWeight: 700,
              },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },

          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: "20px",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}