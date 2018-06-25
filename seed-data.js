const fs = require('fs');
const db = require('./db.js');

let politiciansData = fs.readFileSync('politicians.csv', 'utf8').split('\n');
let votersData = fs.readFileSync('voters.csv', 'utf8').split('\n');
let votesData = fs.readFileSync('votes.csv', 'utf8').split('\n');

politiciansData.shift();
votersData.shift();
votesData.shift();

for (let i = 0; i <= politiciansData.length - 2; i++) {
    let data = politiciansData[i].split(',');
    // console.log(data)
    var name = data[0];
    var party = data[1];
    var location = data[2];
    var grade_current = data[3];
    var queryPoliticianData = `INSERT INTO Politicians (name, party, location, grade_current)
                               VALUES ("${name}", "${party}", "${location}", "${grade_current}")`

    db.run(queryPoliticianData, function (err) {
        if (err) throw err
    });
}

for (let i = 0; i <= votersData.length - 2; i++) {
    let data = votersData[i].split(',');
    var first_name = data[0];
    var last_name = data[1];
    var gender = data[2];
    var age = data[3];
    var queryVotersData = `INSERT INTO Voters (first_name, last_name, gender, age)
                           VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`

    db.run(queryVotersData, function (err) {
        if (err) throw err
    });

}

for (let i = 0; i <= votesData.length - 2; i++) {
    let data = votesData[i].split(',');
    var voterId = data[0];
    var politicianId = data[1];
    var queryVotesData = `INSERT INTO Votes (politicianId, voterId)
                          VALUES ("${politicianId}", "${voterId}")`

    db.run(queryVotesData, function (err) {
        if (err) throw err
    });

}


