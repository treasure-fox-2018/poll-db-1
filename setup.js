//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./poll.db")


function create_and_seed() {

 db.serialize(function() {

   db.run(`CREATE TABLE IF NOT EXISTS Politicians
     (idPolitician INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,
     party VARCHAR, location VARCHAR, grade_current FLOAT)`);

   db.run(`CREATE TABLE IF NOT EXISTS Voters
     (idVoter INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR,
     gender VARCHAR, age INTEGER)`);

     db.run(`CREATE TABLE IF NOT EXISTS Votes
     (idVote INTEGER PRIMARY KEY AUTOINCREMENT, idVoter INTERGER, idPolitician INTERGER, FOREIGN KEY (idVoter) REFERENCES Voters(idVoter),
     FOREIGN KEY (idPolitician) REFERENCES Politicians(idPolitician))`);

 })
}
create_and_seed()






