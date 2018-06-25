const db = require('../db');

class Model {
  static insert(first_name, last_name, gender, age, callback){
    const query = `INSERT INTO Voters (first_name, last_name, gender, age) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`
    db.run(query, function (err) {
      if (err) throw err
      //return the last added ID
      callback(this.lastID)
    });
  }

  static update(id, first_name, last_name, gender, age, callback){
    const query = `UPDATE Voters
                   SET first_name = "${first_name}",
                   last_name = "${last_name}",
                   gender = "${gender}",
                   age = "${age}"
                   WHERE id= ${id}`
    db.run(query, function (err) {
      if (err) throw err
      callback()
    });
  }

  static delete(id, callback){
    const query = `DELETE FROM Voters WHERE id=${id}`
    db.run(query, function (err) {
      if (err) throw err
      callback()
    });
  }
}

module.exports = Model