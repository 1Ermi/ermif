const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'host',
  user: 'username',
  password: 'your_password',
  database: 'EMS'
});

// Connect to the database
connection.connect();

// ID of the admin you want to delete
const adminIdToDelete = 123;

// Delete the admin from the database
connection.query('DELETE FROM admins WHERE id = ?', [adminIdToDelete], (error, results) => {
  if (error) {
    console.error('Error deleting admin:', error);
  } else {
    console.log('Admin deleted successfully');
  }
});

// Close the connection
connection.end();