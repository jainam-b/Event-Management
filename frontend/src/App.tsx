import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/Home"; // Your home component
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";

const App: React.FC = () => {
  return (
     
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
           
            <Route path="/event" element={<Event />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/" element={<Home />} />
            {/* Add more protected routes here */}
           
        </Routes>
      </Router>
    
  );
};

export default App;
