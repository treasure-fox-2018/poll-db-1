const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');


class CRUD {

  static insertData(table, dataArr) {
    if (table == 'Politicians'){
      db.serialize( () => {
        db.run(`INSERT INTO '${table}'(name, party, location, grade_current) VALUES ('${dataArr[0]}', '${dataArr[1]}', '${dataArr[2]}', '${dataArr[3]}')`);
      });
      db.close();
    } else if (table == 'Voters'){
      db.serialize( () => {
        db.run(`INSERT INTO '${table}'(first_name, last_name, gender, age) VALUES ('${dataArr[0]}', '${dataArr[1]}', '${dataArr[2]}', '${dataArr[3]}')`);
      });
      db.close();
    } else {
      db.serialize( () => {
        db.run(`INSERT INTO Votes(voter_id, politician_id) VALUES ('${dataArr[0]}', '${dataArr[1]}')`);
      });
      db.close();
    }
    
    
  }

  static updateData(table, dataArr) {
    let id = dataArr[0];
    let col = dataArr[1];
    let input = dataArr[2];
    db.serialize( () => {
      db.run(`UPDATE '${table}' SET '${col}' = '${input}' WHERE id = '${id}'`);
    });
    db.close();
  }

  static deleteData(table, id) {
    db.serialize( () => {
      db.run(`DELETE FROM '${table}' WHERE id = '${id}'`);
    });
    db.close();
  }
}

module.exports = CRUD;