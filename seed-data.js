var fs = require('fs')
let Politicians = fs.readFileSync('politicians.csv', 'utf8').split('\n')
let Voters = fs.readFileSync('voters.csv', 'utf8').split('\n')
let Votes = fs.readFileSync('votes.csv', 'utf8').split('\n')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database1.db');

//name,party,location,grade_current
let dataPoliticians = []
for (let i = 1; i < Politicians.length; i++) {
  let data = (Politicians[i].split(','))
  dataPoliticians.push(data)
}

let dataVoters = []
for (let i = 1; i < Voters.length; i++) {
  dataVoters.push(Voters[i].split(','))

}

let dataVotes = []
for (let i = 1; i < Votes.length; i++) {
  dataVotes.push(Votes[i].split(','))
}



function create_and_seeds() {
  db.serialize(function () {
    //POLITICIANS
    for (let i = 0; i < dataPoliticians.length; i++) {
      if (dataPoliticians[i].length !== 1) {
        const query = `INSERT INTO Politicians (name, party, location,grade_current)
                 VALUES ('${dataPoliticians[i][0]}', '${dataPoliticians[i][1]}', '${dataPoliticians[i][2]}', '${dataPoliticians[i][3]}')`;
        db.run(query, function (err) {
          if (err) throw err;
          console.log('Successfully inserted new data to dataPoliticians table !');
        });
      }
    }



    //VOTERS
    for (let i = 0; i < dataVoters.length; i++) {

      if (dataVoters[i].length !== 1) {
        let query1 = `INSERT INTO Voters (first_name, last_name, gender, age)
    VALUES ("${dataVoters[i][0]}" , "${dataVoters[i][1]}", "${dataVoters[i][2]}", "${dataVoters[i][3]}")`;
        db.run(query1, err => {
          if (err) throw err
          console.log('Successfully inserted new data to table Data Voters !')
        })

      }
    }



    //VOTES
    for (let i = 0; i < dataVotes.length; i++) {
      if (dataVotes[i].length !== 1) {

        let query2 = `INSERT INTO Votes (id_voters, id_politicians)
  VALUES ('${dataVotes[i][0]}' , '${dataVotes[i][1]}')`;
        db.run(query2, err => {
          if (err) throw err
          console.log('Successfully inserted new data to table DataVotes !')
        })
      }

    }



  })
}

create_and_seeds()
