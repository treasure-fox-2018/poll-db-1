const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs')

function seedData() {
    let politicians_data = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
    let voters_data = fs.readFileSync('./voters.csv', 'utf8').split('\n')
    let votes_data = fs.readFileSync('./votes.csv', 'utf8').split('\n')
    let new_data_politicians = []
    let new_data_voters = []
    let new_data_votes = []

//MENYIAPKAN DATA SEBELUM DIKIRIM KE MAING-MASING TABLE
    for (let i = 1; i < politicians_data.length-1; i++) {
        let data_splits = politicians_data[i].split(',')
        new_data_politicians.push(data_splits)
    }
    for (let i = 1; i < voters_data.length-1; i++) {
        let data_splits = voters_data[i].split(',')
        new_data_voters.push(data_splits)
    }
    for (let i = 1; i < votes_data.length-1; i++) {
        let data_splits = votes_data[i].split(',')
        new_data_votes.push(data_splits)
    }

//MENGISI DATA KE MASING-MASING TABLE
    for (let i = 0; i < new_data_politicians.length; i++) {
        db.run(`INSERT INTO politicians(name, partai, location, grade_current)
                VALUES("${new_data_politicians[i][0]}", "${new_data_politicians[i][1]}", "${new_data_politicians[i][2]}", "${new_data_politicians[i][3]}")`)
    }
    for (let i = 0; i < new_data_voters.length; i++) {
        db.run(`INSERT INTO voters(first_name, last_name, age, gender)
                VALUES ("${new_data_voters[i][0]}", "${new_data_voters[i][1]}", "${new_data_voters[i][2]}", "${new_data_voters[i][3]}")`)
    }
    for (let i = 0; i < new_data_votes.length; i++) {
        db.run(`INSERT INTO votes(voterId, politicianId)
                VALUES ("${new_data_votes[i][0]}", "${new_data_votes[i][1]}")`)
    }
}

//REALEASE 2
//CREATE DATA MASING-MASING TABLE
function insertPolitician(name, partai, location, grade_current) {
  db.run(`INSERT INTO politicians(name, partai, location, grade_current)
          VALUES("${name}", "${partai}", "${location}", "${grade_current}")`)
}
function insertVoters(first_name, last_name, age, gender) {
  db.run(`INSERT INTO voters(first_name, last_name, age, gender)
          VALUES ("${first_name}", "${last_name}", "${age}", "${gender}")`)
}
function insertVotes(voterId, politicianId) {
  db.run(`INSERT INTO votes(voterId, politicianId)
          VALUES ("${voterId}", "${politicianId}")`)
}

//UPDATE DATA KE MASING-MASING TABLE
function updatePolitician(name, partai, location, grade_current) {
  db.run(`UPDATE politicians
          SET name = "${name}", partai = "${partai}", location = "${location}", grade_current = "${grade_current}"
          WHERE politicianId = 21`)
}
function updateVoters(first_name, last_name, age, gender) {
  db.run(`UPDATE voters
          SET first_name = "${first_name}", last_name = "${last_name}", age = "${age}", gender = "${gender}"
          WHERE voterId = 151`)
}
function updateVotes(voterId, politicianId) {
  db.run(`UPDATE votes
          SET voterId = "${voterId}", politicianId = "${politicianId}"
          WHERE voterId = 151`)
}

//DELETE DATA DARI MASING-MASING TABLE
function deletePolitician(politicianId) {
  db.run(`DELETE FROM politicians
          WHERE politicianId = "${politicianId}"`)
}
function deleteVoters(voterId) {
  db.run(`DELETE FROM voters
          WHERE voterId = "${voterId}"`)
}
function deleteVotes(politicianId) {
  db.run(`DELETE FROM votes
          WHERE politicianId = "${politicianId}";`)
}



// seedData()
// insertPolitician('Wahyudi', 'WS', 'SW', 12.123456)
// insertVoters('Rizky', 'Hidayat', 19, 'male')
// insertVotes(151, 20)
// updatePolitician('Setiaji', 'SW', 'WS', 99.987654)
// updateVoters('Hidayat', 'Ricky', 20, 'female')
// updateVotes(151, 21)
// deleteVotes(21)
// deleteVoters(151)
// deletePolitician(21)



//REALEASE 3

//Nomor 1
// SELECT name, partai, grade_current FROM politicians WHERE partai = 'R' AND grade_current BETWEEN 9 AND 11;

//Nomor 2
// SELECT COUNT(*) AS totalVote, name FROM politicians INNER JOIN votes
// ON politicians.politicianId = votes.politicianId
// WHERE politicians.name = 'Olympia Snowe';

//Nomor 3
// SELECT name, COUNT(*) AS totalVote FROM politicians
// INNER JOIN votes
// 	ON politicians.politicianId = votes.politicianId
// WHERE politicians.name LIKE 'Adam%'
// GROUP BY politicians.name;

//Nomor 4
// SELECT COUNT(*) AS totalVote, name, partai, location FROM politicians
// INNER JOIN votes
// 	ON politicians.politicianId = votes.politicianId
// GROUP BY politicians.name
// ORDER BY totalVote DESC
// LIMIT 3;

//Nomor 5
// SELECT first_name, last_name, gender, age FROM votes
// INNER JOIN voters
// 	ON voters.voterId = votes.voterId
// INNER JOIN politicians
// 	ON politicians.politicianId = votes.politicianId
// WHERE politicians.name = 'Olympia Snowe';
