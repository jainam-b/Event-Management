// import React, { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { BACKEND_URL } from '../config';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchCookie = async () => {
//     try {
//       // Fetch the token from the server or API
//       // const response = await axios.get(`${BACKEND_URL}/cookies`);
//       // const token = response.data.token;

//       // Set the token in cookies or local storage
//       if (token) {
//         Cookies.set('token', token, { expires: 1 }); // Store the token with an expiry of 1 day
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.error('Error fetching cookie:', error);
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCookie();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
