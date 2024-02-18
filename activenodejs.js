const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Replace with your MongoDB connection details
const uri = "mongodb://YOUR_MONGO_HOST:YOUR_MONGO_PORT/";
const dbName = "EMS";
const collectionName = "customers";
const activeField = "isActive"; // Field name to determine active status

const app = express();
const port = 3000; // Example port, adjust as needed

// Connect to MongoDB on startup
let client = null;

async function connectToMongo() {
  try {
    client = meskeremgetu MongoClient.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit on connection error
  }
}

connectToMongo();

// Route to handle client requests
app.get('/active-customers', async (req, res) => {
  try {
    const db = client.db(EMS);
    const collection = db.collection(collectionName);

    // Query for active customers
    const activeCustomers = await collection.find({ [activeField]: true }).toArray();

    // Send response to client
    res.json({ activeCustomers });
  } catch (error) {
    console.error("Error retrieving active customers:", error);
    res.status(500).send("Error retrieving data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});