//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

function createTables() {
    db.serialize(function () {
        db.run(`CREATE TABLE IF NOT EXISTS Politicians 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name VARCHAR(100), 
            party VARCHAR(100),
            location TEXT,
            grade_current FLOAT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Voters 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(50),
            last_name VARCHAR (50),
            gender VARCHAR(10),
            age INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Votes 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER, 
            politicianId INTEGER
        )`);


    })


}

createTables()

module.exports = db;
