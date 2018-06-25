const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs')

// Release 1

function seed_data() {
    let politicians_data = fs.readFileSync('./politicians.csv').toString().split('\n')
    let voters_data = fs.readFileSync('./voters.csv').toString().split('\n')
    let votes_data = fs.readFileSync('./votes.csv').toString().split('\n')
    //console.log(politicians_data)
    let new_data_politicians = []
    let new_data_voters = []
    let new_data_votes = []

    // politicians
    for (let i = 1; i < politicians_data.length-1; i++) {
        let data_splits = politicians_data[i].split(',')
        new_data_politicians.push(data_splits)
    }

    // voters
    for (let i = 1; i < voters_data.length-1; i++) {
        let data_splits = voters_data[i].split(',')
        new_data_voters.push(data_splits)
    }

    // votes
    for (let i = 1; i < votes_data.length-1; i++) {
        let data_splits = votes_data[i].split(',')
        new_data_votes.push(data_splits)
    }

    //console.log(politicians_name)
    //console.log(new_data_politicians)

    // isi data politicians
    for (let i = 0; i < new_data_politicians.length; i++) {
        db.run(`INSERT INTO politicians(politician_name, party_name, location, grade_current) VALUES("${new_data_politicians[i][0]}", "${new_data_politicians[i][1]}", "${new_data_politicians[i][2]}", "${new_data_politicians[i][3]}")`)
    }

    // isi data voters
    for (let i = 0; i < new_data_voters.length; i++) {
        db.run(`INSERT INTO voters(first_name, last_name, gender, age) VALUES ("${new_data_voters[i][0]}", "${new_data_voters[i][1]}", "${new_data_voters[i][2]}", "${new_data_voters[i][3]}")`)
    }

    // // isi data votes
    for (let i = 0; i < new_data_votes.length; i++) {
        db.run(`INSERT INTO votes(voterId, politicianId) VALUES ("${new_data_votes[i][0]}", "${new_data_votes[i][1]}")`)
    }

    // console.log(new_data_voters)
    // console.log(new_data_votes)
    // console.log(new_data_politicians)

}

// Release 2

// INSERT DATA
function insert_data_politcian(politician_name, party_name, location, grade_current) {
    db.run(`INSERT INTO politicians(politician_name, party_name, location, grade_current) VALUES ("${politician_name}", "${party_name}", "${location}", "${grade_current}")`)
}

function insert_data_voter(first_name, last_name, gender, age) {
    db.run(`INSERT INTO voters(first_name, last_name, gender, age) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`)
}

function insert_data_vote(politicianId, voterId) {
    db.run(`INSERT INTO votes(politicianId, voterId) VALUES ("${politicianId}", "${voterId}")`)
}

// UPDATE DATA 

function Update_data_politcian(politician_name, party_name, location, grade_current) {
    db.run(`UPDATE politicians 
            SET politician_name = "${politician_name}", party_name = "${party_name}", location = "${location}", grade_current = "${grade_current}"
            WHERE politicianId = 21`)
}

function Update_data_voter(first_name, last_name, gender, age) {
    db.run(`UPDATE voters 
            SET first_name = "${first_name}", last_name = "${last_name}", gender = "${gender}", age = "${age}"
            WHERE voterId = 151`)
}

function Update_data_vote(politicianId, voterId) {
    db.run(`UPDATE votes
            SET politicianId = "${politicianId}", voterId = "${voterId}"
            WHERE politicianId = 1`)
}

// Delete data

function delete_data_politician(politicianId) {
    db.run(`DELETE FROM politicians
            WHERE politicianId = "${politicianId}"`)
}

function delete_data_voter(voterId) {
    db.run(`DELETE FROM voters
            WHERE voterId = "${voterId}"`)
}

function delete_data_vote(politicianId) {
    db.run(`DELETE FROM votes
            WHERE politicianId = "${politicianId}"`)
}

// Driver Code Release 1 & 2

//seed_data()

// insert_data_politcian("Andre Sudi", "NASDEM", "Jakarta", 1)
// insert_data_voter("Donald", "Trump", "male", 99)
// insert_data_vote(1,2)

// Update_data_politcian("David Gilmour", "pink floyd", "UK", 666)
// Update_data_voter("Umma", "Thurman", "female", 25)
// Update_data_vote(6,9)

// delete_data_politician(22)
// delete_data_voter(152)
// delete_data_vote(6)

// Release 3

// 1
// SELECT politician_name, party_name, grade_current FROM Politicians
// WHERE party_name = "R" AND grade_current BETWEEN 9 AND 11;

function release1() {
    let query = `SELECT politician_name, party_name, grade_current FROM Politicians
                WHERE party_name = "R" AND grade_current BETWEEN 9 AND 11`
    
    db.all(query,function(err, data){
        console.log(data)
        })
}

release1()

// 2
// SELECT COUNT (*) AS totalVotes, politician_name FROM Politicians
// INNER JOIN Votes ON politicians.politicianId = votes.politicianId
// WHERE politician_name = 'Olympia Snowe'

function release2() {
    let query = `SELECT COUNT (*) AS totalVotes, politician_name FROM Politicians
                INNER JOIN Votes ON politicians.politicianId = votes.politicianId
                WHERE politician_name = 'Olympia Snowe'`

    db.all(query,function(err, data){
        console.log(data)
        })
}

release2()

// 3
// SELECT COUNT (*) AS totalVotes ,politician_name FROM Politicians
// INNER JOIN Votes ON politicians.politicianId = votes.politicianId
// WHERE politician_name LIKE 'Adam%'
// GROUP BY politician_name

function release3() {
    let query = `SELECT COUNT (*) AS totalVotes ,politician_name FROM Politicians
    INNER JOIN Votes ON politicians.politicianId = votes.politicianId
    WHERE politician_name LIKE 'Adam%'
    GROUP BY politician_name`

    db.all(query,function(err, data){
        console.log(data)
        })
}

release3()

// 4 // di group dulu baru di order and di limit
// SELECT COUNT (*) AS totalVotes ,politician_name, party_name, location FROM Politicians
// INNER JOIN Votes ON politicians.politicianId = votes.politicianId
// GROUP BY politician_name
// ORDER BY totalVotes DESC
// LIMIT 3

function release4() {
    let query = `SELECT COUNT (*) AS totalVotes ,politician_name, party_name, location FROM Politicians
    INNER JOIN Votes ON politicians.politicianId = votes.politicianId
    GROUP BY politician_name
    ORDER BY totalVotes DESC
    LIMIT 3`

    db.all(query,function(err, data){
        console.log(data)
        })
}

release4()

// 5
// SELECT first_name, last_name, gender, age FROM Votes
// INNER JOIN Voters ON Votes.voterId = Voters.voterId
// INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
// WHERE politician_name = 'Olympia Snowe'

function release5() {
    let query = `SELECT first_name, last_name, gender, age FROM Votes
    INNER JOIN Voters ON Votes.voterId = Voters.voterId
    INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
    WHERE politician_name = 'Olympia Snowe'`

    db.all(query,function(err, data){
        console.log(data)
        })
}

release5()

