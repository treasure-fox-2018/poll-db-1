const db = require("../db")

class ModelVoters {

  static insert (input, callback) {
    const insertDataInput = input
    const first_name = insertDataInput[0]
    const last_name = insertDataInput[1]
    const gender = insertDataInput[2]
    const age = insertDataInput[3]
    const queryInsert = `INSERT INTO Voters (first_name, last_name, gender, age)
                        VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`

    db.run(queryInsert, (err, data) => {
      if (err) throw err;
      const message = "Data berhasil ditambahkan"
      callback(message)
    })
  }

  static update (updateInsert, callback) {
    const splitForId = updateInsert[0].split(":")
    const splitForColumn = updateInsert[1].split(":")
    const id = splitForId[1]
    const columnAll = splitForColumn[0]
    const valueAll = splitForColumn[1]
    let message = ''

    switch (columnAll) {
      case "firstName": 
        const name = valueAll
        const queryName = `UPDATE Voters SET first_name = "${name}" WHERE id = ${id}`

        db.all(queryName, (err, data) => {
          if (err) throw err;
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
        })
      break;

      case "lastName": 
        const party = valueAll
        const queryParty = `UPDATE Voters SET last_name = "${party}" WHERE id = ${id}`
        db.all(queryParty, (err, data) => {
          if (err) throw err;
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
        })
      break;

      case "gender": 
        const location = valueAll
        const queryLocation = `UPDATE Voters SET gender = "${location}" WHERE id = ${id}`
        db.all(queryLocation, (err, data) => {
          if (err) throw err;
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
        })
      break;

      case "age": 
        const grade = valueAll
        const queryGrade = `UPDATE Voters SET age = "${grade}" WHERE id = ${id}`
        db.all(queryGrade, (err, data) => {
          if (err) throw err;
          // console.log("Data berhasil di update");
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
          
        })
      break;
    }
  }

  static delete (deleteData, callback) {
    const deleteDataSplit = deleteData.split(":")
    const id  = deleteDataSplit[1]

    const queryDelete = `DELETE FROM Voters WHERE id = ${id}`
    db.run(queryDelete, (err, data) => {
      if (err) throw err;
      callback(`Data dengan id = ${id} berhasil di hapus`)
    })
  }

}

module.exports = ModelVoters