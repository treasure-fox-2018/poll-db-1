//your code here

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./poll.db')
const fs = require('fs')
let argv = process.argv.slice(2)

function createPoliticians (name, party, location, gradeCurrent) {

    db.run(`INSERT INTO politicians (name, party, location, gradeCurrent)
            VALUES ('${name}', '${party}', '${location}', ${Number(gradeCurrent)})`,
        
            function (err) {
                if (err) {
                    console.log('failed to create politician !')
                }
            })

}

function createVoters (firstName, lastName, gender, age) {

    db.run(`INSERT INTO voters (firstName, lastName, gender, age)
            VALUES ('${firstName}', '${lastName}', '${gender}', ${Number(age)})`,
        
            function (err) {
                if (err) {
                    console.log('failed to create voters !')
                }
            })

}

function createVotes (voterId, politicianId) {

    db.run(`INSERT INTO votes (voterId, politicianId)
            VALUES ('${voterId}', '${politicianId}')`,
        
            function (err) {
                if (err) {
                    console.log('failed to create votes !')
                }
            })

}

function updatePoliticians (id, name, party, location, gradeCurrent) {

    db.run(`UPDATE politicians
            SET name='${name}', party='${party}', location='${location}', gradeCurrent='${gradeCurrent}'
            WHERE id=${id}`,
        
            function (err) {
                if (err) {
                    console.log('failed to update politician !')
                }
            })

}

function updateVoters (id, firstName, lastName, gender, age) {

    db.run(`UPDATE voters
            SET firstName='${firstName}', lastName='${lastName}', gender='${gender}', age='${age}'
            WHERE id=${id}`,

            function (err) {
                if (err) {
                    console.log('failed to update voters')
                }
            })

}

function updateVotes (id, voterId, politicianId) {

    db.run(`UPDATE votes
            SET voterId=${voterId}, politicianId=${politicianId}
            WHERE id=${id}`,

            function (err) {
                if (err) {
                    console.log('failed to update votes !')
                }
            })
            
}

function deletePoliticians (id) {
    db.run(`DELETE FROM politicians
            WHERE id=${id}`)
}

function deleteVoters (id) {
    db.run(`DELETE FROM voters
            WHERE id=${id}`)
}

function deleteVotes (id) {
    db.run(`DELETE FROM votes
            WHERE id=${id}`)
}

if(argv[0] === undefined) {
    console.log('create politician name party location gradeCurrent')
    console.log('create voters firstName lastName gender age')
    console.log('create votes voterId politicianId')

    console.log('update politician id name party location gradeCurrent')
    console.log('update voters id firstName lastName gender age')
    console.log('update votes id voterId politicianId')

    console.log('delete politician id')
    console.log('delete voters id')
    console.log('delete votes id')
}
if(argv[0] === 'create') {
    if(argv[1] === 'politician') {
        createPoliticians(argv[2], argv[3], argv[4], argv[5])
    }
    if(argv[1] === 'voters') {
        createVoters(argv[2], argv[3], argv[4], argv[5])
    }
    if(argv[1] === 'votes') {
        createVotes(argv[2], argv[3])
    } 
} 

if(argv[0] === 'update') {
    if(argv[1] === 'politician') {
        updatePoliticians(argv[2], argv[3], argv[4], argv[5], argv[6])
    }
    if(argv[1] === 'voters') {
        updateVoters(argv[2], argv[3], argv[4], argv[5], argv[6])
    }
    if(argv[1] === 'votes') {
        updateVotes(argv[2], argv[3], argv[4])
    } 
}

if(argv[0] === 'delete') {
    if(argv[1] === 'politician') {
        deletePoliticians(argv[2])
    }
    if(argv[1] === 'voters') {
        deleteVoters(argv[2])
    }
    if(argv[1] === 'votes') {
        deleteVotes(argv[2])
    } 
}

