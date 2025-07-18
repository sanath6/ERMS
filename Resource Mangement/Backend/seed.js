// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Engineer from './models/Engineer.js';
import Project from './models/Project.js';

dotenv.config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing collections
  await User.deleteMany({});
  await Engineer.deleteMany();
  await Project.deleteMany();

  // Seed users
  const hashedManager = await bcrypt.hash('manager123', 10);
  const hashedEngineer = await bcrypt.hash('engineer123', 10);

  await User.insertMany([
    { email: 'manager@example.com', password: hashedManager, role: 'manager' },
    { email: 'engineer@example.com', password: hashedEngineer, role: 'engineer' },
  ]);

  // Create projects first
  const projects = await Project.insertMany([
    {
      name: 'AI Chatbot Development',
      description: 'Building an AI-based customer support chatbot',
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-12-31'),
      teamsize: 5,
    },
    {
      name: 'E-Commerce Platform',
      description: 'Developing a scalable e-commerce platform for electronics',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-10-15'),
      teamsize: 8,
    },
    {
      name: 'Mobile App Redesign',
      description: 'Revamping the UI/UX of the existing mobile app',
      startDate: new Date('2025-07-20'),
      endDate: new Date('2025-09-30'),
      teamsize: 4,
    },
  ]);

  // Map project IDs
  const chatbotProject = projects.find(p => p.name === 'AI Chatbot Development')._id;
  const ecommerceProject = projects.find(p => p.name === 'E-Commerce Platform')._id;
  const mobileAppProject = projects.find(p => p.name === 'Mobile App Redesign')._id;

  // Seed engineers with assigned projects
  await Engineer.insertMany([
    {
      name: 'John Doe',
      skills: ['React', 'Node.js'],
      seniority: 'Senior',
      employmentType: 'Full-time',
      allocatedPercentage: 60,
      assignedProjects: [chatbotProject, ecommerceProject],
    },
    {
      name: 'Alice Smith',
      skills: ['Angular', 'Java'],
      seniority: 'Mid-level',
      employmentType: 'Part-time',
      allocatedPercentage: 40,
      assignedProjects: [mobileAppProject],
    },
  ]);

  console.log('✅ Users, engineers (with projects), and projects seeded');
  process.exit();
};

seedUsers();
