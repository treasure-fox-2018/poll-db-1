//your code here
const db = require('./db');

function create_table () {
    const table_politicians = `CREATE TABLE Politicians (
                               politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
                               name VARCHAR,
                               party VARCHAR,
                               location VARCHAR,
                               grade_current FLOAT)`

    const table_voters = `CREATE TABLE Voters (
                          voterId INTEGER PRIMARY KEY AUTOINCREMENT,
                          first_name VARCHAR,
                          last_name VARCHAR,
                          gender VARCHAR,
                          age INTEGER)`

    const table_votes = `CREATE TABLE Votes (
                         voteId INTEGER PRIMARY KEY AUTOINCREMENT,
                         voterId INTEGER,
                         politicianId INTEGER,
                         FOREIGN KEY (voterId) REFERENCES Voters(voterId),
                         FOREIGN KEY (politicianId) REFERENCES Politicians(politicianId))`

    db.run(table_politicians);
    db.run(table_voters);
    db.run(table_votes);    
}

create_table()



