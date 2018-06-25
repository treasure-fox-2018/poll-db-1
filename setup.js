const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('databasePolitician.db')

function create() {
    db.serialize(function() {
        db.run(`CREATE TABLE IF NOT EXISTS Politicians 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, party TEXT, location TEXT, 
            grade_current INTEGER)
        `)
        db.run(`CREATE TABLE IF NOT EXISTS Voters 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT, last_name TEXT, 
            gender TEXT, age INTEGER
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS Votes 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER,
            politicianId INTEGER
        )`)
    })
    
}

create()