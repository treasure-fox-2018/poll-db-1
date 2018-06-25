//seeding

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./poll.db')
const fs = require('fs')

const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\r\n')
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\r\n')
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\r\n')

const politiciansData = []
for(let x=1; x<politicians.length; x++) {
    let tempPolitician = politicians[x].split(",")
    politiciansData.push({
                        id : x, 
                        name : tempPolitician[0], 
                        party : tempPolitician[1],
                        location : tempPolitician[2],
                        gradeCurrent : Number(tempPolitician[3])
                        })
}

const votersData = []
for(let y=1; y<voters.length; y++) {
    let tempVoters = voters[y].split(",")
    votersData.push({
                    id : y,
                    firstName : tempVoters[0],
                    lastName : tempVoters[1],
                    gender : tempVoters[2],
                    age : Number(tempVoters[3])
                    })
}

const votesData = []
for(let z=1; z<votes.length; z++) {
    let tempVotes = votes[z].split(",")
    votesData.push({
                    voterId : Number(tempVotes[0]),
                    politicianId : Number(tempVotes[1]) 
                    })
}

function seedPoliticians () {

    db.serialize(function() {

        for(let a=0; a<politiciansData.length; a++) {
            db.run(`INSERT INTO politicians (name, party, location, gradeCurrent)
                VALUES ('${politiciansData[a].name}', 
                        '${politiciansData[a].party}', 
                        '${politiciansData[a].location}', 
                        '${politiciansData[a].gradeCurrent}')`, 
                    
                        function (err) {
                            if (err) {
                                console.log('failed to write politicians data !!!')
                            }
                        })
        }
    })
    db.close()

}

function seedVoters () {

    db.serialize(function() {
        for(let b=0; b<votersData.length; b++) {
            db.run(`INSERT INTO voters (firstName, lastName, gender, age)
            VALUES ('${votersData[b].firstName}', 
                    "${votersData[b].lastName}", 
                    '${votersData[b].gender}', 
                    '${votersData[b].age}')`,
                
                    function (err) {
                        if (err) {
                            console.log('failed to write voters data !!!')
                        }
                    })
        }
    })
    db.close()

}

function seedVotes () {

    db.serialize(function() {
        for(let c=0; c<votesData.length; c++) {
            db.run(`INSERT INTO votes (voterId, politicianId)
            VALUES ('${votesData[c].voterId}', 
                    '${votesData[c].politicianId}')`,
                
                function (err) {
                    if (err) {
                        console.log('failed to write votes data !!!')
                    }
                })
        }

    })
    db.close()
    
}

//seedPoliticians ()
//seedVoters()
//seedVotes ()

