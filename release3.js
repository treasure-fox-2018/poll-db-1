const db = require('./db');

class release3 {
  static number1() {
    db.all(`SELECT name, party, grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`, function (err, data) {
      console.log(data);
    });
  }

  static number2() {
    db.all(`SELECT COUNT(politicianId)  AS total_votes, name
            FROM politicians
            LEFT JOIN votes
	             ON politicians.id = votes.politicianId
            WHERE name LIKE "Olympia Snowe"`, function (err, data) {
              console.log(data);
            })
  }

  static number3() {
    db.all(`SELECT name, COUNT(politicianId) AS total_votes
            FROM politicians
            LEFT JOIN votes
               ON politicians.id = votes.politicianId
            WHERE name LIKE "Adam%"
            GROUP BY name`, function (err, data) {
              console.log(data);
            })
  }

  static number4() {
    db.all(`SELECT COUNT(politicianId) AS total_votes, name, party, location
            FROM politicians
            LEFT JOIN votes
               ON politicians.id = votes.politicianId
			      GROUP BY name
            ORDER BY total_votes DESC
			      LIMIT 3`, function (err, data) {
              console.log(data);
          })
  }

  static number5() {
    db.all(`    SELECT first_name, last_name, gender, age FROM votes INNER JOIN voters
    	ON votes.voterId = voters.id
    	INNER JOIN politicians
    	ON votes.politicianId = politicians.id
    WHERE name LIKE "Olympia Snowe"
    		`, function (err, data) {
              console.log(data);
          })
  }
}

// release3.number1();
// release3.number2();
// release3.number3();
// release3.number4();
release3.number5();
