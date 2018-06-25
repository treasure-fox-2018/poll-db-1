const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs')
const dataPoliticians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
const dataVoters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
const dataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n')

//REALEASE 1
//INSERT SELURUH DATA KE MASING-MASING TABLE DARI FILE CSV
function seedData() {
    let politiciansData = dataPoliticians
    let votersData = dataVoters
    let votesData = dataVotes
    let politiciansArr = []
    let votersArr = []
    let votesArr = []

//MENYIAPKAN DATA SEBELUM DIKIRIM KE MASING-MASING TABLE
    for (let i = 1; i < politiciansData.length-1; i++) {
        let data = politiciansData[i].split(',')
        politiciansArr.push(data)
    }
    for (let i = 1; i < votersData.length-1; i++) {
        let data = votersData[i].split(',')
        votersArr.push(data)
    }
    for (let i = 1; i < votesData.length-1; i++) {
        let data = votesData[i].split(',')
        votesArr.push(data)
    }

//MENGISI DATA KE MASING-MASING TABLE
    for (let i = 0; i < politiciansArr.length; i++) {
        let insertQuery = `INSERT INTO politicians(name, partai, location, grade_current)
                           VALUES("${politiciansArr[i][0]}", "${politiciansArr[i][1]}", "${politiciansArr[i][2]}", "${politiciansArr[i][3]}")`

        db.serialize(function() {
          db.run(insertQuery, function(err) {
             if (err) throw err;
          })
        })
    }
    for (let i = 0; i < votersArr.length; i++) {
        let insertQuery = `INSERT INTO voters(first_name, last_name, age, gender)
                           VALUES ("${votersArr[i][0]}", "${votersArr[i][1]}", "${votersArr[i][2]}", "${votersArr[i][3]}")`

        db.serialize(function() {
          db.run(insertQuery, function(err) {
             if (err) throw err;
          })
        })
    }
    for (let i = 0; i < votesArr.length; i++) {
        let insertQuery = `INSERT INTO votes(voterId, politicianId)
                           VALUES ("${votesArr[i][0]}", "${votesArr[i][1]}")`

        db.serialize(function() {
          db.run(insertQuery, function(err) {
             if (err) throw err;
          })
        })
    }
  console.log('Table has been INSERT from all file CSV')
}

// seedData()

//REALEASE 2
//INSERT DATA KE MASING-MASING TABLE
function insertPolitician(name, partai, location, grade_current) {
  let query = `INSERT INTO politicians(name, partai, location, grade_current)
               VALUES("${name}", "${partai}", "${location}", "${grade_current}")`

  db.serialize(function() {
    db.run(query, function(err) {
      if (err) throw err;
    })
  })
  console.log('Table politicians has been successfull to created')
}

function insertVoters(first_name, last_name, age, gender) {
  let query = `INSERT INTO voters(first_name, last_name, age, gender)
          VALUES ("${first_name}", "${last_name}", "${age}", "${gender}")`
  db.serialize(function() {
    db.run(query, function(err) {
      if (err) throw err;
    })
  })
  console.log('Table voters has been successfull to created')
}

function insertVotes(voterId, politicianId) {
  let query = `INSERT INTO votes(voterId, politicianId)
               VALUES ("${voterId}", "${politicianId}")`
  db.serialize(function() {
    db.run(query, function(err) {
      if (err) throw err;
    })
  })
  console.log('Table votes has been successfull to created')
}

// insertPolitician('Wahyudi', 'WS', 'SW', 12.123456)
// insertVoters('Rizky', 'Hidayat', 19, 'male')
// insertVotes(151, 20)

//UPDATE DATA KE MASING-MASING TABLE
function updatePolitician(name, partai, location, grade_current) {
  let query = `UPDATE politicians
               SET name = "${name}", partai = "${partai}", location = "${location}", grade_current = "${grade_current}"
               WHERE politicianId = 21`
   db.serialize(function() {
     db.run(query, function(err) {
       if (err) throw err;
     })
   })
  console.log('Table politicians has been successfull to updated')
}

function updateVoters(first_name, last_name, age, gender) {
  let query = `UPDATE voters
               SET first_name = "${first_name}", last_name = "${last_name}", age = "${age}", gender = "${gender}"
               WHERE voterId = 151`
   db.serialize(function() {
     db.run(query, function(err) {
       if (err) throw err;
     })
   })
   console.log('Table voters has been successfull to updated')
}

