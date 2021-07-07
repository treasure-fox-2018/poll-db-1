const db = require("../db")

class ModelVotes {

  static insert (input, callback) {
    const insertDataInput = input
    const name = insertDataInput[0]
    const party = insertDataInput[1]
    const location = insertDataInput[2]
    const gradeCurrent = insertDataInput[3]
    const queryInsert = `INSERT INTO Votes (name, party, location, grade_current)
                        VALUES ("${name}", "${party}", "${location}", "${gradeCurrent}")`

    db.run(queryInsert, (err, data) => {
      if (err) throw err;
      const message = "Data berhasil ditambahkan"
      callback(message)
    })
  }

  static delete (deleteData, callback) {
    const deleteDataSplit = deleteData.split(":")
    const id  = deleteDataSplit[1]

    const queryDelete = `DELETE FROM Votes WHERE id = ${id}`
    db.run(queryDelete, (err, data) => {
      if (err) throw err;
      callback(`Data dengan id = ${id} berhasil di hapus`)
    })
  }

}

module.exports = ModelVotes