const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS Politicians
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          party VARCHAR(5),
          location VARCHAR(5),
          grade_current REAL)`);

  db.run(`CREATE TABLE IF NOT EXISTS Voters
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name VARCHAR(20),
          last_name VARCHAR(20),
          gender VARCHAR(10),
          age INTEGER)`);

  db.run(`CREATE TABLE IF NOT EXISTS Votes
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          voter_id INTEGER REFERENCES Voters(id),
          politician_id INTEGER REFERENCES Politicians(id))`);
});
