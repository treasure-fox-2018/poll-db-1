'use strict'

const sqlite3 = require('sqlite3').verbose()


// const db = new sqlite3.Database('./sqlite-crud/election.db')


const path = require('path');
const dbPath = path.resolve(__dirname, './sqlite-crud/election.db')
var db = new sqlite3.Database(dbPath);

module.exports = db
