//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

function create_and_seed() {
  db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), party VARCHAR(10),
      location VARCHAR(100),
      grade_current REAL)`);

    db.run(`CREATE TABLE IF NOT EXISTS Voters
      (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100),
      last_name VARCHAR(100), gender VARCHAR(100), age INTEGER )`);



    db.run(`CREATE TABLE IF NOT EXISTS Votes
            (id INTEGER PRIMARY KEY AUTOINCREMENT, id_voters INTEGER,
            id_politicians INTEGER, FOREIGN KEY(id_voters) REFERENCES Voters(id), FOREIGN KEY(id_politicians) REFERENCES Politicians(id) )`);

  })
}

create_and_seed()
