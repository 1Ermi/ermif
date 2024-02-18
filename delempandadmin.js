const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Replace with your MongoDB connection details
const uri = "mongodb://YOUR_MONGO_HOST:YOUR_MONGO_PORT/";
const dbName = "EMS"; // Same database name
const collectionName = "employees"; // Assuming employees collection

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

// Route to handle client requests for deleting employees
app.delete('/delete-employee/:id', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const employeeId = req.params.id;

    // Ensure valid employee ID is provided
    if (!employeeId) {
      return res.status(400).send("Missing employee ID");
    }

    // Delete the employee with the given ID
    await collection.deleteOne({ _id: new ObjectId(employeeId) });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Error deleting employee");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});