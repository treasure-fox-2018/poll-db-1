const db = require('../db');

class Model {
  static insert (voterId, politicianId, callback){
    const query = `INSERT INTO Votes (voterId, politicianId) VALUES ("${voterId}", "${politicianId}")`
    db.run(query, function (err) {
      if (err) throw err
      //return the last added ID
      callback(this.lastID)
    });
  }

  static update(id, voterId, politicianId, callback){
    const query = `UPDATE Votes
                   SET voterId = "${voterId}",
                   politicianId = "${politicianId}"
                   WHERE id= ${id}`
    db.run(query, function (err) {
      if (err) throw err
      callback()
    });
  }

  static delete(id, callback){
    const query = `DELETE FROM Votes WHERE id=${id}`
    db.run(query, function (err) {
      if (err) throw err
      callback()
    });
  }
}

module.exports = Model