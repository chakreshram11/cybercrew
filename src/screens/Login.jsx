import React from "react";
import {Link} from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Login Page</h1>
        <p className="text-lg text-gray-300">
          We are working on something amazing! 🚀
        </p>
        <p className="text-md text-gray-400 mt-2">
          This page is currently under maintenance. Please check back soon!
        </p>
        <div className="mt-6">
            <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Back to Home
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
