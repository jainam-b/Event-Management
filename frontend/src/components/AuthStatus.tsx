// components/AuthStatus.tsx
import React, { useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies'; // Update path if necessary
import SignupModal from './SignupModal';

const AuthStatus: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);

    if (!token) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); // Show modal after 10 seconds

      return () => clearTimeout(timer); // Clear timer on unmount
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome back, user!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AuthStatus;
