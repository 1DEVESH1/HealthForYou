// client/src/pages/WellnessGoals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const WellnessGoals = () => {
  const { token } = useAuth();
  const [goals, setGoals] = useState({ steps: 6000, water: 8, sleep: 7 });
  const [message, setMessage] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get('/user/profile');
        setGoals(res.data.wellnessGoals);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/user/profile', { wellnessGoals: goals });
      setMessage('Goals Updated! Your dashboard will reflect these new targets.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error updating goals');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold tracking-wider">Health</div>
        <nav className="flex-1 mt-6 space-y-2">
          <Link to="/dashboard" className="block px-6 py-3 text-gray-400 hover:bg-gray-700 hover:text-white">Dashboard</Link>
          <Link to="/profile" className="block px-6 py-3 text-gray-400 hover:bg-gray-700 hover:text-white">My Profile</Link>
          <Link to="/wellness-goals" className="block px-6 py-3 bg-gray-700 border-r-4 border-white">Wellness Goals</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Wellness Goals</h1>
        {message && <div className="p-4 mb-4 bg-blue-100 text-blue-700 rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-2xl">
          <p className="mb-6 text-gray-600">Set your daily targets. These will be used to track your progress on the dashboard.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Daily Steps Target</label>
              <input type="number" value={goals.steps} onChange={(e) => setGoals({...goals, steps: e.target.value})} className="w-full border p-2 rounded"/>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Daily Water Target (Glasses)</label>
              <input type="number" value={goals.water} onChange={(e) => setGoals({...goals, water: e.target.value})} className="w-full border p-2 rounded"/>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Daily Sleep Target (Hours)</label>
              <input type="number" value={goals.sleep} onChange={(e) => setGoals({...goals, sleep: e.target.value})} className="w-full border p-2 rounded"/>
            </div>
          </div>

          <button type="submit" className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Update Goals</button>
        </form>
      </main>
    </div>
  );
};

export default WellnessGoals;