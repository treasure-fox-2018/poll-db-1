const fs = require('fs');
const db = require('./db');

//insertPoliticians 
function insertPoliticians() {
  let arrPoliticians = fs.readFileSync('politicians.csv').toString().split("\n");
  arrPoliticians.shift()
  for (let i = 0; i < arrPoliticians.length-1; i++) {
    let data = arrPoliticians[i].split(",")
    const name = data[0]
    const party = data[1]
    const location = data[2]
    const grade_current = data[3]
    const query = `INSERT INTO Politicians (name, party, location, grade_current) VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
    db.serialize(function() {
      db.run(query, function (err) {
        if (err) throw err
      });
    })
  }
}

//insertVoters
function insertVoters() {
  let arrVoters = fs.readFileSync('voters.csv').toString().split("\n");
  arrVoters.shift()
  for (let i = 0; i < arrVoters.length-1; i++) {
    let data = arrVoters[i].split(",")
    const first_name = data[0]
    const last_name = data[1]
    const gender = data[2]
    const age = data[3]
    const query = `INSERT INTO Voters (first_name,last_name,gender,age) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
    db.serialize(function() {
      db.run(query, function (err) {
        if (err) throw err
      });
    })
  }
}

//insertVotes
function insertVotes() {
  let arrVotes = fs.readFileSync('votes.csv').toString().split("\n");
  arrVotes.shift()
  for (let i = 0; i < arrVotes.length-1; i++) {
    let data = arrVotes[i].split(",")
    const voterId = data[0]
    const politicianId = data[1]
    const query = `INSERT INTO Votes (voterId,politicianId) VALUES ("${voterId}", "${politicianId}")`
    db.serialize(function() {
      db.run(query, function (err) {
        if (err) throw err
      });
    })
  }
}

insertPoliticians()
insertVoters()
insertVotes()