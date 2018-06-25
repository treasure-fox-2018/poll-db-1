const db    = require('./db');
const args  = process.argv.slice(2);
const table = args[0];

if (!table) {
  console.log('$ node create help');
}else if (table === 'help') {
  console.log('$ node create <table_name> <input>');
}else if (table === 'politicians') {
  const query = `INSERT INTO politicians (name, party, location, grade_current)
  VALUES ("${args[1]}", "${args[2]}", "${args[3]}", "${args[4]}")`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully created a new politician!');
  });
}else if (table === 'voters') {
  const query = `INSERT INTO voters (first_name, last_name, gender, age)
  VALUES ("${args[1]}", "${args[2]}", "${args[3]}", "${args[4]}")`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully created a new voter!');
  });
}else if (table === 'votes') {
  const query = `INSERT INTO votes (voterId, politicianId)
  VALUES ("${args[1]}", "${args[2]}")`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully created a new vote!');
  });
}
