const db = require('./db');
const table = process.argv[2];
const args = process.argv.slice(3);
db.get("PRAGMA foreign_keys = ON");

if (table == "politicians") {
  // let data = args.toString().split(",");
  // console.log(args);
  let id = args[0];
  let name = args[1] + " " + args[2];
  let party = args[3];
  let location = args[4];
  let grade = args[5];
  db.run(`UPDATE politicians
            SET name = "${name}",
                party = "${party}",
                location =  "${location}",
                grade_current = "${grade}"
            WHERE id = ${id}`);
  // console.log(name, party, location, grade);
} else if (table == "voters") {
  let id = args[0];
  let firstName = args[1];
  let lastName = args[2];
  let gender = args[3];
  let age = args[4];
  db.run(`UPDATE voters
            SET first_name = "${firstName}",
                last_name = "${lastName}",
                gender = "${gender}",
                age = "${age}"
            WHERE id = ${id}`);
} else if (table == "votes") {
  let id = args[0];
  let voterId = args[1];
  let politicianId = args[2];
  db.run(`UPDATE votes
            SET voterId = "${voterId}",
                politicianId = "${politicianId}"
            WHERE id = ${id}`);
}
