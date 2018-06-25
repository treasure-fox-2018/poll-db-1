const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Show {

  static partyRWithGrade() {

    let query = `SELECT * FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }

  static totalVotesOlympiaSnowe(){
    
    let query = `SELECT COUNT (*) AS 'totalVotes', name FROM Politicians INNER JOIN Votes ON Politicians.id = Votes.politician_id WHERE name = 'Olympia Snowe'`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }

  static totalVotesAdam(){

    let query = `SELECT name, COUNT(*) AS 'totalVotes' FROM Politicians LEFT JOIN Votes ON Politicians.id = Votes.politician_id WHERE name LIKE 'Adam%' GROUP BY Politicians.id`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }

  static top3HighestVotes(){

    let query = `SELECT COUNT(*) AS 'totalVotes', name, party, location  FROM Politicians LEFT JOIN Votes ON Politicians.id = Votes.politician_id GROUP BY name ORDER BY totalVotes DESC LIMIT 3`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }

  static olympiaSnoweVoters(){

    let query = `SELECT first_name, last_name, gender, age FROM Voters LEFT JOIN Votes ON Voters.id = Votes.voter_id WHERE Votes.politician_id = (SELECT id FROM Politicians WHERE name = "Olympia Snowe")`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }
}


// Show.partyRWithGrade()
// Show.totalVotesOlympiaSnowe()
// Show.totalVotesAdam()
// Show.top3HighestVotes()
// Show.olympiaSnoweVoters()

module.exports = Show;