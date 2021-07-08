//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function create() {
  db.serialize(function(){
    db.run(
      `CREATE TABLE politicians(
        politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        partai VARCHAR(50),
        location VARCHAR(255),
        grade_current FLOAT
      );`
    )
    db.run(
      `CREATE TABLE voters (
        voterId INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        gender VARCHAR(50),
        age NUMBER(150)
      );`
    )
    db.run(
      `CREATE TABLE votes (
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY(voterId) REFERENCES voters(voterId),
        FOREIGN KEY(politicianId) REFERENCES politicians(politicianId)
      );`
    )
  })
}

create()

module.exports = db;
