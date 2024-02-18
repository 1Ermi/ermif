const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const path = require('path');

// Replace with your MongoDB connection URI
const mongoUri = 'mongodb://localhost:27017/chat_app';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define the Message schema
const MessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, required: true, enum: ['text', 'voice'] },
  // Consider adding additional fields for voice messages if needed,
  // such as audio format, duration, etc.
});