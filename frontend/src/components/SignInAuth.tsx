import React, { useState } from 'react';
import { SigninType } from '@jainam-b/event-comman/dist';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [signinInputs, setSigninInputs] = useState<SigninType>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSigninInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '', general: '' }));
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', general: '' };

    if (!signinInputs.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signinInputs.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!signinInputs.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (signinInputs.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendRequest = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInputs);
      Cookies.set('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'An error occurred during signin. Please try again.',
      }));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F8FA]">
      <div className="p-10 mx-auto">
        <div className="text-4xl text-center font-bold mb-8">
          Event <span className="text-[#7848F4]">Hive</span>
        </div>
        <div className="text-6xl">Sign In to Event Hive</div>
        {errors.general && (
          <div className="mt-4 text-red-500">{errors.general}</div>
        )}
        <div className="">
          <div className="pt-4">
            <div className="text-xl pb-4">EMAIL</div>
            <input
              type="email"
              id="email"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example@example.com"
              onChange={handleChange}
              required
            />
            {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
          </div>
          <div className="pt-4">
            <div className="text-xl pb-4">PASSWORD</div>
            <input
              type="password"
              id="password"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="********"
              onChange={handleChange}
              required
            />
            {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
          </div>
          <div className="pt-8 flex justify-center">
            <button
              type="button"
              onClick={sendRequest}
              className="text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:ring-4 focus:ring-[#7848F4]/50 focus:outline-none font-medium rounded-lg text-lg px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7848F4]/50 me-4 mb-4"
            >
              Sign In
            </button>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7848F4]"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
