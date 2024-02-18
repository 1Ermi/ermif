const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Replace with your MongoDB connection details
const uri = "mongodb://YOUR_MONGO_HOST:YOUR_MONGO_PORT/";
const dbName = "EMS";
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
  try {
    const db = client.db(EMS);
    const collection = db.collection(collectionName);

    // Query for active customers (same as before)
    const activeCustomers = await collection.find({ [activeField]: true }).toArray();

    // Send response to client
    res.json({ activeCustomers });
  } catch (error) {
    console.error("Error retrieving active customers:", error);
    res.status(500).send("Error retrieving data");
  }
});

// New route to handle client requests for inactive employees
app.get('/inactive-employees', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Query for inactive employees based on the specified field
    const inactiveEmployees = await collection.find({ [activeField]: false }).toArray();

    // Send response to client
    res.json({ inactiveEmployees });
  } catch (error) {
    console.error("Error retrieving inactive employees:", error);
    res.status(500).send("Error retrieving data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
