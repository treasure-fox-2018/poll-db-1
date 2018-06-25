const db = require('../db');

class Model {
  static insert(name, party, location, grade_current, callback){
    const query = `INSERT INTO Politicians (name, party, location, grade_current) VALUES ("${name}", "${party}", "${location}", "${grade_current}")`
    db.run(query, function (err) {
      if (err) throw err
      //return the last added ID
      callback(this.lastID)
    });
  }

  static update(id, name, party, location, grade_current, callback){
    const query = `UPDATE Politicians
                   SET name = "${name}",
                   party = "${party}",
                   location = "${location}",
                   grade_current = "${grade_current}"
                   WHERE id= ${id}`
    db.run(query, function (err) {
      if (err) throw err
      callback()
    });
  }

  static delete(id, callback){
    const query = `DELETE FROM Politicians WHERE id=${id}`
    db.run(query, function (err) {
      if (err) throw err
      callback()
    });
  }
  
  static query1(callback) {
    const query = `SELECT name,party,grade_current FROM Politicians
                   WHERE party = "R" AND grade_current BETWEEN 9 AND 11`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

  static query2(callback) {
    const query = `SELECT COUNT (Politicians.name) AS totalVote, Politicians.name FROM Politicians INNER JOIN Votes
                    ON Politicians.id = Votes.politicianId
                    WHERE Politicians.name LIKE "Olympia Snowe"`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

  static query3(callback) {
    const query = `SELECT Politicians.name, COUNT(Politicians.name) AS totalVote FROM Politicians INNER JOIN Votes
                    ON Politicians.id = Votes.politicianId
                    WHERE Politicians.name LIKE "%adam%"
                    GROUP BY Politicians.name`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

  static query4(callback) {
    const query = `SELECT COUNT (Politicians.name) AS totalVote , Politicians.name, Politicians.party, Politicians.location
                    FROM Politicians INNER JOIN VOTES
                    ON Politicians.id = Votes.politicianId
                    GROUP BY Politicians.name
                    ORDER BY totalVote DESC
                    LIMIT 3`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

  static query5(callback) {
    const query = `SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
                    FROM Politicians INNER JOIN VOTES
                    ON Politicians.id = Votes.politicianId 
                    INNER JOIN VOTERS
                    ON Voters.id = Votes.voterId
                    WHERE Politicians.name like "olympia snowe"`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

}
module.exports = Model