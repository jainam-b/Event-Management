import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SignupModal from "./SignupModal";
import axios from "axios";
import { BACKEND_URL } from "../config";

const AuthStatus: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); // Show modal after 10 seconds

      return () => clearTimeout(timer); // Clear timer on unmount
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/v1/user/${user.email}`
          );
          setUserData(response.data);
          localStorage.setItem("userData", JSON.stringify(response.data)); // Cache user data
        } catch (err) {
          // If there is an error and we have cached data, use that instead
          const cachedUserData = localStorage.getItem("userData");
          if (cachedUserData) {
            setUserData(JSON.parse(cachedUserData));
          } else {
            setError(err as Error);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center p-6">
          <div className="w-24 h-24 mb-4 rounded-full bg-gray-300 flex items-center justify-center text-5xl font-bold text-black">
            {userData?.name ? getInitials(userData.name) : "?"}
          </div>
          <h5 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {userData?.name || "Not provided"}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.email || "Not provided"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthStatus;
