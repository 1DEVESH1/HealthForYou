// client/src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import LandingPage from './pages/LandingPage'; // 1. Import the new page
import MyProfile from './pages/MyProfile';       // Import
import WellnessGoals from './pages/WellnessGoals';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar removed from here because LandingPage & Dashboard have their own headers */}
      
      <div className=""> {/* Removed container padding to let headers stretch full width */}
        <Routes>
          {/* --- Public Routes --- */}
          
          {/* 2. Set the Landing Page as the default '/' route */}
          <Route path="/" element={<LandingPage />} /> 
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Protected Routes --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wellness-goals"
            element={
              <ProtectedRoute>
                <WellnessGoals />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;