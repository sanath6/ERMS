import { useState, useEffect } from 'react';
import API from '../api';
import BackButton from './Backbutton.jsx';

export default function CreateProjects() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    teamSize: '',
  });

  const [projects, setProjects] = useState([]);

  // Fetch all projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      alert('Failed to fetch projects');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/projects/projects/create', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Project created successfully');
      setForm({ name: '', description: '', startDate: '', endDate: '', teamSize: '' });
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Project creation failed');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <BackButton to="/dashboard" label="Go Back" />
      <h2 className="text-xl font-bold mb-4">Create Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="teamSize"
          value={form.teamSize}
          onChange={handleChange}
          placeholder="Team Size"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create Project
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Created Projects</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Project ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Start Date</th>
                <th className="p-2 border">End Date</th>
                <th className="p-2 border">Team Size</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{project.name}</td>
                  <td className="p-2 border">{project.description}</td>
                  <td className="p-2 border">{project.startDate?.split('T')[0]}</td>
                  <td className="p-2 border">{project.endDate?.split('T')[0]}</td>
                  <td className="p-2 border">{project.teamSize}</td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-2 text-gray-500">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
