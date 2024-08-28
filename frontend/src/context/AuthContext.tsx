import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCookie } from "../utils/cookies"; // Import your getCookie function
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state

  useEffect(() => {
    const token = getCookie("token");
    console.log("Token:", token); // Debugging line

    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token); // Decode the JWT token
        console.log("Decoded Token:", decodedToken); // Debugging line

        setIsAuthenticated(true);
        setUser(decodedToken); // Store decoded user info

        // Cache user data to localStorage
        localStorage.setItem("userData", JSON.stringify(decodedToken));

      } catch (error) {
        console.error("Failed to decode token", error);
        setIsAuthenticated(false);
        setUser(null);

        // Remove potentially invalid cached data
        localStorage.removeItem("userData");
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);

      // Clear any cached data when not authenticated
      localStorage.removeItem("userData");
    }

    setLoading(false); // Set loading to false once the checks are done
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {!loading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
