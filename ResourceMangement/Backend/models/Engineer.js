// models/Engineer.js
import mongoose from 'mongoose';

const engineerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  seniority: String,
  employmentType: String,
  allocatedPercentage: Number,
  assignedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

export default mongoose.model('Engineer', engineerSchema);
