import { createContext, useContext, useState } from "react";
import React from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("hirehub-user")) || null
  );

  const login = (data) => {
    setUser(data);
    localStorage.setItem("hirehub-user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hirehub-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
