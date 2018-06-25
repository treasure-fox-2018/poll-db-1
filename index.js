let argv = process.argv;
let command = argv[2]
let table = argv[3]

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./databasePolitician.db')

if(command == 'insert') {
    // ----- INSERT -----
    if(table == 'Politicians') {
        const queryInsertPoliticians = `INSERT INTO Politicians
        (id, name, party, location, grade_current)
        VALUES(null, "${process.argv[4]}", "${process.argv[5]}", 
        "${process.argv[6]}", "${process.argv[7]}")`
        // node index.js insert [Politicians] [NAME] [PARTY] [LOCATION] [GRADE_CURRENT]
        
        db.run(queryInsertPoliticians, function(err) {
            if(err) throw err
            console.log(`Done insert data id : ${this.lastID}`)
        })
    } else if(table == 'Voters') {
        const queryInsertVoters = `INSERT INTO Voters
        (id, first_name, last_name, gender, age)
        VALUES(null, "${process.argv[4]}", "${process.argv[5]}", 
        "${process.argv[6]}", ${process.argv[7]})`
        // node index.js insert [Voters] [first_name] [last_name] [gender] [age]

        db.run(queryInsertVoters, function(err) {
            if(err) throw err
            console.log(`Done insert data Voters id : ${this.lastID}`)
        })
    } else if(table == 'Votes') {
        const queryInsertVotes = `INSERT INTO Votes
        (id, voterId, politicianId)
        VALUES(null, ${process.argv[4]}, ${process.argv[5]})`
        // node index.js insert [Votes] [voterId] [politicianId]

        db.run(queryInsertVotes, function(err) {
            if(err) throw err
            console.log(`Done insert data Votes : ${this.lastID}`)
        })
    }
    

} else if(command == 'update') {
    // ----- UPDATE -----
    if(table == 'Politicians') {
        const queryUpdatePoliticians = `UPDATE Politicians
        SET name = "${process.argv[5]}", party = "${process.argv[6]}",
            location = "${process.argv[7]}", grade_current = "${process.argv[8]}"
        WHERE id = ${process.argv[4]}`
        // node index.js update Politicians [id] [name] [party] [location] [grade_current]

        db.run(queryUpdatePoliticians, function(err) {
            if(err) throw err
            console.log(`Done update data Politicians : ${this.changes}`)
        })

    } else if(table == 'Voters') {
        const queryUpdateVoters = `UPDATE Voters
        SET first_name = "${process.argv[5]}", last_name = "${process.argv[6]}",
        gender = "${process.argv[7]}", age = ${process.argv[8]}
        WHERE id = ${process.argv[4]}`
        // node index.js update Voters [id] [first_name] [last_name] [gender] [age]

        db.run(queryUpdateVoters, function(err) {
            if(err) throw err
            console.log(`Done update data Voters : ${this.changes}`)
        })
    } else if(table == 'Votes') {
        const queryUpdateVotes = `UPDATE Votes
        SET voterId = ${process.argv[5]},  politicianId = ${process.argv[6]}
        WHERE id = ${process.argv[4]}`
        // node index.js update Votes [id] [voterId] [politicianId]

        db.run(queryUpdateVotes, function(err) {
            if(err) throw err
            console.log(`Done update data Votes : ${this.changes}`)
        })
    }

} else if(command == 'delete') {
    // ----- DELETE -----
    // node index.js delete [table] [id]
    if(table == 'Politicians') {
        const queryDeletePoliticians = `DELETE FROM Politicians
        WHERE id = ${process.argv[4]}`
    
        db.run(queryDeletePoliticians, function(err) {
            if(err) throw err
            console.log(`Done delete ${this.changes} data Politicians`)
        })
    } else if(table == 'Voters') {
        const queryDeleteVoters = `DELETE FROM Voters
        WHERE id = ${process.argv[4]}`

        db.run(queryDeleteVoters, function(err) {
            if(err) throw err
            console.log(`Done delete ${this.changes}data Voters`)
        })
    } else if(table == 'Votes') {
        const queryDeleteVotes = `DELETE FROM Votes
        WHERE id = ${process.argv[4]}`

        db.run(queryDeleteVotes, function(err) {
            if(err) throw err
            console.log(`Done delete ${this.changes} data Votes `)
        })
    }

}