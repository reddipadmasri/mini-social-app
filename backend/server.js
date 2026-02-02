const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve images

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// -----------------------
// Connect to MongoDB Atlas
// -----------------------

// Replace <YOUR_PASSWORD> with your actual password
// Replace 'mini-social' with your DB name
const MONGO_URI = 'mongodb+srv://padmareddywork:padmareddywork@cluster0.zc10oei.mongodb.net/mini-social?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Optional: extra debug
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connection established successfully'));

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
