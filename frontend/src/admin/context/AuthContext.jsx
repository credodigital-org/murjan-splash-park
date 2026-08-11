import { useState } from "react";
import { login as loginRequest } from "../services/authService";
import { AuthContext } from "./authContextInstance";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("murjan_admin_token"));

  const login = async (username, password) => {
    const newToken = await loginRequest(username, password);
    localStorage.setItem("murjan_admin_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("murjan_admin_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
