const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database1.db');
let input = process.argv[2]
let tabel = process.argv[3]

if (input == 'delete') {

  if (tabel == 'Politicians') {
    const query = `DELETE FROM Politicians
WHERE id =' ${process.argv[4]}'`;
    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully delete data in table Politicians ');
    });
    //node delete.js Politicians 21
  } else if (tabel == 'Voters') {
    const query1 = `DELETE FROM Voters
WHERE id =' ${process.argv[4]}'`;
    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully delete data in table Voters ');
    });
  } else if (tabel == 'Votes') {
    const query2 = `DELETE FROM Votes
WHERE id =' ${process.argv[4]}'`;
    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully delete data in table Votes ');
    });
  }




}
