const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databse.db');

module.exports = db