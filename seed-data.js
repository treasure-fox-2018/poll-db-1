const db = require('./db');
const fs = require('fs');

class Seed {
  static read () {
    let dataPoliticians = fs.readFileSync('./politicians.csv', 'utf8').split('\n');
    let dataVoters = fs.readFileSync('./voters.csv', 'utf8').split('\n');
    let dataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n');

    let combinedData = [dataPoliticians, dataVoters, dataVotes];
    let combinedDataArr = [];
    for (var i = 0; i <= combinedData.length - 1; i++) {
      combinedDataArr.push([]);
      for (var j = 1; j <= combinedData[i].length - 2; j++) {
        combinedDataArr[i].push(combinedData[i][j].split(','));
      }
    }
    return combinedDataArr;
  }

  static insertDataPolitician () {
    let dataPoliticians = Seed.read()[0];
    

    for (var i = 0; i <= dataPoliticians.length - 1; i++) {
      let queryInsert = `INSERT INTO Politicians (name, party, location, grade_current)
                         VALUES ("${dataPoliticians[i][0]}", "${dataPoliticians[i][1]}", "${dataPoliticians[i][2]}", "${dataPoliticians[i][3]}")`
      db.serialize(function() {
        db.run(queryInsert, function(err) {
          if (err) throw err;
        })
      })
    }
  }

  static insertDataVoters () {
    let dataVoters = Seed.read()[1];

    for (var i = 0; i <= dataVoters.length - 1; i++) {
      let queryInsert = `INSERT INTO Voters (first_name, last_name, gender, age)
                         VALUES ("${dataVoters[i][0]}", "${dataVoters[i][1]}", "${dataVoters[i][2]}", "${dataVoters[i][3]}")`;
      
      db.serialize(function() {
        db.run(queryInsert, function(err) {
          if (err) throw err;
        })
      })
    }
  }

  static insertDataVotes () {
    let dataVotes = Seed.read()[2];

    for (var i = 0; i <= dataVotes.length - 1; i++) {
      let queryInsert = `INSERT INTO Votes (voter_id, politician_id)
                         VALUES ("${dataVotes[i][0]}", "${dataVotes[i][1]}")`
      
      db.serialize(function() {
        db.run(queryInsert, function(err) {
          if (err) throw err;
        })
      })                   
    }
  }

  static insertData () {
    Seed.insertDataPolitician();
    Seed.insertDataVoters();
    Seed.insertDataVotes();
    
    return `Data successfully added!`
  }