function updateVotes(voterId, politicianId) {
  let query = `UPDATE votes
               SET voterId = "${voterId}", politicianId = "${politicianId}"
               WHERE voterId = 151`
   db.serialize(function() {
     db.run(query, function(err) {
       if (err) throw err;
     })
   })
   console.log('Table votes has been successfull to updated')
}
// updatePolitician('Setiaji', 'SW', 'WS', 99.987654)
// updateVoters('Hidayat', 'Ricky', 20, 'female')
// updateVotes(151, 21)

//DELETE DATA DARI MASING-MASING TABLE
function deletePolitician(politicianId) {
  let query = `DELETE FROM politicians
          WHERE politicianId = "${politicianId}"`
  db.serialize(function() {
    db.run(query, function(err) {
      if (err) throw err;
    })
  })
  console.log('Table politicians has been successfull to deleted')
}

function deleteVoters(voterId) {
  let query = `DELETE FROM voters
               WHERE voterId = "${voterId}"`
  db.serialize(function() {
    db.run(query, function(err) {
      if (err) throw err;
    })
  })
  console.log('Table voters has been successfull to deleted')
}

function deleteVotes(politicianId) {
  let query = `DELETE FROM votes
               WHERE politicianId = "${politicianId}";`
   db.serialize(function() {
     db.run(query, function(err) {
       if (err) throw err;
     })
   })
   console.log('Table votes has been successfull to deleted')
}
// deleteVotes(21)
// deleteVoters(151)
// deletePolitician(21)



//REALEASE 3

//Nomor 1
// SELECT name, partai, grade_current
// FROM politicians
// WHERE partai = 'R' AND grade_current BETWEEN 9 AND 11
// ORDER BY name ASC;
function displayPoliticiansGrade(partai, first_value, second_value) {
  let query = `SELECT name, partai, grade_current
               FROM politicians
               WHERE partai = "${partai}" AND grade_current BETWEEN ${first_value} AND ${second_value}
               ORDER BY name ASC;`
  db.all(query, function(err, data) {
    if (err) throw err;
    console.log(data)
  })
}

// displayPoliticiansGrade('R', 9, 11)

//Nomor 2
// SELECT COUNT(*) AS totalVote, name FROM politicians INNER JOIN votes
// ON politicians.politicianId = votes.politicianId
// WHERE politicians.name = 'Olympia Snowe';
function displayPoliticiansCount(name) {
  let query = `SELECT COUNT(*) AS totalVote, name FROM politicians INNER JOIN votes
               ON politicians.politicianId = votes.politicianId
               WHERE politicians.name = "${name}";`
  db.all(query, function(err, data) {
    if (err) throw err;
    console.log(data)
  })
}

// displayPoliticiansCount('Olympia Snowe')

//Nomor 3
// SELECT name, COUNT(*) AS totalVote FROM politicians
// INNER JOIN votes
// 	ON politicians.politicianId = votes.politicianId
// WHERE politicians.name LIKE 'Adam%'
// GROUP BY politicians.name;
function displayPoliticiansAdam(name) {
  let query = `SELECT name, COUNT(*) AS totalVote FROM politicians
               INNER JOIN votes
  	             ON politicians.politicianId = votes.politicianId
               WHERE politicians.name LIKE "${name}%"
               GROUP BY politicians.name;`
  db.all(query, function(err, data) {
    if (err) throw err;
    console.log(data)
  })
}

// displayPoliticiansAdam('Adam')

//Nomor 4
// SELECT COUNT(*) AS totalVote, name, partai, location FROM politicians
// INNER JOIN votes
// 	ON politicians.politicianId = votes.politicianId
// GROUP BY politicians.name
// ORDER BY totalVote DESC
// LIMIT 3;
function displayTop3() {
  let query = `SELECT COUNT(*) AS totalVote, name, partai, location FROM politicians
               INNER JOIN votes
  	            ON politicians.politicianId = votes.politicianId
               GROUP BY politicians.name
               ORDER BY totalVote DESC
               LIMIT 3;`
  db.all(query, function(err, data) {
    if (err) throw err;
    console.log(data)
  })
}

// displayTop3()

//Nomor 5
// SELECT first_name, last_name, gender, age FROM votes
// INNER JOIN voters
// 	ON voters.voterId = votes.voterId
// INNER JOIN politicians
// 	ON politicians.politicianId = votes.politicianId
// WHERE politicians.name = 'Olympia Snowe';
function displayWhoVote(name) {
  let query = `SELECT first_name, last_name, gender, age FROM votes
               INNER JOIN voters
  	            ON voters.voterId = votes.voterId
               INNER JOIN politicians
  	            ON politicians.politicianId = votes.politicianId
               WHERE politicians.name = "${name}";`
  db.all(query, function(err, data) {
    if (err) throw err;
    console.log(data)
  })
}

displayWhoVote('Olympia Snowe')
