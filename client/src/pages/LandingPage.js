// client/src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* --- Header Section --- */}
      <header className="bg-gray-600 text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo / Title */}
          <h1 className="text-2xl font-bold tracking-wide">Healthcare Portal</h1>

          {/* Auth Buttons (Top Right Corner) */}
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium bg-white text-gray-800 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* --- Navigation Bar --- */}
        <nav className="bg-gray-700 text-gray-300 text-sm">
          <div className="container mx-auto px-6 py-2 flex justify-center space-x-8">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Health Topics</a>
            <a href="#" className="hover:text-white transition">Services</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </nav>
      </header>

      {/* --- Main Content --- */}
      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Latest Health Information</h2>

        <div className="space-y-6">
          
          {/* Card 1: COVID-19 */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">COVID-19 Updates</h3>
            <p className="text-gray-600 text-sm mb-4">
              Stay informed about the latest COVID-19 guidelines and vaccination information.
            </p>
            <button className="bg-gray-600 text-white text-xs px-4 py-2 rounded hover:bg-gray-700 transition">
              Read More
            </button>
          </div>

          {/* Card 2: Seasonal Flu */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Seasonal Flu Prevention</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.
            </p>
            <button className="bg-gray-600 text-white text-xs px-4 py-2 rounded hover:bg-gray-700 transition">
              Read More
            </button>
          </div>

          {/* Card 3: Mental Health */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Mental Health Awareness</h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore resources and support options for maintaining good mental health.
            </p>
            <button className="bg-gray-600 text-white text-xs px-4 py-2 rounded hover:bg-gray-700 transition">
              Read More
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LandingPage;