  static createDataPolitician (name, party, location, grade_current) {
    let queryCreatePolitician = `INSERT INTO Politicians (name, party, location, grade_current)
                                 VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;

    db.run(queryCreatePolitician, function(err) {
      if (err) throw err;
      console.log('New Politician has been created!');
    });
  }

  static createDataVoters (first_name, last_name, gender, age) {
    let queryCreateVoters = `INSERT INTO Voters (first_name, last_name, gender, age)
                             VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`;

    db.run(queryCreateVoters, function(err) {
      if (err) throw err;
      console.log('New Voters has been created!');
    });
  }

  static createDataVotes (voter_id, politician_id) {
    let queryCreateVotes = `INSERT INTO Votes (voter_id, politician_id)
                                 VALUES ("${voter_id}", "${politician_id}")`;

    db.run(queryCreateVotes, function(err) {
      if (err) throw err;
      console.log('New Votes has been created!');
    });
  }

  static updateDataPoliticians (id, column_edited, value_edited) {
    let queryCreatePolitician = `UPDATE Politicians SET '${column_edited}' = "${value_edited}"
                                 WHERE id = ${id}`;

    db.run(queryCreatePolitician, function(err) {
      if (err) throw err;

    });
  }

  static updateDataVoters (id, column_edited, value_edited) {
    let queryUpdateVoters = `UPDATE Voters SET '${column_edited}' = "${value_edited}"
                             WHERE id = ${id}`

    db.run(queryUpdateVoters, function(err) {
      if (err) throw err;

    });
  }

  static updateDataVotes (id, column_edited, value_edited) {
    let queryUpdateVotes = `UPDATE Votes SET '${column_edited}' = "${value_edited}"
                            WHERE id = ${id}`;

    db.run(queryUpdateVotes, function(err) {
      if (err) throw err;

    });
  }

  static deleteDataPoliticians (id) {
    let queryDeletePolitician = `DELETE FROM Politicians WHERE id = ${id}`;

    db.run(queryDeletePolitician, function(err) {
      if (err) throw err;

    });
  }

  static deleteDataVoters (id) {
    let queryDeleteVoters = `DELETE FROM Voters WHERE id = ${id}`;

    db.run(queryDeleteVoters, function(err) {
      if (err) throw err;

    });
  }

  static deleteDataVotes (id) {
    let queryDeleteVotes = `DELETE FROM Votes WHERE id = ${id}`;

    db.run(queryDeleteVotes, function(err) {
      if (err) throw err;

    });
  }

  static viewQueryGrade (party, first_value, second_value) {
    let query = `SELECT name, party, grade_current FROM Politicians WHERE party = "${party}" AND grade_current BETWEEN ${first_value} and ${second_value}`;

    db.all(query, function(err, dataPoliticians) {
      if (err) throw err;

      console.log(dataPoliticians);
    })
  }

  static viewQueryCount (name) {
    let query = `SELECT COUNT(voter_id) AS totalVote, name FROM Politicians LEFT JOIN Votes on Politicians.id = Votes.politician_id WHERE name = "${name}"`;

    db.all(query, function(err, dataCount) {
      if(err) throw err;
      console.log(dataCount);
    })
  }

  static viewQueryName (name) {
    let query = `SELECT name, COUNT(voter_id) AS totalVote FROM Politicians LEFT JOIN Votes 
                 on Politicians.id = Votes.politician_id WHERE name LIKE "%${name}%" GROUP BY name`

    db.all(query, function(err, dataCount) {
      if(err) throw err;
      console.log(dataCount);
    })
  }

  static viewQueryTop3 () {
    let query = `SELECT COUNT(voter_id) AS totalVotes, name, party, location FROM Politicians LEFT JOIN Votes 
                 on Politicians.id = Votes.politician_id GROUP BY Votes.politician_id ORDER BY totalVotes DESC LIMIT 3`

    db.all(query, function(err, dataCount) {
      if(err) throw err;
      console.log(dataCount);
    })
  }

  static viewQueryWhosVote (parameter) {
    let query = `SELECT first_name, last_name, gender, age FROM Voters WHERE id IN (SELECT Votes.voter_id FROM Politicians LEFT JOIN Votes on Politicians.id = Votes.politician_id WHERE name = '${parameter}')`

    db.all(query, function(err, dataCount) {
      if(err) throw err;
      console.log(dataCount);
    })
  }
}

// DRIVER CODE
// Seed.createDataPolitician("Jacky Jon", "D", "HI", 8.98654);
// Seed.createDataVoters("John", "Thor", "male", 21);
// Seed.createDataVotes(18, 52);
// Seed.updateDataPoliticians(19, 'location', 'HI');
// Seed.updateDataVoters(149, 'last_name', 'Joko');
// Seed.updateDataVotes(162, 'politician_id', 2);
// Seed.deleteDataPoliticians(20);
// Seed.deleteDataVoters(150);
// Seed.deleteDataVotes(163);
// Seed.createDataPolitician('John', 'D', 'IL', 8.985345);
// console.log(Seed.viewQuery('R', 9, 11));
// console.log(Seed.viewQuery1("Olympia Snowe"));
// console.log(Seed.viewQueryName("Adam"));
// console.log(Seed.viewQueryTop3());
// console.log(Seed.viewQueryWhosVote("Olympia Snowe"))

