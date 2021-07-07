const fs =require("fs")
const db = require("./db")

class SeedData {
  static insertDataPoliticians () {
    db.serialize(() => {
      const dataPoliticians = fs.readFileSync("./politicians.csv", "utf-8").split("\n");
      
  
      for (let i = 1; i < dataPoliticians.length; i++) {
        let dataSplit = dataPoliticians[i].split(",")
  
        let name          = dataSplit[0]
        let party         = dataSplit[1]
        let location      = dataSplit[2]
        let grade_current = dataSplit[3]
  
        const queryInsert = `INSERT INTO Politicians (name, party, location, grade_current)
                            VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;
  
        db.run(queryInsert, (err) => {  
          if (err) throw err;
          console.log("Data politicians successfully add to database");
        })
      }
    })
  }

  static insertDataVoters () {
    db.serialize(() => {
      const dataVoter = fs.readFileSync("./voters.csv", "utf-8").split("\n")
      
      
      for (let i = 1; i < dataVoter.length; i++) {
        let dataSplit = dataVoter[i].split(",")
  
        let firstName = dataSplit[0]
        let lastName  = dataSplit[1]
        let gender    = dataSplit[2]
        let age       = dataSplit[3]
  
        const queryInsertVoters = `INSERT INTO Voters (first_name, last_name, gender, age)
                                VALUES ("${firstName}", "${lastName}", "${gender}", "${age}")`;
  
        db.run(queryInsertVoters, (err) => {
          if (err) throw err;
          console.log("Data Voters successfully add to database");
        })
      }
    })
  }

  static insertDataVotes () {
    db.serialize(() => {
      const dataVotes = fs.readFileSync("./votes.csv", "utf-8").split("\n")
  
      for (let i = 1; i < dataVotes.length; i++) {
        let dataSplit = dataVotes[i].split(",")
  
        let voterId      = dataSplit[0]
        let politicianId = dataSplit[1]
  
        const queryInsertVotes = `INSERT INTO Votes (voter_id, politician_id)
                                VALUES ("${voterId}", "${politicianId}")`
  
        db.run(queryInsertVotes, (err) => {
          if (err) throw err;
  
          console.log("Data votes successfully add to database");
        })
      }
    })
  }
}

SeedData.insertDataPoliticians()
SeedData.insertDataVoters()
SeedData.insertDataVotes()

module.exports = SeedData