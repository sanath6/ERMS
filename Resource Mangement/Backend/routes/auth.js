// // backend/routes/auth.js
// import express from 'express';
// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const validPass = await bcrypt.compare(password, user.password);
//   if (!validPass) return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET);
//   res.json({ token });
// });

// router.get('/profile', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json(decoded);
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// export default router;


import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route (for testing purposes)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token, role: user.role });
});

// Profile route
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
