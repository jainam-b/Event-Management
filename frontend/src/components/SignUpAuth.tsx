import React, { useState } from 'react';
import { SignupInput } from '@jainam-b/event-comman/dist';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Cookies from 'js-cookie';

interface Errors {
  name: string;
  email: string;
  password: string;
  general: string;
}

const Auth: React.FC = () => {
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const validateInputs = (): boolean => {
    let isValid = true;
    const newErrors: Errors = { name: '', email: '', password: '', general: '' };

    if (!signupInputs.name?.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!signupInputs.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupInputs.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!signupInputs.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (signupInputs.password.length < 6) {
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
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInputs);
      Cookies.set('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'An error occurred during signup. Please try again.',
      }));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F8FA]">
      <div className="p-10 mr-auto">
        <div className="text-4xl text-center font-bold mb-8">
          Event <span className="text-[#7848F4]">Hive</span>
        </div>
        <div className="text-6xl">Sign Up to Event Hive</div>
        {errors.general && (
          <div className="mt-4 text-red-500">{errors.general}</div>
        )}
        <div className="pt-8">
          <div className="text-xl pb-4">YOUR NAME</div>
          <input
            type="text"
            id="name"
            className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John"
            required
            onChange={handleChange}
          />
          {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
        </div>
        <div className="pt-4">
          <div className="text-xl pb-4">EMAIL</div>
          <input
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="example@example.com"
            required
            onChange={handleChange}
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
            required
            onChange={handleChange}
          />
          {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
        </div>
        <div className="pt-8 flex justify-center">
          <button
            type="button"
            onClick={sendRequest}
            className="text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:ring-4 focus:ring-[#7848F4]/50 focus:outline-none font-medium rounded-lg text-lg px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7848F4]/50 me-4 mb-4"
          >
            Sign Up
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
              onClick={() => navigate("/signin")}
              className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7848F4]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
