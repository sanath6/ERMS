import { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/profile')
      .then((res) => setProfile(res.data))
      .catch(() => alert('Please login again'));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome: {profile.email}</p>
      <p>Role: {profile.role}</p>

      {profile.role === 'manager' && <div>Manager Panel: View all engineers</div>}
      {profile.role === 'engineer' && <div>Engineer Panel: View tasks</div>}
    </div>
  );
}
