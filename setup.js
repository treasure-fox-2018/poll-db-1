//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

function create_and_seed() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Voters
      (id_voter INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR,last_name VARCHAR, gender VARCHAR, age INTEGER)`
    );

    db.run(`CREATE TABLE IF NOT EXISTS Politicians
      (id_politician INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR,
        partai VARCHAR,
        location VARCHAR,
        grade_current FLOAT)`
    );

    db.run(`CREATE TABLE IF NOT EXISTS Voting
      (id_voting INTEGER PRIMARY KEY AUTOINCREMENT, 
        id_voter INTEGER,
        id_politician INTEGER,
        FOREIGN KEY (id_voter) REFERENCES Voters(id_voter),
        FOREIGN KEY (id_politician) REFERENCES Politicians(id_politician)
        )`
    );

   
    // db.run(`INSERT INTO Singers VALUES(null, 'Alien Ant Farm', 'Riverside', 'Universal Records', '2001', 4)`)
  })
}
create_and_seed()