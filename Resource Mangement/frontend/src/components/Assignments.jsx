import { useEffect, useState } from 'react';
import API from '../api';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    engineerId: '',
    projectId: '',
    allocation: '',
    startDate: '',
    endDate: ''
  });

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [engineerRes, projectRes, assignmentRes] = await Promise.all([
        API.get('/engineers', { headers: { Authorization: `Bearer ${token}` } }),
        API.get('/projects', { headers: { Authorization: `Bearer ${token}` } }),
        API.get('/assignments', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setEngineers(engineerRes.data);
      setProjects(projectRes.data);
      setAssignments(assignmentRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load assignments or related data');
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/assignments/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        engineerId: '',
        projectId: '',
        allocation: '',
        startDate: '',
        endDate: ''
      });
      fetchAllData();
    } catch (err) {
      console.error('Error creating assignment:', err);
      alert(err.response?.data?.message || 'Assignment creation failed');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Engineer Assignment Manager</h1>

      {/* Assignment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-medium">Engineer</label>
          <select
            name="engineerId"
            value={formData.engineerId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Engineer</option>
            {engineers.map((eng) => (
              <option key={eng._id} value={eng._id}>{eng.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Project</label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>{proj.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Allocation %</label>
          <input
            type="number"
            name="allocation"
            value={formData.allocation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min="1"
            max="100"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Assign Engineer
        </button>
      </form>

      {/* Assignments Table */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Current Assignments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Engineer</th>
              <th className="border px-4 py-2">Project</th>
              <th className="border px-4 py-2">Allocation %</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assign) => (
              <tr key={assign._id}>
                <td className="border px-4 py-2">{assign.engineerName}</td>
                <td className="border px-4 py-2">{assign.projectName}</td>
                <td className="border px-4 py-2">{assign.allocation}%</td>
                <td className="border px-4 py-2">{new Date(assign.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(assign.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-2 text-gray-500">No assignments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
