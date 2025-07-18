import { useState, useEffect } from 'react';
import API from '../api';
import BackButton from './Backbutton.jsx';

export default function AssignEngineers() {
  const [projects, setProjects] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [form, setForm] = useState({ projectId: '', engineerIds: [] });

  // Fetch projects and engineers
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [projectsRes, engineersRes] = await Promise.all([
        API.get('/projects', { headers }),
        API.get('/engineers/engineers', { headers }),
      ]);

      setProjects(projectsRes.data);
      setEngineers(engineersRes.data);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setForm((prev) => ({
      ...prev,
      engineerIds: prev.engineerIds.includes(id)
        ? prev.engineerIds.filter((eid) => eid !== id)
        : [...prev.engineerIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        '/assignments',
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Engineers assigned successfully');
      setForm({ projectId: '', engineerIds: [] });
    } catch (err) {
      alert(err.response?.data?.message || 'Assignment failed');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
        <BackButton to="/dashboard" label="Go Back" />
      <h3 className="text-lg font-semibold mb-4">Assign Engineers to Project</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Selector */}
        <select
          className="w-full border p-2 rounded"
          required
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          <option value="">Select a project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        {/* Engineer Multi-select */}
        <div>
          <p className="font-semibold mb-2">Select Engineers:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {engineers.map((eng) => (
              <label key={eng._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.engineerIds.includes(eng._id)}
                  onChange={() => handleCheckboxChange(eng._id)}
                />
                {eng.name} ({eng.seniority})
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Assign
        </button>
      </form>
    </div>
  );
}
