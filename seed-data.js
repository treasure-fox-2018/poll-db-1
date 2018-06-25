const fs = require('fs')
const db = require('./db')

const politicians = fs.readFileSync('politicians.csv').toString().split('\n')
const voters = fs.readFileSync('voters.csv').toString().split('\n')
const votes = fs.readFileSync('votes.csv').toString().split('\n')

db.serialize(function() {
  for (let i = 1; i < politicians.length - 1; i++) {
    let dataArr = politicians[i].split(',');
    let queryPolitician = `INSERT INTO politicians (name, party, location, grade_current) VALUES ("${dataArr[0]}","${dataArr[1]}","${dataArr[2]}","${dataArr[3]}")`
    db.run(queryPolitician, function (err) {
      if (err) throw err;
      console.log('politician successfully inserted');
    });
  }
  for (let i = 1; i < voters.length - 1; i++) {
    let dataArr = voters[i].split(',');
    let queryVoters = `INSERT INTO voters (first_name, last_name, gender, age) VALUES ("${dataArr[0]}","${dataArr[1]}","${dataArr[2]}","${dataArr[3]}")`
    db.run(queryVoters, function (err) {
      if (err) throw err;
      console.log('voter successfully inserted');
    });
  }
  for (let i = 1; i < votes.length - 1; i++) {
    let dataArr = votes[i].split(',');
    let queryVotes = `INSERT INTO votes (voterId, politicianId) VALUES ("${dataArr[0]}","${dataArr[1]}")`
    db.run(queryVotes, function (err) {
      if (err) throw err;
      console.log('vote successfully inserted');
    });
  }
})
