const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Replace with your MongoDB connection details
const uri = "mongodb://YOUR_MONGO_HOST:YOUR_MONGO_PORT/";
const dbName = "EMS"; // Same database name
const collectionName = "employees"; // Assuming employees collection
const activeField = "isActive"; // Field name to determine active status

const app = express();
const port = 3000; // Example port, adjust as needed

// Connect to MongoDB on startup
let client = null;

async function connectToMongo() {
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit on connection error
  }
}
connectToMongo();

// Route to handle client requests for active customers
app.get('/active-customers', async (req, res) => {
  // ... (existing code for retrieving active customers)
});

// Route to handle client requests for inactive employees
app.get('/inactive-employees', async (req, res) => {
  // ... (existing code for retrieving inactive employees)
});

// New route to handle employee addition
app.post('/add-employee', async (req, res) => {
  // ... (existing code for adding an employee)
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});