import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import client from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (name, email, password) => {
    const res = await client.post("/auth/register", {
      name,
      email,
      password,
    });

    setUser(res.data);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );
  };

  const login = async (email, password) => {
    const res = await client.post("/auth/login", {
      email,
      password,
    });

    setUser(res.data);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};