// App.tsx

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
import BookTicket from "./components/BookTicket";
import Ticket from "./pages/Ticket";
// import Checkout from "./components/Checkout";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<AuthStatus />} />
          {/* <Route path="/checkout" element={<Checkout/>} /> */}

          
          <Route element={<ProtectedRoute />}>
            <Route path="/buy-ticket/:eventId" element={<BookTicket />} />
            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/ticket" element={<Ticket />} />

          </Route>

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
