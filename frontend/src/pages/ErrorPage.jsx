import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-100 to-blue-200">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-7xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-6">
          We can't seem to find the page you're looking for.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-base transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
