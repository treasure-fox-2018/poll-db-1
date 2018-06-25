//your code here

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');


function create(){
    db.serialize(function(){
        db.run(`CREATE TABLE IF NOT EXISTS Politicians
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50),
        party VARCHAR(5), location VARCHAR(10), grade_current INTEGER)`);

        db.run(`CREATE TABLE IF NOT EXISTS Votes
        (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER)`);

        db.run(`CREATE TABLE IF NOT EXISTS Voters
        (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(20), lastName VARCHAR(20), gender VARCHAR(10), age INTEGER)`);

    })
}

create()





