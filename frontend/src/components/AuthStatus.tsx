// components/AuthStatus.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SignupModal from "./SignupModal";

const AuthStatus: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);
  console.log("auth in auth stauts",isAuthenticated);
  
  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); // Show modal after 10 seconds

      return () => clearTimeout(timer); // Clear timer on unmount
    }
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome back, {user?.role || 'user'}!</p>
          <p>Email: {user?.email || 'Not provided'}</p>
          {/* Add other user details here */}
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AuthStatus;
