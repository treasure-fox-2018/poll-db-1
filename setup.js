//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function create_and_seed() {
    const politicians = `CREATE TABLE Politicians (
                        politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
                        politician_name VARCHAR(100),
                        party_name VARCHAR(100),
                        location VARCHAR(100),
                        grade_current FLOAT)`;

    const voters = `CREATE TABLE Voters (
                    voterId INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name VARCHAR(100),
                    last_name VARCHAR(100),
                    gender VARCHAR(100),
                    age VARCHAR(100))`;

    const votes = `CREATE TABLE Votes (
                    politicianId INTEGER,
                    voterId INTEGER,
                    FOREIGN KEY (politicianId) REFERENCES Politicians(politicianId),
                    FOREIGN KEY (voterId) REFERENCES Voters(voterId))`

db.run(politicians)      
db.run(voters)     
db.run(votes)                   

}

create_and_seed()
