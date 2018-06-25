const fs = require('fs');
const politiciansFile = fs.readFileSync('politicians.csv', 'utf8').split('\n');
const votersFile = fs.readFileSync('voters.csv', 'utf8').split('\n');
const votesFile = fs.readFileSync('votes.csv', 'utf8').split('\n');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

// input data to array

let politicians_data = []
for (let i = 1; i < politiciansFile.length; i++) {
  if (politiciansFile[i].length !== 0) {
    politicians_data.push(politiciansFile[i].split(','));
  }
}

let voters_data = []
for (let i = 1; i < votersFile.length; i++) {
  if (votersFile[i].length !== 0) {
  voters_data.push(votersFile[i].split(','));
  }
}

let votes_data = []
for (let i = 1; i < votesFile.length; i++) {
  // console.log(votesFile[i].length);
  if (votesFile[i].length !== 0) {
    debugger;
    votes_data.push(votesFile[i].split(','));
  }

  // console.log(votersFile[i].length, '-------')
}

// console.log(votes_data);



// input data to TABLE politicians

for (var i = 0; i < politicians_data.length; i++) {
  if (politicians_data[i].length !== 1) {
    const query1 = `INSERT INTO politicians (name, party, location, grade_current)
                   VALUES ("${politicians_data[i][0]}", "${politicians_data[i][1]}", "${politicians_data[i][2]}","${politicians_data[i][3]}")`;
    db.run(query1, function(err) {
      if (err) throw err;
      console.log('Successfully created a new Politicians Data!');
    });
  }
}

// input data to TABLE voters

for (var i = 0; i < voters_data.length; i++) {
  if (voters_data[i].length !== 0) {
    const query2 = `INSERT INTO Voters (first_name, last_name, gender, age)
                   VALUES ("${voters_data[i][0]}", "${voters_data[i][1]}", "${voters_data[i][2]}","${voters_data[i][3]}")`;
    db.run(query2, function(err) {
      if (err) throw err;
      console.log('Successfully created a new Voters Data!');
    })
  }
}
//  input data to TABLE votes

for (var i = 0; i < votes_data.length; i++) {
  if (votes_data[i].length !== 0) {
    const query3 = `INSERT INTO Votes (id_voters, id_politicians)
                   VALUES ("${votes_data[i][0]}", "${votes_data[i][1]}")`;
    db.run(query3, function(err) {
      if (err) throw err;
      console.log('Successfully created a new Votes Data!');
    });
  }
}
// console.log(politicians_data);
// console.log(voters_data);
// console.log(votes_data);
module.exports = {
  politiciansFile,
  votersFile,
  votesFile
};
