const db    = require('./db');
const args  = process.argv.slice(2);
const table = args[0];

if (!table) {
  console.log('$ node update help');
}else if (table === 'help') {
  console.log('$ node update <table_name> <id> <input>');
}else if (table === 'politicians') {
  const query = `UPDATE politicians SET name = "${args[2]}", party = "${args[3]}", location = "${args[4]}", grade_current = "${args[5]}" WHERE id = "${args[1]}";`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully update a politician!');
  });
}else if (table === 'voters') {
  const query = `UPDATE voters SET first_name = "${args[2]}", last_name = "${args[3]}", gender = "${args[4]}", age = "${args[5]}" WHERE id = "${args[1]}";`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully update a voter!');
  });
}else if (table === 'votes') {
  const query = `UPDATE votes SET voterId = "${args[2]}", politicianId = "${args[3]}" WHERE id = "${args[1]}";`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully update a vote!');
  });
}
