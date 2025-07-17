// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedManager = await bcrypt.hash('manager123', 10);
  const hashedEngineer = await bcrypt.hash('engineer123', 10);

  await User.deleteMany({});
  await User.insertMany([
    { email: 'manager@example.com', password: hashedManager, role: 'manager' },
    { email: 'engineer@example.com', password: hashedEngineer, role: 'engineer' },
  ]);

  console.log('Users seeded');
  process.exit();
};

seedUsers();
