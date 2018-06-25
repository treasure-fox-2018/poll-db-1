const db = require('./db');
const table = process.argv[2];
const args = process.argv.slice(3);
db.get("PRAGMA foreign_keys = ON");

if (table == "politicians") {
  // let data = args.toString().split(",");
  // console.log(args);
  let name = args[0] + " " + args[1];
  let party = args[2];
  let location = args[3];
  let grade = args[4];
  db.run(`INSERT INTO politicians VALUES (null, "${name}", "${party}", "${location}", "${grade}")`);
  // console.log(name, party, location, grade);
} else if (table == "voters") {
  let firstName = args[0];
  let lastName = args[1];
  let gender = args[2];
  let age = args[3];
  db.run(`INSERT INTO voters VALUES (null, "${firstName}", "${lastName}", "${gender}", "${age}")`);
} else if (table == "votes") {
  let voterId = args[0];
  let politicianId = args[1];
  db.run(`INSERT INTO votes VALUES (null, "${voterId}", "${politicianId}")`);
}
