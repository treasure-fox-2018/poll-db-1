const db    = require('./db');
const args  = process.argv.slice(2);
const table = args[0];

if (!table) {
  console.log('$ node delete help');
}else if (table === 'help') {
  console.log('$ node delete <table_name> <id>');
}else if (table === 'politicians') {
  const query = `DELETE FROM politicians WHERE id = "${args[1]}"`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully deleted a politician!');
  });
}else if (table === 'voters') {
  const query = `DELETE FROM voters WHERE id = "${args[1]}"`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully deleted a voter!');
  });
}else if (table === 'votes') {
  const query = `DELETE FROM votes WHERE id = "${args[1]}"`;
  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully deleted a vote!');
  });
}
