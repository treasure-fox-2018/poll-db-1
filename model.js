const Controller = require('./controller.js');
const db = require('./db.js');

class Model {

    static createPolitician(name, party, location, grade_current) {
        // console.log(name);
        
        const queryCreate = `INSERT INTO Politicians (name, party, location, grade_current)
                          VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
        db.run(queryCreate, function (err) {
            if (err) throw err;
        });
    }

    static updatePolitician(id, name, party, location, grade_current) {
        const queryUpdate = `UPDATE Politicians 
                             SET name = "${name}",
                                 party = "${party}",
                                 location = "${location}",
                                 grade_current = "${grade_current}"
                             WHERE id = ${id}`

        db.run(queryUpdate, function (err) {
            if (err) throw err
        });
    }

    static deletePolitician(id) {
        const queryDelete = `DELETE FROM Politicians WHERE id = ${id}`

        db.run(queryDelete, function (err) {
            if (err) throw err;
        });
    }

    static createVoter(first_name, last_name, gender, age) {
        const queryCreate = `INSERT INTO Voters (first_name, last_name, gender, age)
                          VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
        db.run(queryCreate, function (err) {
            if (err) throw err;
        });
    }

    static updateVoter(id, first_name, last_name, gender, age) {
        const queryUpdate = `UPDATE Voters 
                             SET first_name = "${first_name}",
                                 last_name = "${last_name}",
                                 gender = "${gender}",
                                 age = "${age}"
                             WHERE id = ${id}`

        db.run(queryUpdate, function (err) {
            if (err) throw err
        });
    }

    static deleteVoter(id) {
        const queryDelete = `DELETE FROM Voters WHERE id = ${id}`
        db.run(queryDelete, function (err) {
            if (err) throw err;
        });
    }

    static createVote(politicianId, voterId) {
        const queryCreate = `INSERT INTO Votes (politicianId, voterId)
                          VALUES ("${politicianId}", "${voterId}")`
        db.run(queryCreate, function (err) {
            if (err) throw err;
        });
    }

    static updateVote(id, politicianId, voterId) {
        const queryUpdate = `UPDATE Votes 
                             SET politicianId = "${politicianId}",
                                 voterId = "${voterId}"
                             WHERE id = ${id}`

        db.run(queryUpdate, function (err) {
            if (err) throw err
        });
    }

    static deleteVote(id) {
        const queryDelete = `DELETE FROM Votes WHERE id = ${id}`
        db.run(queryDelete, function (err) {
            if (err) throw err;
        });
    }

    static filterByOne() {
        const queryFilter = `SELECT * FROM Politicians
                             WHERE party = "R"
                             AND grade_current BETWEEN 9 AND 11`

        db.all(queryFilter, function (err, output) {
            console.log(output)
        });
    }
    
    static filterByTwo() {
        const queryFilter = `SELECT COUNT(Politicians.name) 
                                AS totalVote, Politicians.name 
                             FROM Politicians
                                JOIN Votes ON Politicians.id = Votes.politicianId
                             WHERE Politicians.name = "Olympia Snowe"`

        db.all(queryFilter, function (err, output) {
            console.log(output)
        })
    }

    static filterByThree() {
        const queryFilter = `SELECT Politicians.name, COUNT(Politicians.name) 
                             AS totalVote FROM Politicians
                                JOIN Votes ON Politicians.id = Votes.politicianId
                             WHERE Politicians.name LIKE "%Adam%"
                             GROUP BY Politicians.name`

        db.all(queryFilter, function (err, output) {
            console.log(output)
        })
    }

    static filterByFour() {
        const queryFilter = `SELECT COUNT(Politicians.id) AS totalVote, name, party, location 
                             FROM Votes JOIN Politicians
                                ON votes.politicianId = Politicians.id
                             GROUP BY Politicians.name
                             ORDER BY totalVote DESC
                             LIMIT 3`
        db.all(queryFilter, function (err, output) {
            console.log(output)
        })
    }

    static filterByFive() {
        const queryFilter = `SELECT first_name, last_name, gender, age 
                             FROM Voters 
                                JOIN (SELECT * FROM Votes JOIN Politicians ON votes.politicianId = Politicians.id) AS votes  
                                    ON voters.id = votes.voterId
                            WHERE votes.name = "Olympia Snowe"`

        db.all(queryFilter, function (err, output) {
            console.log(output)
        })
    }
}

module.exports = Model;