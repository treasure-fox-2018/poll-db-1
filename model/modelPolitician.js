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
  
  // static query1() {
  // //   SELECT name,party,grade_current FROM Politicians
	// // WHERE party = "R" AND grade_current BETWEEN 9 AND 11
  // }

  // static query2() {
  //   SELECT COUNT (Politicians.name) AS totalVote, Politicians.name FROM Politicians INNER JOIN VOTES
  //   ON Politicians.id = Votes.politicianId
  //   WHERE Politicians.name LIKE "Olympia Snowe"
  // }

  // static query3() {
  //   SELECT Politicians.name, COUNT(Politicians.name) AS totalVote FROM Politicians INNER JOIN VOTES
  //   ON Politicians.id = Votes.politicianId
  //   WHERE Politicians.name LIKE "%adam%"
  //   GROUP BY Politicians.name
  // }

}
module.exports = Model