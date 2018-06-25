const fs = require('fs')
const readPoliticians = fs.readFileSync('./politicians.csv', 'utf8')
const readVoters = fs.readFileSync('./voters.csv', 'utf8')
const readVotes = fs.readFileSync('./votes.csv', 'utf8')
const db = require('./database')
const argv = process.argv

function pharsingDataPolitician() {
  let dataPoliticians = readPoliticians.split('\r\n')
  let containArr = []
  for (let i = 1; i < dataPoliticians.length; i++) {
    containArr.push(dataPoliticians[i].split(','))
  }
  let query = "INSERT INTO politicians(name, party, location, grade_current) VALUES ";
  for(let j = 0; j < containArr.length; j++) {
    query += `("${containArr[j][0]}", "${containArr[j][1]}", "${containArr[j][2]}", "${containArr[j][3]}"), `
  }
  let modQuery = query.slice(0, [query.length-2])
  modQuery += ';'
  db.run(modQuery)
}

function pharsingDataVoters() {
  let dataVoters = readVoters.split('\r\n')
  let containArr = []
  for (let i = 1; i < dataVoters.length; i++) {
    containArr.push(dataVoters[i].split(','))
  }
  let query = "INSERT INTO voters(first_name,last_name,gender,age) VALUES ";
  for(let j = 0; j < containArr.length; j++) {
    query += `("${containArr[j][0]}", "${containArr[j][1]}", "${containArr[j][2]}", "${containArr[j][3]}"), `
  }
  let modQuery = query.slice(0, [query.length-2])
  modQuery += ';'
  db.run(modQuery)
}

function pharsingDataVotes() {
  let dataVotes = readVotes.split('\r\n')
  
  let containArr = []
  for (let i = 1; i < dataVotes.length; i++) {
    containArr.push(dataVotes[i].split(','))
  }
  let query = "INSERT INTO votes(voter_id,politician_id) VALUES ";
  for(let j = 0; j < containArr.length; j++) {
    query += `("${containArr[j][0]}", "${containArr[j][1]}"), `
  }
  let modQuery = query.slice(0, [query.length-2])
  modQuery += ';'
  db.run(modQuery)
}

function createDataPoliticians(name, party, location, grade_current) {
  let query = `INSERT INTO politicians(name, party, location, grade_current) VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
  db.run(query)
  console.log("data politicians has been successfull to created");
  
}

function createDataVoters(first_name, last_name, gender, age) {
  let query = `INSERT INTO voters(first_name, last_name, gender, age) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
  db.run(query)
  console.log("data voters has been successfull to created");
}

function createDataVotes(voter_id, politician_id) {
  let query = `INSERT INTO votes(voter_id, politician_id) VALUES ("${voter_id}", "${politician_id}")`
  db.run(query)
  console.log("data votes has been successfull to created");
}

function updateDataPolitician(id, nameCol, values) {
  let query = `UPDATE politicians SET ${nameCol} = "${values}" WHERE id = ${id}`
  db.run(query)
  console.log(`data politicians id = ${id} has been successfull to update`);
}

function updateDataVoters(id, nameCol, values) {
  let query = `UPDATE voters SET ${nameCol} = "${values}" WHERE id = ${id}`
  db.run(query)
  console.log(`data voters id = ${id} has been successfull to update`)
}

function updateDataVotes(id, nameCol, values) {
  let query = `UPDATE votes SET ${nameCol} = "${values}" WHERE id = ${id}`
  db.run(query)
  console.log(`data votes id = ${id} has been successfull to update`)
}

function deleteDataPolitician(id) {
  let query = `DELETE FROM politicans WHERE id = ${id}`
  db.run(query)
  console.log(`data politicians id = ${id} has been deleted`);
}

function deleteDataVoters(id) {
  let query = `DELETE FROM voters WHERE id = ${id}`
  db.run(query)
  console.log(`data voters id = ${id} has been deleted`);
}

function deleteDataVotes(id) {
  let query = `DELETE FROM votes WHERE id = ${id}`
  db.run(query)
  console.log(`data votes id = ${id} has been deleted`);
}

function displayDataPoliticians() {
  db.all('SELECT * FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11', function (err, politicians) {
    console.log(politicians);
  });
}

function countVoteOlymp() {
  db.all('SELECT COUNT(name) AS totalVote, name FROM politicians INNER JOIN votes ON politician_id = politicians.id WHERE politicians.name = "Olympia Snowe"', function (err, politicians) {
    console.log(politicians);
  });
}

function countVoteAllAdam() {
  db.all('SELECT name, (SELECT COUNT(*) FROM Votes WHERE politician_id = politicians.id) AS totalVote FROM politicians WHERE politicians.name LIKE "Adam%"', function (err, politicians) {
    console.log(politicians);
  });
}

function countMaxVote(){
  db.all('SELECT (SELECT COUNT(*) FROM votes WHERE politician_id = politicians.id) AS totalVote, name, party, location FROM politicians ORDER BY totalVote DESC LIMIT 3', function (err, politicians) {
    console.log(politicians);
  });
}

function whoVoteOlymp(){
  db.all('SELECT first_name, last_name, gender, age FROM voters INNER JOIN votes ON voters.id = votes.voter_id JOIN politicians ON politicians.id = votes.politician_id WHERE politicians.name = "Olympia Snowe"', function (err, politicians) {
    console.log(politicians);
  })
}


//DRIVER CODE

// pharsingDataPolitician()
// pharsingDataVoters()
// pharsingDataVotes()
// createDataPoliticians("fajar", "Y", "KRW", 10.78266272)
// createDataVoters("helmi", "bau", "female", 80)
// createDataVotes(167, 5)
// updateDataVoters(5, 'first_name', 'udin')
// updateDataPolitician(20, 'name', 'Tata Zaneta')
// deleteDataVoters(5)
// deleteDataVotes(5)
// deleteDataPolitician(4)
// displayDataPoliticians()
// countVoteOlymp()
// countVoteAllAdam()
// countMaxVote()
whoVoteOlymp()