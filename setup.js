//your code here
const db = require('./db');

function create () {
  db.serialize(function() {
    db.run (`CREATE TABLE IF NOT EXISTS Politicians
          (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50),
          party VARCHAR (50), location VARCHAR (10), grade_current FLOAT)`);

    db.run (`CREATE TABLE IF NOT EXISTS Voters
            (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50),
            last_name VARCHAR (50), gender VARCHAR (10), age INTEGER)`);
    
    db.run (`CREATE TABLE IF NOT EXISTS Votes
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            politician_id INTEGER, voter_id INTEGER, 
            FOREIGN KEY (politician_id) REFERENCES Politicians(id),
            FOREIGN KEY (voter_id) REFERENCES Voters(id))`);
  })
}

create();