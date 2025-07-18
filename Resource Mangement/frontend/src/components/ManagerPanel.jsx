import { useEffect, useState } from 'react';
import API from '../api';
import BackButton from './Backbutton.jsx';

export default function ManagerPanel() {
  const [engineers, setEngineers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    skills: '',
    seniority: 'Junior',
    employmentType: 'Full-time',
    allocatedPercentage: 0,
  });

  const fetchEngineers = async () => {
    const res = await API.get('/engineers/engineers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setEngineers(res.data);
  };

  useEffect(() => {
    fetchEngineers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/engineers/engineers/create', {
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()),
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setForm({ name: '', skills: '', seniority: 'Junior', employmentType: 'Full-time', allocatedPercentage: 0 });
    fetchEngineers();
  };

  return (
    <div className="p-6">
        <BackButton to="/dashboard" label="Go Back" />

      <h2 className="text-2xl font-bold mb-4">Manage Engineers</h2>

      {/* Engineer Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Skills (comma separated)" required value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <select className="border p-2 rounded" value={form.seniority} onChange={(e) => setForm({ ...form, seniority: e.target.value })}>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
        <select className="border p-2 rounded" value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })}>
          <option>Full-time</option>
          <option>Part-time</option>
        </select>
        <input className="border p-2 rounded" type="number" placeholder="Allocated %" value={form.allocatedPercentage} onChange={(e) => setForm({ ...form, allocatedPercentage: e.target.value })} />
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Add Engineer</button>
      </form>

      {/* Engineer List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Engineer List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Skills</th>
                <th className="p-2">Seniority</th>
                <th className="p-2">Type</th>
                <th className="p-2">Allocated</th>
                <th className="p-2">Available</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((eng) => (
                <tr key={eng._id} className="border-t">
                  <td className="p-2">{eng.name}</td>
                  <td className="p-2">{eng.skills.join(', ')}</td>
                  <td className="p-2">{eng.seniority}</td>
                  <td className="p-2">{eng.employmentType}</td>
                  <td className="p-2">{eng.allocatedPercentage}%</td>
                  <td className="p-2">{100 - eng.allocatedPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
