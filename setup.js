//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

function create_and_seed() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,
      party VARCHAR, location VARCHAR, grade_current FLOAT)`);

    db.run(`CREATE TABLE IF NOT EXISTS Voters
      (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR,
      last_name VARCHAR, gender VARCHAR, age INTEGER)`);

    db.run(`CREATE TABLE IF NOT EXISTS Votes
    (id INTEGER PRIMARY KEY AUTOINCREMENT, politicianId INTEGER,
    voterId INTEGER, FOREIGN KEY(politicianId) REFERENCES Politicians(id),
    FOREIGN KEY (voterId) REFERENCES Voters(id))`);

  })
}

create_and_seed()
