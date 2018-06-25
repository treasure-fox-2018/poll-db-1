var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Model {
  constructor() {

  }
  // politicians
  static createPoliticians(name, party, location, grade_current, cb) {
    let query = `INSERT INTO politicians (name, party, location, grade_current)
    VALUES ("${name}", "${party}", "${location}","${grade_current}")`;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  static updatePoliticians(id, column, value, cb) {
    let query = `UPDATE politicians SET ${column} = "${value}" where id = ${id} `;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  static deletePoliticians(id, cb) {
    let query = `DELETE FROM politicians WHERE id = ${id}`;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  // voters

  static createVoters(first_name, last_name, gender, age, cb) {
    let query = `INSERT INTO Voters (first_name, last_name, gender, age)
    VALUES ("${first_name}", "${last_name}", "${gender}",${age})`;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  static updateVoters(id, column, value, cb) {
    let query = `UPDATE Voters SET ${column} = "${value}" where id = ${id} `;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  static deleteVoters(id, cb) {
    let query = `DELETE FROM Voters WHERE id = ${id}`;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  // Votes

  static createVotes(id_voters, id_politicians, cb) {
    let query = `INSERT INTO Votes (id_voters, id_politicians)
    VALUES (${id_voters}, ${id_politicians})`;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  static updateVotes(id, column, value, cb) {
    let query = `UPDATE Votes SET ${column} = "${value}" where id = ${id} `;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
  static deleteVotes(id, cb) {
    let query = `DELETE FROM Votes WHERE id = ${id}`;
    db.run(query, function(err, data) {
      if (err) {
        throw err
      } else {
        cb(data)
      }
    })
  }
}

module.exports = Model
