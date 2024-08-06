// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";
import AuthStatus from "./components/AuthStatus";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<AuthStatus />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/event/:id" element={<Event />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/events" element={<AllEvents />} />
          </Route>

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
