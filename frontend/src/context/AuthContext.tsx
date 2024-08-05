// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie } from '../utils/cookies'; // Update path if necessary
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Update this type according to your JWT payload
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: any) => void; // Update this type accordingly
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Update type as needed

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the JWT token
        setIsAuthenticated(true);
        setUser(decodedToken); // Store decoded user info
        console.log(user);
        
      } catch (error) {
        console.error('Failed to decode token', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
