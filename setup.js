//your code here

const db = require('./db');

function create() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS "politicians"  (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	name	VARCHAR UNIQUE,
	party	VARCHAR,
	location	VARCHAR,
	grade_current	FLOAT);`)

    db.run(`CREATE TABLE IF NOT EXISTS "voters" (
      id	INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name VARCHAR,
      last_name VARCHAR,
      gender VARCHAR,
      age INTEGER
    );`)

    db.run(`CREATE TABLE IF NOT EXISTS "votes" (
      id	INTEGER PRIMARY KEY AUTOINCREMENT,
      voterId INTEGER,
      politicianId INTEGER,
      FOREIGN KEY (politicianId) REFERENCES politicians(id),
      FOREIGN KEY (voterId) REFERENCES voters(id)
    );`)
  })
}

create();
