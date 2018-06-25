//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

function table(){
    db.serialize(function(){
        db.run(`CREATE TABLE IF NOT EXISTS Politicians
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                pary TEXT,
                location TEXT,
                grade_current INTEGER)`)

        db.run(`CREATE TABLE IF NOT EXISTS Voters
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT,
                last_name TEXT,
                gender TEXT,
                age INTEGER)`)

        db.run(`CREATE TABLE IF NOT EXISTS Votes
                (voterId INTEGER,
                politicianId INTEGER)`)
    })
}

table()

