import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaInfoCircle } from 'react-icons/fa';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple authentication logic
    if (username === 'user' && password === '123456') {
      // Successful login - navigate to dashboard
      navigate('/RestaurantDashboard/Index');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-yellow-400 border-opacity-30">
          {/* Header */}
          <div className="bg-yellow-500 py-6 px-8 text-center">
            <h2 className='text-black text-3xl font-bold tracking-tight'>DineFlow</h2>
            <p className="text-black mt-1 text-sm font-medium">Restaurant Management System</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-yellow-400">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-yellow-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 sm:text-sm"
                    placeholder="Enter your username (user)"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-yellow-400">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 sm:text-sm"
                    placeholder="Enter your password (123456)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Login</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>

            {/* Demo Credentials Card */}
            <div className="mt-6 bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-400 border-opacity-50 rounded-lg p-4 shadow-lg">
              <div className="flex items-start space-x-3">
                <FaInfoCircle className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-200 mb-2">Demo Credentials</h3>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center">
                      <span className="text-blue-300 font-medium w-24">Username:</span>
                      <span className="text-white font-mono bg-blue-950 bg-opacity-50 px-2 py-1 rounded">user</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-300 font-medium w-24">Password:</span>
                      <span className="text-white font-mono bg-blue-950 bg-opacity-50 px-2 py-1 rounded">123456</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-300 mt-2 italic">Use these credentials to explore the demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;