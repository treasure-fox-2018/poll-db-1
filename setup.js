//your code here
const db = require('./db');

function create() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,
      party VARCHAR, location VARCHAR, grade_current FLOAT)`);

    db.run(`CREATE TABLE IF NOT EXISTS Voters
      (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR,
      last_name VARCHAR, gender VARCHAR, age INTEGER)`);

    db.run(`CREATE TABLE IF NOT EXISTS Votes
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    voterId INTEGER,
    politicianId INTEGER,
    FOREIGN KEY (voterId) REFERENCES Voters(id),
    FOREIGN KEY(politicianId) REFERENCES Politicians(id))`);
  })
}

create()
