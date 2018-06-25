const db = require('./db')
const argv = process.argv.slice(2)
const tableName = argv[0]
const args = argv.slice(1)

// node read table_name
db.all(`SELECT * FROM ${tableName}`, (err, data) => {
  if (err) throw err
  console.log(data)
})