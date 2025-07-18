import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new project
router.post('/projects/create', async (req, res) => {
  try {
    const { name, description, startDate, endDate, teamsize } = req.body;

    if (!name || !teamsize) {
      return res.status(400).json({ message: 'Project name and team size are required' });
    }

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      teamsize
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
