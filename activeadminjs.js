const express = require('express');
const mongoose = require('mongoose'); // Replace with EMS Mango driver/library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connect to EMS Mango (replace with appropriate syntax)
mongoose.connect('EMS Mango connection string', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to EMS Mango'))
  .catch(err => console.error('Error connecting to EMS Mango:', err));

// User schema (replace with EMS Mango-specific schema syntax)
const userSchema = new mongoose.Schema({
  // ...
});

// User model (replace with EMS Mango-specific model syntax)
const User = mongoose.model('User', userSchema);

// ... (REST API endpoints for authentication, registration, etc.)


app.post('/create-admin', async (req, res) => {
        const { username, email, password } = req.body;

        // Validate input
        const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ username, email, password: hashedPassword, isAdmin: true });

    try {
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Example deletion endpoint (assuming you have authentication and authorization middleware)
app.delete('/delete-user/:userId', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});