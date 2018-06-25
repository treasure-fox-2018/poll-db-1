//your code here
const db = require('./database')
function create() {
  db.serialize(function() {
    db.run(`CREATE TABLE politicians 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100),
      location INTEGER, grade_current FLOAT)`);

    db.run(`CREATE TABLE voters
      (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100),
      last_name VARCHAR(100), gender VARCHAR(100), age INTEGER)`);

      db.run(`CREATE TABLE votes
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
        voter_id INTEGER, politician_id INTEGER,
        FOREIGN KEY (voter_id) REFERENCES voters(id),
        FOREIGN KEY (politician_id) REFERENCES politicians(id)
      )`);
  })
}

create()
module.exports = create