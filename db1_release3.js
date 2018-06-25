var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');


//SOAL1//
db.all(`SELECT * FROM Politicians WHERE party = 'R' 
        AND grade_current  BETWEEN 9 AND 11`, function (err, data) {
        console.log(data);
    });

//SOAL1//
db.all(`SELECT COUNT(name) AS totalVote, name 
        FROM politicians 
        INNER JOIN votes ON Votes.politicianId = politicians.id 
        WHERE politicians.name LIKE "Olympia Snowe"`, function (err, data) {
        console.log(data);
    });

//SOAL2//
db.all(` SELECT  name, COUNT(name) as TotalVote FROM Politicians
         JOIN  Votes
         ON Politicians.id = Votes.politicianId
         WHERE Politicians.name LIKE '%adam%'
         GROUP BY name`, function (err, data) {
        console.log(data);
    });

//SOAL3//
db.all(`SELECT  COUNT(*) AS totalVote, name, party, location FROM Politicians
        JOIN  Votes
        ON Politicians.id = Votes.politicianId
        GROUP BY name
        ORDER BY totalVote DESC
        LIMIT 3`, function (err, data) {
        console.log(data);
    });

//SOAL4//
db.all(`SELECT first_name, last_name, gender, age FROM Votes
        INNER JOIN  Politicians
        ON Votes.politicianId = Politicians.id
        JOIN Voters
        ON Voters.id = Votes.id
        WHERE name = 'Olympia Snowe';`, function (err, data) {
        console.log(data);
    });