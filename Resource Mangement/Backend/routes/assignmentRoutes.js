import express from 'express';
import Assignment from '../models/Assignment.js';
import User from '../models/User.js';

const router = express.Router();

// GET all assignments
router.get('/', async (req, res) => {
  const assignments = await Assignment.find()
    .populate('engineerId', 'name email')
    .populate('projectId', 'name');
  res.json(assignments);
});

// POST new assignment
router.post('/', async (req, res) => {
  const { engineerId, projectId, allocationPercentage, assignedFrom, assignedTo } = req.body;
  const assignment = new Assignment({ engineerId, projectId, allocationPercentage, assignedFrom, assignedTo });
  await assignment.save();
  res.status(201).json(assignment);
});

// PUT update assignment
router.put('/:id', async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(assignment);
});

// DELETE assignment
router.delete('/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Assignment deleted' });
});

export default router;
