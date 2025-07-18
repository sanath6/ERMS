// // // backend/models/User.js
// // import mongoose from 'mongoose';

// // const userSchema = new mongoose.Schema({
// //   email: String,
// //   password: String,
// //   role: String,
// // });

// // export default mongoose.model('User', userSchema);


// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['manager', 'employee'], required: true },
// });

// const User = mongoose.model('User', userSchema);

// export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['manager', 'engineer'], required: true },
});

export default mongoose.model('User', userSchema);
