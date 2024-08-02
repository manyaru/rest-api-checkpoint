const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import User model
const User = require('./models/User');

// Routes
// GET: RETURN ALL USERS
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: ADD A NEW USER TO THE DATABASE
app.post('/users', async (req, res) => {
  const { name, age, email } = req.body;
  const user = new User({ name, age, email });

  try {
    const newUser = await user.save(); // Save the new user
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save(); // Save the updated user
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: REMOVE A USER BY ID
app.delete('/users/:id', async (req, res) => {
    try {
      console.log('Deleting user with ID:', req.params.id);
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      await user.deleteOne();
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: err.message });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
