const db = require('./db');
const table = process.argv[2];
const args = process.argv.slice(3);
const id = args[0];

db.run(`DELETE FROM ${table} WHERE id = ${id}`);
