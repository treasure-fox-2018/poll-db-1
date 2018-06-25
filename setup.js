//your code here
"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database_poll');

function createTable(){
    db.serialize(function(){
    
        db.run(`CREATE TABLE IF NOT EXISTS politicians(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            party TEXT,
            location TEXT,
            grade_current REAL
        )`);
    
        db.run(`CREATE TABLE IF NOT EXISTS voters(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            gender TEXT,
            age INTEGER
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS votes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterID INTEGER,
            politicianID INTEGER
        )`);
    
         
    })
}

createTable();

