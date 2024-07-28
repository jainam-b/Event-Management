import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/Home"; // Your home component
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
           
            <Route path="/" element={<Home />} />
            {/* Add more protected routes here */}
           
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
