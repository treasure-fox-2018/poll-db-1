const db = require('./db')

const queryPolitician = 'CREATE TABLE IF NOT EXISTS politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR, party VARCHAR, location VARCHAR, grade_current INTEGER)'
const queryVoters = 'CREATE TABLE IF NOT EXISTS voters(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR, last_name VARCHAR, gender VARCHAR, age INTEGER)'
const queryVotes = 'CREATE TABLE IF NOT EXISTS votes(id INTEGER PRIMARY KEY AUTOINCREMENT,voterId INTEGER, politicianId INTEGER, FOREIGN KEY(voterId) REFERENCES Voters (id),FOREIGN KEY(politicianId) REFERENCES Politicians (id))'

db.serialize(function() {
  db.run(queryPolitician, function (err) {
    if (err) throw err;
    console.log('politicians table successfully created');
  });
  db.run(queryVoters, function (err) {
    if (err) throw err;
    console.log('voters table successfully created');
  });
  db.run(queryVotes, function (err) {
    if (err) throw err;
    console.log('votes table successfully created');
  });
})
