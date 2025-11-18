import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; 

const PatientDashboard = () => {
  const { token, user, logout } = useAuth();
  
  // State to hold stats
  const [stats, setStats] = useState({ steps: 0, water: 0, sleep: 0 });
  
  // 🟢 UPDATE 1: Add state for goals (with defaults)
  const [goals, setGoals] = useState({ steps: 6000, water: 8, sleep: 8 }); 

  const [reminder, setReminder] = useState('');
  const [healthTip, setHealthTip] = useState('');
  const [loading, setLoading] = useState(true);

  // Setup API Wrapper
  const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: { Authorization: `Bearer ${token}` },
  });

  // 1. FETCH DATA (Read)
  const fetchDashboard = async () => {
    try {
      const res = await api.get('/patient/dashboard');
      setStats(res.data.stats);
      
      // 🟢 UPDATE 2: Update goals from the backend response
      if (res.data.goals) {
        setGoals(res.data.goals);
      }

      setReminder(res.data.reminder);
      setHealthTip(res.data.healthTip);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // 2. ADD STEPS FUNCTION (Write)
  const handleAddSteps = async () => {
    try {
      await api.post('/patient/log/steps', { count: 500 });
      fetchDashboard(); 
    } catch (err) {
      alert("Failed to log steps");
    }
  };

  // 3. ADD WATER FUNCTION (Write)
  const handleAddWater = async () => {
    try {
      await api.post('/patient/log/water', { amount: 1 });
      fetchDashboard(); 
    } catch (err) {
      alert("Failed to log water");
    }
  };

  // 4. UPDATE SLEEP FUNCTION (Write)
  const handleUpdateSleep = async () => {
    const hours = prompt("How many hours did you sleep last night?", stats.sleep);
    
    if (hours && !isNaN(hours)) {
      try {
        await api.post('/patient/log/sleep', { hours: parseFloat(hours) });
        fetchDashboard(); 
      } catch (err) {
        console.error(err);
        alert("Failed to save sleep data");
      }
    }
  };

  // 🟢 UPDATE 3: Use the dynamic 'goals' state instead of hardcoded numbers
  const stepsGoal = goals.steps || 6000;
  const stepsPercent = Math.min((stats.steps / stepsGoal) * 100, 100);

  const waterGoal = goals.water || 8; 
  const waterPercent = Math.min((stats.water / waterGoal) * 100, 100);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold tracking-wider">Health</div>
        <nav className="flex-1 mt-6 space-y-2">
          <Link to="/dashboard" className="block px-6 py-3 bg-gray-700 border-r-4 border-white">
            Dashboard
          </Link>
          <Link to="/profile" className="block px-6 py-3 text-gray-400 hover:bg-gray-700 hover:text-white">
            My Profile
          </Link>
          <Link to="/wellness-goals" className="block px-6 py-3 text-gray-400 hover:bg-gray-700 hover:text-white">
            Wellness Goals
          </Link>
        </nav>

        <div className="p-6">
          <button onClick={logout} className="text-gray-400 hover:text-white flex items-center gap-2">
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'}</h1>
          <button onClick={logout} className="md:hidden text-red-500 font-bold">Logout</button>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Wellness Goals</h2>
          
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            
            {/* --- STEPS CARD --- */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                   <span className="text-2xl">👣</span>
                   <span className="font-bold text-gray-700">Steps</span>
                </div>
                <div className="flex items-end gap-1 h-6">
                    <div className="w-1 bg-gray-300 h-2"></div>
                    <div className="w-1 bg-gray-800 h-6"></div>
                    <div className="w-1 bg-gray-300 h-3"></div>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">{stats.steps}</span>
                {/* Uses dynamic stepsGoal */}
                <span className="text-gray-500 text-sm"> /{stepsGoal} steps</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-6 relative">
                <div 
                    className="bg-gray-600 h-6 rounded-full transition-all duration-500" 
                    style={{ width: `${stepsPercent}%` }}
                ></div>
                 <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                    {Math.round(stepsPercent)}%
                 </span>
              </div>

               <button 
                 onClick={handleAddSteps} 
                 className="mt-3 w-full py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded border border-gray-300"
               >
                 + Add 500 Steps
               </button>
            </div>

            {/* --- WATER CARD --- */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
               <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                   <span className="text-2xl">💧</span>
                   <span className="font-bold text-gray-700">Water</span>
                </div>
                {/* Uses dynamic waterGoal */}
                <div className="text-xs text-gray-500">Goal: {waterGoal} glasses</div>
              </div>

              <div className="flex justify-between items-end mb-2">
                 <div>
                    <span className="text-2xl font-bold text-gray-900">{stats.water}</span>
                    <span className="text-gray-500 text-sm"> /{waterGoal}</span>
                 </div>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-8 border border-gray-200 p-1 relative mb-2">
                <div 
                    className="bg-blue-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${waterPercent}%` }}
                ></div>
              </div>
              
               <button 
                 onClick={handleAddWater} 
                 className="w-full py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded border border-blue-200"
               >
                 + Drink Glass
               </button>
            </div>

             {/* --- SLEEP CARD --- */}
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
               <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                   <span className="text-2xl">🌙</span>
                   <span className="font-bold text-gray-700">Sleep</span>
                </div>
                <div className="text-xs text-gray-500">Last Night</div>
              </div>

              <div className="mb-2">
                 <span className="text-2xl font-bold text-gray-900">{stats.sleep}</span>
                 <span className="text-gray-500 text-sm"> hrs</span>
              </div>
              
              <div className="flex gap-1 mb-2">
                  {[...Array(8)].map((_, i) => (
                      <div key={i} className={`h-4 flex-1 rounded-full ${i < stats.sleep ? 'bg-indigo-400' : 'bg-gray-200'}`}></div>
                  ))}
              </div>

              <button 
                 onClick={handleUpdateSleep} 
                 className="w-full py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded border border-indigo-200"
               >
                 ✎ Update Hours
               </button>
            </div>

          </div>
        </section>

        <section className="mb-8 border-t border-gray-300 pt-6">
          <h2 className="text-sm font-bold text-gray-600 uppercase mb-2">Reminders</h2>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded text-sm text-gray-700">
            {reminder}
          </div>
        </section>

        <section className="border-t border-gray-300 pt-6">
          <h2 className="text-sm font-bold text-gray-600 uppercase mb-2">Health Tip</h2>
          <div className="text-gray-600 text-sm italic bg-blue-50 p-4 rounded">
            "{healthTip}"
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;