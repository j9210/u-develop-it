const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to the election database.');
});

// Return all the data in the candidates table
// db.all(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// })

// GET a single candidate
db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if(err) {
    console.log(err);
  }
  console.log(row);
});

// DELETE a candidate
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//   if(err) {
//     console.log(err);
//   }
//   console.log(result, this, this.changes);
// })

// CREATE a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow to use this
db.run(sql, params, function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result, this.lastID);
});

// Default response for any other request(Not Found) catch all
// will override all other routes, keep at end
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
