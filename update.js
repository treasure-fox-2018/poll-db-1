const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database1.db');
let input = process.argv[2]
let tabel = process.argv[3]

if (input == 'update') {

  //node update.js update Voters 175 last_name HANDIPIXZ
  if (tabel == 'Politicians') {
    const query = `UPDATE Politicians SET '${process.argv[5]}' = '${process.argv[6]}'
WHERE id ='${process.argv[4]}'`;
    db.run(query, function (err) {
      if (err) throw err;
      console.log('Successfully Update data in table Politicians ');
    });
    //node delete.js Politicians 21
  } else if (tabel == 'Voters') {
    const query1 = `UPDATE Voters SET '${process.argv[5]}' = '${process.argv[6]}'
  WHERE id ='${process.argv[4]}'`;
    db.run(query1, function (err) {
      if (err) throw err;
      console.log('Successfully Update data in table Voters ');
    });
  } else if (tabel == 'Votes') {
    const query2 = `UPDATE Votes SET '${process.argv[5]}' = '${process.argv[6]}'
  WHERE id ='${process.argv[4]}'`;
    db.run(query2, function (err) {
      if (err) throw err;
      console.log('Successfully Update data in table Votes ');
    });
  }




}
