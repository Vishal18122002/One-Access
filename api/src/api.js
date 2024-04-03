// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();
const port = 3000;

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: '',
  host: 'http://localhost:3000/',
  database: 'database.sql',
  password: '',
  port: 3000, // PostgreSQL default port
});

// Define a route for retrieving data from the database
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM your_table_name', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Define a route for adding data to the database
app.post('/api/data', (req, res) => {
  const { name, age } = req.body;

  pool.query(
    'INSERT INTO your_table_name (name, age) VALUES ($1, $2)',
    [name, age],
    (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(201);
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});