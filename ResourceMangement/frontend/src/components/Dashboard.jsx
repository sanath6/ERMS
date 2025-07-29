import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    API.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setProfile(res.data))
      .catch(() => {
        alert('Session expired, please login again');
        localStorage.removeItem('token');
        window.location.href = '/';
      });
  }, []);

  if (!profile) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {profile.email}</h1>
        <p className="text-gray-600 mb-6">Role: <span className="text-indigo-600 font-semibold">{profile.role}</span></p>

        {profile.role === 'manager' ? <ManagerDashboard  navigate={navigate}/> : <EngineerDashboard />}
      </div>
    </div>
  );
}

function ManagerDashboard({navigate}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Manager Panel</h2>
      <ul className="space-y-4">
        <li
          className="bg-indigo-50 p-4 rounded-md cursor-pointer hover:bg-indigo-100"
          onClick={() => navigate('/manager-panel')}
        >
          ✔ View All Engineers
        </li>
        
        <li className="bg-indigo-50 p-4 rounded-md"
         onClick={() => navigate('/projects')}
        
        >✔ Projects</li>
      
        <li className="bg-indigo-50 p-4 rounded-md"
        onClick={() => navigate('/assignments')}
        >✔ View Assignments</li>
        <li className="bg-indigo-50 p-4 rounded-md"
         onClick={() => navigate('/assign-engineers')}
        
        >✔ Assign Engineers to Projects</li>
        <li className="bg-indigo-50 p-4 rounded-md">✔ Track Availability</li>
      </ul>
    </div>
  );
}

function EngineerDashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Engineer Panel</h2>
      <ul className="space-y-4">
        <li className="bg-blue-50 p-4 rounded-md">🧠 View Assigned Tasks</li>
        <li className="bg-blue-50 p-4 rounded-md">📈 Update Availability</li>
      </ul>
    </div>
  );
}
