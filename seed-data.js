const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./databasePolitician.db')

const fs = require('fs')
const politicians = fs.readFileSync('./politicians.csv', 'utf-8').split('\n')
const voters = fs.readFileSync('./voters.csv', 'utf-8').split('\n')
const votes = fs.readFileSync('./votes.csv', 'utf-8').split('\n')

function seedData() {
    db.serialize(function() {
        let tempPoliticians = []
        for(let i = 1; i < politicians.length-1; i++) {
            tempPoliticians.push(politicians[i].split(','))

            db.run(`INSERT INTO Politicians
            (id, name, party, location, grade_current)
            VALUES (null, "${tempPoliticians[i-1][0]}", "${tempPoliticians[i-1][1]}",
            "${tempPoliticians[i-1][2]}", ${tempPoliticians[i-1][3]})`)            
        }
        
        let tempVoters = []
        for(let i = 1; i < voters.length-1; i++) {
            tempVoters.push(voters[i].split(','))

            db.run(`INSERT INTO Voters
            (id, first_name, last_name, gender, age)
            VALUES (null, "${tempVoters[i-1][0]}", "${tempVoters[i-1][1]}", 
            "${tempVoters[i-1][2]}", ${tempVoters[i-1][3]}`)
        }

        let tempVotes = []
        for(let i = 1; i < votes.length-1; i++) {
            tempVotes.push(votes[i].split(','))

            db.run(`INSERT INTO Votes
            (id, VoterId, politicianId)
            VALUES (null, ${tempVotes[i-1][0]}, ${tempVotes[i-1][1]})`)
        }

        console.log('seed data completed!')

    })
}

seedData()