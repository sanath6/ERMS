// // backend/index.js
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';
// import connectDB from './config/db.js';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api', authRoutes);
// connectDB();

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on port ${process.env.PORT}`)
//     );
//   })
//   .catch(err => console.error('Mongo error:', err));


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
