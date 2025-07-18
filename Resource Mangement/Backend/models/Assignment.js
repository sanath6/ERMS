import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  engineer: { type: mongoose.Schema.Types.ObjectId, ref: 'Engineer' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  allocationPercentage: Number,
  startDate: Date,
  endDate: Date,
});

export default mongoose.model('Assignment', assignmentSchema);
