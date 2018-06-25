const db = require("../db")

class ModelPoliticians {

  static insert (input, callback) {
    const insertDataInput = input
    const name = insertDataInput[0]
    const party = insertDataInput[1]
    const location = insertDataInput[2]
    const gradeCurrent = insertDataInput[3]
    const queryInsert = `INSERT INTO Politicians (name, party, location, grade_current)
                        VALUES ("${name}", "${party}", "${location}", "${gradeCurrent}")`

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
      case "name": 
        const name = valueAll
        const queryName = `UPDATE Politicians SET name = "${name}" WHERE id = ${id}`

        db.all(queryName, (err, data) => {
          if (err) throw err;
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
        })
      break;

      case "party": 
        const party = valueAll
        const queryParty = `UPDATE Politicians SET party = "${party}" WHERE id = ${id}`
        db.all(queryParty, (err, data) => {
          if (err) throw err;
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
        })
      break;

      case "location": 
        const location = valueAll
        const queryLocation = `UPDATE Politicians SET location = "${location}" WHERE id = ${id}`
        db.all(queryLocation, (err, data) => {
          if (err) throw err;
          message = `Data dengan id ${id} berhasil di update`
          callback(message)
        })
      break;

      case "grade": 
        const grade = valueAll
        const queryGrade = `UPDATE Politicians SET grade_current = "${grade}" WHERE id = ${id}`
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

    const queryDelete = `DELETE FROM Politicians WHERE id = ${id}`
    db.run(queryDelete, (err, data) => {
      if (err) throw err;
      callback(`Data dengan id = ${id} berhasil di hapus`)
    })
  }

  static list (input, callback) {
    const list = input
    const listSplit = list.split(":")
    const column = listSplit[0]
    const value  = listSplit[1]
    
    switch (column) {
      case "party": 
        const party = value
        const queryList = `SELECT DISTINCT name, party, grade_current FROM Politicians WHERE party LIKE "%${party}%"
                          AND grade_current >= 9 AND grade_current < 11`
        db.all(queryList, (err, data) => {
          if (err) throw err;
          callback(data)
        })
      break;
    }
  }

  static countVote (input, callback) {
    const inputSplit = input.split(":")
    const name = inputSplit[1]
    
    const queryCountVote = `SELECT COUNT(politician_id) AS totalVote, name FROM Politicians JOIN Votes ON Politicians.id = Votes.politician_id
    WHERE Politicians.name LIKE "%${name}%"
    GROUP BY Politicians.name`

    db.all(queryCountVote, (err, data) => {
      if (err) throw err;
      callback(data)
      // console.log(data);
    })
  }

  static topVote (input, callback) {
    const inputSplit = input.split(":")
    const limit = inputSplit[1]

    const query = `SELECT COUNT(politician_id) AS totalVote, name, party, location FROM Politicians JOIN Votes ON Politicians.id = Votes.politician_id GROUP BY name ORDER BY totalVote DESC LIMIT ${limit}`

    db.all(query, (err, data) => {
      if (err) throw err;
      // console.log(data);
      callback(data)
    })
  }

  static votersPolitician (input, callback) {
    // const inputSplit = input.split(":")
    // const name = inputSplit[1]

    const query = `SELECT DISTINCT name FROM Politicians WHERE name = "Olympia Snowe"`

    db.all(query, (err, data) => {
      if (err) throw err;
      const name = data[0].name
      const query = `SELECT first_name, last_name, gender, age FROM Voters JOIN (SELECT * FROM Votes JOIN Politicians ON Votes.politician_id = Politicians.id) AS Pemilih ON Voters.id = Pemilih.voter_id WHERE name = "Olympia Snowe"`
      
      db.all(query, (err, data) => {
        if (err) throw err;
        callback(data)
      })
      
    })
  }

}

// const tes = ModelPoliticians.listDataPoliticians("party:r")
// console.log(tes);

// const insert = ModelPoliticians.insertDataPoliticians(["Ari", "A", "LA", 14.0899])
// console.log(insert);

// const update = ModelPoliticians.updateDataPoliticians(["id:42", "location:LE"])
// console.log(update);

// const hapus = ModelPoliticians.delete("id:42")
// console.log(hapus);
// console.log(ModelPoliticians.hitungVote("findVote:adam"));

// console.log(ModelPoliticians.topVote("countVoteTheMost:4"));

// console.log(ModelPoliticians.votersPolitician());


module.exports = ModelPoliticians