const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database1.db');
let input = process.argv[2]
let tabel = process.argv[3]

if (input == 'add') {

  if (tabel == 'Politicians') {
    const query = `INSERT INTO Politicians (name, party, location,grade_current)
                   VALUES ('${process.argv[4]}', '${process.argv[5]}', '${process.argv[6]}', '${process.argv[7]}')`;
    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully inserted new data to dataPoliticians ');
    });
    //node insert.js add Politicians HANDI X ID 100

  } else if (tabel == 'Voters') {
    let query1 = `INSERT INTO Voters (first_name, last_name, gender, age)
    VALUES ("${process.argv[4]}" , "${process.argv[5]}", "${process.argv[6]}", "${process.argv[7]}")`;
    db.run(query1, err => {
      if (err) throw err
      console.log('Successfully inserted new data to table Data Voters !')
      ////node insert.js add Voters HANDI PRIYONO MALE 20
    })
  } else if (tabel == 'Votes') {
    let query2 = `INSERT INTO Votes (id_voters, id_politicians)
    VALUES ('${process.argv[4]}' , '${process.argv[5]}')`;
    db.run(query2, err => {
      if (err) throw err
      console.log('Successfully inserted new data to table DataVotes !')
    })
    //  node insert.js add Votes 175 21
  }






}
// node insert.js add TABLE
