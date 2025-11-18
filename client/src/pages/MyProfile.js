// client/src/pages/MyProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    allergies: '',
    medications: ''
  });
  const [message, setMessage] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/profile');
        setFormData(res.data.profile);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/user/profile', formData);
      setMessage('Profile Updated Successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold tracking-wider">Health</div>
        <nav className="flex-1 mt-6 space-y-2">
          <Link to="/dashboard" className="block px-6 py-3 text-gray-400 hover:bg-gray-700 hover:text-white">Dashboard</Link>
          <Link to="/profile" className="block px-6 py-3 bg-gray-700 border-r-4 border-white">My Profile</Link>
          <Link to="/wellness-goals" className="block px-6 py-3 text-gray-400 hover:bg-gray-700 hover:text-white">Wellness Goals</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
        {message && <div className="p-4 mb-4 bg-green-100 text-green-700 rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-2xl">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded"/>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Age</label>
              <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full border p-2 rounded"/>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Allergies (Comma separated)</label>
            <input type="text" value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} className="w-full border p-2 rounded" placeholder="e.g., Peanuts, Penicillin"/>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Current Medications</label>
            <textarea value={formData.medications} onChange={(e) => setFormData({...formData, medications: e.target.value})} className="w-full border p-2 rounded" rows="3"></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Changes</button>
        </form>
      </main>
    </div>
  );
};

export default MyProfile;