// release3

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./poll.db')

db.serialize(() => {

    const query1 = `SELECT name, party, gradeCurrent 
                    FROM politicians
                    WHERE gradeCurrent>=9 AND gradeCurrent<=11 AND party LIKE 'r'`

    db.all(query1, function(err, row) {
        if (err) {
            console.log (err)
        }  
        console.log(row)
    })

    const query2 = `SELECT COUNT (*) as totalVote, name
                    FROM politicians
                    LEFT JOIN votes ON politicians.id = votes.politicianId
                    WHERE name LIKE 'olympia snowe'`

    db.all(query2, function(err, row) {
        if (err) {
            console.log (err)
        }
        console.log(row)
    })

    const query3 = `SELECT name, COUNT (name) as totalVote
                    FROM politicians
                    LEFT JOIN votes ON politicians.id = votes.politicianId
                    WHERE name LIKE 'adam%'
                    GROUP BY name`

    db.all(query3, function(err, row) {
        if (err) {
            console.log (err)
        }
        console.log(row)
    })

    const query4 = `SELECT COUNT (name) as totalVote, name, party, location
                    FROM politicians
                    LEFT JOIN votes ON politicians.id = votes.politicianId
                    GROUP BY name
                    ORDER BY totalVote DESC
                    LIMIT 3`

    db.all(query4, function(err, row) {
        if (err) {
            console.log (err)
        }
        console.log(row)
    })

    const query5 = `SELECT firstName, lastName, gender, age
                    FROM voters
                    LEFT JOIN votes ON voters.id = votes.voterId
                    LEFT JOIN politicians ON votes.politicianId = politicians.id
                    WHERE name LIKE 'olympia snowe'`

    db.all(query5, function(err, row) {
        if (err) {
            console.log (err)
        }
        console.log(row)
    })

})
db.close()
