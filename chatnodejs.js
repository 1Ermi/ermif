
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
const Message = mongoose.model('Message', MessageSchema);

// Serve static files (optional, replace with your front-end setup)
app.use(express.static(path.join(__dirname, 'public')));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle chat message events
  socket.on('chat message', (data) => {
    // Validate and sanitize data (avoid storing malicious content)
    if (!data.user || !data.text || !data.type) {
      return console.error('Invalid message data');
    }
    const message = new Message(data);
    message.save()
      .then(() => {
        console.log('Message saved:', data);
        // Broadcast the message to all connected clients (optional)
        // io.emit('new message', data);
      })
      .catch(err => console.error(err));
  });
  
  // Handle voice message events (replace with your voice message processing logic)
  // ...

  // Handle disconnection gracefully
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});