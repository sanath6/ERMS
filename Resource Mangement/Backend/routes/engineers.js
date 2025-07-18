import express from 'express';
import Engineer from '../models/Engineer.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to check manager role
const verifyManager = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Create Engineer (Manager only)
router.post('/engineers/create', verifyManager, async (req, res) => {
  const engineer = new Engineer(req.body);
  await engineer.save();
  res.status(201).json(engineer);
});

// Get all Engineers (Manager only)
router.get('/engineers', verifyManager, async (req, res) => {
  const engineers = await Engineer.find();
  res.json(engineers);
});

export default router;
